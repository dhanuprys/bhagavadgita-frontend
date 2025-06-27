import { BookIcon } from 'lucide-react';

export default function FullPageLoading() {
    return (
        <div className="fixed z-[999] top-0 left-0 w-screen h-screen flex gap-y-4 flex-col justify-center items-center">
            <BookIcon className="size-8 md:size-12 animate-pulse" />
            <div className="opacity-50 text-sm md:text-base">
                Memuat informasi
            </div>
        </div>
    );
}
