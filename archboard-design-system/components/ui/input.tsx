import * as React from "react"

import { cn } from "./utils"

export interface DSTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function DSTextField({ label, error, className, id, ...props }: DSTextFieldProps) {
  const inputId = id ?? props.name

  return (
    <label className="block">
      {label ? <span className="mb-1.5 block text-[13px] font-medium text-[var(--ds-ink)]">{label}</span> : null}
      <input
        id={inputId}
        className={cn(
          "h-11 w-full rounded-[var(--ds-radius-card)] border border-[var(--ds-border-control)] bg-white px-4 text-[15px] tracking-[-0.01em] text-[var(--ds-ink)] placeholder:text-[var(--ds-ink-subtle)] transition-colors hover:border-[#c8c8c8] focus:border-[#999999] focus:outline-none focus:ring-[3px] focus:ring-black/10",
          className
        )}
        {...props}
      />
      {error ? <span className="mt-1.5 block text-[13px] text-[var(--ds-danger)]">{error}</span> : null}
    </label>
  )
}

export function DSSearchField({
  icon,
  className,
  inputClassName,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode
  inputClassName?: string
}) {
  return (
    <div className={cn("relative", className)}>
      {icon ? <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ds-ink)]">{icon}</span> : null}
      <input
        type="search"
        className={cn(
          "h-11 w-full rounded-[var(--ds-radius-pill)] border border-[var(--ds-border-control)] bg-[var(--ds-control)] pr-4 text-[14px] text-[var(--ds-ink)] placeholder:text-[#666666] transition-colors focus:border-[#bdbdbd] focus:outline-none",
          icon ? "pl-11" : "pl-4",
          inputClassName
        )}
        {...props}
      />
    </div>
  )
}
