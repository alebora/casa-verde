export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
  }
  
  export interface ChatHistory {
    id: string;
    user_id: string;
    role: 'user' | 'assistant';
    content: string;
    plant_context?: string;
    created_at: string;
  }