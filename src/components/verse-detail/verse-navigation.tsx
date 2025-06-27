import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router';

interface VerseNavigationProps {
    chapterNumber: number;
    currentVerse: number;
    totalVerses: number;
}

export function VerseNavigation({
    chapterNumber,
    currentVerse,
    totalVerses,
}: VerseNavigationProps) {
    const prevVerse = currentVerse > 1 ? currentVerse - 1 : null;
    const nextVerse = currentVerse < totalVerses ? currentVerse + 1 : null;

    return (
        <div className="flex items-center justify-between">
            {/* Previous Button */}
            {prevVerse ? (
                <Button
                    variant="outline"
                    asChild
                    className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:shadow-sm transition-all duration-200"
                >
                    <NavLink
                        to={`/chapter/${chapterNumber}/verse/${prevVerse}`}
                        className="flex items-center gap-2"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">
                            Sloka {prevVerse}
                        </span>
                    </NavLink>
                </Button>
            ) : (
                <div />
            )}

            {/* Progress Indicator */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border elegant-border">
                <span className="text-sm text-gray-600">
                    {currentVerse} dari {totalVerses}
                </span>
            </div>

            {/* Next Button */}
            {nextVerse ? (
                <Button
                    variant="outline"
                    asChild
                    className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:shadow-sm transition-all duration-200"
                >
                    <NavLink
                        to={`/chapter/${chapterNumber}/verse/${nextVerse}`}
                        className="flex items-center gap-2"
                    >
                        <span className="text-sm font-medium">
                            Sloka {nextVerse}
                        </span>
                        <ChevronRight className="w-4 h-4" />
                    </NavLink>
                </Button>
            ) : (
                <div />
            )}
        </div>
    );
}
