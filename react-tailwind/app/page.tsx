"use client"

import { useEffect, useState } from "react"
import type { AppView, Project } from "@/lib/types"
import { FloraSignIn } from "@/components/flora/flora-sign-in"
import { ProjectSelection } from "@/components/app/project-selection"
import { MainWorkspace } from "@/components/app/main-workspace"
import { getCurrentUser, logout } from "@/lib/auth-client"

export default function App() {
  const [view, setView] = useState<AppView>("login")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function restoreSession() {
      const currentUser = await getCurrentUser()
      if (!isMounted) return

      if (currentUser.ok) {
        window.location.replace("/projects")
        return
      } else {
        window.history.replaceState(null, "", "/")
        setView("login")
      }

      setIsCheckingAuth(false)
    }

    restoreSession()

    return () => {
      isMounted = false
    }
  }, [])

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

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-[14px] text-[#555555]">
        正在检查登录状态...
      </div>
    )
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
