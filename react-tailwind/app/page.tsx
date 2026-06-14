"use client"

import { useEffect, useState } from "react"
import type { AppView, Project } from "@/lib/types"
import { FloraSignIn } from "@/components/flora/flora-sign-in"
import { ProjectSelection } from "@/components/app/project-selection"
import { MainWorkspace } from "@/components/app/main-workspace"

export default function App() {
  const [view, setView] = useState<AppView>("login")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    if (window.location.pathname === "/projects") {
      setView("project-selection")
    }
  }, [])

  const handleLogin = () => {
    window.history.pushState(null, "", "/projects")
    setView("project-selection")
  }

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project)
    setView("workspace")
  }

  const handleLogout = () => {
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
