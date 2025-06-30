import type { Chapter } from '@/types/gita';
import { Badge } from '../ui/badge';
import { motion } from 'motion/react';

interface ChapterHeaderProps {
    chapter: Chapter;
}

export default function ChapterHeader({ chapter }: ChapterHeaderProps) {
    return (
        <div className="slide-up">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border elegant-border shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-700 border-0 text-sm font-medium"
                    >
                        Bab {chapter.chapter_number}
                    </Badge>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {chapter.name}
                </h1>
                <p className="text-gray-600 leading-relaxed">
                    {chapter.summary}
                </p>
            </div>
        </div>
    );
}
