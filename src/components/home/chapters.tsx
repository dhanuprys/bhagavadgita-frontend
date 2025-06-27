import { ChapterCard } from '@/components/home/chapter-card';
import SafeWidth from '../safe-width';
import { getChapters } from '@/requests/get-chapters';

export default function Chapters() {
    const { data: chapters, isLoading, error } = getChapters();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <SafeWidth>
            <div className="slide-up py-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Bab-Bab
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Temukan ajaran mendalam melalui delapan belas bab
                        kebijaksanaan ilahi
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {chapters &&
                        chapters.map((chapter, index) => (
                            <div
                                key={chapter.id}
                                className="slide-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <ChapterCard chapter={chapter} />
                            </div>
                        ))}
                </div>
            </div>
        </SafeWidth>
    );
}
