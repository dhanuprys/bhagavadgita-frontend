import { memo } from 'react';
import { motion } from 'framer-motion';
import {
    Bot,
    User,
    Copy,
    Check,
    LinkIcon,
    CircleCheckIcon,
} from 'lucide-react';
import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { QuickReplies } from '@/components/quick-replies';
import { MarkdownRenderer } from '@/components/chat/markdown-renderer';
import type { ChatMessage as ChatMessageType } from '@/types/chat';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { NavLink } from 'react-router';

interface ChatMessageProps {
    message: ChatMessageType;
    index: number;
    onQuickReply: (reply: string) => void;
    disabled?: boolean;
    isHighlighted?: boolean;
}

const OptimizedChatMessage = memo(function ChatMessage({
    message,
    index,
    onQuickReply,
    disabled,
    isHighlighted,
}: ChatMessageProps) {
    const [copied, setCopied] = useState(false);
    const isUser = message.role === 'user';

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(message.content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy text:', error);
        }
    }, [message.content]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.3,
                delay: Math.min(index * 0.05, 0.5),
                ease: 'easeOut',
            }}
            className={`w-full mb-6 sm:mb-8 ${
                isHighlighted ? 'bg-yellow-50/50 rounded-lg p-2 -m-2' : ''
            }`}
        >
            {isUser ? (
                // User Message - Keep card design, right-aligned
                <div className="flex gap-3 sm:gap-4 justify-end group pr-4 md:pr-6">
                    <div className="max-w-[80%] sm:max-w-[75%]">
                        <Card className="p-4 sm:p-5 shadow-lg border-0 bg-gradient-to-br from-purple-800 via-purple-700 to-blue-800 text-white rounded-3xl sm:rounded-2xl relative overflow-hidden group-hover:shadow-xl transition-all duration-300">
                            {/* Subtle gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                            {/* Message content */}
                            <div className="relative z-10">
                                <div className="text-sm sm:text-base text-white leading-relaxed font-medium">
                                    {message.content}
                                </div>
                                <div className="text-xs mt-3 text-purple-200/70 text-right">
                                    {message.timestamp.toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </div>
                            </div>

                            {/* Subtle border highlight */}
                            <div className="absolute inset-0 rounded-3xl sm:rounded-2xl ring-1 ring-white/10 pointer-events-none" />
                        </Card>
                    </div>
                    <div className="flex-shrink-0 mt-1">
                        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-purple-700/50 via-purple-600/50 to-purple-500 flex items-center justify-center shadow-lg ring-2 ring-white/10">
                            <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                    </div>
                </div>
            ) : (
                // AI Message - Icon on top, content below
                <div className="w-full py-2 px-4 sm:px-6 group/message">
                    <div className="max-w-4xl mx-auto">
                        {/* AI Avatar Row */}
                        <div className="flex items-center gap-3 sm:gap-4 mb-3">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full sm:rounded-2xl bg-gradient-to-br from-purple-100/50 to-purple-200/50 flex items-center justify-center shadow-sm border border-purple-200/50">
                                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                                </div>
                            </div>
                            <div className="flex gap-x-2">
                                <div className="text-sm font-medium text-purple-700">
                                    BhagavadAI
                                </div>
                                {message.answer_system === 'intent' && (
                                    <span className="text-xs  px-2 py-1 rounded-full bg-green-600/10 text-green-600/80 flex items-center gap-x-1">
                                        <CircleCheckIcon className="size-3" />
                                        akurasi ditingkatkan
                                    </span>
                                )}
                            </div>

                            {/* Copy Button */}
                            <div className="ml-auto opacity-0 group-hover/message:opacity-100 transition-opacity duration-200">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleCopy}
                                    className="h-6 w-6 p-0 hover:bg-purple-100"
                                >
                                    {copied ? (
                                        <Check className="w-3 h-3 text-green-600" />
                                    ) : (
                                        <Copy className="w-3 h-3 text-purple-500" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* Content Area - Below the avatar */}
                        <div className="ml-0 sm:ml-2">
                            {/* Context Tags */}
                            {message.context && message.context.length > 0 && (
                                <div className="mb-4">
                                    <div className="text-xs font-medium text-grey-500 mb-2 tracking-wide uppercase">
                                        KONTEKS
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                        {message.context.map(
                                            (ctx, ctxIndex) => (
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Badge
                                                            key={ctxIndex}
                                                            variant="secondary"
                                                            className="bg-purple-50 text-xxs text-grey-700 border border-purple-200/50 hover:bg-purple-100 transition-colors rounded-full hover:cursor-pointer"
                                                        >
                                                            {ctx.label}
                                                        </Badge>
                                                    </DialogTrigger>
                                                    <DialogContent className="text-grey-700">
                                                        <DialogTitle>
                                                            {ctx.label}
                                                        </DialogTitle>
                                                        <DialogDescription className="space-y-4">
                                                            <MarkdownRenderer
                                                                content={
                                                                    ctx.content
                                                                }
                                                            />
                                                        </DialogDescription>
                                                        <DialogFooter>
                                                            {ctx.link && (
                                                                <NavLink
                                                                    to={
                                                                        ctx.link
                                                                    }
                                                                >
                                                                    <Button variant="secondary">
                                                                        <LinkIcon />
                                                                        buka
                                                                        sumber
                                                                    </Button>
                                                                </NavLink>
                                                            )}
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Message Content */}
                            <div className="leading-relaxed">
                                <MarkdownRenderer content={message.content} />
                            </div>

                            {/* Timestamp */}
                            <div className="mt-4 text-xs text-grey-400">
                                <span>
                                    {message.timestamp.toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                            </div>

                            {/* Quick Replies */}
                            {message.quickReplies &&
                                message.quickReplies.length > 0 && (
                                    <div className="mt-4">
                                        <p className="font-semibold text-sm">
                                            Ajukan pertanyaan lainnya
                                        </p>
                                        <QuickReplies
                                            replies={message.quickReplies}
                                            onReplySelect={onQuickReply}
                                            disabled={disabled}
                                        />
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
});

export { OptimizedChatMessage as ChatMessage };
