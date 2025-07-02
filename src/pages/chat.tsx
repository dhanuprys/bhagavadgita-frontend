'use client';

import type React from 'react';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ChatMessage } from '@/components/chat/optimized-chat-message';
import { ChatHeader } from '@/components/chat/chat-header';
import { ThinkingAnimation } from '@/components/chat/thinking-animation';
import { ErrorAlert } from '@/components/chat/error-alert';
import { WelcomeScreen } from '@/components/chat/welcome-screen';
import {
    saveConversation,
    loadConversation,
    pickCrossPagePrompt,
} from '@/lib/storage';
import type { ChatMessage as ChatMessageType, ChatState } from '@/types/chat';
import axios from 'axios';
import { useIsMobile } from '../hooks/use-mobile';
import { useTitle } from '@/hooks/use-title';

export default function Chat() {
    useTitle('Chat');

    const isMobile = useIsMobile();
    const [chatState, setChatState] = useState<ChatState>({
        messages: [],
        isThinking: false,
        error: null,
        input: '',
        conversationStarted: false,
    });
    const [bottomSpaceHeight, setBottomSpaceHeight] = useState(0);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const chatScrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    });

    // Load conversation on mount
    useEffect(() => {
        const savedMessages = loadConversation();
        if (savedMessages.length > 0) {
            setChatState((prev) => ({
                ...prev,
                messages: savedMessages,
                conversationStarted: true,
            }));
        }

        const crossPagePrompt = pickCrossPagePrompt();

        if (crossPagePrompt) {
            setChatState((prev) => ({
                ...prev,
                input: crossPagePrompt,
                conversationStarted: true,
            }));

            setTimeout(() => sendChat(crossPagePrompt), 500);
        }
    }, []);

    // Save conversation whenever messages change
    useEffect(() => {
        if (chatState.messages.length > 0) {
            saveConversation(chatState.messages);
        }
    }, [chatState.messages]);

    // const scrollToBottom = useCallback(() => {
    //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // }, []);

    const scrollToLastUserMessage = useCallback(() => {
        setTimeout(() => {
            const lastUserMessage =
                document.getElementById('last-user-message');
            if (!lastUserMessage || !chatScrollRef.current) return;

            chatScrollRef.current.scroll({
                top: lastUserMessage.offsetTop - 10,
                left: 0,
                behavior: 'smooth',
            });
        }, 200);
    }, []);

    useEffect(() => {
        scrollToLastUserMessage();
    }, [chatState.messages, chatState.isThinking, scrollToLastUserMessage]);

    useEffect(() => {
        if (chatState.isThinking) return;

        setTimeout(() => {
            const lastUserMessage =
                document.getElementById('last-user-message');
            const lastAssistantMessage = document.getElementById(
                'last-assistant-message'
            );

            if (!chatScrollRef.current) return;

            let lastUserMessageHeight = 0;
            let lastAssistantMessageHeight = 0;

            if (lastUserMessage) {
                lastUserMessageHeight = lastUserMessage.clientHeight;
            }

            if (lastAssistantMessage) {
                lastAssistantMessageHeight = lastAssistantMessage.clientHeight;
            }

            const chatScrollHeight = chatScrollRef.current.offsetHeight;
            const focusElementHeight =
                lastUserMessageHeight + lastAssistantMessageHeight;
            const calculatedHeight = chatScrollHeight - focusElementHeight - 40;

            setBottomSpaceHeight(calculatedHeight);
        }, 200);
    }, [chatState.isThinking]);

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (!chatState.input.trim() || chatState.isThinking) return;

            sendChat(chatState.input.trim());
        },
        [chatState.input, chatState.isThinking]
    );

    const sendChat = useCallback(async (message: string) => {
        const userMessage: ChatMessageType = {
            id: Date.now().toString(),
            role: 'user',
            answer_system: 'semantic',
            content: message,
            attachments: [],
            timestamp: new Date(),
        };

        setChatState((prev) => ({
            ...prev,
            messages: [...prev.messages, userMessage],
            input: '',
            isThinking: true,
            error: null,
            conversationStarted: true,
        }));

        try {
            const response = await axios.post(
                '/prompt',
                {
                    message,
                },
                {
                    baseURL: import.meta.env.VITE_API_BASE_URL,
                }
            );

            if (response.status !== 200) {
                throw new Error('An error occured!');
            }

            const isNotFound =
                response.data.answer.includes('tidak ditemukan landasan') ||
                response.data.answer.includes('tidak sesuai konteks');

            const aiMessage: ChatMessageType = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                answer_system: response.data.answer_system || 'semantic',
                content: response.data.answer,
                attachments: response.data.attachments,
                context: response.data.context,
                quickReplies: isNotFound ? response.data.suggestions : [],
                timestamp: new Date(),
            };

            setChatState((prev) => ({
                ...prev,
                messages: [...prev.messages, aiMessage],
                isThinking: false,
            }));
        } catch (error) {
            setChatState((prev) => ({
                ...prev,
                isThinking: false,
                error:
                    error instanceof Error
                        ? error.message
                        : 'An unexpected error occurred',
            }));
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setChatState((prev) => ({ ...prev, input: e.target.value }));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (textareaRef.current) {
                const form = textareaRef.current.closest('form');
                if (form) {
                    const submitEvent = new Event('submit', {
                        cancelable: true,
                        bubbles: true,
                    });
                    form.dispatchEvent(submitEvent);
                }
            }
        }
    };

    const handleQuickReply = (reply: string) => {
        setChatState((prev) => ({ ...prev, input: reply }));
        setTimeout(() => {
            if (textareaRef.current) {
                const form = textareaRef.current.closest('form');
                if (form) {
                    const submitEvent = new Event('submit', {
                        cancelable: true,
                        bubbles: true,
                    });
                    form.dispatchEvent(submitEvent);
                }
            }
        }, 100);
    };

    const dismissError = () => {
        setChatState((prev) => ({ ...prev, error: null }));
    };

    if (isMobile) {
        return (
            <div className="min-h-screen flex flex-col max-h-screen">
                <div className="bg-gradient-to-r from-slate-50 to-slate-100/80 backdrop-blur-sm border-b border-slate-200/60">
                    <ChatHeader
                        messageCount={chatState.messages.length}
                        isMobile={true}
                    />
                </div>
                <div
                    ref={chatScrollRef}
                    className="relative flex-auto max-h-full overflow-y-auto"
                >
                    {/* Error Alert */}
                    {chatState.error && (
                        <div className="p-4 pb-0">
                            <ErrorAlert
                                error={chatState.error}
                                onDismiss={dismissError}
                            />
                        </div>
                    )}

                    {/* Welcome Screen */}
                    {!chatState.conversationStarted && (
                        <div className="p-4">
                            <WelcomeScreen
                                onQuickReply={handleQuickReply}
                                disabled={chatState.isThinking}
                            />
                        </div>
                    )}

                    {/* Messages */}
                    <div className="pt-2">
                        <AnimatePresence mode="popLayout">
                            {chatState.messages.map((message, index) => (
                                <ChatMessage
                                    key={message.id}
                                    message={message}
                                    index={index}
                                    onQuickReply={handleQuickReply}
                                    disabled={chatState.isThinking}
                                    isLastUser={
                                        (chatState.messages.length - 1 ===
                                            index ||
                                            chatState.messages.length - 2 ===
                                                index) &&
                                        message.role === 'user'
                                    }
                                    isLastAssistant={
                                        chatState.messages.length - 1 ===
                                            index &&
                                        message.role === 'assistant'
                                    }
                                />
                            ))}

                            {chatState.isThinking && (
                                <motion.div key="thinking">
                                    <ThinkingAnimation />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div ref={messagesEndRef} />
                    {!chatState.isThinking && (
                        <div style={{ height: `${bottomSpaceHeight}px` }}></div>
                    )}
                </div>
                <div className="fixed bottom-0 w-full border-t bg-slate-50/95 backdrop-blur-sm p-4 space-y-2">
                    <form
                        onSubmit={handleSubmit}
                        className="flex gap-3 items-end"
                    >
                        <div className="flex-1">
                            <Textarea
                                ref={textareaRef}
                                value={chatState.input}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Tanyakan bhagavad gita..."
                                className="min-h-[44px] max-h-[100px] resize-none border-slate-200/60 focus:border-slate-300 focus:ring-slate-200/50 bg-white/95 backdrop-blur-sm text-slate-700 placeholder:text-slate-400 text-sm rounded-2xl"
                                disabled={chatState.isThinking}
                            />
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button
                                type="submit"
                                disabled={
                                    !chatState.input.trim() ||
                                    chatState.isThinking
                                }
                                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-slate-700 hover:to-slate-800 text-white border-0 w-11 h-11 rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </motion.div>
                    </form>
                    <div className="text-center text-xs text-gray-400">
                        *AI bisa saja membuat kesalahan informasi.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="hidden sm:block min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100/50">
            <div className="container mx-auto px-4 py-6 max-w-5xl">
                {/* Chat Container */}
                <Card className="shadow-2xl gap-y-0 border-0 !py-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                    <div className="border-b bg-gradient-to-r from-slate-50 to-slate-100/80 backdrop-blur-sm p-4">
                        <ChatHeader messageCount={chatState.messages.length} />
                    </div>

                    <CardContent className="p-0">
                        {/* Messages Area */}
                        <div
                            ref={chatScrollRef}
                            className="h-[60vh] overflow-y-auto bg-white"
                        >
                            {/* Error Alert - Inside messages area */}
                            {chatState.error && (
                                <div className="p-6 pb-0">
                                    <ErrorAlert
                                        error={chatState.error}
                                        onDismiss={dismissError}
                                    />
                                </div>
                            )}

                            {/* Welcome Screen */}
                            {!chatState.conversationStarted && (
                                <div className="p-6">
                                    <WelcomeScreen
                                        onQuickReply={handleQuickReply}
                                        disabled={chatState.isThinking}
                                    />
                                </div>
                            )}

                            {/* Messages */}
                            <div className="pt-4">
                                <AnimatePresence mode="popLayout">
                                    {chatState.messages.map(
                                        (message, index) => (
                                            <ChatMessage
                                                key={message.id}
                                                message={message}
                                                index={index}
                                                onQuickReply={handleQuickReply}
                                                disabled={chatState.isThinking}
                                                isLastUser={
                                                    (chatState.messages.length -
                                                        1 ===
                                                        index ||
                                                        chatState.messages
                                                            .length -
                                                            2 ===
                                                            index) &&
                                                    message.role === 'user'
                                                }
                                                isLastAssistant={
                                                    chatState.messages.length -
                                                        1 ===
                                                        index &&
                                                    message.role === 'assistant'
                                                }
                                            />
                                        )
                                    )}

                                    {chatState.isThinking && (
                                        <motion.div key="thinking">
                                            <ThinkingAnimation />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="border-t bg-slate-50/80 backdrop-blur-sm p-6 space-y-4">
                            <form
                                onSubmit={handleSubmit}
                                className="flex gap-4"
                            >
                                <div className="flex-1">
                                    <Textarea
                                        ref={textareaRef}
                                        value={chatState.input}
                                        onChange={handleInputChange}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Tanyakan seputar Bhagavad Gita..."
                                        className="min-h-[60px] max-h-[120px] resize-none border-slate-200/60 focus:border-slate-300 focus:ring-slate-200/50 bg-white/80 backdrop-blur-sm text-slate-700 placeholder:text-slate-400"
                                        disabled={chatState.isThinking}
                                    />
                                </div>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Button
                                        type="submit"
                                        disabled={
                                            !chatState.input.trim() ||
                                            chatState.isThinking
                                        }
                                        className="self-end bg-gradient-to-r from-purple-600 to-purple-700 hover:from-slate-700 hover:to-slate-800 text-white border-0 px-6 py-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                    >
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </motion.div>
                            </form>
                            <div className="text-center text-xs text-gray-400">
                                *AI bisa saja membuat kesalahan informasi.
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center mt-8 text-slate-500 text-sm">
                    <p>
                        Powered by{' '}
                        <strong className="font-bold">Dedan Labs</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}
