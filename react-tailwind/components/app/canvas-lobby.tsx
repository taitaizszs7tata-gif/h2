"use client"

import { useMemo, useState } from "react"
import { ArrowLeft, Grid3X3, Plus } from "lucide-react"
import { mockCanvasBoards, mockCanvasCategories } from "@/lib/mock-data"
import type { CanvasBoard, CanvasCategory, Project } from "@/lib/types"

export function CanvasCategories({ project, onSelectCategory }: { project: Project; onSelectCategory: (categoryId: string) => void }) {
  const categories = mockCanvasCategories.filter((category) => category.projectId === project.id)

  return (
    <div className="h-full p-6 overflow-auto bg-white text-[#111111]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[18px] font-semibold text-[#111111] tracking-[-0.02em]">AI 协同画布</h1>
          <p className="text-[14px] text-[#555555] mt-1">{project.name} / 选择设计分类</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-5">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} onClick={() => onSelectCategory(category.id)} />
        ))}
      </div>
    </div>
  )
}

export function CanvasLobby({
  project,
  categoryId,
  onBackToCategories,
  onEnterDetail,
}: {
  project: Project
  categoryId: string
  onBackToCategories: () => void
  onEnterDetail: (boardId: string) => void
}) {
  const [boards, setBoards] = useState<CanvasBoard[]>(mockCanvasBoards)
  const category = mockCanvasCategories.find((item) => item.id === categoryId)
  const visibleBoards = useMemo(
    () => boards.filter((board) => board.projectId === project.id && board.categoryId === categoryId),
    [boards, project.id, categoryId]
  )
  const publicBoards = visibleBoards.filter((board) => board.scope === "public")
  const personalBoards = visibleBoards.filter((board) => board.scope === "personal")

  const createPersonalBoard = () => {
    const board: CanvasBoard = {
      id: `c-${Date.now()}`,
      projectId: project.id,
      categoryId,
      name: `${category?.name ?? "设计"}个人草稿`,
      scope: "personal",
      coverImage: "",
      createdBy: "Jane Doe",
      updatedAt: "刚刚",
      generationCount: 0,
    }
    setBoards((prev) => [board, ...prev])
    onEnterDetail(board.id)
  }

  const sendToPublic = (board: CanvasBoard) => {
    setBoards((prev) => [
      { ...board, id: `public-${Date.now()}`, name: `${board.name} 复用版`, scope: "public", updatedAt: "刚刚" },
      ...prev,
    ])
  }

  return (
    <div className="h-full p-6 overflow-auto bg-white text-[#111111]">
      <button onClick={onBackToCategories} className="flex items-center gap-2 text-[13px] text-[#555555] hover:text-[#111111] transition-colors mb-5">
        <ArrowLeft className="w-4 h-4" />
        返回设计分类
      </button>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[18px] font-semibold text-[#111111] tracking-[-0.02em]">画布大厅</h1>
          <p className="text-[14px] text-[#555555] mt-1">{project.name} / {category?.name}</p>
        </div>
        <button onClick={createPersonalBoard} className="flex items-center gap-2 px-4 h-10 rounded-xl bg-[#111111] text-white text-[14px] font-medium hover:bg-[#333333] transition-colors">
          <Plus className="w-4 h-4" />
          新建个人画布
        </button>
      </div>

      <BoardSection title="公共画布" boards={publicBoards} onEnterDetail={onEnterDetail} />
      <BoardSection title="个人画布" boards={personalBoards} onEnterDetail={onEnterDetail} onSendToPublic={sendToPublic} />
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-2 h-2 rounded-full bg-emerald-500" />
      <span className="text-[13px] text-[#111111] uppercase tracking-[0.02em]">{children}</span>
    </div>
  )
}

function CategoryCard({ category, onClick }: { category: CanvasCategory; onClick: () => void }) {
  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#eeeeee] border border-[#dddddd]">
        <div className="w-full h-full flex items-center justify-center">
          <Grid3X3 className="w-8 h-8 text-[#111111]" />
        </div>
      </div>
      <div className="mt-3">
        <div className="text-[14px] font-medium text-[#111111] truncate">{category.name}</div>
        <div className="text-[12px] text-[#555555] truncate">{category.description}</div>
        <div className="text-[12px] text-[#555555]">公共 {category.publicCanvasCount} · 个人 {category.personalCanvasCount} · {category.updatedAt}</div>
      </div>
    </div>
  )
}

function BoardSection({
  title,
  boards,
  onEnterDetail,
  onSendToPublic,
}: {
  title: string
  boards: CanvasBoard[]
  onEnterDetail: (boardId: string) => void
  onSendToPublic?: (board: CanvasBoard) => void
}) {
  return (
    <section className="mb-10">
      <SectionTitle>{title}</SectionTitle>
      <div className="grid grid-cols-4 gap-5">
        {boards.map((board) => (
          <BoardCard key={board.id} board={board} onClick={() => onEnterDetail(board.id)} onSendToPublic={onSendToPublic ? () => onSendToPublic(board) : undefined} />
        ))}
      </div>
    </section>
  )
}

function BoardCard({ board, onClick, onSendToPublic }: { board: CanvasBoard; onClick: () => void; onSendToPublic?: () => void }) {
  return (
    <div className="group cursor-pointer">
      <div onClick={onClick} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#eeeeee] border border-[#dddddd]">
        {board.coverImage ? (
          <img src={board.coverImage} alt={board.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Plus className="w-8 h-8 text-[#111111]" />
          </div>
        )}
      </div>
      <div className="mt-3">
        <div className="text-[14px] font-medium text-[#111111] truncate">{board.name}</div>
        <div className="text-[12px] text-[#555555]">{board.updatedAt} by {board.createdBy}</div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-[12px] text-[#555555]">{board.generationCount} 条生成记录</div>
          {onSendToPublic && (
            <button onClick={onSendToPublic} className="px-3 py-1.5 rounded-lg border border-[#dddddd] text-[12px] text-[#111111] hover:bg-[#f3f3f3] transition-colors">
              发送公共
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
