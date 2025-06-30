import {
    AudioLinesIcon,
    BookOpenIcon,
    HeartIcon,
    SparkleIcon,
    StarIcon,
} from 'lucide-react';
import { Badge } from '../ui/badge';
import SafeWidth from '../safe-width';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import { getSuggestions } from '@/requests/get-suggestions';
import { AnimatePresence, motion } from 'motion/react';

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

                    <div className="inline-flex flex-col items-end mb-6">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                            Bhagavad Gita
                        </h1>
                        <span className="font-semibold">
                            untuk <span className="italic">Gen-Z</span>
                        </span>
                    </div>

                    <p className="sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                        Mengenal lebih jauh Bhagavad Gita dengan cara yang lebih
                        modern dan interaktif. Dilengkapi dengan chatbot yang
                        dapat membantu anda mendalami sloka-sloka yang ada dalam
                        kitab.
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
                            <AudioLinesIcon className="w-4 h-4" />
                            <span>Audio sloka</span>
                        </div>
                    </div>
                    <div className="max-w-xl mx-auto">
                        <PromptInput />
                    </div>
                </div>
            </div>
        </SafeWidth>
    );
}

function PromptInput() {
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState('');
    const [promptInputInitialized, setPromtInputInitialized] = useState(false);
    const { data: suggestions } = getSuggestions();
    const [isPromptHide, setIsPromptHide] = useState(false);

    const handlePrompt = useCallback(() => {
        localStorage.setItem('cross-page-prompt', prompt);
        navigate(`/chat`);
    }, [prompt]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            setPromtInputInitialized(true);
            if (e.key === 'Enter' && prompt.trim()) {
                handlePrompt();
            }
        },
        [prompt]
    );

    useEffect(() => {
        if (promptInputInitialized || !suggestions) return;

        const showPrompt = (idx: number) => {
            setPrompt(suggestions[idx]);
            setIsPromptHide(true);
            setTimeout(() => {
                setIsPromptHide(false);
            }, 500);
        };

        showPrompt(0);

        let i = 0;
        let counter = setInterval(() => {
            if (i < suggestions.length) {
                i++;
            } else {
                i = 0;
            }

            showPrompt(i);
        }, 5000);

        return () => {
            clearInterval(counter);
        };
    }, [suggestions, promptInputInitialized]);

    return (
        <div className="border rounded-full justify-end flex items-center px-3 py-2  gap-2">
            <AnimatePresence>
                {!isPromptHide && (
                    <motion.input
                        key="prompt-input"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        type="text"
                        placeholder="Tanyakan sesuatu.."
                        className="text-sm md:text-base flex-1 md:px-4 outline-0"
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={handleKeyDown}
                        value={prompt}
                    />
                )}
            </AnimatePresence>
            <Button
                onClick={handlePrompt}
                size="sm"
                variant="ghost"
                className="text-sm md:text-base bg-gradient-to-br from-purple-800 to-purple-500 text-white rounded-full hover:text-white hover:cursor-pointer hover:scale-105 transition-transform"
            >
                Tanya AI
                <SparkleIcon />
            </Button>
        </div>
    );
}
