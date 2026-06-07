"use client"

export function FloraLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Flora-inspired abstract logo - four connected shapes */}
      <path
        d="M6 6h8v8H6V6Z"
        fill="currentColor"
      />
      <path
        d="M18 6h8v8h-8V6Z"
        fill="currentColor"
      />
      <path
        d="M6 18h8v8H6v-8Z"
        fill="currentColor"
      />
      <path
        d="M18 18h8v8h-8v-8Z"
        fill="currentColor"
      />
    </svg>
  )
}
