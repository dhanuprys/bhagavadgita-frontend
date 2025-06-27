import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import SafeWidth from '../safe-width';

interface ReadingProgressProps {
    chapterNumber?: number;
    verseNumber?: number;
    totalVerses?: number;
}

export function ReadingProgress({
    chapterNumber,
    verseNumber,
    totalVerses,
}: ReadingProgressProps) {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            setScrollProgress(Math.min(100, Math.max(0, progress)));
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const verseProgress =
        verseNumber && totalVerses ? (verseNumber / totalVerses) * 100 : 0;

    return (
        <div className="fixed top-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-sm border-b elegant-border">
            <SafeWidth className="py-4">
                <div className="flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center gap-4">
                        {chapterNumber && (
                            <span className="font-medium text-lg">
                                Bab {chapterNumber}
                            </span>
                        )}
                        {verseNumber && totalVerses && (
                            <span>
                                Sloka {verseNumber} dari {totalVerses}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <span>Progres Membaca</span>
                        <div className="w-20">
                            <Progress value={scrollProgress} className="h-1" />
                        </div>
                    </div>
                </div>
                {verseNumber && totalVerses && (
                    <div className="mt-1">
                        <Progress
                            value={verseProgress}
                            className="h-1 bg-violet-100"
                        />
                    </div>
                )}
            </SafeWidth>
        </div>
    );
}
