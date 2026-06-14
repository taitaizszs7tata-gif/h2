"use client"

import { useState } from "react"
import type { AppView, Project } from "@/lib/types"
import { FloraSignIn } from "@/components/flora/flora-sign-in"
import { ProjectSelection } from "@/components/app/project-selection"
import { MainWorkspace } from "@/components/app/main-workspace"
import { logout } from "@/lib/auth-client"

export default function App() {
  const [view, setView] = useState<AppView>("login")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const handleLogin = () => {
    window.location.href = "/projects"
  }

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project)
    setView("workspace")
  }

  const handleLogout = async () => {
    await logout()
    window.history.pushState(null, "", "/")
    setSelectedProject(null)
    setView("login")
  }

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      {view === "login" && <FloraSignIn onSignIn={handleLogin} />}
      {view === "project-selection" && <ProjectSelection onSelectProject={handleSelectProject} />}
      {view === "workspace" && selectedProject && (
        <MainWorkspace project={selectedProject} onLogout={handleLogout} />
      )}
    </div>
  )
}
