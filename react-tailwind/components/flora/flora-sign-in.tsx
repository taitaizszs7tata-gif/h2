"use client"

import { useEffect, useState } from "react"
import { KeyRound } from "lucide-react"
import { FloraLogo } from "./flora-logo"

const MAX_FAILED_ATTEMPTS = 5
const LOCK_DURATION_MS = 10 * 60 * 1000
const FAILED_ATTEMPTS_KEY = "h2-login-failed-attempts"
const LOCKED_UNTIL_KEY = "h2-login-locked-until"
const BOUND_CONTACT_KEY = "h2-login-bound-contact"

function formatRemainingTime(ms: number) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}分${seconds.toString().padStart(2, "0")}秒`
}

function readNumberFromStorage(key: string) {
  if (typeof window === "undefined") return 0
  const value = window.localStorage.getItem(key)
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

export function FloraSignIn({ onSignIn }: { onSignIn?: () => void }) {
  const [account, setAccount] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [failedAttempts, setFailedAttempts] = useState(0)
  const [lockedUntil, setLockedUntil] = useState(0)
  const [now, setNow] = useState(Date.now())

  const lockRemaining = Math.max(0, lockedUntil - now)

  useEffect(() => {
    setFailedAttempts(readNumberFromStorage(FAILED_ATTEMPTS_KEY))
    setLockedUntil(readNumberFromStorage(LOCKED_UNTIL_KEY))
  }, [])

  useEffect(() => {
    if (!lockRemaining) return

    const timer = window.setInterval(() => {
      const currentTime = Date.now()
      setNow(currentTime)

      if (currentTime >= lockedUntil) {
        window.localStorage.removeItem(LOCKED_UNTIL_KEY)
        window.localStorage.removeItem(FAILED_ATTEMPTS_KEY)
        setLockedUntil(0)
        setFailedAttempts(0)
        setMessage("")
      }
    }, 1000)

    return () => window.clearInterval(timer)
  }, [lockRemaining, lockedUntil])

  const handleSuccessfulLogin = () => {
    window.localStorage.removeItem(FAILED_ATTEMPTS_KEY)
    window.localStorage.removeItem(LOCKED_UNTIL_KEY)
    setFailedAttempts(0)
    setLockedUntil(0)

    const hasBoundContact = window.localStorage.getItem(BOUND_CONTACT_KEY) === "true"
    if (!hasBoundContact) {
      window.alert("首次登录，请绑定手机号或邮箱")
      window.localStorage.setItem(BOUND_CONTACT_KEY, "true")
    }

    onSignIn?.()
  }

  const handleFailedLogin = () => {
    const nextFailedAttempts = failedAttempts + 1

    if (nextFailedAttempts >= MAX_FAILED_ATTEMPTS) {
      const nextLockedUntil = Date.now() + LOCK_DURATION_MS
      window.localStorage.setItem(LOCKED_UNTIL_KEY, String(nextLockedUntil))
      window.localStorage.setItem(FAILED_ATTEMPTS_KEY, "0")
      setLockedUntil(nextLockedUntil)
      setFailedAttempts(0)
      setMessage(`账号或密码错误，已锁定10分钟，剩余${formatRemainingTime(LOCK_DURATION_MS)}`)
      return
    }

    window.localStorage.setItem(FAILED_ATTEMPTS_KEY, String(nextFailedAttempts))
    setFailedAttempts(nextFailedAttempts)
    setMessage("账号或密码错误")
  }

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (lockRemaining > 0) {
      setMessage(`已锁定，请${formatRemainingTime(lockRemaining)}后重试`)
      return
    }

    const normalizedAccount = account.trim().toLowerCase()

    if (normalizedAccount === "network") {
      setMessage("网络异常，请重试")
      return
    }

    if (normalizedAccount === "server") {
      setMessage("服务暂时不可用")
      return
    }

    if (!account.trim() || !password.trim() || normalizedAccount === "wrong" || password === "wrong") {
      handleFailedLogin()
      return
    }

    handleSuccessfulLogin()
  }

  const handleForgotPassword = () => {
    const hasBoundContact = window.localStorage.getItem(BOUND_CONTACT_KEY) === "true"
    setMessage(hasBoundContact ? "请通过已绑定手机号或邮箱验证后重置密码" : "请联系管理员重置密码")
  }

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-[920px] flex flex-col md:flex-row rounded-[20px] overflow-hidden border border-[#e5e5e5] bg-white shadow-[0_16px_48px_rgba(0,0,0,0.12)]">
        <div
          className="w-full md:w-[400px] flex-shrink-0 bg-[#fafafa] backdrop-blur-[24px] p-8 md:p-10 flex flex-col border-r border-[#e5e5e5]"
          style={{ backdropFilter: "blur(24px) saturate(180%)", WebkitBackdropFilter: "blur(24px) saturate(180%)" }}
        >
          <div className="mb-8">
            <FloraLogo className="w-8 h-8 text-[#111111]" />
          </div>

          <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-[#111111] mb-8">
            Sign in to H² Architecture AI
          </h1>

          <p className="mb-6 text-[14px] text-[#444444] tracking-[-0.005em]">
            系统暂不支持用户自主注册。账号和初始密码由管理员创建并分配。
          </p>

          <form className="space-y-3" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="请输入账号"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#d8d8d8] rounded-xl text-[#111111] text-[15px] tracking-[-0.01em] placeholder:text-[#777777] transition-all duration-200 hover:border-[#c8c8c8] focus:border-[#999999] focus:outline-none focus:ring-[3px] focus:ring-[#111111]/10"
            />
            <input
              type="password"
              placeholder="请输入密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#d8d8d8] rounded-xl text-[#111111] text-[15px] tracking-[-0.01em] placeholder:text-[#777777] transition-all duration-200 hover:border-[#c8c8c8] focus:border-[#999999] focus:outline-none focus:ring-[3px] focus:ring-[#111111]/10"
            />
            {message && (
              <p className="text-[13px] text-[#111111] tracking-[-0.005em]">
                {message}
              </p>
            )}
            <button
              type="submit"
              disabled={lockRemaining > 0}
              className={`w-full px-4 py-3 rounded-xl font-medium text-[15px] tracking-[-0.01em] transition-all duration-200 ${lockRemaining > 0 ? "bg-[#eeeeee] text-[#777777] cursor-not-allowed" : "bg-[#111111] text-white hover:bg-[#333333] active:scale-[0.98]"}`}
            >
              登录
            </button>
          </form>

          <p className="mt-6 text-[14px] text-[#444444] tracking-[-0.005em]">
            忘记密码？{" "}
            <button onClick={handleForgotPassword} className="text-[#111111] font-medium hover:opacity-70 transition-opacity inline-flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5" />
              重置密码
            </button>
          </p>

          <div className="flex-1" />

          <div className="mt-8 flex items-center gap-3 text-[13px]">
            <a href="#" className="text-[#555555] hover:text-[#111111] transition-colors underline">Terms</a>
            <a href="#" className="text-[#555555] hover:text-[#111111] transition-colors underline">Privacy</a>
          </div>
        </div>

        <div
          className="hidden md:block flex-1 bg-cover bg-center bg-no-repeat min-h-[500px]"
          style={{ backgroundImage: `url("https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80")` }}
        />
      </div>
    </div>
  )
}
