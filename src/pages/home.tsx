import { ChatAdvertisement } from '@/components/shared/chat-advertisement';
import { QuickNavigation } from '@/components/shared/quick-navigation';
import { MobileNavigation } from '@/components/shared/mobile-navigation';
import Hero from '@/components/home/hero';
import Chapters from '@/components/home/chapters';
import SafeWidth from '@/components/safe-width';
import About from '@/components/home/about';
import ApiAnnouncement from '@/components/home/api-announcement';
import { useTitle } from '@/hooks/use-title';

export default function HomePage() {
    useTitle('Beranda');
    return (
        <div className="min-h-screen space-y-8 bg-gradient-to-br from-gray-50 to-white">
            {/* Header with Quick Navigation */}
            <div className="relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-6xl">
                    <div className="flex justify-end mb-8">
                        <div className="hidden sm:block">
                            <QuickNavigation />
                        </div>
                    </div>
                </div>
            </div>

            <Hero />

            <About />

            <ApiAnnouncement />

            <SafeWidth>
                <ChatAdvertisement />
            </SafeWidth>
            <Chapters />

            {/* Mobile Navigation */}
            <MobileNavigation />
        </div>
    );
}
