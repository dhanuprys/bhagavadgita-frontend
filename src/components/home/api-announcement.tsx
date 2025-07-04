import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Server, Code } from 'lucide-react';
import SafeWidth from '../safe-width';
import { NavLink } from 'react-router';

export default function ApiAnnouncement() {
    return (
        <SafeWidth>
            <div className="fade-in">
                <Card className="bg-gradient-to-r from-indigo-50 to-violet-50 backdrop-blur-sm rounded-2xl p-8 border elegant-border shadow-sm">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                            <Server className="w-8 h-8 text-indigo-600" />
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                Dokumentasi API Kini Tersedia
                            </h2>
                            <p className="text-gray-600 mb-4 max-w-2xl">
                                Akses kebijaksanaan Bhagavad Gita secara
                                terprogram melalui API kami yang komprehensif.
                                Bangun aplikasi, situs web, atau layanan yang
                                menggabungkan kebijaksanaan abadi dari Gita.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                                <Button asChild className="gap-2 bg-purple-600">
                                    <NavLink to="/api-docs">
                                        <Server className="w-4 h-4" />
                                        Lihat Overview API
                                    </NavLink>
                                </Button>

                                <Button
                                    variant="outline"
                                    className="gap-2 bg-white/80"
                                    asChild
                                >
                                    <a
                                        href="https://gita-api.dedan.my.id/docs"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Code className="w-4 h-4" />
                                        Akses API Langsung
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </SafeWidth>
    );
}
