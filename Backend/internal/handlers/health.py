from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .handlers import Handlers


async def health(self: "Handlers") -> dict:
    """
    Báo trạng thái sống của service và các tính năng đang được cấu hình.

    Python port của health.go.
    """
    return {
        "status": "ok",
        "features": {
            "sharePoint": self.sharepoint is not None,
        },
    }