module.exports = [
"[project]/src/lib/api/client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_BASE",
    ()=>API_BASE,
    "ApiError",
    ()=>ApiError,
    "request",
    ()=>request
]);
// Low-level HTTP client for the Flowie backend API. All requests send the
// session cookie (credentials: "include") so the httpOnly Azure AD session is
// used. Domain modules (tasks, projects, …) build on top of `request`.
const DEFAULT_API_PORT = process.env.NEXT_PUBLIC_API_PORT || "8081";
const LOOPBACK_HOSTS = new Set([
    "localhost",
    "127.0.0.1",
    "0.0.0.0",
    "::1"
]);
function isLoopbackHost(hostname) {
    return LOOPBACK_HOSTS.has(hostname.toLowerCase());
}
function resolveApiBase(rawBase) {
    const configuredBase = rawBase?.trim();
    const fallbackBase = ("TURBOPACK compile-time truthy", 1) ? `http://localhost:${DEFAULT_API_PORT}` : "TURBOPACK unreachable";
    const base = configuredBase || fallbackBase;
    try {
        const url = new URL(base);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return url.origin;
    } catch  {
        return base.replace(/\/+$/, "");
    }
}
const API_BASE = resolveApiBase(("TURBOPACK compile-time value", "http://localhost:8081"));
class ApiError extends Error {
    status;
    /** Machine-readable code from the backend's `error` field, e.g. "no_folder".
   *  Branch on this rather than matching the localised `message`. */ code;
    constructor(status, message, code = ""){
        super(message);
        this.status = status;
        this.code = code;
    }
}
async function request(path, init) {
    const res = await fetch(`${API_BASE}/api/v1${path}`, {
        ...init,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...process.env.NEXT_PUBLIC_DEV_TOKEN ? {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_DEV_TOKEN}`
            } : {},
            ...init?.headers || {}
        }
    });
    if (!res.ok) {
        let msg = res.statusText;
        let code = "";
        try {
            const body = await res.json();
            msg = body.message || body.error || msg;
            code = body.error || "";
        } catch (parseErr) {
            /* ignore */ console.warn(`[api] Không parse được error body cho ${path}:`, parseErr);
        }
        throw new ApiError(res.status, msg, code);
    }
    if (res.status === 204) return undefined;
    return res.json();
}
}),
"[project]/src/lib/api/auth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authApi",
    ()=>authApi
]);
// Authentication & current-user endpoints (Module 1).
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-ssr] (ecmascript)");
;
const authApi = {
    login: (email, password)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])("/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            })
        }),
    register: (email, password, displayName)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])("/auth/register", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                displayName
            })
        }),
    logout: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])("/auth/logout", {
            method: "POST"
        }),
    me: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])("/me"),
    devMakeAdmin: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])("/dev-make-admin", {
            method: "POST"
        }),
    // Device / session management (Module 1.1)
    listSessions: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])("/me/sessions").then((r)=>r.sessions),
    revokeSession: (sessionId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/me/sessions/${sessionId}`, {
            method: "DELETE"
        }),
    // Two-factor authentication (Module 1.1)
    twoFactorStatus: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])("/me/2fa"),
    startTwoFactor: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])("/me/2fa/start", {
            method: "POST"
        }),
    enableTwoFactor: (code)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])("/me/2fa/enable", {
            method: "POST",
            body: JSON.stringify({
                code
            })
        }),
    disableTwoFactor: (code)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])("/me/2fa/disable", {
            method: "POST",
            body: JSON.stringify({
                code
            })
        }),
    /** Completes the login challenge with a TOTP or recovery code. */ verifyTwoFactor: (code)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])("/auth/2fa/verify", {
            method: "POST",
            body: JSON.stringify({
                code
            })
        }),
    // GDPR (Module 8)
    /** Downloads every record Flowie holds about the caller. */ exportMyDataUrl: ()=>`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_BASE"]}/api/v1/me/export`,
    deleteMyData: (confirmEmail)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])("/me/delete", {
            method: "POST",
            body: JSON.stringify({
                confirm: confirmEmail
            })
        })
};
}),
"[project]/src/lib/api/admin.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminApi",
    ()=>adminApi
]);
// System-admin endpoints (Module 1 / 11 system_admin).
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-ssr] (ecmascript)");
;
const adminApi = {
    /**
   * Users are paged and searched on the server — the tenant sync can leave
   * thousands of rows, and fetching them all locked up the admin page.
   */ adminListUsers: (opts = {})=>{
        const p = new URLSearchParams();
        if (opts.q) p.set("q", opts.q);
        p.set("limit", String(opts.limit ?? 50));
        p.set("offset", String(opts.offset ?? 0));
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/admin/users?${p}`);
    },
    adminSyncAzureUsers: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])("/admin/users/sync-azure", {
            method: "POST"
        }),
    adminToggleUser: (userId, isSystemAdmin)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/admin/users/${userId}`, {
            method: "PUT",
            body: JSON.stringify({
                isSystemAdmin
            })
        }),
    adminListWorkspaces: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])("/admin/workspaces"),
    adminCreateWorkspace: (name, owner_id)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])("/admin/workspaces", {
            method: "POST",
            body: JSON.stringify({
                name,
                owner_id
            })
        }),
    adminDeleteWorkspace: (id)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/admin/workspaces/${id}`, {
            method: "DELETE"
        })
};
}),
"[project]/src/lib/api/workspaces.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "workspacesApi",
    ()=>workspacesApi
]);
// Workspace endpoints (Module 2).
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-ssr] (ecmascript)");
;
const workspacesApi = {
    listWorkspaces: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])("/workspaces").then((r)=>r.workspaces),
    createWorkspace: (name)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])("/workspaces", {
            method: "POST",
            body: JSON.stringify({
                name
            })
        }),
    getWorkspace: (id)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${id}`)
};
}),
"[project]/src/lib/api/projects.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "projectsApi",
    ()=>projectsApi
]);
// Project endpoints (Module 2) + project-level stats (Module 5).
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-ssr] (ecmascript)");
;
const projectsApi = {
    listProjects: (workspaceId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/projects`).then((r)=>r.projects),
    createProject: (workspaceId, data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/projects`, {
            method: "POST",
            body: JSON.stringify(data)
        }),
    getProject: (id)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${id}`),
    projectStats: (projectId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/stats`),
    criticalPath: (projectId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/critical-path`)
};
}),
"[project]/src/lib/api/tasks.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "tasksApi",
    ()=>tasksApi
]);
// Task CRUD + comments/checklist (Module 3).
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-ssr] (ecmascript)");
;
const tasksApi = {
    // Attachments (Module 3.5) — files live in SharePoint
    listAttachments: (taskId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/tasks/${taskId}/attachments`).then((r)=>r.attachments),
    /** Uploads via multipart; fetch sets the boundary so no Content-Type here. */ uploadAttachment: async (taskId, file)=>{
        const form = new FormData();
        form.append("file", file);
        const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_BASE"]}/api/v1/tasks/${taskId}/attachments`, {
            method: "POST",
            credentials: "include",
            body: form
        });
        if (!res.ok) {
            let msg = res.statusText;
            try {
                const b = await res.json();
                msg = b.message || b.error || msg;
            } catch  {
            /* ignore */ }
            throw new Error(msg);
        }
        return await res.json();
    },
    deleteAttachment: (taskId, attachmentId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/tasks/${taskId}/attachments/${attachmentId}`, {
            method: "DELETE"
        }),
    listTasks: (projectId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/tasks`).then((r)=>r.tasks),
    createTask: (projectId, data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/tasks`, {
            method: "POST",
            body: JSON.stringify(data)
        }),
    updateTaskStatus: (taskId, status)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/tasks/${taskId}/status`, {
            method: "PATCH",
            body: JSON.stringify({
                status
            })
        }),
    deleteTask: (taskId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/tasks/${taskId}`, {
            method: "DELETE"
        }),
    getTask: (taskId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/tasks/${taskId}`),
    updateTask: (taskId, data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/tasks/${taskId}`, {
            method: "PATCH",
            body: JSON.stringify(data)
        }),
    addComment: (taskId, body)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/tasks/${taskId}/comments`, {
            method: "POST",
            body: JSON.stringify({
                body
            })
        }),
    addChecklistItem: (taskId, title)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/tasks/${taskId}/checklist`, {
            method: "POST",
            body: JSON.stringify({
                title
            })
        }),
    toggleChecklistItem: (taskId, itemId, done)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/tasks/${taskId}/checklist/${itemId}`, {
            method: "PATCH",
            body: JSON.stringify({
                done
            })
        })
};
}),
"[project]/src/lib/api/dependencies.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dependenciesApi",
    ()=>dependenciesApi
]);
// Task dependency endpoints (Module 3.4).
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-ssr] (ecmascript)");
;
const dependenciesApi = {
    listDependencies: (taskId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/tasks/${taskId}/dependencies`),
    addDependency: (taskId, dependsOnId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/tasks/${taskId}/dependencies`, {
            method: "POST",
            body: JSON.stringify({
                dependsOnId
            })
        }),
    removeDependency: (taskId, dependsOnId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/tasks/${taskId}/dependencies/${dependsOnId}`, {
            method: "DELETE"
        })
};
}),
"[project]/src/lib/api/customFields.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "customFieldsApi",
    ()=>customFieldsApi
]);
// Custom field endpoints (Module 3.4).
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-ssr] (ecmascript)");
;
const customFieldsApi = {
    listCustomFields: (projectId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/custom-fields`).then((r)=>r.fields),
    createCustomField: (projectId, data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/custom-fields`, {
            method: "POST",
            body: JSON.stringify(data)
        }),
    deleteCustomField: (projectId, fieldId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/custom-fields/${fieldId}`, {
            method: "DELETE"
        }),
    setTaskCustomField: (taskId, fieldId, value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/tasks/${taskId}/custom-fields`, {
            method: "PUT",
            body: JSON.stringify({
                fieldId,
                value
            })
        })
};
}),
"[project]/src/lib/api/labels.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "labelsApi",
    ()=>labelsApi
]);
// Label endpoints (Module 3).
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-ssr] (ecmascript)");
;
const labelsApi = {
    listLabels: (projectId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/labels`).then((r)=>r.labels),
    createLabel: (projectId, name, color)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/labels`, {
            method: "POST",
            body: JSON.stringify({
                name,
                color
            })
        }),
    setTaskLabel: (taskId, labelId, on)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/tasks/${taskId}/labels`, {
            method: "POST",
            body: JSON.stringify({
                labelId,
                on
            })
        })
};
}),
"[project]/src/lib/api/workflow.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "workflowApi",
    ()=>workflowApi
]);
// Per-project board column (workflow status) endpoints (Module 3.1).
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-ssr] (ecmascript)");
;
const workflowApi = {
    // Saved views (Module 4)
    listViews: (projectId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/views`).then((r)=>r.views),
    createView: (projectId, name, config, shared = false)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/views`, {
            method: "POST",
            body: JSON.stringify({
                name,
                config,
                shared
            })
        }),
    deleteView: (projectId, viewId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/views/${viewId}`, {
            method: "DELETE"
        }),
    listStatuses: (projectId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/statuses`).then((r)=>r.statuses),
    createStatus: (projectId, data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/statuses`, {
            method: "POST",
            body: JSON.stringify(data)
        }),
    updateStatus: (projectId, statusId, data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/statuses/${statusId}`, {
            method: "PUT",
            body: JSON.stringify(data)
        }),
    deleteStatus: (projectId, statusId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/statuses/${statusId}`, {
            method: "DELETE"
        })
};
}),
"[project]/src/lib/api/sprints.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sprintsApi",
    ()=>sprintsApi
]);
// Sprint / backlog endpoints (Module 3.2).
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-ssr] (ecmascript)");
;
const sprintsApi = {
    // Agile reports (Module 5.1)
    sprintBurndown: (sprintId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/sprints/${sprintId}/burndown`),
    sprintCapacity: (sprintId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/sprints/${sprintId}/capacity`),
    projectVelocity: (projectId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/velocity`).then((r)=>r.sprints),
    listSprints: (projectId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/sprints`).then((r)=>r.sprints),
    createSprint: (projectId, name, goal = "", dates = {})=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/sprints`, {
            method: "POST",
            body: JSON.stringify({
                name,
                goal,
                ...dates
            })
        }),
    updateSprint: (sprintId, data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/sprints/${sprintId}`, {
            method: "PATCH",
            body: JSON.stringify(data)
        }),
    setTaskSprint: (taskId, sprintId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/tasks/${taskId}/sprint`, {
            method: "PATCH",
            body: JSON.stringify({
                sprintId
            })
        })
};
}),
"[project]/src/lib/api/worklogs.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "worklogsApi",
    ()=>worklogsApi
]);
// Worklog endpoints (Module 3.3).
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-ssr] (ecmascript)");
;
const worklogsApi = {
    // Stopwatch (Module 3.3)
    startTimer: (taskId, note = "")=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/tasks/${taskId}/timer/start`, {
            method: "POST",
            body: JSON.stringify({
                note
            })
        }),
    activeTimer: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/me/timer`).then((r)=>r.timer),
    stopTimer: (note = "")=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/me/timer/stop`, {
            method: "POST",
            body: JSON.stringify({
                note
            })
        }),
    cancelTimer: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/me/timer`, {
            method: "DELETE"
        }),
    logWork: (taskId, data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/tasks/${taskId}/worklogs`, {
            method: "POST",
            body: JSON.stringify(data)
        }),
    listTaskWorklogs: (taskId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/tasks/${taskId}/worklogs`).then((r)=>r.worklogs)
};
}),
"[project]/src/lib/api/members.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "membersApi",
    ()=>membersApi
]);
// Workspace/project member endpoints (Module 1.3 / 5.3 rates).
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-ssr] (ecmascript)");
;
const membersApi = {
    listMembers: (workspaceId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/members`).then((r)=>r.members),
    projectMembers: (projectId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/members`).then((r)=>r.members),
    addMember: (workspaceId, email, role)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/members`, {
            method: "POST",
            body: JSON.stringify({
                email,
                role
            })
        }),
    updateMember: (workspaceId, userId, role)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/members/${userId}`, {
            method: "PATCH",
            body: JSON.stringify({
                role
            })
        }),
    setMemberRate: (workspaceId, userId, hourlyRate, currency = "USD")=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/members/${userId}/rate`, {
            method: "PUT",
            body: JSON.stringify({
                hourlyRate,
                currency
            })
        })
};
}),
"[project]/src/lib/api/iam.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "iamApi",
    ()=>iamApi
]);
// Custom roles & teams endpoints (Module 1.2 / 1.3).
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-ssr] (ecmascript)");
;
const iamApi = {
    // Invites (Module 1.2)
    listInvites: (workspaceId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/invites`).then((r)=>r.invites),
    /** Returns the one-time invite URL alongside the record. */ createInvite: (workspaceId, email, role)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/invites`, {
            method: "POST",
            body: JSON.stringify({
                email,
                role
            })
        }),
    revokeInvite: (workspaceId, inviteId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/invites/${inviteId}`, {
            method: "DELETE"
        }),
    acceptInvite: (token)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/invites/accept`, {
            method: "POST",
            body: JSON.stringify({
                token
            })
        }),
    listPermissions: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/permissions`).then((r)=>r.permissions),
    listRoles: (workspaceId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/roles`).then((r)=>r.roles),
    createRole: (workspaceId, name, permissions)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/roles`, {
            method: "POST",
            body: JSON.stringify({
                name,
                permissions
            })
        }),
    updateRole: (workspaceId, roleId, name, permissions)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/roles/${roleId}`, {
            method: "PUT",
            body: JSON.stringify({
                name,
                permissions
            })
        }),
    deleteRole: (workspaceId, roleId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/roles/${roleId}`, {
            method: "DELETE"
        }),
    assignCustomRole: (workspaceId, userId, roleId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/members/${userId}/custom-role`, {
            method: "PUT",
            body: JSON.stringify({
                roleId
            })
        }),
    listTeams: (workspaceId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/teams`).then((r)=>r.teams),
    createTeam: (workspaceId, name)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/teams`, {
            method: "POST",
            body: JSON.stringify({
                name
            })
        }),
    deleteTeam: (workspaceId, teamId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/teams/${teamId}`, {
            method: "DELETE"
        }),
    setTeamMember: (workspaceId, teamId, userId, on)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/teams/${teamId}/members`, {
            method: "POST",
            body: JSON.stringify({
                userId,
                on
            })
        })
};
}),
"[project]/src/lib/api/chat.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "chatApi",
    ()=>chatApi
]);
// Project chat endpoints (Module 7.2).
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-ssr] (ecmascript)");
;
const chatApi = {
    listChannels: (projectId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/channels`).then((r)=>r.channels),
    createChannel: (projectId, name)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/channels`, {
            method: "POST",
            body: JSON.stringify({
                name
            })
        }),
    deleteChannel: (channelId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/channels/${channelId}`, {
            method: "DELETE"
        }),
    listMessages: (channelId, limit = 100)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/channels/${channelId}/messages?limit=${limit}`).then((r)=>r.messages),
    postMessage: (channelId, body)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/channels/${channelId}/messages`, {
            method: "POST",
            body: JSON.stringify({
                body
            })
        }),
    markChannelRead: (channelId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/channels/${channelId}/read`, {
            method: "POST"
        })
};
}),
"[project]/src/lib/api/integrations.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "integrationsApi",
    ()=>integrationsApi
]);
// Public API keys (Module 6.2) and Slack/Teams integrations (Module 6.3).
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-ssr] (ecmascript)");
;
const integrationsApi = {
    // API keys — workspace scoped
    listApiKeys: (workspaceId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/api-keys`).then((r)=>r.keys),
    /** The plaintext secret is returned only here, once. */ createApiKey: (workspaceId, name, scopes)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/api-keys`, {
            method: "POST",
            body: JSON.stringify({
                name,
                scopes
            })
        }),
    revokeApiKey: (workspaceId, keyId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/api-keys/${keyId}`, {
            method: "DELETE"
        }),
    // Chat integrations — project scoped
    listIntegrations: (projectId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/integrations`).then((r)=>r.integrations),
    createIntegration: (projectId, data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/integrations`, {
            method: "POST",
            body: JSON.stringify(data)
        }),
    deleteIntegration: (projectId, id)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/integrations/${id}`, {
            method: "DELETE"
        })
};
}),
"[project]/src/lib/api/ops.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "opsApi",
    ()=>opsApi
]);
// Operational endpoints: outgoing webhooks, scheduled reports, audit log and
// the SharePoint file browser. These existed on the backend before they had a
// client, so they are grouped here rather than scattered.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-ssr] (ecmascript)");
;
const opsApi = {
    // Outgoing webhooks (Module 6.2) — project scoped
    listWebhooks: (projectId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/webhooks`).then((r)=>r.webhooks),
    createWebhook: (projectId, data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/webhooks`, {
            method: "POST",
            body: JSON.stringify(data)
        }),
    deleteWebhook: (projectId, webhookId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/webhooks/${webhookId}`, {
            method: "DELETE"
        }),
    // Scheduled digests (Module 5.2) — workspace scoped
    listReports: (workspaceId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/reports`).then((r)=>r.reports),
    createReport: (workspaceId, data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/reports`, {
            method: "POST",
            body: JSON.stringify(data)
        }),
    deleteReport: (workspaceId, reportId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/reports/${reportId}`, {
            method: "DELETE"
        }),
    /** Sends the digest immediately, to verify the channel works. */ runReportNow: (workspaceId, reportId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/reports/${reportId}/run`, {
            method: "POST"
        }),
    // Audit trail (SOC2 groundwork)
    listAuditLog: (workspaceId, limit = 200)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/audit-log?limit=${limit}`).then((r)=>r.entries),
    adminAuditLog: (limit = 200)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/admin/audit-log?limit=${limit}`).then((r)=>r.entries),
    // SharePoint file browser (Module 3.5)
    browseFiles: (projectId, path = "")=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/files?path=${encodeURIComponent(path)}`),
    // Session rotation (Module 1.1)
    refreshSession: (force = false)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/me/session/refresh${force ? "?force=1" : ""}`, {
            method: "POST"
        }),
    // Automation rules with conditions (Module 6.1)
    createAutomationV2: (projectId, data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/automations/v2`, {
            method: "POST",
            body: JSON.stringify(data)
        })
};
}),
"[project]/src/lib/api/notifications.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "notificationsApi",
    ()=>notificationsApi
]);
// Notification endpoints (Module 7.1).
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-ssr] (ecmascript)");
;
const notificationsApi = {
    notifications: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/me/notifications`),
    markAllNotificationsRead: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/me/notifications/read`, {
            method: "POST"
        }),
    markNotificationRead: (id)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/notifications/${id}/read`, {
            method: "PATCH"
        })
};
}),
"[project]/src/lib/api/automations.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "automationsApi",
    ()=>automationsApi
]);
// Automation-rule endpoints (Module 6.1).
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-ssr] (ecmascript)");
;
const automationsApi = {
    listAutomations: (projectId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/automations`).then((r)=>r.rules),
    createAutomation: (projectId, data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/automations`, {
            method: "POST",
            body: JSON.stringify(data)
        }),
    deleteAutomation: (ruleId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/automations/${ruleId}`, {
            method: "DELETE"
        })
};
}),
"[project]/src/lib/api/dashboard.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dashboardApi",
    ()=>dashboardApi
]);
// Personal dashboard + calendar projections (Module 4.4 / 5.1).
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-ssr] (ecmascript)");
;
const dashboardApi = {
    /** `range` controls the trend chart's buckets: 30 daily, or 6/12 monthly. */ workspaceOverview: (workspaceId, range = "30d")=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/overview?range=${range}`),
    projectOverview: (projectId, range = "30d")=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/overview?range=${range}`),
    dashboard: (workspaceId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(workspaceId ? `/me/dashboard?workspace_id=${workspaceId}` : `/me/dashboard`),
    myCalendar: (from, to)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/me/calendar?from=${from}&to=${to}`).then((r)=>r.tasks)
};
}),
"[project]/src/lib/api/dashboards.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dashboardsApi",
    ()=>dashboardsApi
]);
// Custom dashboard & widget endpoints (Module 5.1).
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-ssr] (ecmascript)");
;
const dashboardsApi = {
    listDashboards: (workspaceId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/dashboards`).then((r)=>r.dashboards),
    createDashboard: (workspaceId, name, shared = false)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/workspaces/${workspaceId}/dashboards`, {
            method: "POST",
            body: JSON.stringify({
                name,
                shared
            })
        }),
    deleteDashboard: (dashboardId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/dashboards/${dashboardId}`, {
            method: "DELETE"
        }),
    addWidget: (dashboardId, data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/dashboards/${dashboardId}/widgets`, {
            method: "POST",
            body: JSON.stringify(data)
        }),
    deleteWidget: (dashboardId, widgetId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/dashboards/${dashboardId}/widgets/${widgetId}`, {
            method: "DELETE"
        })
};
}),
"[project]/src/lib/api/timesheet.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "timesheetApi",
    ()=>timesheetApi
]);
// Timesheet + worklog-approval endpoints (Module 3.3).
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-ssr] (ecmascript)");
;
const timesheetApi = {
    myTimesheet: (from, to)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/me/timesheet?from=${from}&to=${to}`),
    projectTimesheet: (projectId, from, to)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/projects/${projectId}/timesheet?from=${from}&to=${to}`),
    submitTimesheet: (from, to)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/me/timesheet/submit`, {
            method: "POST",
            body: JSON.stringify({
                from,
                to
            })
        }),
    setWorklogState: (worklogId, state)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/worklogs/${worklogId}`, {
            method: "PATCH",
            body: JSON.stringify({
                state
            })
        })
};
}),
"[project]/src/lib/api/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>api
]);
// Public entry point for the Flowie API layer.
//
// The API is split into per-domain modules (auth, projects, tasks, …) under
// `src/lib/api/`. This barrel composes them into a single `api` object and
// re-exports the shared types, so callers keep importing from "@/lib/api":
//
//   import { api, Task } from "@/lib/api";
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$admin$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/admin.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$workspaces$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/workspaces.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$projects$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/projects.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$tasks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/tasks.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$dependencies$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/dependencies.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$customFields$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/customFields.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/labels.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$workflow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/workflow.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$sprints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/sprints.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$worklogs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/worklogs.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$members$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/members.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$iam$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/iam.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$chat$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/chat.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$integrations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/integrations.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$ops$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/ops.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$notifications$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/notifications.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$automations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/automations.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$dashboard$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/dashboard.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$dashboards$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/dashboards.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$timesheet$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/timesheet.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const api = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authApi"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$admin$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["adminApi"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$workspaces$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["workspacesApi"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$projects$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["projectsApi"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$tasks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tasksApi"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$dependencies$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dependenciesApi"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$customFields$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["customFieldsApi"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["labelsApi"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$workflow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["workflowApi"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$sprints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sprintsApi"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$worklogs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["worklogsApi"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$members$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["membersApi"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$iam$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["iamApi"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$chat$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["chatApi"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$integrations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["integrationsApi"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$ops$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["opsApi"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$notifications$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["notificationsApi"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$automations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["automationsApi"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$dashboard$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dashboardApi"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$dashboards$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dashboardsApi"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$timesheet$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["timesheetApi"]
};
;
;
}),
"[project]/src/app/login/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoginPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/api/index.ts [app-ssr] (ecmascript) <locals>");
"use client";
;
;
;
;
function LoginPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Nếu đã đăng nhập thì chuyển thẳng vào dashboard.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["api"].me().then(()=>router.replace("/")).catch(()=>{});
    }, [
        router
    ]);
    async function submit(event) {
        event.preventDefault();
        setError("");
        setLoading(true);
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["api"].login(email, password);
            if ("mfaRequired" in result) {
                router.push("/login/2fa");
            } else {
                router.replace("/");
            }
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : "Đăng nhập thất bại");
        } finally{
            setLoading(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex w-full bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-24 relative",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-sm mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-10 text-center lg:text-left",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-[32px] font-bold text-gray-900 mb-2 tracking-tight",
                                    children: "Đăng nhập"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/login/page.tsx",
                                    lineNumber: 44,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 text-[15px]",
                                    children: "Nền tảng quản lý dự án doanh nghiệp Flowie"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/login/page.tsx",
                                    lineNumber: 45,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/login/page.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: submit,
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    required: true,
                                    type: "email",
                                    value: email,
                                    onChange: (event)=>setEmail(event.target.value),
                                    placeholder: "Email",
                                    className: "w-full rounded-xl border border-gray-200 px-4 py-3.5 outline-none focus:border-blue-500"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/login/page.tsx",
                                    lineNumber: 49,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    required: true,
                                    minLength: 8,
                                    type: "password",
                                    value: password,
                                    onChange: (event)=>setPassword(event.target.value),
                                    placeholder: "Mật khẩu",
                                    className: "w-full rounded-xl border border-gray-200 px-4 py-3.5 outline-none focus:border-blue-500"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/login/page.tsx",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-red-600",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/src/app/login/page.tsx",
                                    lineNumber: 51,
                                    columnNumber: 23
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    disabled: loading,
                                    type: "submit",
                                    className: "w-full rounded-xl bg-blue-600 px-4 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60",
                                    children: loading ? "Đang đăng nhập..." : "Đăng nhập"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/login/page.tsx",
                                    lineNumber: 52,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/login/page.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-center text-gray-400 text-[13px] mt-8",
                            children: "Đăng nhập bằng tài khoản Flowie của bạn."
                        }, void 0, false, {
                            fileName: "[project]/src/app/login/page.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/login/page.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/login/page.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden lg:flex w-1/2 relative bg-gray-100 overflow-hidden items-center justify-center p-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-cover bg-center",
                        style: {
                            backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/login/page.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                    }, void 0, false, {
                        fileName: "[project]/src/app/login/page.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 w-full max-w-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-white text-3xl font-bold mb-8",
                                children: "Tính năng nổi bật"
                            }, void 0, false, {
                                fileName: "[project]/src/app/login/page.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/70 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-center mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[13px] font-bold text-gray-700",
                                                        children: "Tổng công việc"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/login/page.tsx",
                                                        lineNumber: 79,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-400",
                                                        children: "•••"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/login/page.tsx",
                                                        lineNumber: 80,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/login/page.tsx",
                                                lineNumber: 78,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[32px] font-black text-gray-900",
                                                children: "425"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/login/page.tsx",
                                                lineNumber: 82,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[12px] font-bold text-green-600 mt-1 flex items-center gap-1",
                                                children: "↗ +2.45%"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/login/page.tsx",
                                                lineNumber: 83,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/login/page.tsx",
                                        lineNumber: 77,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/70 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-center mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[13px] font-bold text-gray-700",
                                                        children: "Hoàn thành"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/login/page.tsx",
                                                        lineNumber: 90,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-400",
                                                        children: "•••"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/login/page.tsx",
                                                        lineNumber: 91,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/login/page.tsx",
                                                lineNumber: 89,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[32px] font-black text-gray-900",
                                                children: "87"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/login/page.tsx",
                                                lineNumber: 93,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[12px] font-bold text-green-600 mt-1 flex items-center gap-1",
                                                children: "↗ +21%"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/login/page.tsx",
                                                lineNumber: 94,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/login/page.tsx",
                                        lineNumber: 88,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/70 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl col-span-2 flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-center mb-2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[13px] font-bold text-gray-700",
                                                            children: "Tiến độ dự án"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/login/page.tsx",
                                                            lineNumber: 102,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/login/page.tsx",
                                                        lineNumber: 101,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[32px] font-black text-gray-900",
                                                        children: [
                                                            "72,550 ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm font-medium text-gray-500",
                                                                children: "giờ"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/login/page.tsx",
                                                                lineNumber: 104,
                                                                columnNumber: 78
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/login/page.tsx",
                                                        lineNumber: 104,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/login/page.tsx",
                                                lineNumber: 100,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-16 h-16 rounded-full border-4 border-blue-600 border-r-gray-200 flex items-center justify-center text-sm font-bold text-blue-600",
                                                children: "64%"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/login/page.tsx",
                                                lineNumber: 106,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/login/page.tsx",
                                        lineNumber: 99,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/login/page.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/login/page.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/login/page.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/login/page.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_20luh3f._.js.map