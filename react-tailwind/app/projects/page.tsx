"use client"

import { useEffect, useState } from "react"
import { MainWorkspace } from "@/components/app/main-workspace"
import { ProjectSelection } from "@/components/app/project-selection"
import { getCurrentUser, logout } from "@/lib/auth-client"
import type { Project } from "@/lib/types"

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function checkAuth() {
      const currentUser = await getCurrentUser()
      if (!isMounted) return

      if (!currentUser.ok) {
        window.location.replace("/")
        return
      }

      setIsCheckingAuth(false)
    }

    checkAuth()

    return () => {
      isMounted = false
    }
  }, [])

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-[14px] text-[#555555]">
        正在检查登录状态...
      </div>
    )
  }

  if (selectedProject) {
    return (
      <MainWorkspace
        project={selectedProject}
        onLogout={async () => {
          await logout()
          window.location.href = "/"
        }}
      />
    )
  }

  return <ProjectSelection onSelectProject={setSelectedProject} />
}
