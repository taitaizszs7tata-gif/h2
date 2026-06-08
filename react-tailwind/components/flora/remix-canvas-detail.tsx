"use client"

import { ArrowLeft } from "lucide-react"

export function RemixCanvasDetail({ onBack }: { onBack: () => void }) {
  return (
    <div className="relative h-[calc(100vh-56px)] min-h-0 w-full overflow-hidden bg-white">
      <iframe
        src="http://127.0.0.1:3001/"
        title="ArchBoard AI canvas detail"
        className="block h-full min-h-0 w-full border-0 bg-white"
      />

      <button
        type="button"
        onClick={onBack}
        className="absolute left-5 top-5 z-50 flex items-center gap-1 rounded-md border border-black/10 bg-white px-3 py-2 text-[13px] font-medium text-neutral-800 shadow-sm transition-colors hover:bg-neutral-100"
      >
        <ArrowLeft className="h-4 w-4" />
        返回大厅
      </button>
    </div>
  )
}
