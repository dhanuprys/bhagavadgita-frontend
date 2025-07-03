import React from 'react';
import { motion } from 'framer-motion';
import {
    Bot,
    User,
    Copy,
    Check,
    LinkIcon,
    VerifiedIcon,
    PauseIcon,
    Volume2Icon,
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
import { AttachmentCard } from './attachment-card';
import { useSpeech } from 'react-text-to-speech';

interface ChatMessageProps {
    message: ChatMessageType;
    index: number;
    onQuickReply: (reply: string) => void;
    disabled?: boolean;
    isHighlighted?: boolean;
    isLastUser: boolean;
    isLastAssistant: boolean;
    voiceURI?: string;
    voiceLangId?: string;
}

function formatTimestamp(date: Date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function UserMessage({ message }: { message: ChatMessageType }) {
    return (
        <div className="flex gap-3 sm:gap-4 justify-end group pr-4 md:pr-6">
            <div className="max-w-[80%] sm:max-w-[75%]">
                <Card className="p-4 sm:p-5 shadow-lg border-0 bg-gradient-to-br from-purple-800 via-purple-700 to-blue-800 text-white rounded-3xl sm:rounded-2xl relative overflow-hidden group-hover:shadow-xl transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                    <div className="relative z-10">
                        <div className="text-sm sm:text-base text-white leading-relaxed font-medium">
                            {message.content}
                        </div>
                        <div className="text-xs mt-3 text-purple-200/70 text-right">
                            {formatTimestamp(message.timestamp)}
                        </div>
                    </div>
                    <div className="absolute inset-0 rounded-3xl sm:rounded-2xl ring-1 ring-white/10 pointer-events-none" />
                </Card>
            </div>
            <div className="flex-shrink-0 mt-1">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-purple-700/50 via-purple-600/50 to-purple-500 flex items-center justify-center shadow-lg ring-2 ring-white/10">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
            </div>
        </div>
    );
}

function ContextTags({ context }: { context: ChatMessageType['context'] }) {
    if (!context || context.length === 0) return null;
    return (
        <div className="mb-4">
            <div className="text-xs font-medium text-grey-500 mb-2 tracking-wide uppercase">
                KONTEKS
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {context.map((ctx, ctxIndex) => (
                    <Dialog key={ctx.label}>
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
                            <DialogTitle>{ctx.label}</DialogTitle>
                            <DialogDescription className="space-y-4">
                                <MarkdownRenderer content={ctx.content} />
                            </DialogDescription>
                            <DialogFooter>
                                {ctx.link && (
                                    <NavLink to={ctx.link}>
                                        <Button variant="secondary">
                                            <LinkIcon /> buka sumber
                                        </Button>
                                    </NavLink>
                                )}
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                ))}
            </div>
        </div>
    );
}

function ActionButtons({
    speechStatus,
    startSound,
    stopSound,
    handleCopy,
    copied,
}: {
    speechStatus: string;
    startSound: () => void;
    stopSound: () => void;
    handleCopy: () => void;
    copied: boolean;
}) {
    return (
        <div className="mt-2 flex gap-x-2">
            <Button
                variant="ghost"
                size="sm"
                onClick={speechStatus === 'started' ? stopSound : startSound}
                className="hover:bg-purple-100"
            >
                {speechStatus === 'started' ? (
                    <>
                        <PauseIcon className="w-3 h-3 text-purple-500" /> Stop
                    </>
                ) : (
                    <>
                        <Volume2Icon className="w-3 h-3 text-purple-500" /> Bacakan
                    </>
                )}
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="hover:bg-purple-100"
            >
                {copied ? (
                    <>
                        <Check className="w-3 h-3 text-green-600" /> Berhasil disalin
                    </>
                ) : (
                    <>
                        <Copy className="w-3 h-3 text-purple-500" /> Salin
                    </>
                )}
            </Button>
        </div>
    );
}

function AIMessage({
    message,
    onQuickReply,
    disabled,
    speechStatus,
    startSound,
    stopSound,
    handleCopy,
    copied,
}: {
    message: ChatMessageType;
    onQuickReply: (reply: string) => void;
    disabled?: boolean;
    speechStatus: string;
    startSound: () => void;
    stopSound: () => void;
    handleCopy: () => void;
    copied: boolean;
}) {
    return (
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
                            <span className="text-xs  px-2 py-1 rounded-full bg-purple-600/10 text-purple-600/80 flex items-center gap-x-1">
                                <VerifiedIcon className="size-3" />
                                <span className="hidden sm:block">jawaban terverifikasi</span>
                            </span>
                        )}
                    </div>
                </div>
                {/* Content Area */}
                <div className="ml-0 sm:ml-2">
                    <ContextTags context={message.context} />
                    <div className="leading-relaxed">
                        <MarkdownRenderer content={message.content} />
                    </div>
                    <div className="mt-4 flex items-start flex-wrap gap-2">
                        {message.attachments?.map((attachment, index) => (
                            <AttachmentCard key={index} attachment={attachment} />
                        ))}
                    </div>
                    {(!message.quickReplies || message.quickReplies.length < 1) && (
                        <ActionButtons
                            speechStatus={speechStatus}
                            startSound={startSound}
                            stopSound={stopSound}
                            handleCopy={handleCopy}
                            copied={copied}
                        />
                    )}
                    <div className="mt-4 text-xs text-grey-400">
                        <span>{formatTimestamp(message.timestamp)}</span>
                    </div>
                    {message.quickReplies && message.quickReplies.length > 0 && (
                        <div className="mt-4">
                            <p className="font-semibold text-sm">Ajukan pertanyaan lainnya</p>
                            <QuickReplies
                                replies={message.quickReplies}
                                onReplySelect={onQuickReply}
                                className="sm:justify-start"
                                disabled={disabled}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>(
    ({
        message,
        index,
        onQuickReply,
        disabled,
        isHighlighted,
        isLastUser,
        isLastAssistant,
        voiceURI,
        voiceLangId,
    }, ref) => {
        const {
            start: startSound,
            stop: stopSound,
            speechStatus,
        } = useSpeech({
            text: message.content,
            highlightMode: 'sentence',
            lang: voiceLangId,
            voiceURI: voiceURI || undefined,
        });
        const [copied, setCopied] = useState(false);
        const isUser = message.role === 'user';
        const elementId = isLastUser
            ? 'last-user-message'
            : isLastAssistant
            ? 'last-assistant-message'
            : undefined;

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
                animate={{ opacity: !isLastUser && disabled ? 0.4 : 1, y: 0 }}
                transition={{
                    duration: 0.3,
                    delay: Math.min(index * 0.05, 0.5),
                    ease: 'easeOut',
                }}
                className={`w-full mb-6 sm:mb-8 ${isHighlighted ? 'bg-yellow-50/50 rounded-lg p-2 -m-2' : ''}`}
                id={elementId}
                ref={ref}
            >
                {isUser ? (
                    <UserMessage message={message} />
                ) : (
                    <AIMessage
                        message={message}
                        onQuickReply={onQuickReply}
                        disabled={disabled}
                        speechStatus={speechStatus}
                        startSound={startSound}
                        stopSound={stopSound}
                        handleCopy={handleCopy}
                        copied={copied}
                    />
                )}
            </motion.div>
        );
    }
);

export { ChatMessage };
