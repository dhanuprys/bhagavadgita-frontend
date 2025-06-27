'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Bookmark, Share2, Copy, Check, MessageCircle } from 'lucide-react';
import { NavLink } from 'react-router';

interface VerseQuickActionsProps {
    chapterNumber: number;
    verseNumber: number;
    verseText: string;
}

export function VerseQuickActions({
    chapterNumber,
    verseNumber,
    verseText,
}: VerseQuickActionsProps) {
    const [copied, setCopied] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    const handleCopy = async () => {
        const textToCopy = `Bhagavad Gita ${chapterNumber}.${verseNumber}: ${verseText}`;
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title: `Bhagavad Gita ${chapterNumber}.${verseNumber}`,
                text: verseText,
                url: window.location.href,
            });
        }
    };

    const handleBookmark = () => {
        setBookmarked(!bookmarked);
        // Here you would typically save to localStorage or a backend
    };

    return (
        <Card className="border elegant-border bg-white/80 backdrop-blur-sm shadow-sm">
            <div className="p-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleBookmark}
                            className={`hover:bg-gray-100 ${
                                bookmarked ? 'text-violet-600' : 'text-gray-600'
                            }`}
                        >
                            <Bookmark
                                className={`w-4 h-4 ${
                                    bookmarked ? 'fill-current' : ''
                                }`}
                            />
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopy}
                            className="hover:bg-gray-100 text-gray-600"
                        >
                            {copied ? (
                                <Check className="w-4 h-4 text-green-600" />
                            ) : (
                                <Copy className="w-4 h-4" />
                            )}
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleShare}
                            className="hover:bg-gray-100 text-gray-600"
                        >
                            <Share2 className="w-4 h-4" />
                        </Button>
                    </div>

                    <Button
                        asChild
                        size="sm"
                        className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-xs"
                    >
                        <NavLink
                            to="/chat"
                            className="flex items-center gap-1.5"
                        >
                            <MessageCircle className="w-3 h-3" />
                            <span>Tanya AI</span>
                        </NavLink>
                    </Button>
                </div>
            </div>
        </Card>
    );
}
