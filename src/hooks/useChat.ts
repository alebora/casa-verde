import { useState } from 'react'
import { ChatMessage } from '@/types/chat'
import { sendChatMessage } from '@/lib/claude'
import toast from 'react-hot-toast'

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: ChatMessage = { role: 'user', content }
    setMessages((prev) => [...prev, userMessage])
    setLoading(true)

    try {
      const response = await sendChatMessage([...messages, userMessage])
      setMessages((prev) => [...prev, response])
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send message'
      toast.error(message)
      console.error('Chat error:', error)
    } finally {
      setLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  return {
    messages,
    loading,
    sendMessage,
    clearChat,
  }
}