import type { Verse, VerseDetail } from '@/types/gita';
import useSWRImmutable from 'swr/immutable';
import fetcher from '../lib/fetcher';

export function getVerses(chapterNumber: number) {
    const response = useSWRImmutable(
        `http://localhost:8000/chapter/${chapterNumber}/verse`,
        (url) => fetcher<Verse[]>(url)
    );

    return response;
}

export function getVerseDetail(chapterNumber: number, verseNumber: number) {
    const response = useSWRImmutable(
        `http://localhost:8000/chapter/${chapterNumber}/verse/${verseNumber}`,
        (url) => fetcher<VerseDetail>(url)
    );

    return response;
}
