"use client"

import { motion } from "framer-motion"
import { Sparkles, MessageCircle, Brain, Heart } from "lucide-react"
import { QuickReplies } from "@/components/quick-replies"
import { welcomeQuickReplies } from "@/lib/mock-responses"
import { shuffle } from 'fast-shuffle'
import { useMemo } from "react"

const features = [
  {
    icon: MessageCircle,
    title: "Percakapan yang Mendalam",
    description: "Menjalin dialog bermakna",
  },
  {
    icon: Brain,
    title: "Kearifan Kontekstual",
    description: "Terima wawasan dengan konteks yang relevan",
  },
  {
    icon: Heart,
    title: "Panduan Penuh Kasih",
    description: "Temukan ketenangan melalui ajaran kuno",
  },
]

interface WelcomeScreenProps {
  onQuickReply: (reply: string) => void
  disabled?: boolean
}

export function WelcomeScreen({ onQuickReply, disabled }: WelcomeScreenProps) {
  const shuffledQuickReplies = useMemo(() => shuffle(welcomeQuickReplies).slice(0, 3), []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="text-center py-8 sm:py-12 px-4 sm:px-6"
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center shadow-lg border border-slate-200/50">
        <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-slate-600" />
      </div>

      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2 sm:mb-3">Selamat Datang di BhagavadAI</h3>
        <p className="text-slate-600 max-w-md mx-auto mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
          Temukan kebijaksanaan dan panduan yang terinspirasi dari ajaran abadi. Tanyakan apa saja dan terima wawasan mendalam.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto mb-8">
        {features.map((feature) => (
          <div key={feature.title} className="text-center p-3 sm:p-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-xl sm:rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-200/50">
              <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
            </div>
            <h4 className="font-semibold text-slate-800 mb-1 text-sm">{feature.title}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Welcome Quick Replies - Centered */}
      <div className="text-center">
        <p className="text-sm text-slate-500 mb-4">Coba tanyakan tentang:</p>
        <div className="flex justify-center">
          <QuickReplies replies={shuffledQuickReplies} onReplySelect={onQuickReply} disabled={disabled} />
        </div>
      </div>
    </motion.div>
  )
}
