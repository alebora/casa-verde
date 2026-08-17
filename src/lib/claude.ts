import { ChatMessage } from '@/types/chat'

const BACKEND_URL = 'http://localhost:3001'

const SYSTEM_PROMPT = `You are a helpful plant care assistant. You provide expert advice on:
- Plant care (watering, light, soil, fertilizing)
- Common plant problems and solutions
- Plant identification
- Repotting and propagation tips
- Seasonal care adjustments

Be friendly, concise, and practical. If you're unsure about something specific, recommend consulting a local nursery or plant expert.`

export async function sendChatMessage(
  messages: ChatMessage[]
): Promise<ChatMessage> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: messages,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error?.message || 'Failed to get response from Claude')
    }

    const data = await response.json()
    const assistantMessage = data.content[0].text

    return {
      role: 'assistant',
      content: assistantMessage,
    }
  } catch (error) {
    console.error('Error calling Claude API:', error)
    throw error
  }
}