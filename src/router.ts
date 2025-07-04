import { createBrowserRouter } from 'react-router';
import Chat from './pages/chat.tsx';
import HomePage from './pages/home.tsx';
import ChapterDetailPage from './pages/chapter-detail.tsx';
import VerseDetailPage from './pages/verse-detail.tsx';
import ApiDocsPage from './pages/api-docs.tsx';

export default createBrowserRouter([
    {
        path: '/',
        Component: HomePage,
    },
    {
        path: '/chapter/:chapterNumber',
        Component: ChapterDetailPage,
    },
    {
        path: '/chapter/:chapterNumber/verse/:verseNumber',
        Component: VerseDetailPage,
    },
    {
        path: '/chat',
        Component: Chat,
    },
    {
        path: '/api-docs',
        Component: ApiDocsPage,
    },
]);
