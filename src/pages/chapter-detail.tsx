import { BreadcrumbNav } from '@/components/shared/breadcrumb-nav';
import { ChatAdvertisement } from '@/components/shared/chat-advertisement';
import { ChapterOverview } from '@/components/chapter-detail/chapter-overview';
import { ReadingProgress } from '@/components/shared/reading-progress';
import { MobileNavigation } from '@/components/shared/mobile-navigation';
import { useParams } from 'react-router';
import ChapterHeader from '@/components/chapter-detail/chapter-header';
import Verses from '@/components/chapter-detail/verses';
import NavigationBack from '@/components/chapter-detail/navigation-back';
import SafeWidth from '@/components/safe-width';
import { getChapterDetail } from '@/requests/get-chapters';
import FullPageLoading from '@/components/shared/full-page-loading';
import { useTitle } from '@/hooks/use-title';

export default function ChapterDetailPage() {
    const { chapterNumber } = useParams<{ chapterNumber: string }>();
    const chapterNum = Number.parseInt(chapterNumber!);
    const { data: chapter, isLoading: isChapterLoading } =
        getChapterDetail(chapterNum);

    useTitle(`Bab ${chapterNumber}`);

    if (isChapterLoading || chapter === undefined) {
        return <FullPageLoading />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <ReadingProgress chapterNumber={chapterNum} />

            <SafeWidth className="py-20 space-y-4 md:space-y-8">
                <BreadcrumbNav
                    items={[
                        {
                            label: `Bab ${chapter.chapter_number}`,
                            href: `/chapter/${chapter.chapter_number}`,
                        },
                        { label: chapter.name },
                    ]}
                />

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-8">
                        <ChapterHeader chapter={chapter} />
                        <div className="fade-in">
                            <ChatAdvertisement compact />
                        </div>
                        <Verses chapterNumber={chapterNum} />
                        <NavigationBack />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="sticky top-24">
                            <ChapterOverview chapter={chapter} />
                        </div>
                    </div>
                </div>
            </SafeWidth>

            <MobileNavigation />
        </div>
    );
}
