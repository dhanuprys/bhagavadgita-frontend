import type { ChatMessage } from "@/types/chat"

const STORAGE_KEY = "bhagavad-ai-conversation"
const STORAGE_VERSION = "1.0"

// Throttle save operations to prevent excessive localStorage writes
let saveTimeout: NodeJS.Timeout | null = null

export function saveConversation(messages: ChatMessage[]) {
  if (saveTimeout) {
    clearTimeout(saveTimeout)
  }

  saveTimeout = setTimeout(() => {
    try {
      const data = {
        version: STORAGE_VERSION,
        messages,
        timestamp: Date.now(),
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.error("Failed to save conversation:", error)
      // Handle quota exceeded error
      if (error instanceof Error && error.name === "QuotaExceededError") {
        // Clear old data and try again
        try {
          localStorage.removeItem(STORAGE_KEY)
          const data = {
            version: STORAGE_VERSION,
            messages: messages.slice(-50), // Keep only last 50 messages
            timestamp: Date.now(),
          }
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        } catch (retryError) {
          console.error("Failed to save conversation after cleanup:", retryError)
        }
      }
    }
  }, 1000) // Throttle to 1 second
}

export function loadConversation(): ChatMessage[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const data = JSON.parse(saved)

      // Handle legacy format
      if (Array.isArray(data)) {
        return data.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
      }

      // Handle new format with version
      if (data.version === STORAGE_VERSION && data.messages) {
        return data.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
      }
    }
  } catch (error) {
    console.error("Failed to load conversation:", error)
  }
  return []
}

export function clearConversation() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    if (saveTimeout) {
      clearTimeout(saveTimeout)
      saveTimeout = null
    }
  } catch (error) {
    console.error("Failed to clear conversation:", error)
  }
}
