import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export const ThinkingAnimation = React.forwardRef<HTMLDivElement>(
    (props, ref) => {
        const [isNeedMoreTime, setNeedMoreTime] = useState(false);

        useEffect(() => {
            setTimeout(() => {
                setNeedMoreTime(true);
            }, 4000);
        }, []);

        return (
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="w-full min-h-[100vh] py-2 px-4 sm:px-6 mb-6 sm:mb-8"
                ref={ref}
                {...props}
            >
                <div className="max-w-4xl mx-auto space-y-4">
                    {/* Keep thinking text beside the icon */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        <motion.div
                            className="flex-shrink-0"
                            animate={{
                                rotate: [0, 5, -5, 0],
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: 'easeInOut',
                            }}
                        >
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full sm:rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center shadow-sm border border-slate-200/50">
                                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                            </div>
                        </motion.div>
                        <div>
                            <div className="flex items-center gap-2 sm:gap-3">
                                <span className="text-sm text-slate-600 font-medium">
                                    {isNeedMoreTime
                                        ? 'Sedang menyusun jawaban'
                                        : 'BhagavadAI sedang berpikir'}
                                </span>
                                <div className="flex gap-1">
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-slate-400 rounded-full"
                                            animate={{
                                                scale: [1, 1.4, 1],
                                                opacity: [0.4, 1, 0.4],
                                            }}
                                            transition={{
                                                duration: 1.2,
                                                repeat: Number.POSITIVE_INFINITY,
                                                delay: i * 0.2,
                                                ease: 'easeInOut',
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                            {isNeedMoreTime && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-xs text-muted-foreground"
                                >
                                    ini mungkin membutuhkan waktu lebih...
                                </motion.div>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2">
                        {[1, 2, 3, 4].map((num) => (
                            <motion.div
                                key={num}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    delay: num * 0.2,
                                    duration: 0.2,
                                }}
                            >
                                <div
                                    style={{
                                        animationDelay: `${num * 0.1}s`,
                                    }}
                                    className={cn(
                                        num === 4 ? 'w-3/4' : 'w-full',
                                        'ease-in-out rounded-md bg-gradient-to-r animate-pulse from-gray-600/20 to-gray-400/20 h-[25px]'
                                    )}
                                ></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        );
    }
);
