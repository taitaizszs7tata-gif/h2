"use client"

import { useState, useRef, useEffect } from "react"
import { 
  Plus,
  Paperclip, Mic, Camera, Send, ChevronDown, Sparkles,
  FolderOpen, MessageSquare
} from "lucide-react"
import { mockChatMessages } from "@/lib/mock-data"
import type { ChatMessage } from "@/lib/types"

export function AIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages)
  const [inputValue, setInputValue] = useState("")
  const [selectedModel, setSelectedModel] = useState("Krea 2 References Large")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim()) return
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sessionId: "s1",
      sender: "user",
      senderName: "主创建筑师",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
    }
    
    setMessages([...messages, newMessage])
    setInputValue("")
  }

  return (
    <div className="h-full flex bg-white text-[#111111]">
      {/* 左侧控制面板 */}
      <aside className="w-[260px] border-r border-[#e5e5e5] bg-[#fafafa] flex flex-col">
        <nav className="flex-1 p-3 space-y-1">
          <SidebarSectionLabel>项目</SidebarSectionLabel>
          <SidebarNavItem icon={<FolderOpen className="w-4 h-4" />} label="上海图书馆东馆" active />

          <SidebarSectionLabel>聊天</SidebarSectionLabel>
          <SidebarNavItem icon={<Plus className="w-4 h-4" />} label="新聊天" badge="NEW" />

          <SidebarSectionLabel>最近</SidebarSectionLabel>
          <SidebarNavItem icon={<MessageSquare className="w-4 h-4" />} label="大规模体量审查会话" />
          <SidebarNavItem icon={<MessageSquare className="w-4 h-4" />} label="西晒幕墙材质分析" />
          <SidebarNavItem icon={<MessageSquare className="w-4 h-4" />} label="中庭采光模拟" />
        </nav>
      </aside>

      {/* 中央对话区 */}
      <main className="flex-1 min-h-0 flex flex-col bg-white">
        {/* 上下文选择器 */}
        <div className="p-4 border-b border-[#e5e5e5]">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#f5f5f5] border border-[#dddddd]">
              <span className="text-[13px] text-[#111111]">大规模体量审查会话 (今天 10:05)</span>
              <ChevronDown className="w-4 h-4 text-[#555555]" />
            </button>
            <button className="p-2 rounded-lg hover:bg-[#f0f0f0] transition-colors">
              <Plus className="w-4 h-4 text-[#555555]" />
            </button>
          </div>
        </div>

        {/* 消息区域 */}
        <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* 输入区域 */}
        <div className="shrink-0 p-4 border-t border-[#e5e5e5] bg-white">
          <div 
            className="
              rounded-xl
              bg-white
              border border-[#dddddd]
              overflow-hidden
            "
          >
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder="在此直接输入对话消息或者图格渲染指令..."
              className="
                w-full p-4 min-h-[80px] resize-none
                bg-transparent
                text-[14px] text-[#111111] placeholder:text-[#777777]
                focus:outline-none
              "
            />
            
            {/* 工具栏 */}
            <div className="flex items-center justify-between px-4 pb-3">
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f3f3f3] text-[12px] text-[#111111] hover:bg-[#ededed] transition-colors">
                  <Paperclip className="w-3.5 h-3.5" />
                  上传附件
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f3f3f3] text-[12px] text-[#111111] hover:bg-[#ededed] transition-colors">
                  <Sparkles className="w-3.5 h-3.5" />
                  模型与参数
                </button>
                <button className="px-3 py-1.5 rounded-lg text-[12px] text-[#555555] hover:bg-[#f3f3f3] transition-colors">
                  一键优化
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg text-[#555555] hover:text-[#111111] hover:bg-[#f3f3f3] transition-colors">
                  <Mic className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg text-[#555555] hover:text-[#111111] hover:bg-[#f3f3f3] transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleSend}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#111111] text-white text-[13px] font-medium hover:bg-[#333333] transition-colors"
                >
                  发送
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 底部标识 */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="w-4 h-4 rounded-full border border-[#dddddd]" />
            <span className="text-[11px] text-[#777777] tracking-[0.05em]">
              ARCHBOARD 控制端
            </span>
          </div>
        </div>
      </main>
    </div>
  )
}

function SidebarSectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="pt-4 px-3 py-2 text-[11px] font-medium text-[#111111] uppercase tracking-[0.05em]">{children}</div>
}

function SidebarNavItem({
  icon,
  label,
  badge,
  active,
  indent,
}: {
  icon: React.ReactNode
  label: string
  badge?: string
  active?: boolean
  indent?: boolean
}) {
  return (
    <button
      className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-[14px] font-medium tracking-[-0.01em] transition-colors ${
        active ? "bg-[#ededed] text-[#111111]" : "text-[#111111] hover:bg-[#f0f0f0]"
      } ${indent ? "pl-6" : ""}`}
    >
      <span className="text-[#111111]">{icon}</span>
      <span className="flex-1 text-left truncate">{label}</span>
      {badge && <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#111111] text-white">{badge}</span>}
    </button>
  )
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isAI = message.sender === "assistant"
  
  return (
    <div className={`flex ${isAI ? "justify-start" : "justify-end"}`}>
      <div 
        className={`
          max-w-[600px] p-4 rounded-2xl
          ${isAI
            ? "bg-[#f7f7f7] border border-[#dddddd]"
            : "bg-[#ededed]"
          }
        `}
      >
        {/* 发送者信息 */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[12px] font-semibold text-[#555555] uppercase tracking-[0.02em]">
            {message.senderName}
          </span>
          <span className="text-[11px] text-[#777777]">
            {message.timestamp}
          </span>
        </div>
        
        {/* 消息内容 */}
        <p className="text-[14px] text-[#111111] leading-relaxed">
          {message.content}
        </p>
      </div>
    </div>
  )
}
