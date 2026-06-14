"use client"

export type AppView = "login" | "project-selection" | "workspace"
export type ActiveTab = "ai-chat" | "asset-library" | "canvas" | "project-management"
export type WorkspaceTab = ActiveTab
export type CanvasSubview = "categories" | "lobby" | "detail"
export type UserPermission = "admin" | "project-owner" | "member"

export interface User {
  id: string
  name: string
  role: string
  company: string
  online: boolean
  permission: UserPermission
}

export interface Project {
  id: string
  name: string
  projectCode: string
  type: string
  location: string
  status: string
  userRole: string
  updatedAt: string
  nasConnected: boolean
  inviteStatus: "accepted" | "pending"
  coverImage: string
}

export interface CanvasCategory {
  id: string
  projectId: string
  name: string
  description: string
  publicCanvasCount: number
  personalCanvasCount: number
  owner: string
  updatedAt: string
}

export interface CanvasBoard {
  id: string
  projectId: string
  categoryId: string
  name: string
  scope: "public" | "personal"
  coverImage: string
  createdBy: string
  updatedAt: string
  generationCount: number
}

export interface ChatSession {
  id: string
  projectId: string
  title: string
  updatedAt: string
}

export interface ChatMessage {
  id: string
  sessionId: string
  sender: "user" | "assistant"
  senderName: string
  content: string
  timestamp: string
  attachmentIds?: string[]
}

export interface Asset {
  id: string
  title: string
  projectId?: string
  scope: "project" | "permanent"
  category: "facade" | "interior" | "planning" | "landscape" | "material"
  tags: string[]
  imageUrl: string
  author: string
  source: "AI Generated" | "Uploaded" | "Project Reference" | "NAS Asset"
  nasPath?: string
  createdAt: string
  linkedGenerationId?: string
}

export interface ProjectTask {
  id: string
  projectId: string
  title: string
  phase: "概念方案" | "方案深化" | "施工图配合"
  status: "Pending" | "In Progress" | "Done"
  owner: string
  startDate: string
  endDate: string
  linkedCanvasId?: string
  linkedGenerationId?: string
}

export interface GenerationRecord {
  id: string
  projectId: string
  canvasId?: string
  mode: "text-to-image" | "image-to-image" | "inpainting"
  prompt: string
  model: string
  parameters: {
    aspectRatio?: string
    resolution?: string
    count?: number
  }
  outputImageUrls: string[]
  creator: string
  createdAt: string
}
