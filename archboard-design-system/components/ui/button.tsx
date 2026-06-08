import * as React from "react"

import { cn } from "./utils"

type Variant = "primary" | "secondary" | "ghost" | "nav" | "pill" | "icon"
type Size = "sm" | "md" | "lg" | "icon"

const variantClass: Record<Variant, string> = {
  primary: "bg-[var(--ds-ink)] text-white hover:bg-[var(--ds-ink-hover)]",
  secondary:
    "border border-[var(--ds-border-strong)] bg-white text-[var(--ds-ink)] hover:bg-[var(--ds-control-hover)]",
  ghost: "bg-transparent text-[var(--ds-ink-muted)] hover:bg-[var(--ds-control-hover)] hover:text-[var(--ds-ink)]",
  nav: "text-[var(--ds-ink-muted)] hover:bg-[var(--ds-control-soft)] hover:text-[var(--ds-ink)] data-[active=true]:border data-[active=true]:border-[var(--ds-border-strong)] data-[active=true]:bg-[var(--ds-control-active)] data-[active=true]:text-[var(--ds-ink)]",
  pill: "rounded-[var(--ds-radius-pill)] border border-[var(--ds-border-strong)] bg-white text-[var(--ds-ink)] hover:bg-[var(--ds-control-hover)]",
  icon: "bg-transparent text-[var(--ds-ink)] hover:bg-[var(--ds-control-hover)]",
}

const sizeClass: Record<Size, string> = {
  sm: "h-8 px-3 text-[12px]",
  md: "h-10 px-4 text-[14px]",
  lg: "h-11 px-5 text-[15px]",
  icon: "h-9 w-9 p-0",
}

export interface DSButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  active?: boolean
}

export function DSButton({
  variant = "secondary",
  size = variant === "icon" ? "icon" : "md",
  active,
  className,
  type = "button",
  ...props
}: DSButtonProps) {
  return (
    <button
      type={type}
      data-active={active ? "true" : "false"}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 rounded-[var(--ds-radius-control)] font-medium tracking-[-0.01em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-ink)]/20 disabled:pointer-events-none disabled:opacity-50",
        variantClass[variant],
        sizeClass[size],
        className
      )}
      {...props}
    />
  )
}
