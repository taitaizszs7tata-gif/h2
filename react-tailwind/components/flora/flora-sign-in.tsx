"use client"

import { useState } from "react"
import { KeyRound } from "lucide-react"

import { getAuthErrorMessage, login } from "@/lib/auth-client"
import { FloraLogo } from "./flora-logo"

export function FloraSignIn({ onSignIn }: { onSignIn?: () => void }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedUsername = username.trim().toLowerCase()
    const normalizedPassword = password.trim()

    if (!normalizedUsername || !normalizedPassword) {
      setMessage("请输入账号和密码")
      return
    }

    setIsSubmitting(true)
    setMessage("")

    const result = await login({ username: normalizedUsername, password: normalizedPassword })

    setIsSubmitting(false)

    if (!result.ok) {
      setMessage(getAuthErrorMessage(result.error.code))
      return
    }

    onSignIn?.()
  }

  const handleForgotPassword = () => {
    setMessage("请联系管理员重置密码")
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white p-4 md:p-8">
      <div className="flex w-full max-w-[920px] flex-col overflow-hidden rounded-[20px] border border-[#e5e5e5] bg-white shadow-[0_16px_48px_rgba(0,0,0,0.12)] md:flex-row">
        <div
          className="flex w-full flex-shrink-0 flex-col border-r border-[#e5e5e5] bg-[#fafafa] p-8 backdrop-blur-[24px] md:w-[400px] md:p-10"
          style={{ backdropFilter: "blur(24px) saturate(180%)", WebkitBackdropFilter: "blur(24px) saturate(180%)" }}
        >
          <div className="mb-8">
            <FloraLogo className="h-8 w-8 text-[#111111]" />
          </div>

          <h1 className="mb-8 text-[28px] font-semibold tracking-[-0.03em] text-[#111111]">
            Sign in to H2 Architecture AI
          </h1>

          <p className="mb-6 text-[14px] tracking-[-0.005em] text-[#444444]">
            系统暂不支持用户自主注册。账号和初始密码由管理员创建并分配。
          </p>

          <form className="space-y-3" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="请输入账号"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              className="w-full rounded-xl border border-[#d8d8d8] bg-white px-4 py-3 text-[15px] tracking-[-0.01em] text-[#111111] transition-all duration-200 placeholder:text-[#777777] hover:border-[#c8c8c8] focus:border-[#999999] focus:outline-none focus:ring-[3px] focus:ring-[#111111]/10"
            />
            <input
              type="password"
              placeholder="请输入密码"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              className="w-full rounded-xl border border-[#d8d8d8] bg-white px-4 py-3 text-[15px] tracking-[-0.01em] text-[#111111] transition-all duration-200 placeholder:text-[#777777] hover:border-[#c8c8c8] focus:border-[#999999] focus:outline-none focus:ring-[3px] focus:ring-[#111111]/10"
            />
            {message && <p className="text-[13px] tracking-[-0.005em] text-[#111111]">{message}</p>}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded-xl px-4 py-3 text-[15px] font-medium tracking-[-0.01em] transition-all duration-200 ${
                isSubmitting
                  ? "cursor-wait bg-[#eeeeee] text-[#777777]"
                  : "bg-[#111111] text-white hover:bg-[#333333] active:scale-[0.98]"
              }`}
            >
              {isSubmitting ? "登录中..." : "登录"}
            </button>
          </form>

          <p className="mt-6 text-[14px] tracking-[-0.005em] text-[#444444]">
            忘记密码？{" "}
            <button
              type="button"
              onClick={handleForgotPassword}
              className="inline-flex items-center gap-1 font-medium text-[#111111] transition-opacity hover:opacity-70"
            >
              <KeyRound className="h-3.5 w-3.5" />
              联系管理员重置
            </button>
          </p>

          <div className="flex-1" />

          <div className="mt-8 flex items-center gap-3 text-[13px]">
            <a href="#" className="text-[#555555] underline transition-colors hover:text-[#111111]">
              Terms
            </a>
            <a href="#" className="text-[#555555] underline transition-colors hover:text-[#111111]">
              Privacy
            </a>
          </div>
        </div>

        <div
          className="hidden min-h-[500px] flex-1 bg-cover bg-center bg-no-repeat md:block"
          style={{ backgroundImage: `url("https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80")` }}
        />
      </div>
    </div>
  )
}
