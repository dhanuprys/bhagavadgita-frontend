import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';

interface VerseCardProps {
    verseNumber: number;
    chapterTitle: string;
    hindiText: string;
    sanskritText: string;
    translation: string;
}

export default function VerseCard({
    verseNumber,
    chapterTitle,
    hindiText,
    sanskritText,
    translation,
}: VerseCardProps) {
    return (
        <Card className="border elegant-border bg-white/80 backdrop-blur-sm shadow-sm">
            <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900">
                    Sloka {verseNumber}
                </CardTitle>
                <p className="text-sm text-gray-500">
                    Dari{' '}
                    <strong className="font-semibold">{chapterTitle}</strong>
                </p>
            </CardHeader>

            <CardContent className="space-y-6">
                <div>
                    <p className="font-bold text-xl">{hindiText}</p>
                </div>

                {/* Sanskrit Text */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                        Sanskerta
                    </h3>
                    <div className="p-4 rounded-lg bg-gradient-to-r from-gray-50/80 to-gray-100/80 border elegant-border">
                        <p className="text-lg font-serif italic text-gray-800 leading-relaxed">
                            {sanskritText}
                        </p>
                    </div>
                </div>

                <Separator className="bg-gray-200" />

                {/* Translation */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                        Terjemahan
                    </h3>
                    <p className="text-base leading-relaxed text-gray-800">
                        {translation}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
