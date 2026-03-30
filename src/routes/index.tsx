import { useEffect, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Send, Square } from 'lucide-react'
import { useAIChat } from '@/lib/ai-hook'

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

function Messages({ messages }: { messages: Array<{ id: string; role: string; parts: Array<{ type: string; content?: string }> }> }) {
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
              className={`flex items-end gap-2 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {message.role === 'assistant' ? (
                <BunnyAvatar />
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

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <BunnyAvatar />
        <div className="chat-header-info">
          <h1 className="chat-header-name">Bun Bun</h1>
          <span className="chat-header-status">
            {isStreaming ? 'thumping...' : 'online • munching hay'}
          </span>
        </div>
      </div>

      {/* Messages area */}
      <div className="chat-messages-area">
        {chat.messages.length === 0 && (
          <div className="chat-empty-state">
            <div className="chat-empty-bunny">
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
        <Messages messages={chat.messages as Array<{ id: string; role: string; parts: Array<{ type: string; content?: string }> }>} />
        {isStreaming && (
          <div className="typing-indicator">
            <BunnyAvatar />
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
              placeholder="Say something to Bun Bun..."
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
