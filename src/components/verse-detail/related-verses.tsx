import { NavLink } from 'react-router';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../ui/card';
import { ArrowRightIcon } from 'lucide-react';
import type { Verse } from '@/lib/data';

export default function RelatedVerses() {
    const relatedVerses: Verse[] = [];

    if (relatedVerses.length > 0) {
        return null;
    }

    return (
        <div className="fade-in">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Sloka Terkait
            </h2>

            <div className="space-y-4">
                {relatedVerses.map((relatedVerse, index) => (
                    <NavLink
                        key={relatedVerse.number}
                        to={`/chapter/2/verse/${relatedVerse.number}`}
                        className="group block slide-up"
                        style={{
                            animationDelay: `${index * 0.1}s`,
                        }}
                    >
                        <Card className="transition-all duration-300 hover:shadow-lg cursor-pointer border elegant-border bg-white/80 backdrop-blur-sm">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                            <span className="text-sm font-medium text-gray-700">
                                                {relatedVerse.number}
                                            </span>
                                        </div>
                                        <CardTitle className="text-base font-semibold">
                                            Sloka {relatedVerse.number}
                                        </CardTitle>
                                    </div>
                                    <ArrowRightIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
                                </div>
                            </CardHeader>

                            <CardContent className="pt-0 space-y-3">
                                <p className="font-serif italic text-sm text-gray-600 bg-gray-50/80 p-3 rounded border elegant-border">
                                    {relatedVerse.sanskrit}
                                </p>
                                <CardDescription className="text-sm leading-relaxed">
                                    {relatedVerse.translation}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}
