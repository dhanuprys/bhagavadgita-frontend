import { BookOpenIcon, HeartIcon, SparkleIcon, StarIcon } from 'lucide-react';
import { Badge } from '../ui/badge';
import SafeWidth from '../safe-width';
import { Button } from '../ui/button';
import { NavLink } from 'react-router';

export default function Hero() {
    return (
        <SafeWidth>
            <div className="max-w-6xl">
                <div className="text-center mb-16 slide-up">
                    <div className="flex items-center justify-center mb-6">
                        <Badge
                            variant="secondary"
                            className="bg-gray-100 text-gray-700 border-0 px-4 py-2 text-sm font-medium"
                        >
                            Sastra Suci
                        </Badge>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-gray-900">
                        Bhagavad Gita
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                        Dialog abadi antara Pangeran Arjuna dan Tuhan Krishna,
                        mengeksplorasi pertanyaan terdalam tentang kewajiban,
                        kebenaran, dan hakikat keberadaan.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500 mb-8">
                        <div className="flex items-center gap-2">
                            <BookOpenIcon className="w-4 h-4" />
                            <span>18 Bab</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <HeartIcon className="w-4 h-4" />
                            <span>700 Sloka</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <StarIcon className="w-4 h-4" />
                            <span>Kebijaksanaan Abadi</span>
                        </div>
                    </div>
                    <div className="max-w-xl mx-auto">
                        <div className="border rounded-full flex items-center px-3 py-2 gap-2">
                            <input
                                type="text"
                                placeholder="Tanyakan sesuatu.."
                                className="text-sm md:text-base flex-1 md:px-4 md:py-2 outline-0"
                            />
                            <NavLink to="/chat">
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-sm md:text-base bg-gradient-to-br from-purple-800 to-purple-500 text-white rounded-full hover:text-white hover:cursor-pointer hover:scale-105 transition-transform"
                                >
                                    Tanya AI
                                    <SparkleIcon />
                                </Button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </SafeWidth>
    );
}
