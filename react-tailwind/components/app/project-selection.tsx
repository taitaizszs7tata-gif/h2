"use client"

import { useMemo, useState } from "react"
import { Bell, ChevronDown, CircleHelp, FolderOpen, Grid3X3, KeyRound, Lock, Plus, Search, Settings, Sparkles, Trash2, Users } from "lucide-react"
import { mockProjects } from "@/lib/mock-data"
import type { Project } from "@/lib/types"

export function ProjectSelection({ onSelectProject }: { onSelectProject: (project: Project) => void }) {
  const [searchQuery, setSearchQuery] = useState("")
  const projects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return mockProjects
    return mockProjects.filter((project) =>
      [project.name, project.projectCode, project.type, project.location, project.status, project.userRole]
        .join(" ")
        .toLowerCase()
        .includes(query)
    )
  }, [searchQuery])

  return (
    <div className="min-h-screen bg-white text-[#111111] flex">
      <aside className="w-[260px] border-r border-[#e5e5e5] bg-[#fafafa] flex flex-col">
        <div className="p-4 border-b border-[#e5e5e5]">
          <button className="flex w-full items-center gap-3 rounded-[14px] border border-[#d3d3d3] bg-[#ededed] px-3 py-2.5 text-[#111111] shadow-[0_1px_2px_rgba(0,0,0,0.08)] transition-colors hover:bg-[#e7e7e7]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#ff4b2f] text-[15px] font-bold text-black">
              S
            </div>
            <div className="min-w-0 flex-1 text-left leading-tight">
              <div className="truncate text-[14px] font-semibold tracking-[-0.01em]">SHUZHANG&apos;s workspace</div>
              <div className="mt-0.5 text-[12px] text-[#111111]">1 Member</div>
            </div>
            <ChevronDown className="h-4 w-4 shrink-0 text-[#111111]" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <NavItem icon={<Sparkles className="w-4 h-4" />} label="H² AI" badge="NEW" />
          <NavItem icon={<KeyRound className="w-4 h-4" />} label="输入邀请码" />
          <NavItem icon={<Users className="w-4 h-4" />} label="团队成员" />
          <NavItem icon={<FolderOpen className="w-4 h-4" />} label="Shared with me" />

          <SectionLabel>Favorites</SectionLabel>
          <div className="px-3 py-2 text-[13px] text-[#111111]">No favorites yet</div>

          <NavItem icon={<FolderOpen className="w-4 h-4" />} label="Recent Projects" indent />
          <NavItem icon={<FolderOpen className="w-4 h-4" />} label="上海图书馆东馆" indent />

          <SectionLabel>Workspace</SectionLabel>
          <NavItem icon={<Grid3X3 className="w-4 h-4" />} label="我的受邀项目" active />

          <SectionLabel>Private</SectionLabel>
          <NavItem icon={<Lock className="w-4 h-4" />} label="All Private" />
        </nav>

        <div className="p-4 border-t border-[#e5e5e5]">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[13px] text-[#111111]">NAS 已联通</span>
            <span className="text-[13px] text-[#111111] ml-auto">3 项目</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-[#111111] hover:text-black transition-colors"><Settings className="w-5 h-5" /></button>
            <button className="text-[#111111] hover:text-black transition-colors"><Trash2 className="w-5 h-5" /></button>
            <button className="text-[#111111] hover:text-black transition-colors"><CircleHelp className="w-5 h-5" /></button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-[#e5e5e5] bg-white flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-[18px] font-semibold text-[#111111] tracking-[-0.02em]">我的受邀项目</h1>
            <span className="text-[14px] text-[#111111]">({projects.length} slots)</span>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#111111]" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-11 pr-4 bg-[#eeeeee] border border-[#d5d5d5] rounded-[999px] text-[14px] text-[#111111] placeholder:text-[#666666] focus:outline-none focus:border-[#bdbdbd] transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-[#f0f0f0] transition-colors">
              <Bell className="w-5 h-5 text-[#111111]" />
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] text-white font-semibold flex items-center justify-center">2</span>
            </button>
            <button className="flex items-center gap-2 px-4 h-10 rounded-xl bg-white text-[#111111] text-[14px] font-medium shadow-[0_1px_6px_rgba(0,0,0,0.04)] hover:bg-[#f7f7f7] transition-colors">
              <KeyRound className="w-4 h-4" />
              输入邀请码
            </button>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-auto bg-white">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[13px] text-[#111111] uppercase tracking-[0.02em]">已接受邀请的建筑项目</span>
          </div>

          <div className="grid grid-cols-4 gap-5">
            <NewProjectCard />
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onClick={() => project.inviteStatus === "accepted" && onSelectProject(project)} />
            ))}
          </div>
        </div>

        <footer className="h-12 border-t border-[#e5e5e5] bg-white flex items-center justify-between px-6">
          <span className="text-[12px] text-[#111111] tracking-[0.02em]">H² ARCHITECTURE AI · PROJECT ACCESS BY INVITATION</span>
          <span className="text-[12px] text-[#111111]">SYSTEM VERSION: V1.0 DESIGN OPS</span>
        </footer>
      </main>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="pt-4 px-3 py-2 text-[11px] font-medium text-[#111111] uppercase tracking-[0.05em]">{children}</div>
}

function NavItem({ icon, label, badge, active, indent }: { icon: React.ReactNode; label: string; badge?: string; active?: boolean; indent?: boolean }) {
  return (
    <button
      className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-[14px] font-medium tracking-[-0.01em] transition-colors ${active ? "bg-[#ededed] text-[#111111]" : "text-[#111111] hover:bg-[#f0f0f0]"} ${indent ? "pl-6" : ""}`}
    >
      <span className="text-[#111111]">{icon}</span>
      <span className="flex-1 text-left truncate">{label}</span>
      {badge && <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500 text-black">{badge}</span>}
    </button>
  )
}

function NewProjectCard() {
  return (
    <div className="group cursor-pointer">
      <div className="flex aspect-[4/3] flex-col items-center justify-center rounded-xl border border-dashed border-[#e5e5e5] bg-white transition-colors group-hover:border-[#cfcfcf] group-hover:bg-[#fafafa]">
        <Plus className="h-8 w-8 text-[#111111]" strokeWidth={2.5} />
        <div className="mt-3 text-[14px] font-medium text-[#111111]">新建</div>
      </div>
      <div className="mt-3">
        <div className="text-[14px] font-medium text-[#111111]">新建</div>
        <div className="text-[12px] text-[#111111]">Create a new project</div>
      </div>
    </div>
  )
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#eeeeee] border border-[#dddddd]">
        {project.coverImage ? (
          <img src={project.coverImage} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <KeyRound className="w-8 h-8 text-[#111111]" />
          </div>
        )}
      </div>
      <div className="mt-3">
        <div className="text-[14px] font-medium text-[#111111] truncate">{project.name}</div>
        <div className="text-[12px] text-[#111111]">{project.location} · {project.type}</div>
        <div className="text-[12px] text-[#111111]">{project.status} · {project.updatedAt}</div>
      </div>
    </div>
  )
}
