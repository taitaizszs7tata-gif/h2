"use client"

import React, { useState, useRef, useCallback, useEffect } from "react"
import {
  Plus,
  FileText,
  Users,
  Hash,
  Clock,
  Shuffle,
  Search,
  MessageCircle,
  HelpCircle,
  Sparkles,
  Lock,
  Bookmark,
  Send,
  Download,
  Maximize2,
  ChevronDown,
  X,
  Layers,
  Wand2,
  Type,
  ImageIcon,
  ArrowLeft,
  SlidersHorizontal,
  Info,
} from "lucide-react"

interface FloraCanvasProps {
  onBack?: () => void
  activeTab?: 'login' | 'select-project' | 'project-management' | 'canvas' | 'asset-library' | 'ai-chat'
  setActiveTab?: (tab: 'login' | 'select-project' | 'project-management' | 'canvas' | 'asset-library' | 'ai-chat') => void
}

interface ImageNode {
  id: string
  x: number
  y: number
  width: number
  height: number
  title: string
  subtitle?: string
  image: string
  description?: string
  promptLabel?: string
  imageLabel?: string
}

interface Connection {
  id: string
  fromNode: string
  toNode: string
}

const createPlaceholderImage = (label: string, from: string, to: string) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200" viewBox="0 0 800 1200">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${from}" />
          <stop offset="100%" stop-color="${to}" />
        </linearGradient>
      </defs>
      <rect width="800" height="1200" fill="url(#g)" />
      <rect x="28" y="28" width="744" height="1144" rx="32" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" />
      <circle cx="620" cy="190" r="110" fill="rgba(255,255,255,0.10)" />
      <path d="M120 920 C260 760, 420 760, 560 920 S760 1080, 700 1120" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="10" stroke-linecap="round" />
      <text x="80" y="140" fill="rgba(255,255,255,0.95)" font-size="42" font-family="Segoe UI, Arial, sans-serif" font-weight="700">${label}</text>
      <text x="80" y="200" fill="rgba(255,255,255,0.72)" font-size="24" font-family="Segoe UI, Arial, sans-serif">Architecture AI Canvas</text>
    </svg>
  `)}`

const initialNodes: ImageNode[] = [
  {
    id: "node-1",
    x: 80,
    y: 420,
    width: 180,
    height: 260,
    title: "Nano Banana 2",
    image: createPlaceholderImage("Nano Banana 2", "#111827", "#1f2937"),
    description: "A vast martian-red landscape of ancient crumbling stone formations and rust-colored cliffs under a hazy sky.",
    promptLabel: "Prompt",
    imageLabel: "Image 1/4",
  },
  {
    id: "node-2",
    x: 420,
    y: 380,
    width: 200,
    height: 300,
    title: "Image Processing Issue",
    subtitle: "Nano Banana 2.",
    image: createPlaceholderImage("Image Processing Issue", "#4338ca", "#0f766e"),
    description: "remove people from the image",
    promptLabel: "Prompt",
    imageLabel: "Image 1/4",
  },
  {
    id: "node-3",
    x: 880,
    y: 220,
    width: 240,
    height: 360,
    title: "Martian Warrior Bow",
    subtitle: "Krea 2 References La...",
    image: createPlaceholderImage("Martian Warrior Bow", "#b45309", "#7c2d12"),
    description: "A shirtless warrior with red-dyed hair and bandaged arms draws his bow against a vast martian-red landscape of ancient crumbling stone formations and rust-colored cliffs under a hazy sky.",
    promptLabel: "Prompt",
    imageLabel: "Image 2/16",
  },
  {
    id: "node-0",
    x: 50,
    y: 0,
    width: 200,
    height: 180,
    title: "Elegant Figure Portrait",
    image: createPlaceholderImage("Elegant Figure Portrait", "#164e63", "#7c3aed"),
    promptLabel: "Prompt",
    imageLabel: "Image",
  },
]

const initialConnections: Connection[] = [
  { id: "conn-1", fromNode: "node-0", toNode: "prompt" },
  { id: "conn-2", fromNode: "node-1", toNode: "node-2" },
  { id: "conn-3", fromNode: "prompt", toNode: "node-3" },
  { id: "conn-4", fromNode: "node-2", toNode: "node-3" },
]

const activityMembers = [
  {
    id: "1",
    name: "林翰 (Han Lin)",
    time: "1m",
    avatarUrl: createPlaceholderImage("Han", "#111827", "#334155"),
    hasDot: true,
    action: "Started following your canvas viewport",
    quote: "正在规划 Site Plan A 主体结构布局 / Aligning skeleton layout",
  },
  {
    id: "2",
    name: "Sarah Miller",
    time: "2h",
    avatarUrl: createPlaceholderImage("Sarah", "#0f766e", "#1d4ed8"),
    hasDot: true,
    action: "Liked your bronze facade scheme",
    quote: "已经在排大堂立面幕墙细节了 / Detailing lobby entrance models",
  },
  {
    id: "3",
    name: "Yuki Sato",
    time: "1d",
    avatarUrl: createPlaceholderImage("Yuki", "#7c2d12", "#b45309"),
    hasDot: true,
    action: "Saved your shared environmental maps",
    quote: "西晒反射阻尼评估已同步完成 / Reflection coefficients derived",
  },
  {
    id: "4",
    name: "Alex Carter",
    time: "3d",
    avatarUrl: createPlaceholderImage("Alex", "#1f2937", "#6b7280"),
    hasDot: false,
    action: "Left comments on solar shading analysis",
    quote: "整体幕墙受力承载指标非常合理 / Load bearing looks compliant",
  },
  {
    id: "5",
    name: "Zara Gomez",
    time: "5d",
    avatarUrl: createPlaceholderImage("Zara", "#312e81", "#7c3aed"),
    hasDot: true,
    action: "Shared a rooftop vegetation scheme you might like",
    quote: "绿化承重荷载建模完成，稍后推送 / Structural calculation complete",
  },
]

function CanvasActivitySidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  if (isCollapsed) {
    return (
      <div className="w-14 h-full border-l border-black/10 bg-white flex items-start justify-center pt-4 shrink-0">
        <button
          onClick={() => setIsCollapsed(false)}
          className="w-9 h-9 rounded-xl border border-black/10 bg-white hover:bg-neutral-100 text-neutral-700 flex items-center justify-center transition-all"
          title="展开在线协作者"
        >
          <Users className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <aside className="w-[300px] border-l border-black/10 bg-white flex flex-col h-full text-xs select-none shadow-sm shrink-0 text-neutral-900 z-20 text-left">
      <div className="flex items-center justify-between border-b border-black/10 bg-neutral-50 px-4 py-2 shrink-0">
        <div className="flex items-center gap-2 font-semibold text-[12px]">
          <Users className="w-4 h-4" />
          <span>在线协作者</span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
        </div>
        <button
          onClick={() => setIsCollapsed(true)}
          className="w-7 h-7 rounded-md hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-colors"
          title="收起协作栏"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="text-[10px] text-neutral-500 pb-2.5 font-mono uppercase tracking-wider border-b border-black/10 mb-3">
          协作活动快照 (Activity Timeline)
        </div>

        <div className="space-y-4">
          {activityMembers.map((member) => (
            <button
              key={member.id}
              className="group relative flex items-start w-full text-left pl-3 py-1 rounded-lg hover:bg-neutral-50 transition-colors"
              type="button"
            >
              {member.hasDot && (
                <span className="absolute left-0 top-[14px] w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse shrink-0" />
              )}
              <img
                src={member.avatarUrl}
                alt={member.name}
                referrerPolicy="no-referrer"
                className="w-[38px] h-[38px] rounded-full object-cover border border-black/10 mr-3 shrink-0"
              />
              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-baseline justify-between mb-0.5 gap-2">
                  <span className="font-bold text-neutral-950 text-xs tracking-tight group-hover:text-rose-500 transition-colors truncate">
                    {member.name}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono shrink-0">
                    {member.time}
                  </span>
                </div>
                <p className="text-neutral-700 text-[10.5px] leading-snug truncate mb-1">
                  {member.action}
                </p>
                <div className="text-[10px] text-neutral-600 leading-normal border-l border-black/20 pl-2 mt-1.5 italic py-0.5">
                  {member.quote}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 p-3 rounded-xl bg-neutral-50 border border-black/10 text-[9.5px] text-neutral-600 leading-normal flex items-start gap-1.5">
          <Info className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
          <span>
            点击主创行区块，可在协同区域一键触发视口对话线。
          </span>
        </div>
      </div>

      <div className="p-3 border-t border-black/10 bg-white text-[10px] leading-tight shrink-0 text-center text-neutral-500">
        <div className="flex items-center justify-center space-x-1.5 mb-1">
          <Info className="w-3.5 h-3.5 text-neutral-500" />
          <span className="font-bold text-neutral-800 uppercase tracking-wider text-[8px] font-mono">System Connections</span>
        </div>
        <p className="text-[8.5px] text-neutral-500">异步会话通道：数据与 NAS 同步连通</p>
      </div>
    </aside>
  )
}

// Image Node Component with hover effects
function ImageNodeCard({
  node,
  isSelected,
  onMouseDown,
  isGenerating,
  onAIClick,
  onPlusClick,
  onDeleteClick,
}: {
  node: ImageNode
  isSelected: boolean
  onMouseDown: (e: React.MouseEvent) => void
  isGenerating?: boolean
  onAIClick?: () => void
  onPlusClick?: () => void
  onDeleteClick?: () => void
  key?: React.Key
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`absolute cursor-move group ${isSelected ? "z-20" : "z-10"}`}
      style={{ left: node.x, top: node.y, width: node.width }}
      onMouseDown={onMouseDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Centered Floating Mini Top Toolbar on Hover */}
      {isHovered && (
        <div 
          className="absolute -top-[44px] left-1/2 -translate-x-1/2 z-50 flex items-center canvas-hover-top-toolbar rounded-full px-2.5 py-0.5 gap-2 backdrop-blur-md transition-all duration-150 animate-fade-in pointer-events-auto"
          onMouseDown={(e) => e.stopPropagation()} // Prevent card dragging when clicking toolbar
        >
          {/* AI / Tools Dropdown */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAIClick?.();
            }}
            className="flex items-center gap-1 px-1.5 py-1 rounded-full hover:bg-neutral-100 transition-all cursor-pointer font-bold text-[10.5px]"
            title="点击展开 AI 协助助手"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span className="font-bold text-[10.5px] select-none">Tools</span>
            <ChevronDown className="w-2.5 h-2.5 opacity-60" />
          </button>

          <div className="w-px h-3.5 bg-neutral-200" />

          {/* Replicated Tools Row from Image 2 */}
          {/* Image tool */}
          <button className="w-6 h-6 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-all text-neutral-600" title="图格图片类型">
            <ImageIcon className="w-3.5 h-3.5" />
          </button>

          {/* Color solid circle */}
          <button className="w-6 h-6 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-all text-neutral-600" title="色阶色调">
            <div className="w-3 h-3 rounded-full border border-neutral-400 bg-transparent" />
          </button>

          {/* Bookmark */}
          <button className="w-6 h-6 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-all text-neutral-600" title="收藏当前图格">
            <Bookmark className="w-3.5 h-3.5" />
          </button>

          {/* AI Send Deepen */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAIClick?.();
            }}
            className="w-6 h-6 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-all text-neutral-600 cursor-pointer"
            title="局部深化渲染"
          >
            <Send className="w-3.5 h-3.5" style={{ transform: "rotate(-45deg) translateX(0.5px)" }} />
          </button>

          {/* Download */}
          <button className="w-6 h-6 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-all text-neutral-600" title="下载图格图片">
            <Download className="w-3.5 h-3.5" />
          </button>

          {/* Maximize */}
          <button className="w-6 h-6 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-all text-neutral-600" title="自适应窗口/最大化">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          <div className="w-px h-3.5 bg-neutral-200" />

          {/* Delete Card */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick?.();
            }}
            className="w-6 h-6 rounded-full hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-all cursor-pointer text-neutral-400"
            title="删除图格"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Title above image */}
      <div className="flex items-center justify-between mb-1.5 px-0.5">
        <div className="flex items-center gap-1.5">
          <ImageIcon className="w-3 h-3 text-white/40" />
          <span className="text-[11px] text-white/60 truncate tracking-[-0.01em]">
            {node.title}
          </span>
        </div>
        {node.subtitle && (
          <span className="text-[10px] text-white/30 truncate tracking-[-0.01em]">
            {node.subtitle}
          </span>
        )}
      </div>

      {/* Image container */}
      <div className="relative">
        <div
          className={`relative rounded-xl overflow-hidden transition-all duration-200 ${
            isSelected ? "ring-2 ring-black/40" : ""
          }`}
          style={{
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
          }}
        >
          <img
            src={node.image}
            alt={node.title}
            className="w-full object-cover"
            style={{ height: node.height }}
            draggable={false}
          />

          {isGenerating && (
            <div className="absolute inset-0 bg-black/80 z-30 flex flex-col items-center justify-center p-3 text-center">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-spin mb-2" />
              <span className="text-[10.5px] text-white/90 font-semibold tracking-tight">AI 协作和图格渲染中...</span>
              <span className="text-[8px] text-white/45 mt-1.5 font-mono">BIM FACADE ENGINE</span>
            </div>
          )}

          {/* Bottom glass overlay on hover - forced to remain white text */}
          <div
            className={`
              absolute bottom-0 left-0 right-0 p-3 image-card-hover-overlay
              transition-all duration-200 ease-out
              ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
            `}
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0) 100%)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            {/* Action buttons */}
            <div className="flex items-center gap-1.5 mb-2">
              <button className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white">
                <Type className="w-3.5 h-3.5 text-white/70" />
              </button>
              <button className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white">
                <ImageIcon className="w-3.5 h-3.5 text-white/70" />
              </button>
            </div>

            {/* Description text */}
            {node.description && (
              <p className="text-[10px] text-white leading-[1.5] tracking-[-0.005em] line-clamp-3 mb-2 font-medium">
                {node.description}
              </p>
            )}

            {/* Generate button */}
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-2 text-[9px] text-[#A1A1AA]">
                <span>{"<>"}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAIClick?.();
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer node-send-white-btn"
              >
                <Send className="w-3.5 h-3.5" style={{ transform: "rotate(-45deg) translateX(1px)" }} />
              </button>
            </div>
          </div>

          {/* Favorite button on hover */}
          <button
            className={`
              absolute top-2 right-2 w-7 h-7 rounded-lg 
              bg-black/40 backdrop-blur-sm 
              flex items-center justify-center 
              transition-opacity duration-200
              ${isHovered ? "opacity-100" : "opacity-0"}
            `}
          >
            <Bookmark className="w-3.5 h-3.5 text-white/80" />
          </button>
        </div>

        {/* Right side port labels on hover */}
        <div
          className={`
            absolute top-1/3 -right-2 flex flex-col gap-2
            transition-all duration-200 ease-out
            ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"}
          `}
          style={{ transform: "translateX(100%)" }}
        >
          {node.promptLabel && (
            <div className="flex items-center gap-1.5">
              <div
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg"
                style={{
                  background: "rgba(40,40,38,0.95)",
                  border: "1px solid rgba(80,80,75,0.3)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Type className="w-2.5 h-2.5 text-white/50" />
                <span className="text-[10px] text-white/70 tracking-[-0.01em]">{node.promptLabel}</span>
              </div>
              <div className="w-3 h-3 rounded-full border-2 border-white/30 bg-[#1a1a18] hover:border-white/50 transition-colors cursor-pointer" />
            </div>
          )}
          {node.imageLabel && (
            <div className="flex items-center gap-1.5">
              <div
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg"
                style={{
                  background: "rgba(40,40,38,0.95)",
                  border: "1px solid rgba(80,80,75,0.3)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <ImageIcon className="w-2.5 h-2.5 text-white/50" />
                <span className="text-[10px] text-white/70 tracking-[-0.01em]">{node.imageLabel}</span>
              </div>
              <div className="w-3 h-3 rounded-full border-2 border-white/30 bg-[#1a1a18] hover:border-white/50 transition-colors cursor-pointer" />
            </div>
          )}
        </div>

        {/* Highlighted plus connection handle on right edge on hover */}
        {isHovered && (
          <div
            className="absolute top-1/2 -right-3 -translate-y-1/2 z-40 transition-all duration-150 animate-fade-in pointer-events-auto"
            onMouseDown={(e) => e.stopPropagation()} // Stop canvas pan/drag triggering
          >
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onPlusClick?.();
              }}
              className="w-5.5 h-5.5 rounded-full flex items-center justify-center transition-all scale-100 hover:scale-115 active:scale-90 cursor-pointer canvas-node-plus-btn"
              title="点击唤醒 AI 智能对话框"
            >
              <Plus className="w-3 h-3" strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export function FloraCanvas({ onBack, activeTab, setActiveTab }: FloraCanvasProps) {
  const [nodes, setNodes] = useState<ImageNode[]>(initialNodes)
  const [connections, setConnections] = useState<Connection[]>(initialConnections)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null)
  const [promptPos, setPromptPos] = useState({ x: 500, y: 130 })
  const [isPanning, setIsPanning] = useState(false)
  const [panOffset, setPanOffset] = useState({ x: 100, y: 50 })
  const [zoom, setZoom] = useState(0.8)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [showAssistant, setShowAssistant] = useState(true)
  const [layers, setLayers] = useState({
    cladding: true,
    lobby: true,
    structures: true,
    landscape: true,
    comments: true,
  })
  const canvasRef = useRef<HTMLDivElement>(null)

  // Floating prompt panel states underneath selected image node
  const [nodePromptMap, setNodePromptMap] = useState<{ [nodeId: string]: string }>({
    "node-1": "Write a one-line prompt to place the character here...",
    "node-2": "remove people from the image and make it futuristic",
    "node-3": "A shirtless warrior with red-dyed hair and bandaged arms draws his bow against a vast martian-red landscape",
    "node-0": "Elegant studio portrait of a futuristic character, detailed clothing, soft volumetric lighting.",
  })
  const [showNodeParams, setShowNodeParams] = useState(false)
  const [nodeAspectRatio, setNodeAspectRatio] = useState("2:3")
  const [nodePixelSize, setNodePixelSize] = useState("2K")
  const [isGenerating, setIsGenerating] = useState<{ [nodeId: string]: boolean }>({})

  const handleSendNodePrompt = (nodeId: string) => {
    const currentPromptText = nodePromptMap[nodeId] || "";
    if (!currentPromptText.trim()) return;

    setIsGenerating((prev) => ({ ...prev, [nodeId]: true }))

    setTimeout(() => {
      setIsGenerating((prev) => ({ ...prev, [nodeId]: false }))
      // Change current image to beautiful metal bronze architectural facade matching prompt intent
      setNodes((prev) =>
        prev.map((n) => {
          if (n.id === nodeId) {
            const facadeImages = [
              createPlaceholderImage("Facade A", "#0f766e", "#1f2937"),
              createPlaceholderImage("Facade B", "#7c2d12", "#111827"),
              createPlaceholderImage("Facade C", "#312e81", "#1f2937"),
              createPlaceholderImage("Facade D", "#b45309", "#111827"),
            ]
            const randImg = facadeImages[Math.floor(Math.random() * facadeImages.length)]
            return {
              ...n,
              image: randImg,
              subtitle: "AI Render Optimized",
              description: currentPromptText,
            }
          }
          return n
        })
      )
      setShowNodeParams(false)
    }, 1800)
  }

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, nodeId?: string) => {
      if (nodeId) {
        setDraggedNodeId(nodeId)
        setDragStart({ x: e.clientX, y: e.clientY })
      } else if (e.target === canvasRef.current || (e.target as HTMLElement).classList.contains("canvas-bg")) {
        setIsPanning(true)
        setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y })
        setSelectedNode(null)
      }
    },
    [panOffset]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isPanning) {
        setPanOffset({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        })
      } else if (draggedNodeId === "prompt") {
        const dx = (e.clientX - dragStart.x) / zoom
        const dy = (e.clientY - dragStart.y) / zoom
        setPromptPos((prev) => ({ x: prev.x + dx, y: prev.y + dy }))
        setDragStart({ x: e.clientX, y: e.clientY })
      } else if (draggedNodeId) {
        const dx = (e.clientX - dragStart.x) / zoom
        const dy = (e.clientY - dragStart.y) / zoom
        setNodes((prev) =>
          prev.map((node) =>
            node.id === draggedNodeId ? { ...node, x: node.x + dx, y: node.y + dy } : node
          )
        )
        setDragStart({ x: e.clientX, y: e.clientY })
      }
    },
    [isPanning, draggedNodeId, dragStart, zoom]
  )

  const handleMouseUp = useCallback(() => {
    setIsPanning(false)
    setDraggedNodeId(null)
  }, [])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.05 : 0.05
    setZoom((prev) => Math.min(Math.max(prev + delta, 0.3), 2))
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedNode(null)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Get bezier path between nodes
  const getConnectionPath = (conn: Connection) => {
    const fromNode = nodes.find((n) => n.id === conn.fromNode)
    
    // Handle prompt card connection
    if (conn.fromNode === "prompt") {
      const toNode = nodes.find((n) => n.id === conn.toNode)
      if (!toNode) return ""
      const startX = promptPos.x + 260
      const startY = promptPos.y + 110
      const endX = toNode.x
      const endY = toNode.y + toNode.height / 2
      const controlX1 = startX + 100
      const controlX2 = endX - 100
      return `M ${startX} ${startY} C ${controlX1} ${startY}, ${controlX2} ${endY}, ${endX} ${endY}`
    }

    if (conn.toNode === "prompt") {
      if (!fromNode) return ""
      const startX = fromNode.x + fromNode.width
      const startY = fromNode.y + fromNode.height / 2
      const endX = promptPos.x
      const endY = promptPos.y + 90
      const controlX1 = startX + 80
      const controlX2 = endX - 80
      return `M ${startX} ${startY} C ${controlX1} ${startY}, ${controlX2} ${endY}, ${endX} ${endY}`
    }

    const toNode = nodes.find((n) => n.id === conn.toNode)
    if (!fromNode || !toNode) return ""

    const startX = fromNode.x + fromNode.width
    const startY = fromNode.y + fromNode.height / 2
    const endX = toNode.x
    const endY = toNode.y + toNode.height / 2

    const controlX1 = startX + Math.abs(endX - startX) * 0.4
    const controlX2 = endX - Math.abs(endX - startX) * 0.4

    return `M ${startX} ${startY} C ${controlX1} ${startY}, ${controlX2} ${endY}, ${endX} ${endY}`
  }

  const filteredNodes = nodes.filter((node) => {
    if (node.id === "node-1" && !layers.cladding) return false
    if (node.id === "node-2" && !layers.lobby) return false
    if (node.id === "node-3" && !layers.landscape) return false
    if (node.id === "node-0" && !layers.structures) return false
    return true
  })

  const filteredConnections = connections.filter((conn) => {
    // If comments are hidden, hide connection lines as well
    if (!layers.comments) return false
    const fromNodeExists = conn.fromNode === "prompt" || filteredNodes.some((n) => n.id === conn.fromNode)
    const toNodeExists = conn.toNode === "prompt" || filteredNodes.some((n) => n.id === conn.toNode)
    return fromNodeExists && toNodeExists
  })

  const sidebarItems = [
    { icon: Plus },
    { icon: FileText },
    { icon: Users },
    { icon: Hash },
    { icon: Clock },
    { icon: Shuffle },
    { icon: Search },
    { icon: MessageCircle },
    { icon: HelpCircle },
  ]

  return (
    <div className="relative w-full h-full bg-[#1a1a18] overflow-hidden select-none flex">
      {/* ======================== PERSISTENT CANVAS VIEWPORT CONTAINER ======================== */}
      <div className="flex-1 h-full relative overflow-hidden bg-[#161614]">
        {/* Top Floating Details Area */}
        <div
          className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(22,22,20,0.95) 0%, rgba(22,22,20,0) 100%)",
          }}
        >
          <div className="flex items-center gap-3 pointer-events-auto">
            {onBack && (
              <button 
                onClick={onBack}
                className="mr-2 flex items-center gap-1 py-1 px-2.5 rounded bg-white/[0.04] hover:bg-white/[0.08] transition-colors text-[10.5px] text-white/80 cursor-pointer border border-white/[0.06]"
              >
                <ArrowLeft className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>返回大厅</span>
              </button>
            )}
            <div>
              <div className="text-[12px] font-medium text-white/90 tracking-[-0.02em]">
                Clone of Krea <span className="text-emerald-400">AI Experiments</span>
              </div>
              <div className="text-[9.5px] text-white/40 tracking-[-0.01em]">Active Canvas Workspace</div>
            </div>
          </div>
          <div className="flex items-center gap-2 pointer-events-auto">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] text-white/70 hover:text-white transition-colors cursor-pointer bg-white/5 hover:bg-white/10 rounded-lg">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span className="tracking-[-0.01em]">Build Technique</span>
            </button>
            <button className="px-3 py-1.5 text-[11px] font-medium text-[#1a1a18] bg-white rounded-lg hover:bg-white/90 transition-colors tracking-[-0.01em] cursor-pointer">
              Share Project
            </button>
          </div>
        </div>

        {/* Canvas Area with CAD dotted grid background */}
        <div
          ref={canvasRef}
          className="absolute inset-0 cursor-grab active:cursor-grabbing canvas-bg w-full h-full"
          onMouseDown={(e) => handleMouseDown(e)}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          <div
            className="absolute origin-top-left"
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
            }}
          >
            {/* Connection Lines using filteredConnections */}
            <svg className="absolute inset-0 w-[3000px] h-[2000px] pointer-events-none overflow-visible">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(200,195,185,0.25)" />
                  <stop offset="50%" stopColor="rgba(200,195,185,0.15)" />
                  <stop offset="100%" stopColor="rgba(200,195,185,0.25)" />
                </linearGradient>
              </defs>
              {filteredConnections.map((conn) => (
                <path
                  key={conn.id}
                  d={getConnectionPath(conn)}
                  fill="none"
                  className="canvas-connection-line"
                  strokeLinecap="round"
                />
              ))}
            </svg>

            {/* Draggable Prompt Card */}
            <div 
              className="absolute animate-fade-in z-20 cursor-move" 
              style={{ left: promptPos.x, top: promptPos.y }}
              onMouseDown={(e) => {
                e.stopPropagation()
                handleMouseDown(e, "prompt")
              }}
            >
              <div
                className="w-[260px] p-4 rounded-2xl relative"
                style={{
                  background: "rgba(38,40,36,0.97)",
                  border: "1px solid rgba(70,72,68,0.4)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                {/* Reference thumbnails */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg overflow-hidden ring-1 ring-white/10">
                    <img
                      src={createPlaceholderImage("Portrait", "#164e63", "#7c3aed")}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-lg overflow-hidden ring-1 ring-white/10">
                    <img
                      src={createPlaceholderImage("Issue", "#4338ca", "#0f766e")}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Title */}
                <p className="text-[13px] text-white/90 font-medium leading-snug tracking-[-0.01em] mb-2">
                  Write a one-line prompt to place the character from
                </p>

                {/* Tags */}
                <div className="space-y-1 mb-3">
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-[rgba(60,100,120,0.4)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span className="text-blue-300">Elegant Figure Portrait</span>
                    </span>
                    <span className="text-white/40">in to the scene from</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-[rgba(180,100,60,0.3)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="text-amber-300">Image Processing Issue</span>
                    </span>
                  </div>
                </div>

                <div className="h-px bg-white/10 my-3" />

                {/* Generated text */}
                <p className="text-[11px] text-white/50 leading-relaxed tracking-[-0.005em]">
                  A shirtless warrior with red-dyed hair and bandaged arms draws his bow against a vast martian-red
                  landscape of ancient crumbling stone formations and rust-colored cliffs under a hazy sky.
                </p>

                {/* Left side ports */}
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 flex flex-col gap-4 -translate-x-full pr-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-3.5 h-3.5 rounded-full border-2 cursor-pointer transition-all hover:scale-110 ${
                        i === 1
                          ? "border-white/50 bg-white/20"
                          : "border-white/25 bg-transparent hover:border-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Image Nodes */}
            {filteredNodes.map((node) => {
              const isGeneratingThisNode = isGenerating[node.id] || false;
              return (
                <React.Fragment key={node.id}>
                  <ImageNodeCard
                    node={node}
                    isSelected={selectedNode === node.id}
                    isGenerating={isGeneratingThisNode}
                    onMouseDown={(e) => {
                      e.stopPropagation()
                      handleMouseDown(e, node.id)
                    }}
                    onAIClick={() => {
                      setSelectedNode(prev => prev === node.id ? null : node.id);
                    }}
                    onPlusClick={() => {
                      setSelectedNode(node.id);
                    }}
                    onDeleteClick={() => {
                      setNodes(prev => prev.filter(n => n.id !== node.id));
                    }}
                  />

                  {/* AI Prompt Dialogue Box underneath the clicked node */}
                  {selectedNode === node.id && (
                    <div 
                      className="absolute z-50 p-4 rounded-2xl shadow-2xl bg-white border border-black/12 backdrop-blur-md pointer-events-auto transition-all select-text"
                      style={{
                        left: node.x - (290 - node.width) / 2, // Centered relative to node card
                        top: node.y + node.height + 40, // Attached below the node
                        width: 290,
                      }}
                      onMouseDown={(e) => e.stopPropagation()} // Stop canvas pan/drag triggering
                    >
                      {/* Dialogue Header */}
                      <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-neutral-100">
                        <div className="flex items-center gap-1.5 text-neutral-800 font-bold text-[11.5px]">
                          <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500/20 animate-pulse" />
                          <span>AI 局部深化与对话</span>
                        </div>
                        <button 
                          onClick={() => setSelectedNode(null)}
                          className="w-5 h-5 rounded hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-800 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Input Area */}
                      <textarea
                        value={nodePromptMap[node.id] || ""}
                        onChange={(e) => setNodePromptMap(prev => ({ ...prev, [node.id]: e.target.value }))}
                        placeholder="发送深化或图格渲染指令..."
                        className="w-full h-16 p-2 text-[11px] text-neutral-950 bg-neutral-50 rounded-lg focus:outline-none resize-none leading-relaxed placeholder-neutral-400 border border-neutral-100 focus:border-neutral-300 text-left"
                      />

                      {/* Buttons and Params */}
                      <div className="flex justify-between items-center pt-2.5 border-t border-neutral-100 mt-2 text-[10px]">
                        <button
                          type="button"
                          onClick={() => setShowNodeParams(!showNodeParams)}
                          className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-neutral-50 hover:bg-neutral-100 border border-neutral-205 text-neutral-700 font-medium transition-all cursor-pointer"
                        >
                          <SlidersHorizontal className="w-3 h-3 text-neutral-500" />
                          <span>参数与模型</span>
                        </button>

                        <div className="flex items-center space-x-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setNodePromptMap(prev => ({
                                ...prev,
                                [node.id]: (prev[node.id] || "") + "，高反材质，古铜挑檐，绿色节能"
                              }));
                            }}
                            className="bg-amber-50 hover:bg-amber-100 text-amber-850 font-medium px-2 py-1 rounded-md transition-all cursor-pointer text-[10px]"
                          >
                            +轻深化
                          </button>

                          <button
                            type="button"
                            onClick={() => handleSendNodePrompt(node.id)}
                            className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-1 px-3 rounded-md flex items-center space-x-1 transition-all cursor-pointer shadow-sm text-[10px]"
                          >
                            <span>深化渲染</span>
                          </button>
                        </div>
                      </div>

                      {/* Dynamic Param Options overlay */}
                      {showNodeParams && (
                        <div className="mt-2.5 pt-2 border-t border-neutral-100 space-y-1.5 text-left text-[9px]">
                          <div className="flex justify-between items-center text-[8px] text-neutral-500">
                            <span>比例 / ASPECT RATIO</span>
                            <span className="font-mono text-neutral-800 font-bold">{nodeAspectRatio}</span>
                          </div>
                          <div className="grid grid-cols-4 gap-1">
                            {["1:1", "3:4", "4:3", "9:16", "16:9", "2:3", "3:2", "自动"].map((r) => (
                              <button
                                type="button"
                                key={r}
                                onClick={() => setNodeAspectRatio(r)}
                                className={`py-1 rounded text-[8px] font-medium transition-all cursor-pointer ${
                                  nodeAspectRatio === r ? 'bg-neutral-900 text-white font-bold' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                }`}
                              >
                                {r}
                              </button>
                            ))}
                          </div>
                          <div className="flex justify-between items-center text-[8px] text-neutral-505 pt-1">
                            <span>分辨率 / RESOLUTION</span>
                            <span className="font-mono text-neutral-800 font-bold">{nodePixelSize}</span>
                          </div>
                          <div className="grid grid-cols-4 gap-1">
                            {["512", "1K", "2K", "4K"].map((p) => (
                              <button
                                type="button"
                                key={p}
                                onClick={() => setNodePixelSize(p)}
                                className={`py-1 rounded text-[8px] font-medium transition-all cursor-pointer ${
                                  nodePixelSize === p ? 'bg-neutral-900 text-white font-bold' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                }`}
                              >
                                {p}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
      </div>

      {/* Floating Toolbar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40">
        <div
          className="flex items-center gap-0.5 px-1.5 py-1 rounded-xl"
          style={{
            background: "rgba(40,40,38,0.97)",
            border: "1px solid rgba(70,70,68,0.3)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          }}
        >
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
            <span className="text-[11px] text-white/70 tracking-[-0.01em]">Krea 2 References Large</span>
            <ChevronDown className="w-3 h-3 text-white/40" />
          </button>
          <div className="h-4 w-px bg-white/10" />
          <button className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
            <span className="text-[11px] text-white/70">2:3</span>
            <ChevronDown className="w-3 h-3 text-white/40" />
          </button>
          <div className="h-4 w-px bg-white/10" />
          <button className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
            <Wand2 className="w-3.5 h-3.5 text-white/50" />
            <span className="text-[11px] text-white/70">Tools</span>
            <ChevronDown className="w-3 h-3 text-white/40" />
          </button>
          <div className="h-4 w-px bg-white/10" />
          <button className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/5">
            <Lock className="w-3 h-3 text-white/50" />
            <span className="text-[11px] text-white/60">Locked</span>
          </button>
          <div className="flex items-center gap-0.5 mx-1">
            <div className="w-5 h-5 rounded-full border-2 border-white/20" />
            <div className="w-5 h-5 rounded-full border-2 border-white/20" />
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center">
            <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
              <Bookmark className="w-3.5 h-3.5 text-white/40" />
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
              <Send className="w-3.5 h-3.5 text-white/40" />
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
              <Download className="w-3.5 h-3.5 text-white/40" />
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
              <Maximize2 className="w-3.5 h-3.5 text-white/40" />
            </button>
          </div>
        </div>
      </div>

      {/* FAUNA Assistant Panel */}
      {showAssistant && (
        <div className="absolute bottom-20 right-4 z-50">
          <div
            className="w-[240px] p-3.5 rounded-xl"
            style={{
              background: "rgba(35,35,33,0.97)",
              border: "1px solid rgba(65,65,63,0.3)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[13px] font-semibold text-white tracking-[-0.02em]">FAUNA</h3>
                <p className="text-[11px] text-white/40 mt-0.5 tracking-[-0.005em]">
                  Your AI assistant lives here.{" "}
                  <span className="text-white/25 bg-white/5 px-1 py-0.5 rounded text-[9px] ml-1">Ctrl /</span>
                </p>
              </div>
              <button
                onClick={() => setShowAssistant(false)}
                className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 transition-colors -mt-0.5 -mr-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5 text-white/40" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Queue Status */}
      <div className="absolute bottom-4 right-4 z-50">
        <div
          className="flex items-center gap-3 px-3 py-2 rounded-xl"
          style={{
            background: "rgba(30,30,28,0.95)",
            border: "1px solid rgba(60,60,58,0.3)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <span className="text-[11px] text-white/50 tracking-[-0.01em]">Queue</span>
          <span className="text-[11px] text-white/30">0 active</span>
          <ChevronDown className="w-3 h-3 text-white/20 hover:text-white transition-colors cursor-pointer" />
          <div className="w-px h-4 bg-white/10" />
          <button className="w-6 h-6 rounded-lg hover:bg-white/5 flex items-center justify-center transition-colors cursor-pointer">
            <Layers className="w-3.5 h-3.5 text-white/40" />
          </button>
        </div>
      </div>

      {/* Usage Indicator */}
      <div className="absolute bottom-4 left-4 z-50">
        <div
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
          style={{
            background: "rgba(25,25,23,0.9)",
            border: "1px solid rgba(50,50,48,0.3)",
          }}
        >
          <div className="w-3 h-3 rounded-sm bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-[1px] bg-emerald-500/40" />
          </div>
          <span className="text-[10px] text-white/40 tracking-[-0.01em]">0% used</span>
        </div>
      </div>

      {/* Zoom Indicator */}
      <div className="absolute top-16 right-4 z-40">
        <div
          className="px-2 py-1 rounded-lg"
          style={{
            background: "rgba(30,30,28,0.8)",
            border: "1px solid rgba(60,60,58,0.2)",
          }}
        >
          <span className="text-[10px] text-white/40 tracking-tight">{Math.round(zoom * 100)}%</span>
        </div>
      </div>
      </div>
      <CanvasActivitySidebar />
    </div>
  )
}
