import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Clock, Target } from 'lucide-react';
import type { Chapter } from '@/types/gita';

interface ChapterOverviewProps {
    chapter: Chapter;
}

export function ChapterOverview({ chapter }: ChapterOverviewProps) {
    const estimatedReadTime = Math.ceil(chapter.verses_count * 0.5); // 30 seconds per verse

    return (
        <Card className="border elegant-border bg-white/80 backdrop-blur-sm shadow-sm">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">
                    Ringkasan Bab
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 mx-auto mb-2">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                            {chapter.verses_count}
                        </p>
                        <p className="text-xs text-gray-500">Sloka</p>
                    </div>

                    <div className="text-center">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 mx-auto mb-2">
                            <Clock className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                            {estimatedReadTime}
                        </p>
                        <p className="text-xs text-gray-500">Menit Baca</p>
                    </div>

                    <div className="text-center">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 mx-auto mb-2">
                            <Target className="w-5 h-5 text-purple-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                            {chapter.chapter_number}
                        </p>
                        <p className="text-xs text-gray-500">Bab</p>
                    </div>
                </div>

                {/* <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progres Membaca</span>
                        <span className="text-gray-900 font-medium">0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                </div>

                <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-900">
                        Tema Utama
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-xs">
                            Dharma
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                            Kewajiban
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                            Kebijaksanaan
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                            Tindakan
                        </Badge>
                    </div>
                </div> */}
            </CardContent>
        </Card>
    );
}
