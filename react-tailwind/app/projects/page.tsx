"use client"

import { useState } from "react"
import { MainWorkspace } from "@/components/app/main-workspace"
import { ProjectSelection } from "@/components/app/project-selection"
import { logout } from "@/lib/auth-client"
import type { Project } from "@/lib/types"

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

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
