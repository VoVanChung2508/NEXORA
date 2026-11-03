from __future__ import annotations

import uuid
from typing import TYPE_CHECKING, Any

from fastapi import HTTPException, Request
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from ..auth.session import get_user_id

if TYPE_CHECKING:
    from .handlers import Handlers


def _attr(obj: Any, *names: str, default=None):
    if obj is None:
        return default

    for name in names:
        if hasattr(obj, name):
            return getattr(obj, name)

    return default


async def _read_json_object(
    request: Request,
    allowed_fields: set[str],
) -> dict[str, Any]:
    try:
        data = await request.json()
    except Exception as exc:
        raise HTTPException(
            status_code=400,
            detail={"error": "invalid_body", "message": str(exc)},
        ) from exc

    if not isinstance(data, dict):
        raise HTTPException(
            status_code=400,
            detail={"error": "invalid_body", "message": "expected JSON object"},
        )

    unknown = set(data) - allowed_fields
    if unknown:
        raise HTTPException(
            status_code=400,
            detail={
                "error": "invalid_body",
                "message": f"unknown field(s): {sorted(unknown)}",
            },
        )

    return data


def atoi_or(value: str | None, default: int) -> int:
    if not value:
        return default
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


def clamp_int(value: int, low: int, high: int) -> int:
    if value < low:
        return low
    if value > high:
        return high
    return value


async def require_admin(self: "Handlers"):
    user_id, ok = get_user_id()
    if not ok or user_id is None:
        raise HTTPException(
            status_code=401,
            detail={"error": "unauthenticated", "message": ""},
        )

    try:
        user = await self.store.users.get_by_id(user_id)
    except Exception as exc:
        raise HTTPException(
            status_code=403,
            detail={
                "error": "forbidden",
                "message": "requires system admin",
            },
        ) from exc

    if not user.is_system_admin:
        raise HTTPException(
            status_code=403,
            detail={
                "error": "forbidden",
                "message": "requires system admin",
            },
        )

    return user


async def admin_list_users(
    self: "Handlers",
    request: Request,
) -> dict:
    await self.require_admin()

    query = request.query_params.get("q", "").strip()
    limit = clamp_int(
        atoi_or(request.query_params.get("limit"), 50),
        1,
        200,
    )
    offset = atoi_or(
        request.query_params.get("offset"),
        0,
    )
    if offset < 0:
        offset = 0

    try:
        users = await self.store.users.search(
            query,
            limit,
            offset,
        )
        total = await self.store.users.count_users(query)
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail={"error": "list_failed", "message": str(exc)},
        ) from exc

    return {
        "users": users or [],
        "total": total,
        "limit": limit,
        "offset": offset,
    }


async def admin_toggle_user(
    self: "Handlers",
    user_id: uuid.UUID,
    request: Request,
) -> dict:
    await self.require_admin()

    data = await _read_json_object(
        request,
        {"isSystemAdmin"},
    )

    is_system_admin = data.get("isSystemAdmin", False)
    if not isinstance(is_system_admin, bool):
        raise HTTPException(
            status_code=400,
            detail={
                "error": "invalid_body",
                "message": "isSystemAdmin must be a boolean",
            },
        )

    try:
        await self.store.users.set_system_admin(
            user_id,
            is_system_admin,
        )
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail={"error": "db_error", "message": str(exc)},
        ) from exc

    return {"status": "ok"}


async def admin_list_workspaces(
    self: "Handlers",
):
    await self.require_admin()

    try:
        return await self.store.workspaces.list_all()
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail={"error": "db_error", "message": str(exc)},
        ) from exc


async def admin_create_workspace(
    self: "Handlers",
    request: Request,
):
    actor = await self.require_admin()

    data = await _read_json_object(
        request,
        {"name", "owner_id"},
    )

    name = data.get("name", "")
    raw_owner = data.get("owner_id")

    if not isinstance(name, str):
        raise HTTPException(
            status_code=400,
            detail={"error": "invalid_body", "message": "name must be a string"},
        )

    name = name.strip()
    if not name:
        raise HTTPException(
            status_code=400,
            detail={"error": "validation", "message": "name is required"},
        )

    owner_id = actor.id
    if raw_owner not in (None, ""):
        if not isinstance(raw_owner, str):
            raise HTTPException(
                status_code=400,
                detail={
                    "error": "invalid_body",
                    "message": "owner_id must be a UUID",
                },
            )
        try:
            parsed_owner = uuid.UUID(raw_owner)
        except ValueError as exc:
            raise HTTPException(
                status_code=400,
                detail={
                    "error": "invalid_body",
                    "message": "owner_id must be a UUID",
                },
            ) from exc

        if parsed_owner.int != 0:
            owner_id = parsed_owner

    # Exact Go behaviour: lowercase + replace spaces with '-'.
    slug = name.lower().replace(" ", "-")

    try:
        workspace = await self.store.workspaces.create(
            name,
            slug,
            owner_id,
        )
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail={"error": "db_error", "message": str(exc)},
        ) from exc

    return JSONResponse(
        status_code=201,
        content=jsonable_encoder(workspace),
    )


async def admin_delete_workspace(
    self: "Handlers",
    workspace_id: uuid.UUID,
) -> dict:
    await self.require_admin()

    try:
        await self.store.workspaces.delete(workspace_id)
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail={"error": "db_error", "message": str(exc)},
        ) from exc

    return {"status": "ok"}


