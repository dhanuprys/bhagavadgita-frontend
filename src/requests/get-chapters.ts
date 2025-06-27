import type { Chapter } from '@/types/gita';
import useSWRImmutable from 'swr/immutable';
import fetcher from '../lib/fetcher';

export function getChapters() {
    const response = useSWRImmutable('/chapter', (url) =>
        fetcher<Chapter[]>(url)
    );

    return response;
}

export function getChapterDetail(chapterNumber: number) {
    const response = useSWRImmutable(`/chapter/${chapterNumber}`, (url) =>
        fetcher<Chapter>(url)
    );
    return response;
}
