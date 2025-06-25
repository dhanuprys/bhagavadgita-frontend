"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface QuickRepliesProps {
  replies: string[]
  onReplySelect: (reply: string) => void
  disabled?: boolean
}

export function QuickReplies({ replies, onReplySelect, disabled }: QuickRepliesProps) {
  if (!replies || replies.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.3 }}
      className="flex flex-wrap gap-2 mt-3 justify-start"
    >
      {replies.slice(0, 4).map((reply, index) => (
        <motion.div
          key={reply}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 + index * 0.05, duration: 0.2 }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => onReplySelect(reply)}
            disabled={disabled}
            className="text-xs bg-white/80 border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 rounded-full px-3 py-1 h-auto transition-all duration-200 hover:shadow-sm"
          >
            {reply}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  )
}
