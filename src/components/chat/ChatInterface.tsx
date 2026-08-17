import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, Trash2, Sparkles, Bot, User } from 'lucide-react'
import { useChat } from '@/hooks/useChat'

export function ChatInterface() {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { messages, loading, sendMessage, clearChat } = useChat()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    await sendMessage(input)
    setInput('')
  }

  const suggestedQuestions = [
    "Why are my monstera's leaves turning yellow?",
    "How much light does a snake plant need?",
    "When should I repot my plants?",
    "How do I know if I'm overwatering?",
  ]

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-6 rounded-t-3xl shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-2xl blur-lg opacity-30"></div>
              <div className="relative bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold flex items-center space-x-2">
                <span>Plant Care Assistant</span>
              </h2>
              <p className="text-emerald-100 text-sm">
                Powered by Claude AI • Always here to help 🌱
              </p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-200 backdrop-blur-sm"
            >
              <Trash2 size={16} />
              <span className="hidden sm:inline font-medium">Clear Chat</span>
            </button>
          )}
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 bg-white/50 backdrop-blur-sm space-y-6">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full blur-3xl opacity-40 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-emerald-100 to-teal-100 w-24 h-24 rounded-full flex items-center justify-center">
                <Bot className="w-12 h-12 text-emerald-600 animate-float" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              Welcome to Your AI Plant Expert!
            </h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Ask me anything about plant care, problems, or identification. I'm here to help your plants thrive!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(question)}
                  className="text-left p-4 bg-white hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 border-2 border-slate-200 hover:border-emerald-300 rounded-2xl transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg group"
                >
                  <p className="text-sm font-medium text-slate-700 group-hover:text-emerald-700">
                    {question}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex items-start space-x-3 max-w-[85%] ${
                    message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-emerald-500 to-teal-500'
                        : 'bg-gradient-to-br from-slate-100 to-slate-200'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-slate-600" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`rounded-2xl px-6 py-4 shadow-lg ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                        : 'bg-white border-2 border-slate-200 text-slate-800'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading State */}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="bg-white border-2 border-slate-200 rounded-2xl px-6 py-4 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
                      <span className="text-slate-600">Thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="bg-white border-t-2 border-slate-200 p-6 rounded-b-3xl shadow-lg">
        <div className="flex space-x-4 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your plants..."
            className="flex-1 px-6 py-4 border-2 border-slate-300 rounded-2xl bg-slate-50 focus:outline-none focus:ring-4 focus:ring-emerald-200 focus:border-emerald-400 focus:bg-white transition-all duration-200 text-slate-800 placeholder-slate-400"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="btn-primary px-8 flex items-center space-x-2"
          >
            <Send size={20} />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </form>
    </div>
  )
}