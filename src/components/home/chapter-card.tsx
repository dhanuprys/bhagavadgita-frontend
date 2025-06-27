import { NavLink } from 'react-router';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import type { Chapter } from '@/types/gita';

interface ChapterCardProps {
    chapter: Chapter;
}

export function ChapterCard({ chapter }: ChapterCardProps) {
    return (
        <NavLink
            to={`/chapter/${chapter.chapter_number}`}
            className="group block"
        >
            <Card className="h-full transition-all duration-300 hover:shadow-lg cursor-pointer border elegant-border bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                        <Badge
                            variant="secondary"
                            className="bg-gray-100 text-gray-700 border-0 text-xs font-medium"
                        >
                            Bab {chapter.chapter_number}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                            <span>{chapter.verses_count}</span>
                            <span>Sloka</span>
                        </div>
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-gray-700 transition-colors">
                        {chapter.name}
                    </CardTitle>
                </CardHeader>

                <CardContent className="pt-0">
                    <CardDescription className="text-sm leading-relaxed text-gray-600 mb-4">
                        {chapter.summary.slice(0, 100)}...
                    </CardDescription>

                    <div className="flex items-center text-gray-500 text-sm font-medium group-hover:text-gray-700 transition-colors">
                        <span>Baca Bab</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                </CardContent>
            </Card>
        </NavLink>
    );
}
