import { GlobeIcon, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { NavLink } from 'react-router';

interface ChatHeaderProps {
    messageCount: number;
    isMobile?: boolean;
}

export function ChatHeader({ messageCount, isMobile }: ChatHeaderProps) {
    if (isMobile) {
        return (
            <div className="p-4">
                <div className="flex items-center gap-3">
                    <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 20,
                        }}
                        className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center shadow-sm border border-slate-200/50"
                    >
                        <Sparkles className="w-5 h-5 text-slate-600" />
                    </motion.div>
                    <div className="flex-1">
                        <h1 className="text-xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                            BhagavadAI
                        </h1>
                        <p className="text-xs text-slate-500">Dedan Labs</p>
                    </div>
                    <div className="flex gap-1">
                        <NavLink to="/">
                            <Button variant="outline">
                                <GlobeIcon />
                                pustaka
                            </Button>
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="flex gap-1">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-75"></div>
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse delay-150"></div>
                </div>
                <div>
                    <span className="font-semibold text-slate-700">
                        Chat dengan BhagavadAI
                    </span>
                    {messageCount > 0 && (
                        <span className="text-xs text-slate-500 ml-2">
                            ({messageCount} chat)
                        </span>
                    )}
                </div>
            </div>
            <div>
                <NavLink to="/">
                    <Button variant="outline">
                        <GlobeIcon />
                        buka pustaka
                    </Button>
                </NavLink>
            </div>
        </div>
    );
}
