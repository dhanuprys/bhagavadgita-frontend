import { NavLink } from 'react-router';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../ui/card';
import { ArrowRight, AudioWaveformIcon } from 'lucide-react';
import { Badge } from '../ui/badge';
import { getVerses } from '@/requests/get-verses';

interface VersesProps {
    chapterNumber: number;
}

export default function Verses({ chapterNumber }: VersesProps) {
    const { data: verses, isLoading } = getVerses(chapterNumber);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="fade-in">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Sloka-Sloka
            </h2>

            <div className="space-y-4">
                {verses?.map((verse, index) => (
                    <NavLink
                        key={verse.id}
                        to={`/chapter/${chapterNumber}/verse/${verse.verse_number}`}
                        className="group block"
                        style={{
                            animationDelay: `${index * 0.05}s`,
                        }}
                    >
                        <Card className="transition-all duration-300 hover:shadow-lg cursor-pointer border elegant-border bg-white/80 backdrop-blur-sm slide-up">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                            <span className="text-sm font-medium text-gray-700">
                                                {verse.verse_number}
                                            </span>
                                        </div>
                                        <CardTitle className="text-base font-semibold">
                                            Sloka {verse.verse_number}
                                        </CardTitle>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs group-hover:text-gray-600 font-medium text-gray-400">
                                            Baca sloka
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="pt-0 space-y-3">
                                <div className="p-3 rounded-lg bg-gray-50/80 border elegant-border">
                                    <p className="text-xs font-medium text-gray-500 mb-2">
                                        Sanskerta:
                                    </p>
                                    <p className="font-serif italic text-gray-800 text-sm leading-relaxed">
                                        {verse.text_sanskrit}
                                    </p>
                                </div>
                                <div>
                                    {/* <p className="text-xs font-medium text-gray-500 mb-2">
                                        Terjemahan:
                                    </p> */}
                                    <CardDescription className="text-sm leading-relaxed text-gray-700 line-clamp-2">
                                        {verse.text_sanskrit_meanings}
                                    </CardDescription>
                                </div>
                                <div>
                                    <Badge className="bg-gradient-to-br from-purple-800 to-purple-500">
                                        <AudioWaveformIcon />
                                        dengan audio
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}
