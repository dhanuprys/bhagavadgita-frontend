import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Menu, X, Home, MessageCircle, Search } from 'lucide-react';
import { QuickNavigation } from './quick-navigation';
import { NavLink } from 'react-router';

export function MobileNavigation() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Menu Button */}
            <div className="fixed bottom-4 right-4 z-50 sm:hidden">
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg"
                >
                    {isOpen ? (
                        <X className="w-5 h-5" />
                    ) : (
                        <Menu className="w-5 h-5" />
                    )}
                </Button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 sm:hidden"
                        onClick={() => setIsOpen(false)}
                    />
                    <Card className="fixed bottom-20 right-4 w-64 z-50 border elegant-border bg-white/95 backdrop-blur-md shadow-xl sm:hidden">
                        <div className="p-4 space-y-3">
                            <NavLink
                                to="/"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                                <Home className="w-5 h-5 text-gray-600" />
                                <span className="font-medium text-gray-900">
                                    Beranda
                                </span>
                            </NavLink>

                            <div className="flex items-center gap-3 p-3">
                                <Search className="w-5 h-5 text-gray-600" />
                                <div className="flex-1">
                                    <QuickNavigation />
                                </div>
                            </div>

                            <NavLink
                                to="/chat"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                                <MessageCircle className="w-5 h-5 text-violet-600" />
                                <span className="font-medium text-gray-900">
                                    Chat BhagavadAI
                                </span>
                            </NavLink>
                        </div>
                    </Card>
                </>
            )}
        </>
    );
}
