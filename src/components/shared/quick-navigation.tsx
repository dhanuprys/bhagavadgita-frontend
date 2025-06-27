'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen } from 'lucide-react';
import { chapters } from '@/lib/data';
import { NavLink } from 'react-router';

export function QuickNavigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredChapters = chapters.filter(
        (chapter) =>
            chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            chapter.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
            chapter.number.toString().includes(searchQuery)
    );

    return (
        <div className="relative">
            <Button
                variant="outline"
                onClick={() => setIsOpen(!isOpen)}
                className="bg-white/80 backdrop-blur-sm border elegant-border hover:bg-white hover:shadow-md transition-all duration-200"
            >
                <Search className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Navigasi Cepat</span>
                <span className="sm:hidden">Cari</span>
            </Button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <Card className="absolute top-12 right-0 w-80 sm:w-96 max-h-96 overflow-hidden z-50 border elegant-border bg-white/95 backdrop-blur-md shadow-xl">
                        <CardContent className="p-4">
                            <div className="space-y-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        placeholder="Cari bab..."
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="pl-10 bg-white/80 border elegant-border"
                                        autoFocus
                                    />
                                </div>

                                <div className="max-h-64 overflow-y-auto space-y-2">
                                    {filteredChapters.map((chapter) => (
                                        <NavLink
                                            key={chapter.number}
                                            to={`/chapter/${chapter.number}`}
                                            onClick={() => setIsOpen(false)}
                                            className="block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 border elegant-border"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-xs font-medium text-gray-700">
                                                        {chapter.number}
                                                    </span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-medium text-gray-900 truncate">
                                                        {chapter.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 truncate">
                                                        {chapter.summary}
                                                    </p>
                                                </div>
                                                <Badge
                                                    variant="secondary"
                                                    className="text-xs"
                                                >
                                                    {chapter.verses.length}a
                                                </Badge>
                                            </div>
                                        </NavLink>
                                    ))}
                                </div>

                                {filteredChapters.length === 0 && (
                                    <div className="text-center py-8 text-gray-500">
                                        <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                        <p className="text-sm">
                                            Tidak ada bab yang ditemukan
                                        </p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    );
}
