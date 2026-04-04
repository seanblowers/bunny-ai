import { useEffect, useMemo, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Send, Square } from 'lucide-react'
import { useAIChat } from '@/lib/ai-hook'

function hasCupcakKeMention(text: string): boolean {
  return /cupcakke/i.test(text)
}

function hasTaylorLikesMention(text: string): boolean {
  return /taylor\s+likes/i.test(text)
}

function BunnyAvatar() {
  return (
    <div className="bunny-avatar">
      <svg viewBox="0 0 64 64" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
        {/* Ears */}
        <ellipse cx="22" cy="14" rx="7" ry="14" fill="#fce4ec" stroke="#f8bbd0" strokeWidth="1.5" />
        <ellipse cx="22" cy="14" rx="4" ry="10" fill="#f8bbd0" />
        <ellipse cx="42" cy="14" rx="7" ry="14" fill="#fce4ec" stroke="#f8bbd0" strokeWidth="1.5" />
        <ellipse cx="42" cy="14" rx="4" ry="10" fill="#f8bbd0" />
        {/* Head */}
        <circle cx="32" cy="38" r="20" fill="#fce4ec" stroke="#f8bbd0" strokeWidth="1.5" />
        {/* Eyes */}
        <circle cx="25" cy="34" r="3" fill="#4a4a4a" />
        <circle cx="39" cy="34" r="3" fill="#4a4a4a" />
        <circle cx="26" cy="33" r="1" fill="white" />
        <circle cx="40" cy="33" r="1" fill="white" />
        {/* Nose */}
        <ellipse cx="32" cy="40" rx="2.5" ry="2" fill="#f48fb1" />
        {/* Mouth */}
        <path d="M29 43 Q32 46 35 43" fill="none" stroke="#f48fb1" strokeWidth="1.2" strokeLinecap="round" />
        {/* Cheeks */}
        <circle cx="19" cy="40" r="3.5" fill="#f8bbd0" opacity="0.5" />
        <circle cx="45" cy="40" r="3.5" fill="#f8bbd0" opacity="0.5" />
        {/* Whiskers */}
        <line x1="10" y1="38" x2="20" y2="39" stroke="#ddd" strokeWidth="0.8" />
        <line x1="10" y1="42" x2="20" y2="41" stroke="#ddd" strokeWidth="0.8" />
        <line x1="44" y1="39" x2="54" y2="38" stroke="#ddd" strokeWidth="0.8" />
        <line x1="44" y1="41" x2="54" y2="42" stroke="#ddd" strokeWidth="0.8" />
      </svg>
    </div>
  )
}

function ButterflyAvatar() {
  return (
    <div className="butterfly-avatar">
      <svg viewBox="0 0 64 64" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
        {/* Left upper wing */}
        <ellipse cx="18" cy="22" rx="14" ry="12" fill="#c084fc" stroke="#a855f7" strokeWidth="1" transform="rotate(-15 18 22)" />
        <ellipse cx="18" cy="22" rx="9" ry="7" fill="#e9d5ff" transform="rotate(-15 18 22)" />
        {/* Right upper wing */}
        <ellipse cx="46" cy="22" rx="14" ry="12" fill="#c084fc" stroke="#a855f7" strokeWidth="1" transform="rotate(15 46 22)" />
        <ellipse cx="46" cy="22" rx="9" ry="7" fill="#e9d5ff" transform="rotate(15 46 22)" />
        {/* Left lower wing */}
        <ellipse cx="20" cy="40" rx="11" ry="9" fill="#f0abfc" stroke="#d946ef" strokeWidth="1" transform="rotate(-10 20 40)" />
        <ellipse cx="20" cy="40" rx="6" ry="5" fill="#fae8ff" transform="rotate(-10 20 40)" />
        {/* Right lower wing */}
        <ellipse cx="44" cy="40" rx="11" ry="9" fill="#f0abfc" stroke="#d946ef" strokeWidth="1" transform="rotate(10 44 40)" />
        <ellipse cx="44" cy="40" rx="6" ry="5" fill="#fae8ff" transform="rotate(10 44 40)" />
        {/* Body */}
        <ellipse cx="32" cy="32" rx="3" ry="14" fill="#7c3aed" />
        {/* Head */}
        <circle cx="32" cy="16" r="4" fill="#7c3aed" />
        {/* Eyes */}
        <circle cx="30" cy="15" r="1.2" fill="white" />
        <circle cx="34" cy="15" r="1.2" fill="white" />
        <circle cx="30" cy="15" r="0.6" fill="#1a1a1a" />
        <circle cx="34" cy="15" r="0.6" fill="#1a1a1a" />
        {/* Antennae */}
        <path d="M30 13 Q26 4 22 2" fill="none" stroke="#7c3aed" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="22" cy="2" r="1.5" fill="#c084fc" />
        <path d="M34 13 Q38 4 42 2" fill="none" stroke="#7c3aed" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="42" cy="2" r="1.5" fill="#c084fc" />
        {/* Wing spots */}
        <circle cx="14" cy="20" r="2" fill="#a855f7" opacity="0.5" />
        <circle cx="50" cy="20" r="2" fill="#a855f7" opacity="0.5" />
      </svg>
    </div>
  )
}

function Messages({ messages, isZoeMode }: { messages: Array<{ id: string; role: string; parts: Array<{ type: string; content?: string }> }>; isZoeMode: boolean }) {
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight
    }
  }, [messages])

  if (!messages.length) {
    return null
  }

  return (
    <div
      ref={messagesContainerRef}
      className="flex-1 overflow-y-auto pb-4 min-h-0"
    >
      <div className="max-w-2xl mx-auto w-full px-4 py-4 space-y-4">
        {messages.filter((m) => m.role === 'user' || m.role === 'assistant').map((message) => {
          const textContent = message.parts
            .filter((part) => part.type === 'text')
            .map((part) => part.content)
            .join('')
          if (!textContent) return null
          return (
            <div
              key={message.id}
              className={`flex items-end gap-2 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} ${message.role === 'assistant' && hasCupcakKeMention(textContent) ? 'bunny-wild' : ''}`}
            >
              {message.role === 'assistant' ? (
                isZoeMode ? <ButterflyAvatar /> : <BunnyAvatar />
              ) : (
                <div className="user-avatar">You</div>
              )}
              <div
                className={`chat-bubble ${message.role === 'assistant' ? 'chat-bubble-bunny' : 'chat-bubble-user'}`}
              >
                {textContent}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Home() {
  const [input, setInput] = useState('')
  const chat = useAIChat()
  const isStreaming = chat.status === 'streaming'

  const isCupcakKeMode = useMemo(() => {
    return chat.messages.some((m: any) => {
      const text = m.parts
        ?.filter((p: any) => p.type === 'text')
        .map((p: any) => p.content)
        .join('') || ''
      return hasCupcakKeMention(text)
    })
  }, [chat.messages])

  const isZoeMode = useMemo(() => {
    return chat.messages.some((m: any) => {
      if (m.role !== 'user') return false
      const text = m.parts
        ?.filter((p: any) => p.type === 'text')
        .map((p: any) => p.content)
        .join('') || ''
      return hasTaylorLikesMention(text)
    })
  }, [chat.messages])

  return (
    <div className="chat-container">
      {/* Header */}
      <div className={`chat-header ${isZoeMode ? 'chat-header-butterfly' : ''} ${isCupcakKeMode ? 'bunny-wild' : ''}`}>
        {isZoeMode ? <ButterflyAvatar /> : <BunnyAvatar />}
        <div className="chat-header-info">
          <h1 className="chat-header-name">{isZoeMode ? 'Zoë' : 'Bun Bun'}</h1>
          <span className="chat-header-status">
            {isCupcakKeMode
              ? '🎵 CUPCAKKE MODE • going absolutely feral 🎵'
              : isZoeMode
                ? isStreaming ? 'fluttering...' : 'online • landing on flowers'
                : isStreaming ? 'thumping...' : 'online • munching hay'}
          </span>
        </div>
      </div>

      {/* Messages area */}
      <div className={`chat-messages-area ${isZoeMode ? 'chat-messages-area-butterfly' : ''}`}>
        {chat.messages.length === 0 && (
          <div className="chat-empty-state">
            <div className={`chat-empty-bunny ${hasCupcakKeMention(input) ? 'bunny-wild-idle' : ''}`}>
              <svg viewBox="0 0 64 64" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="22" cy="14" rx="7" ry="14" fill="#fce4ec" stroke="#f8bbd0" strokeWidth="1.5" />
                <ellipse cx="22" cy="14" rx="4" ry="10" fill="#f8bbd0" />
                <ellipse cx="42" cy="14" rx="7" ry="14" fill="#fce4ec" stroke="#f8bbd0" strokeWidth="1.5" />
                <ellipse cx="42" cy="14" rx="4" ry="10" fill="#f8bbd0" />
                <circle cx="32" cy="38" r="20" fill="#fce4ec" stroke="#f8bbd0" strokeWidth="1.5" />
                <circle cx="25" cy="34" r="3" fill="#4a4a4a" />
                <circle cx="39" cy="34" r="3" fill="#4a4a4a" />
                <circle cx="26" cy="33" r="1" fill="white" />
                <circle cx="40" cy="33" r="1" fill="white" />
                <ellipse cx="32" cy="40" rx="2.5" ry="2" fill="#f48fb1" />
                <path d="M29 43 Q32 46 35 43" fill="none" stroke="#f48fb1" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="19" cy="40" r="3.5" fill="#f8bbd0" opacity="0.5" />
                <circle cx="45" cy="40" r="3.5" fill="#f8bbd0" opacity="0.5" />
              </svg>
            </div>
            <h2 className="chat-empty-title">Chat with Bun Bun</h2>
            <p className="chat-empty-subtitle">
              Say something! Bun Bun is ready to... try their best.
            </p>
          </div>
        )}
        <Messages messages={chat.messages as Array<{ id: string; role: string; parts: Array<{ type: string; content?: string }> }>} isZoeMode={isZoeMode} />
        {isStreaming && (
          <div className="typing-indicator">
            {isZoeMode ? <ButterflyAvatar /> : <BunnyAvatar />}
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="chat-input-area">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (input.trim() && !isStreaming) {
              chat.sendMessage(input)
              setInput('')
            }
          }}
        >
          <div className="chat-input-wrapper">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isZoeMode ? "Say something to Zoë..." : "Say something to Bun Bun..."}
              className="chat-input"
              disabled={isStreaming}
            />
            {isStreaming ? (
              <button
                type="button"
                onClick={() => chat.stop()}
                className="chat-send-btn"
              >
                <Square className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                className="chat-send-btn"
              >
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Home,
})
