"use client"

import ReactMarkdown from "react-markdown"
import { memo } from "react"

interface MarkdownRendererProps {
  content: string
  className?: string
}

const MarkdownRenderer = memo(function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
    //   className={`prose prose-sm max-w-none ${className}`}
      components={{
        // Headings
        h1: ({ children }) => <h1 className="text-lg font-bold text-slate-800 mb-3 mt-4 first:mt-0">{children}</h1>,
        h2: ({ children }) => (
          <h2 className="text-base font-semibold text-slate-800 mb-2 mt-3 first:mt-0">{children}</h2>
        ),
        h3: ({ children }) => <h3 className="text-sm font-semibold text-slate-700 mb-2 mt-3 first:mt-0">{children}</h3>,

        // Paragraphs
        p: ({ children }) => <p className="text-slate-700 leading-relaxed mb-3 last:mb-0">{children}</p>,

        // Lists
        ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-3 text-slate-700">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-3 text-slate-700">{children}</ol>,
        li: ({ children }) => <li className="text-slate-700">{children}</li>,

        // Emphasis
        strong: ({ children }) => <strong className="font-semibold text-slate-800">{children}</strong>,
        em: ({ children }) => <em className="italic text-slate-700">{children}</em>,

        // Code
        code: ({ children, className }) => {
          const isInline = !className
          if (isInline) {
            return (
              <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>
            )
          }
          return (
            <code className="block bg-slate-50 text-slate-800 p-3 rounded-lg text-xs font-mono overflow-x-auto border border-slate-200">
              {children}
            </code>
          )
        },

        // Blockquotes
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-slate-300 pl-4 py-2 my-3 bg-slate-50 rounded-r-lg">
            <div className="text-slate-600 italic">{children}</div>
          </blockquote>
        ),

        // Links
        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-slate-800 underline underline-offset-2 transition-colors"
          >
            {children}
          </a>
        ),

        // Horizontal rule
        hr: () => <hr className="border-slate-200 my-4" />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
})

export { MarkdownRenderer }
