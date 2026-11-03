// Low-level HTTP client for the Flowie backend API. All requests send the
// session cookie (credentials: "include") so the httpOnly Azure AD session is
// used. Domain modules (tasks, projects, …) build on top of `request`.

const DEFAULT_API_PORT = process.env.NEXT_PUBLIC_API_PORT || "8081";
const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1"]);

function isLoopbackHost(hostname: string) {
  return LOOPBACK_HOSTS.has(hostname.toLowerCase());
}

function resolveApiBase(rawBase: string | undefined) {
  const configuredBase = rawBase?.trim();
  const fallbackBase =
    typeof window === "undefined"
      ? `http://localhost:${DEFAULT_API_PORT}`
      : `${window.location.protocol}//${window.location.hostname}:${DEFAULT_API_PORT}`;
  const base = configuredBase || fallbackBase;

  try {
    const url = new URL(base);

    if (typeof window !== "undefined") {
      const pageHost = window.location.hostname;
      if (isLoopbackHost(url.hostname) && !isLoopbackHost(pageHost)) {
        url.hostname = pageHost;
      }
    }

    return url.origin;
  } catch {
    return base.replace(/\/+$/, "");
  }
}

export const API_BASE = resolveApiBase(process.env.NEXT_PUBLIC_API_BASE);

export class ApiError extends Error {
  status: number;
  /** Machine-readable code from the backend's `error` field, e.g. "no_folder".
   *  Branch on this rather than matching the localised `message`. */
  code: string;
  constructor(status: number, message: string, code = "") {
    super(message);
    this.status = status;
    this.code = code;
  }
}
// Giờ mọi API call từ frontend sẽ tự động "đăng nhập" bằng token dev, không cần qua màn hình login Azure AD nữa.
// export async function request<T>(path: string, init?: RequestInit): Promise<T> {
//   const res = await fetch(`${API_BASE}/api/v1${path}`, {
//     ...init,
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//       ...(init?.headers || {}),
//     },
//   });

  export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}/api/v1${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.NEXT_PUBLIC_DEV_TOKEN
        ? { Authorization: `Bearer ${process.env.NEXT_PUBLIC_DEV_TOKEN}` }
        : {}),
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
  let msg = res.statusText;
  let code = "";

  try {
    const body = await res.json();

    console.log("[API ERROR]", {
      path,
      status: res.status,
      body,
    });

    if (body.message) {
      msg = body.message;
    } else if (body.error) {
      msg = body.error;
    } else if (typeof body.detail === "string") {
      msg = body.detail;
    } else if (Array.isArray(body.detail)) {
      msg = body.detail
        .map((e: any) => `${e.loc?.join(".")}: ${e.msg}`)
        .join("; ");
    }

    code = body.error || "";
  } catch (parseErr) {
    console.warn(
      `[api] Không parse được error body cho ${path}:`,
      parseErr
    );
  }

  throw new ApiError(res.status, msg, code);
}
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}
