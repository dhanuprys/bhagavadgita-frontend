export interface ChatContext {
  context: string[]
  answer: string
  quickReplies?: string[]
}

export interface ResponseContext {
  label: string
  content: string
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  context?: ResponseContext[]
  quickReplies?: string[]
  timestamp: Date
  isLoading?: boolean
}

export interface ChatState {
  messages: ChatMessage[]
  isThinking: boolean
  error: string | null
  input: string
  conversationStarted: boolean
}

export interface MockResponse {
  context: string[]
  answer: string
  quickReplies?: string[]
  delay?: number
}
