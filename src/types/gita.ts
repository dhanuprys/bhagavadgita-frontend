export interface Chapter {
    id: number;
    name: string;
    chapter_number: number;
    summary: string;
    verses_count: number;
}

export interface Verse {
    id: number;
    verse_number: number;
    text_hindi: string;
    text_sanskrit: string;
    text_sanskrit_meanings: string;
    audio_url: string;
    chapter_id: number;
}

export interface VerseTranslation {
    id: number;
    verse_id: number;
    content: string;
}

export type VerseDetail = Verse & {
    translations: VerseTranslation[];
};
