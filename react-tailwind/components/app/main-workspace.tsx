"use client"

import { useState } from "react"
import { Bell, Bot, FileText, Grid3X3, Settings } from "lucide-react"
import { FloraCanvas } from "@/components/flora/flora-canvas"
import { mockAssets } from "@/lib/mock-data"
import type { CanvasSubview, Project, WorkspaceTab } from "@/lib/types"
import { AIChat } from "./ai-chat"
import { CanvasCategories, CanvasLobby } from "./canvas-lobby"

export function MainWorkspace({ project, onLogout }: { project: Project; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("canvas")
  const [canvasSubview, setCanvasSubview] = useState<CanvasSubview>("categories")
  const [activeCategoryId, setActiveCategoryId] = useState("plan")
  const [activeCanvasId, setActiveCanvasId] = useState("c1")

  const tabs = [
    { id: "ai-chat" as const, label: "AI 智能助手", icon: <Bot className="w-4 h-4" /> },
    { id: "asset-library" as const, label: "素材库", icon: <FileText className="w-4 h-4" /> },
    { id: "canvas" as const, label: "AI 协同画布", icon: <Grid3X3 className="w-4 h-4" /> },
    { id: "project-management" as const, label: "项目管理", icon: <Settings className="w-4 h-4" /> },
  ]

  const openCanvas = (canvasId: string) => {
    setActiveCanvasId(canvasId)
    setActiveTab("canvas")
    setCanvasSubview("detail")
  }

  return (
    <div className="h-screen bg-white text-[#111111] flex flex-col overflow-hidden">
      <header className="h-14 border-b border-[#e5e5e5] flex items-center justify-between px-4 bg-white backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#111111]" />
            <div className="w-2 h-2 rounded-full bg-[#111111]" />
          </div>
          <span className="text-[16px] font-bold text-[#111111] tracking-[-0.02em]">H² Architecture AI</span>
        </div>

        <nav className="flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium tracking-[-0.01em] transition-all duration-200 ${activeTab === tab.id ? "bg-[#ededed] text-[#111111] border border-[#dddddd]" : "text-[#555555] hover:text-[#111111] hover:bg-[#f3f3f3]"}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="text-[13px] text-[#555555]">项目</span>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f5f5f5] border border-[#dddddd] hover:bg-[#ededed] transition-colors">
            <span className="text-[13px] text-[#111111] font-medium truncate max-w-[140px]">{project.name}</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10">
            <div className="w-4 h-4 rounded bg-emerald-500/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <span className="text-[13px] text-emerald-600 font-medium">NAS 已联通</span>
          </div>

          <button className="relative p-2 rounded-lg hover:bg-[#f3f3f3] transition-colors">
            <Bell className="w-5 h-5 text-[#111111]" />
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] text-white font-semibold flex items-center justify-center">2</span>
          </button>

          <button onClick={onLogout} className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-[#f3f3f3] transition-colors">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#ff4b2f] text-[12px] font-bold text-black">S</div>
            <div className="text-left">
              <div className="text-[13px] text-[#111111] font-medium leading-none">SHUZHANG&apos;s workspace</div>
              <div className="text-[11px] text-[#555555] mt-1">1 Member</div>
            </div>
          </button>
        </div>
      </header>

      <main className="h-[calc(100vh-56px)] min-h-0 overflow-hidden bg-white">
        {activeTab === "ai-chat" && <AIChat />}
        {activeTab === "asset-library" && <AssetLibrary onAddToCanvas={() => openCanvas(activeCanvasId)} />}
        {activeTab === "canvas" && (
          canvasSubview === "categories" ? (
            <CanvasCategories
              project={project}
              onSelectCategory={(categoryId) => {
                setActiveCategoryId(categoryId)
                setCanvasSubview("lobby")
              }}
            />
          ) : canvasSubview === "lobby" ? (
            <CanvasLobby
              project={project}
              categoryId={activeCategoryId}
              onBackToCategories={() => setCanvasSubview("categories")}
              onEnterDetail={(canvasId) => {
                setActiveCanvasId(canvasId)
                setCanvasSubview("detail")
              }}
            />
          ) : (
            <CanvasDetail onBack={() => setCanvasSubview("lobby")} />
          )
        )}
        {activeTab === "project-management" && <ProjectManagement onOpenCanvas={() => openCanvas("c1")} />}
      </main>
    </div>
  )
}

function CanvasDetail({ onBack }: { onBack: () => void }) {
  return <FloraCanvas onBack={onBack} />
}

function AssetLibrary({ onAddToCanvas }: { onAddToCanvas: () => void }) {
  return (
    <div className="h-full p-6 overflow-auto bg-white text-[#111111]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[18px] font-semibold text-[#111111] tracking-[-0.02em]">素材库</h1>
          <p className="text-[14px] text-[#555555] mt-1">项目素材、永久素材和 AI 生成资产</p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {mockAssets.map((asset) => (
          <div className="group cursor-pointer" key={asset.id}>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#eeeeee] border border-[#dddddd]">
              <img src={asset.imageUrl} alt={asset.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="mt-3">
              <div className="text-[14px] font-medium text-[#111111] truncate">{asset.title}</div>
              <div className="text-[12px] text-[#555555]">{asset.source} · {asset.createdAt}</div>
              <button onClick={onAddToCanvas} className="mt-2 px-3 py-1.5 rounded-lg border border-[#dddddd] text-[12px] text-[#111111] hover:bg-[#f3f3f3] transition-colors">加入当前画布</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectManagement({ onOpenCanvas }: { onOpenCanvas: () => void }) {
  void onOpenCanvas
  return <div className="h-full bg-white" />
}
