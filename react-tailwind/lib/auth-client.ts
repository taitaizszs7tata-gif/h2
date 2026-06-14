"use client"

export type UserRole = "admin" | "member"
export type UserStatus = "active" | "inactive" | "disabled"

export type ApiErrorCode =
  | "AUTH_REQUIRED"
  | "AUTH_INVALID_CREDENTIALS"
  | "AUTH_DISABLED"
  | "NETWORK_ERROR"
  | "SERVER_ERROR"
  | "REQUEST_TIMEOUT"

export type ApiSuccess<T> = {
  ok: true
  data: T
}

export type ApiError = {
  ok: false
  error: {
    code: ApiErrorCode
    message: string
    detail?: string
  }
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError

export type LoginRequest = {
  username: string
  password: string
}

export type AuthUser = {
  id: string
  username: string
  name: string
  role: UserRole
  status: UserStatus
}

export type LoginResponse = {
  user: AuthUser
  tokenExpiresAt: string
}

export type CurrentUserResponse = {
  user: AuthUser
}

type AuthSession = LoginResponse & {
  hasAccessibleProjects: boolean
}

const AUTH_SESSION_KEY = "h2-auth-session"
const AUTH_SESSION_DAYS = 7
const REQUEST_TIMEOUT_MS = 10_000

const USE_MOCK_AUTH = process.env.NEXT_PUBLIC_AUTH_MODE !== "api"
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ""

const mockUsers: Array<AuthUser & { password: string; hasAccessibleProjects: boolean }> = [
  {
    id: "mock_user_001",
    username: "zhanglxy",
    password: "h2archzlxy",
    name: "Zhang Lixia",
    role: "admin",
    status: "active",
    hasAccessibleProjects: true,
  },
  {
    id: "mock_user_002",
    username: "chenxy",
    password: "h2archcxy",
    name: "Chen Xinyi",
    role: "member",
    status: "inactive",
    hasAccessibleProjects: true,
  },
  {
    id: "mock_user_003",
    username: "noproject",
    password: "h2archnp",
    name: "No Project User",
    role: "member",
    status: "active",
    hasAccessibleProjects: false,
  },
  {
    id: "mock_user_004",
    username: "disabled",
    password: "h2archd",
    name: "Disabled User",
    role: "member",
    status: "disabled",
    hasAccessibleProjects: false,
  },
]

function buildUrl(path: string) {
  return `${API_BASE_URL}${path}`
}

function getExpiresAt() {
  return new Date(Date.now() + AUTH_SESSION_DAYS * 24 * 60 * 60 * 1000).toISOString()
}

function saveSession(session: AuthSession) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session))
}

export function clearAuthSession() {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(AUTH_SESSION_KEY)
}

export function getStoredAuthSession(): AuthSession | null {
  if (typeof window === "undefined") return null

  const raw = window.localStorage.getItem(AUTH_SESSION_KEY)
  if (!raw) return null

  try {
    const session = JSON.parse(raw) as AuthSession
    if (!session.tokenExpiresAt || Date.parse(session.tokenExpiresAt) <= Date.now()) {
      clearAuthSession()
      return null
    }
    return session
  } catch {
    clearAuthSession()
    return null
  }
}

export function hasAccessibleProjects() {
  return getStoredAuthSession()?.hasAccessibleProjects ?? true
}

async function fetchJson<T>(path: string, init: RequestInit): Promise<ApiResponse<T>> {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(buildUrl(path), {
      ...init,
      credentials: "include",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(init.headers ?? {}),
      },
    })

    return (await response.json()) as ApiResponse<T>
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return {
        ok: false,
        error: { code: "REQUEST_TIMEOUT", message: "请求超时，请稍后重试" },
      }
    }

    return {
      ok: false,
      error: { code: "NETWORK_ERROR", message: "网络异常，请重试" },
    }
  } finally {
    window.clearTimeout(timeout)
  }
}

async function mockLogin({ username, password }: LoginRequest): Promise<ApiResponse<LoginResponse>> {
  await new Promise((resolve) => window.setTimeout(resolve, 300))

  const normalizedUsername = username.trim().toLowerCase()

  if (normalizedUsername === "network") {
    return { ok: false, error: { code: "NETWORK_ERROR", message: "网络异常，请重试" } }
  }

  if (normalizedUsername === "server") {
    return { ok: false, error: { code: "SERVER_ERROR", message: "服务暂时不可用" } }
  }

  if (normalizedUsername === "timeout") {
    return { ok: false, error: { code: "REQUEST_TIMEOUT", message: "请求超时，请稍后重试" } }
  }

  const user = mockUsers.find((item) => item.username === normalizedUsername && item.password === password)

  if (!user) {
    return { ok: false, error: { code: "AUTH_INVALID_CREDENTIALS", message: "账号或密码错误" } }
  }

  if (user.status === "disabled") {
    return { ok: false, error: { code: "AUTH_DISABLED", message: "账号不可用，请联系管理员" } }
  }

  const { password: _password, hasAccessibleProjects, ...safeUser } = user
  const data: LoginResponse = {
    user: safeUser,
    tokenExpiresAt: getExpiresAt(),
  }

  saveSession({ ...data, hasAccessibleProjects })
  return { ok: true, data }
}

export async function login(request: LoginRequest): Promise<ApiResponse<LoginResponse>> {
  if (USE_MOCK_AUTH) {
    return mockLogin(request)
  }

  const result = await fetchJson<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(request),
  })

  if (result.ok) {
    saveSession({ ...result.data, hasAccessibleProjects: true })
  }

  return result
}

export async function logout() {
  clearAuthSession()

  if (USE_MOCK_AUTH) {
    return { ok: true, data: { success: true } } as const
  }

  return fetchJson<{ success: true }>("/api/auth/logout", { method: "POST" })
}

export async function getCurrentUser(): Promise<ApiResponse<CurrentUserResponse>> {
  if (USE_MOCK_AUTH) {
    const session = getStoredAuthSession()
    if (!session) {
      return { ok: false, error: { code: "AUTH_REQUIRED", message: "请先登录" } }
    }

    return { ok: true, data: { user: session.user } }
  }

  return fetchJson<CurrentUserResponse>("/api/auth/me", { method: "GET" })
}

export function getAuthErrorMessage(code: ApiErrorCode) {
  switch (code) {
    case "AUTH_INVALID_CREDENTIALS":
      return "账号或密码错误"
    case "AUTH_DISABLED":
      return "账号不可用，请联系管理员"
    case "NETWORK_ERROR":
      return "网络异常，请重试"
    case "SERVER_ERROR":
      return "服务暂时不可用"
    case "REQUEST_TIMEOUT":
      return "请求超时，请稍后重试"
    case "AUTH_REQUIRED":
      return "请先登录"
    default:
      return "服务暂时不可用"
  }
}
