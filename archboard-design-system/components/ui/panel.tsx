import * as React from "react"

import { cn } from "./utils"

export function DSPanel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <aside
      className={cn("border-[var(--ds-border)] bg-white text-[var(--ds-ink)]", className)}
      {...props}
    />
  )
}

export function DSSidebar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <DSPanel
      className={cn("flex w-[var(--ds-sidebar-width)] flex-col border-r bg-[var(--ds-surface-subtle)]", className)}
      {...props}
    />
  )
}

export function DSCollaboratorPanel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <DSPanel
      className={cn("flex w-[var(--ds-collab-panel-width)] flex-col border-l bg-white", className)}
      {...props}
    />
  )
}

export function DSSectionLabel({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-4 flex items-center gap-2", className)} {...props}>
      <span className="h-2 w-2 rounded-full bg-[var(--ds-success)]" />
      <span className="text-[13px] uppercase tracking-[0.02em] text-[var(--ds-ink)]">{children}</span>
    </div>
  )
}
