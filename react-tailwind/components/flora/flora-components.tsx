"use client"

import { FloraLogo } from "./flora-logo"

interface FloraGlassCardProps {
  children: React.ReactNode
  className?: string
}

export function FloraGlassCard({ children, className = "" }: FloraGlassCardProps) {
  return (
    <div
      className={`
        bg-[rgba(20,20,20,0.5)]
        backdrop-blur-[24px]
        border border-[rgba(60,60,60,0.15)]
        rounded-[20px]
        shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset,0_1px_0_0_rgba(255,255,255,0.05)_inset,0_8px_32px_rgba(0,0,0,0.4),0_16px_48px_rgba(0,0,0,0.3)]
        ${className}
      `}
      style={{
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
      }}
    >
      {children}
    </div>
  )
}

interface FloraButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
  disabled?: boolean
  icon?: React.ReactNode
}

export function FloraButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled,
  icon,
}: FloraButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-medium tracking-[-0.01em]
    transition-all duration-200
    active:scale-[0.98]
    disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
  `

  const variants = {
    primary: `
      bg-white text-[#1a1a1a]
      hover:bg-[#f0f0f0]
      shadow-[0_2px_8px_rgba(0,0,0,0.08)]
    `,
    secondary: `
      bg-[rgba(40,40,40,0.8)] text-white
      border border-[rgba(80,80,80,0.3)]
      hover:bg-[rgba(50,50,50,0.9)]
      hover:border-[rgba(90,90,90,0.4)]
    `,
    ghost: `
      bg-transparent text-white
      hover:bg-[rgba(255,255,255,0.05)]
    `,
  }

  const sizes = {
    sm: "px-3 py-1.5 text-[13px] rounded-lg",
    md: "px-4 py-2.5 text-[14px] rounded-xl",
    lg: "px-6 py-3 text-[15px] rounded-xl",
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {icon && <span className="w-4 h-4 flex-shrink-0">{icon}</span>}
      {children}
    </button>
  )
}

interface FloraInputFieldProps {
  label?: string
  placeholder?: string
  type?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  className?: string
}

export function FloraInputField({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  className = "",
}: FloraInputFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-[13px] font-medium text-[rgba(200,200,200,0.9)] tracking-[-0.005em]">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full px-4 py-3
          bg-[rgba(8,8,8,0.6)]
          border ${error ? "border-red-500/50" : "border-[rgba(70,70,70,0.4)]"}
          rounded-xl
          text-white text-[15px] tracking-[-0.01em]
          placeholder:text-[rgba(140,140,140,0.8)]
          transition-all duration-200
          hover:border-[rgba(90,90,90,0.5)]
          focus:border-[rgba(120,120,120,0.6)]
          focus:outline-none
          focus:ring-[3px] focus:ring-[rgba(128,128,128,0.1)]
        `}
      />
      {error && (
        <p className="text-[12px] text-red-400 tracking-[-0.005em]">{error}</p>
      )}
    </div>
  )
}

interface FloraNavbarProps {
  className?: string
}

export function FloraNavbar({ className = "" }: FloraNavbarProps) {
  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        px-4 py-3
        bg-[rgba(10,10,10,0.8)]
        backdrop-blur-[16px]
        border-b border-[rgba(60,60,60,0.15)]
        ${className}
      `}
      style={{
        backdropFilter: "blur(16px) saturate(150%)",
        WebkitBackdropFilter: "blur(16px) saturate(150%)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <FloraLogo className="w-7 h-7 text-white" />
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-[14px] text-white font-medium tracking-[-0.01em] hover:opacity-80 transition-opacity">
              Projects
            </a>
            <a href="#" className="text-[14px] text-[rgba(160,160,160,0.9)] tracking-[-0.01em] hover:text-white transition-colors">
              Gallery
            </a>
            <a href="#" className="text-[14px] text-[rgba(160,160,160,0.9)] tracking-[-0.01em] hover:text-white transition-colors">
              Learn
            </a>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FloraButton variant="ghost" size="sm">
            Upgrade
          </FloraButton>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-[13px] font-medium">
            U
          </div>
        </div>
      </div>
    </nav>
  )
}

interface FloraProjectCardProps {
  title: string
  image: string
  date?: string
  className?: string
}

export function FloraProjectCard({ title, image, date, className = "" }: FloraProjectCardProps) {
  return (
    <div
      className={`
        group cursor-pointer
        rounded-[16px]
        overflow-hidden
        bg-[rgba(25,25,25,0.6)]
        border border-[rgba(60,60,60,0.15)]
        transition-all duration-300
        hover:border-[rgba(80,80,80,0.25)]
        hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
        ${className}
      `}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-[15px] font-medium text-white tracking-[-0.01em] truncate">
          {title}
        </h3>
        {date && (
          <p className="text-[13px] text-[rgba(140,140,140,0.8)] mt-1 tracking-[-0.005em]">
            {date}
          </p>
        )}
      </div>
    </div>
  )
}

interface FloraBadgeProps {
  children: React.ReactNode
  variant?: "default" | "success" | "warning" | "info"
  className?: string
}

export function FloraBadge({ children, variant = "default", className = "" }: FloraBadgeProps) {
  const variants = {
    default: "bg-[rgba(60,60,60,0.6)] text-[rgba(200,200,200,0.9)]",
    success: "bg-[rgba(34,197,94,0.15)] text-[#4ade80]",
    warning: "bg-[rgba(234,179,8,0.15)] text-[#fbbf24]",
    info: "bg-[rgba(59,130,246,0.15)] text-[#60a5fa]",
  }

  return (
    <span
      className={`
        inline-flex items-center
        px-2 py-0.5
        rounded-md
        text-[12px] font-medium tracking-[-0.005em]
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}
