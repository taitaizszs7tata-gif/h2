import * as React from "react"

import { cn } from "./utils"

export function DSCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-[var(--ds-radius-card)] border border-[var(--ds-border)] bg-white", className)}
      {...props}
    />
  )
}

export function DSMediaCard({
  image,
  alt,
  children,
  className,
  imageClassName,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  image?: string
  alt?: string
  imageClassName?: string
}) {
  return (
    <div className={cn("group cursor-pointer", className)} {...props}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--ds-radius-card)] border border-[var(--ds-border-strong)] bg-[var(--ds-control)]">
        {image ? (
          <img
            src={image}
            alt={alt ?? ""}
            className={cn("h-full w-full object-cover transition-transform duration-300 group-hover:scale-105", imageClassName)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[var(--ds-ink)]" />
        )}
      </div>
      {children}
    </div>
  )
}

export function DSEmptyCard({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("group cursor-pointer", className)} {...props}>
      <div className="flex aspect-[4/3] flex-col items-center justify-center rounded-[var(--ds-radius-card)] border border-dashed border-[var(--ds-border)] bg-white transition-colors group-hover:border-[#cfcfcf] group-hover:bg-[var(--ds-surface-subtle)]">
        {children}
      </div>
    </div>
  )
}

export function DSCardMeta({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-3 space-y-0.5", className)} {...props} />
}

export function DSCardTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("truncate text-[14px] font-medium text-[var(--ds-ink)]", className)} {...props} />
}

export function DSCardDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("truncate text-[12px] text-[var(--ds-ink-muted)]", className)} {...props} />
}
