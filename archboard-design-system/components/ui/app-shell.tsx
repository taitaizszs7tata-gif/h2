import * as React from "react"

import { DSButton } from "./button"
import { cn } from "./utils"

export function DSAppShell({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("h-screen overflow-hidden bg-white text-[var(--ds-ink)]", className)} {...props} />
}

export function DSTopNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn("flex h-[var(--ds-topbar-height)] items-center justify-between border-b border-[var(--ds-border)] bg-white px-4", className)}
      {...props}
    />
  )
}

export function DSMainArea({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <main
      className={cn("h-[calc(100vh-var(--ds-topbar-height))] min-h-0 overflow-hidden bg-white", className)}
      {...props}
    />
  )
}

export function DSNavTab({
  active,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
}) {
  return <DSButton variant="nav" size="sm" active={active} className={cn("px-4", className)} {...props} />
}

export function DSWorkspaceIdentity({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center gap-2 rounded-[var(--ds-radius-control)] px-2 py-1 transition-colors hover:bg-[var(--ds-control-soft)]", className)}
      {...props}
    />
  )
}
