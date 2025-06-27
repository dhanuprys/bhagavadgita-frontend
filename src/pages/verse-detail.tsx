import { BreadcrumbNav } from '@/components/shared/breadcrumb-nav';
import { VerseNavigation } from '@/components/verse-detail/verse-navigation';
import { ChatAdvertisement } from '@/components/shared/chat-advertisement';
import { ReadingProgress } from '@/components/shared/reading-progress';
import { MobileNavigation } from '@/components/shared/mobile-navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { NavLink, useParams } from 'react-router';
import SafeWidth from '@/components/safe-width';
import VerseCard from '@/components/verse-detail/verse-card';
import RelatedVerses from '@/components/verse-detail/related-verses';
import { getVerseDetail } from '@/requests/get-verses';
import { getChapterDetail } from '@/requests/get-chapters';
import { VerseAudioPlayer } from '@/components/verse-detail/verse-audio-player';
import FullPageLoading from '@/components/shared/full-page-loading';

export default function VerseDetailPage() {
    const { chapterNumber, verseNumber } = useParams<{
        chapterNumber: string;
        verseNumber: string;
    }>();
    const chapterNum = Number.parseInt(chapterNumber!);
    const verseNum = Number.parseInt(verseNumber!);

    const { data: chapter, isLoading: isChapterLoading } =
        getChapterDetail(chapterNum);
    const { data: verseDetail, isLoading: isVerseLoading } = getVerseDetail(
        chapterNum,
        verseNum
    );
    // const relatedVerses = getRelatedVerses(chapterNum, verseNum);

    if (
        isChapterLoading ||
        chapter === undefined ||
        isVerseLoading ||
        verseDetail === undefined
    ) {
        return <FullPageLoading />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <ReadingProgress
                chapterNumber={chapterNum}
                verseNumber={verseNum}
                totalVerses={chapter.verses_count}
            />

            <SafeWidth className="py-20 space-y-4 md:space-y-8">
                <BreadcrumbNav
                    items={[
                        {
                            label: `Bab ${chapter.chapter_number}`,
                            href: `/chapter/${chapter.chapter_number}`,
                        },
                        {
                            label: chapter.name,
                            href: `/chapter/${chapter.chapter_number}`,
                        },
                        { label: `Sloka ${verseDetail.verse_number}` },
                    ]}
                />

                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Badge
                            variant="secondary"
                            className="bg-gray-100 text-gray-700 border-0 text-sm font-medium"
                        >
                            Bab {chapter.chapter_number}
                        </Badge>
                        <Badge
                            variant="outline"
                            className="bg-white border elegant-border text-sm"
                        >
                            Sloka {verseDetail.verse_number}
                        </Badge>
                    </div>

                    {/* Back to Chapter Button */}
                    <Button
                        variant="outline"
                        asChild
                        className="bg-white/80 backdrop-blur-sm border elegant-border"
                    >
                        <NavLink
                            to={`/chapter/${chapter.chapter_number}`}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="hidden sm:inline">
                                Kembali ke Bab
                            </span>
                            <span className="sm:hidden">Bab</span>
                        </NavLink>
                    </Button>
                </div>

                {/* Main Verse Card */}
                <VerseCard
                    chapterTitle={chapter.name}
                    verseNumber={verseDetail.verse_number}
                    sanskritText={verseDetail.text_sanskrit}
                    translation={verseDetail.translations[0].content}
                />

                <VerseAudioPlayer audioUrl={verseDetail.audio_url} />

                {/* Quick Actions */}
                {/* <div className="mb-6">
                        <VerseQuickActions
                            chapterNumber={chapterNum}
                            verseNumber={verseNum}
                            verseText={verse.translation}
                        />
                    </div> */}

                {/* Verse Navigation */}
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border elegant-border shadow-sm">
                    <VerseNavigation
                        chapterNumber={chapterNum}
                        currentVerse={verseNum}
                        totalVerses={chapter.verses_count}
                    />
                </div>

                {/* Chat Advertisement - Compact Version */}
                <div className="mb-6 fade-in">
                    <ChatAdvertisement compact />
                </div>

                {/* Related Verses */}
                <RelatedVerses />
            </SafeWidth>

            <MobileNavigation />
        </div>
    );
}
