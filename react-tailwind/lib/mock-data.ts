"use client"

import type {
  Asset,
  CanvasBoard,
  CanvasCategory,
  ChatMessage,
  ChatSession,
  GenerationRecord,
  Project,
  ProjectTask,
  User,
} from "./types"

export const currentUser: User = {
  id: "u1",
  name: "Jane Doe",
  role: "主创建筑师",
  company: "H² Architecture / 赫區建築設計",
  online: true,
  permission: "member",
}

export const mockProjects: Project[] = [
  {
    id: "p1",
    name: "上海图书馆东馆",
    projectCode: "H2A-2026-001",
    type: "公共文化建筑",
    location: "上海",
    status: "方案深化中",
    userRole: "主创建筑师",
    updatedAt: "今天",
    nasConnected: true,
    inviteStatus: "accepted",
    coverImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80",
  },
  {
    id: "p2",
    name: "中关村领展项目",
    projectCode: "H2A-2026-002",
    type: "商业办公综合体",
    location: "北京",
    status: "概念设计中",
    userRole: "助理建筑师",
    updatedAt: "昨天",
    nasConnected: true,
    inviteStatus: "accepted",
    coverImage: "",
  },
  {
    id: "p3",
    name: "滨水商业区",
    projectCode: "H2A-2026-003",
    type: "滨水商业更新",
    location: "上海",
    status: "概念方案",
    userRole: "渲染团队",
    updatedAt: "3天前",
    nasConnected: true,
    inviteStatus: "accepted",
    coverImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=80",
  },
  {
    id: "p4",
    name: "新星文化中心",
    projectCode: "H2A-2026-004",
    type: "文化建筑",
    location: "深圳",
    status: "邀请待确认",
    userRole: "助理建筑师",
    updatedAt: "待确认",
    nasConnected: false,
    inviteStatus: "pending",
    coverImage: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=900&q=80",
  },
]

export const mockCanvasCategories: CanvasCategory[] = [
  {
    id: "plan",
    projectId: "p1",
    name: "平面",
    description: "功能布局、动线组织、平面方案比选",
    publicCanvasCount: 3,
    personalCanvasCount: 4,
    owner: "Jane Doe",
    updatedAt: "今天 11:20",
  },
  {
    id: "facade",
    projectId: "p1",
    name: "立面",
    description: "幕墙、遮阳、材料和立面构成推演",
    publicCanvasCount: 2,
    personalCanvasCount: 5,
    owner: "Design Team",
    updatedAt: "今天 10:05",
  },
  {
    id: "rendering",
    projectId: "p1",
    name: "效果图方案",
    description: "室外视角、室内空间和氛围图生成",
    publicCanvasCount: 4,
    personalCanvasCount: 6,
    owner: "Render Team",
    updatedAt: "昨天 18:30",
  },
  {
    id: "analysis",
    projectId: "p1",
    name: "分析图",
    description: "日照、流线、场地、体量和设计说明图",
    publicCanvasCount: 1,
    personalCanvasCount: 2,
    owner: "Han Lin",
    updatedAt: "3天前",
  },
]

export const mockCanvasBoards: CanvasBoard[] = [
  {
    id: "c1",
    projectId: "p1",
    categoryId: "plan",
    name: "一层公共空间平面推演",
    scope: "public",
    coverImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80",
    createdBy: "Jane Doe",
    updatedAt: "今天 11:30",
    generationCount: 18,
  },
  {
    id: "c2",
    projectId: "p1",
    categoryId: "plan",
    name: "阅览区个人草稿",
    scope: "personal",
    coverImage: "https://images.unsplash.com/photo-1614850715649-1d0106293bd1?w=900&q=80",
    createdBy: "Jane Doe",
    updatedAt: "今天 09:45",
    generationCount: 7,
  },
  {
    id: "c3",
    projectId: "p1",
    categoryId: "facade",
    name: "东立面遮阳系统方案",
    scope: "public",
    coverImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=80",
    createdBy: "Design Team",
    updatedAt: "昨天 22:10",
    generationCount: 12,
  },
  {
    id: "c4",
    projectId: "p1",
    categoryId: "rendering",
    name: "入口夜景个人稿",
    scope: "personal",
    coverImage: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=900&q=80",
    createdBy: "Jane Doe",
    updatedAt: "昨天 17:10",
    generationCount: 9,
  },
]

export const mockChatSessions: ChatSession[] = [
  { id: "s1", projectId: "p1", title: "上海图书馆东馆平面动线推演", updatedAt: "今天 10:05" },
  { id: "s2", projectId: "p1", title: "阅览区自然采光优化", updatedAt: "昨天 18:20" },
]

export const mockChatMessages: ChatMessage[] = [
  {
    id: "m1",
    sessionId: "s1",
    sender: "assistant",
    senderName: "H² Architecture AI",
    content: "已关联当前项目：上海图书馆东馆。你可以上传参考图、描述空间目标，或把生成结果加入个人画布。",
    timestamp: "10:01",
  },
  {
    id: "m2",
    sessionId: "s1",
    sender: "user",
    senderName: "Jane Doe",
    content: "比较一层公共阅览区的三种动线组织，优先保证入口可达性和安静阅读区分流。",
    timestamp: "10:04",
  },
]

export const mockAssets: Asset[] = [
  {
    id: "a1",
    title: "竖向遮阳板立面参考",
    projectId: "p1",
    scope: "project",
    category: "facade",
    tags: ["立面", "遮阳", "公共建筑"],
    imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=80",
    author: "Jane Doe",
    source: "AI Generated",
    createdAt: "2026-05-28",
    linkedGenerationId: "g1",
  },
  {
    id: "a2",
    title: "室内阅览空间参考",
    projectId: "p1",
    scope: "project",
    category: "interior",
    tags: ["室内", "阅览", "采光"],
    imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=80",
    author: "Design Team",
    source: "Project Reference",
    createdAt: "2026-05-20",
  },
]

export const mockTasks: ProjectTask[] = [
  {
    id: "t1",
    projectId: "p1",
    title: "一层公共空间平面比选",
    phase: "方案深化",
    status: "In Progress",
    owner: "Jane Doe",
    startDate: "2026-05-20",
    endDate: "2026-06-05",
    linkedCanvasId: "c1",
    linkedGenerationId: "g1",
  },
]

export const mockGenerationRecords: GenerationRecord[] = [
  {
    id: "g1",
    projectId: "p1",
    canvasId: "c1",
    mode: "text-to-image",
    prompt: "public library facade with vertical bronze louvers and warm interior lighting",
    model: "Gemini Imagen",
    parameters: { aspectRatio: "16:9", resolution: "2K", count: 1 },
    outputImageUrls: ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=80"],
    creator: "Jane Doe",
    createdAt: "2026-05-29 10:32",
  },
]
