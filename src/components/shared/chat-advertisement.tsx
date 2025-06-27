import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Sparkles, Zap, Brain } from 'lucide-react';
import { NavLink } from 'react-router';

interface ChatAdvertisementProps {
    compact?: boolean;
}

export function ChatAdvertisement({ compact = false }: ChatAdvertisementProps) {
    if (compact) {
        return (
            <Card className="border elegant-border bg-gradient-to-r from-violet-50/80 via-purple-50/80 to-indigo-50/80 backdrop-blur-sm shadow-sm overflow-hidden relative">
                {/* Minimal background pattern for compact version */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-2 right-3">
                        <Sparkles className="w-4 h-4 text-violet-500" />
                    </div>
                    <div className="absolute bottom-2 left-3">
                        <Bot className="w-4 h-4 text-indigo-500" />
                    </div>
                </div>

                <div className="relative p-3 sm:p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-600 flex items-center justify-center shadow-md">
                                <Bot className="w-4 h-4 text-white" />
                            </div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-sm font-bold text-gray-900">
                                    BhagavadAI
                                </h3>
                                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-violet-100 border border-violet-200">
                                    <Sparkles className="w-2.5 h-2.5 text-violet-600" />
                                    <span className="text-xs font-medium text-violet-700">
                                        AI
                                    </span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Dapatkan wawasan AI tentang Sloka dan ajaran
                            </p>
                        </div>

                        <div className="flex-shrink-0">
                            <Button
                                asChild
                                size="sm"
                                className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200 text-xs"
                            >
                                <NavLink
                                    to="/chat"
                                    className="flex items-center gap-1.5"
                                >
                                    <Bot className="w-3 h-3" />
                                    <span>Chat</span>
                                </NavLink>
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }

    // Full version for landing page
    return (
        <Card className="border elegant-border bg-gradient-to-r from-violet-50/80 via-purple-50/80 to-indigo-50/80 backdrop-blur-sm shadow-sm overflow-hidden relative">
            {/* AI-themed background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-3 right-4">
                    <Sparkles className="w-6 h-6 text-violet-500 animate-pulse" />
                </div>
                <div className="absolute top-6 right-12">
                    <Zap className="w-4 h-4 text-purple-500" />
                </div>
                <div className="absolute bottom-4 left-4">
                    <Brain className="w-8 h-8 text-indigo-500" />
                </div>
                <div className="absolute bottom-6 left-16">
                    <Sparkles className="w-3 h-3 text-violet-400" />
                </div>
            </div>

            <div className="relative p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
                            <Bot className="w-6 h-6 text-white" />
                        </div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold text-gray-900">
                                BhagavadAI
                            </h3>
                            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-100 border border-violet-200">
                                <Sparkles className="w-3 h-3 text-violet-600" />
                                <span className="text-xs font-medium text-violet-700">
                                    Bertenaga AI
                                </span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Ajukan pertanyaan tentang Sloka-Sloka, jelajahi
                            makna yang lebih dalam, dan dapatkan wawasan
                            personal dari panduan AI kami yang dilatih dengan
                            kebijaksanaan kuno.
                        </p>
                    </div>

                    <div className="flex-shrink-0 w-full sm:w-auto">
                        <Button
                            asChild
                            className="w-full sm:w-auto bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                            <NavLink
                                to="/chat"
                                className="flex items-center gap-2"
                            >
                                <Bot className="w-4 h-4" />
                                <span>Chat dengan AI</span>
                                <Sparkles className="w-3 h-3" />
                            </NavLink>
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
