'use client';

import { motion } from 'motion/react';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
    ExternalLink,
    Play,
    Pause,
    Volume2,
    Copy,
    Download,
    AlertCircle,
    Loader2,
    VolumeX,
    Volume1,
    MoreVertical,
    Share,
    FileAudio,
    Globe,
} from 'lucide-react';
import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router';

interface Attachment {
    type: 'url' | 'audio';
    title: string;
    url: string;
    description: string;
    thumbnail?: string; // Preview image URL
}

interface AttachmentCardProps {
    attachment: Attachment;
    onShare?: () => void;
    compact?: boolean;
    showMetadata?: boolean;
}

// Memoized component for better performance
export const AttachmentCard = memo(function AttachmentCard({
    attachment,
    onShare,
    compact = false,
    showMetadata = true,
}: AttachmentCardProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [showCopied, setShowCopied] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [previewLoaded, setPreviewLoaded] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Detect mobile device with better detection
    useEffect(() => {
        const checkMobile = () => {
            const isTouchDevice =
                'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const isSmallScreen = window.innerWidth < 768;
            setIsMobile(isTouchDevice || isSmallScreen);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Enhanced audio event handling
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => {
            setDuration(audio.duration);
            setIsLoading(false);
        };
        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
        };
        const handleError = () => {
            setHasError(true);
            setIsLoading(false);
            setIsPlaying(false);
        };
        const handleLoadStart = () => {
            setIsLoading(true);
            setHasError(false);
        };
        const handleCanPlay = () => {
            setIsLoading(false);
            setPreviewLoaded(true);
        };

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);
        audio.addEventListener('loadstart', handleLoadStart);
        audio.addEventListener('canplay', handleCanPlay);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('error', handleError);
            audio.removeEventListener('loadstart', handleLoadStart);
            audio.removeEventListener('canplay', handleCanPlay);
        };
    }, [previewLoaded]);

    // Keyboard shortcuts with better handling
    useEffect(() => {
        if (isMobile) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (
                attachment.type === 'audio' &&
                (e.target as HTMLElement).closest('[data-audio-card]')
            ) {
                switch (e.code) {
                    case 'Space':
                        e.preventDefault();
                        togglePlayPause();
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        seekRelative(-10);
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        seekRelative(10);
                        break;
                    case 'KeyM':
                        e.preventDefault();
                        toggleMute();
                        break;
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [attachment.type, isMobile]);

    const togglePlayPause = useCallback(() => {
        const audio = audioRef.current;
        if (!audio || hasError) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(() => {
                setHasError(true);
                setIsLoading(false);
            });
        }
        setIsPlaying(!isPlaying);
    }, [isPlaying, hasError]);

    const seekRelative = useCallback(
        (seconds: number) => {
            const audio = audioRef.current;
            if (!audio || !duration) return;

            const newTime = Math.max(
                0,
                Math.min(duration, currentTime + seconds)
            );
            audio.currentTime = newTime;
            setCurrentTime(newTime);
        },
        [currentTime, duration]
    );

    const handleSeek = (
        e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
        const audio = audioRef.current;
        if (!audio || !duration) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const percent = Math.max(
            0,
            Math.min(1, (clientX - rect.left) / rect.width)
        );
        const newTime = percent * duration;
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isMuted) {
            audio.volume = volume;
            setIsMuted(false);
        } else {
            audio.volume = 0;
            setIsMuted(true);
        }
    };

    const changePlaybackRate = (rate: number) => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.playbackRate = rate;
        setPlaybackRate(rate);
    };

    const copyUrl = async () => {
        try {
            await navigator.clipboard.writeText(attachment.url);
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy URL:', err);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: attachment.title,
                    text: attachment.description,
                    url: attachment.url,
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            copyUrl();
        }
        onShare?.();
    };

    const formatTime = (time: number) => {
        if (!isFinite(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const getVolumeIcon = () => {
        if (isMuted || volume === 0) return VolumeX;
        if (volume < 0.5) return Volume1;
        return Volume2;
    };

    const getDomainFromUrl = (url: string) => {
        try {
            return new URL(url).hostname.replace('www.', '');
        } catch {
            return 'Unknown';
        }
    };

    // Loading skeleton component
    const LoadingSkeleton = () => (
        <Card className="w-full sm:w-[200px] !p-0 border border-gray-200">
            <CardContent className="p-3">
                <div className="flex items-center gap-2">
                    <Skeleton className="w-6 h-6 rounded-md" />
                    <div className="flex-1">
                        <Skeleton className="h-4 w-3/4 mb-1" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                    <Skeleton className="w-6 h-6 rounded" />
                </div>
            </CardContent>
        </Card>
    );

    // Enhanced mobile sheet content
    const renderMobileSheet = () => (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-purple-50 md:hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    <MoreVertical className="w-4 h-4 text-purple-600" />
                </Button>
            </SheetTrigger>
            <SheetContent
                side="bottom"
                className="h-auto max-h-[85vh] overflow-y-auto p-6"
            >
                <SheetHeader className="text-left pb-4">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                {attachment.type === 'url' ? (
                                    <Globe className="w-5 h-5 text-purple-600" />
                                ) : (
                                    <FileAudio className="w-5 h-5 text-purple-600" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <SheetTitle className="text-left text-base leading-tight">
                                    {attachment.title}
                                </SheetTitle>
                                {showMetadata && attachment.type === 'url' && (
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge
                                            variant="secondary"
                                            className="text-xs"
                                        >
                                            <Globe className="w-3 h-3 mr-1" />
                                            {getDomainFromUrl(attachment.url)}
                                        </Badge>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </SheetHeader>

                <div className="space-y-4">
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {attachment.description}
                    </p>

                    {attachment.type === 'url' && (
                        <div className="space-y-3">
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500 break-all">
                                    {attachment.url}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                                    onClick={() => {
                                        window.open(attachment.url, '_blank');
                                        setIsSheetOpen(false);
                                    }}
                                >
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Open Link
                                </Button>
                                <Button variant="outline" onClick={copyUrl}>
                                    <Copy className="w-4 h-4 mr-2" />
                                    {showCopied ? 'Copied!' : 'Copy'}
                                </Button>
                                <Button variant="outline" onClick={handleShare}>
                                    <Share className="w-4 h-4 mr-2" />
                                    Share
                                </Button>
                            </div>
                        </div>
                    )}

                    {attachment.type === 'audio' && !hasError && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="flex-1 bg-transparent"
                                    onClick={togglePlayPause}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    ) : isPlaying ? (
                                        <Pause className="w-4 h-4 mr-2" />
                                    ) : (
                                        <Play className="w-4 h-4 mr-2" />
                                    )}
                                    {isLoading
                                        ? 'Loading...'
                                        : isPlaying
                                        ? 'Pause'
                                        : 'Play'}
                                </Button>

                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={toggleMute}
                                >
                                    {React.createElement(getVolumeIcon(), {
                                        className: 'w-4 h-4',
                                    })}
                                </Button>
                            </div>

                            {duration > 0 && (
                                <div className="space-y-3">
                                    <div className="flex justify-between text-xs text-gray-500 font-mono">
                                        <span>{formatTime(currentTime)}</span>
                                        <span>{formatTime(duration)}</span>
                                    </div>
                                    <div
                                        className="w-full bg-gray-200 rounded-full h-3 cursor-pointer relative touch-manipulation"
                                        onMouseDown={handleSeek}
                                        onTouchStart={handleSeek}
                                    >
                                        <div
                                            className="bg-purple-600 h-full rounded-full transition-all duration-100 relative"
                                            style={{
                                                width: `${
                                                    (currentTime / duration) *
                                                    100
                                                }%`,
                                            }}
                                        >
                                            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-600 rounded-full shadow-md" />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">
                                            Playback Speed
                                        </span>
                                        <div className="flex gap-1">
                                            {[0.5, 0.75, 1, 1.25, 1.5, 2].map(
                                                (rate) => (
                                                    <Button
                                                        key={rate}
                                                        variant={
                                                            playbackRate ===
                                                            rate
                                                                ? 'default'
                                                                : 'outline'
                                                        }
                                                        size="sm"
                                                        className="h-6 px-2 text-xs"
                                                        onClick={() =>
                                                            changePlaybackRate(
                                                                rate
                                                            )
                                                        }
                                                    >
                                                        {rate}x
                                                    </Button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    className="flex-1 bg-transparent"
                                    onClick={copyUrl}
                                >
                                    <Copy className="w-4 h-4 mr-2" />
                                    {showCopied ? 'Copied!' : 'Copy URL'}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1 bg-transparent"
                                    onClick={handleShare}
                                >
                                    <Share className="w-4 h-4 mr-2" />
                                    Share
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1 bg-transparent"
                                    onClick={() =>
                                        window.open(attachment.url, '_blank')
                                    }
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                </Button>
                            </div>
                        </div>
                    )}

                    {hasError && (
                        <div className="text-sm text-red-500 flex items-start gap-2 p-3 bg-red-50 rounded-md">
                            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium">
                                    Unable to load {attachment.type}
                                </p>
                                <p className="text-xs mt-1">
                                    The file may be corrupted or the URL is
                                    invalid.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );

    if (isLoading && !previewLoaded) {
        return <LoadingSkeleton />;
    }

    if (attachment.type === 'url') {
        return (
            <NavLink to={attachment.url} target="_blank">
                <Card
                    className={cn(
                        'w-full sm:w-auto sm:min-w-[300px] !p-0 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-200',
                        compact && 'w-full sm:w-auto sm:min-w-[200px]'
                    )}
                >
                    <CardContent className={compact ? 'p-2' : 'p-3'}>
                        <div className="flex items-center gap-2">
                            <div
                                className={`flex-shrink-0 bg-purple-100 rounded-md flex items-center justify-center ${
                                    compact ? 'w-6 h-6' : 'w-7 h-7'
                                }`}
                            >
                                <Globe
                                    className={`text-purple-600 ${
                                        compact ? 'w-3 h-3' : 'w-4 h-4'
                                    }`}
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3
                                    className={`font-medium text-gray-900 line-clamp-2 leading-tight ${
                                        compact ? 'text-xs' : 'text-sm'
                                    }`}
                                >
                                    {attachment.title}
                                </h3>
                                {showMetadata && !compact && (
                                    <p className="text-xs text-gray-500 truncate mt-0.5">
                                        {getDomainFromUrl(attachment.url)}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-1">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={`p-0 hover:bg-purple-50 ${
                                        compact ? 'h-6 w-6' : 'h-8 w-8'
                                    }`}
                                >
                                    <ExternalLink
                                        className={`text-purple-600 ${
                                            compact ? 'w-3 h-3' : 'w-4 h-4'
                                        }`}
                                    />
                                </Button>
                                {isMobile && renderMobileSheet()}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </NavLink>
        );
    }

    if (attachment.type === 'audio') {
        return (
            <Card
                className={cn(
                    'w-full sm:w-auto sm:min-w-[300px] border border-gray-200 !p-0 hover:border-purple-300 hover:shadow-md transition-all duration-200',
                    compact && 'w-full sm:w-auto sm:min-w-[200px]'
                )}
                data-audio-card
                tabIndex={0}
                role="button"
                aria-label={`Audio: ${attachment.title}. Press space to play or pause, arrow keys to seek, M to mute.`}
            >
                <CardContent className={compact ? 'p-2' : 'p-3'}>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div
                                className={`flex-shrink-0 bg-purple-100 rounded-md flex items-center justify-center ${
                                    compact ? 'w-6 h-6' : 'w-7 h-7'
                                }`}
                            >
                                {hasError ? (
                                    <AlertCircle
                                        className={`text-red-500 ${
                                            compact ? 'w-3 h-3' : 'w-4 h-4'
                                        }`}
                                    />
                                ) : (
                                    <FileAudio
                                        className={`text-purple-600 ${
                                            compact ? 'w-3 h-3' : 'w-4 h-4'
                                        }`}
                                    />
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3
                                    className={`font-medium text-gray-900 line-clamp-2 leading-tight ${
                                        compact ? 'text-xs' : 'text-sm'
                                    }`}
                                >
                                    {attachment.title}
                                </h3>
                            </div>

                            <div className="flex items-center gap-1">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={`p-0 hover:bg-purple-50 ${
                                        compact ? 'h-6 w-6' : 'h-8 w-8'
                                    }`}
                                    onClick={togglePlayPause}
                                    disabled={hasError}
                                >
                                    {isLoading ? (
                                        <Loader2
                                            className={`text-purple-600 animate-spin ${
                                                compact ? 'w-3 h-3' : 'w-4 h-4'
                                            }`}
                                        />
                                    ) : hasError ? (
                                        <AlertCircle
                                            className={`text-red-500 ${
                                                compact ? 'w-3 h-3' : 'w-4 h-4'
                                            }`}
                                        />
                                    ) : isPlaying ? (
                                        <Pause
                                            className={`text-purple-600 ${
                                                compact ? 'w-3 h-3' : 'w-4 h-4'
                                            }`}
                                        />
                                    ) : (
                                        <Play
                                            className={`text-purple-600 ${
                                                compact ? 'w-3 h-3' : 'w-4 h-4'
                                            }`}
                                        />
                                    )}
                                </Button>
                                {isMobile && renderMobileSheet()}
                            </div>
                        </div>

                        {isPlaying && duration > 0 && !hasError && !compact && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-1"
                            >
                                <div className="flex justify-between text-xs text-gray-500 font-mono">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                                <div
                                    className="w-full bg-gray-200 rounded-full h-2 cursor-pointer relative touch-manipulation"
                                    onMouseDown={handleSeek}
                                    onTouchStart={handleSeek}
                                    onClick={handleSeek}
                                >
                                    <div
                                        className="bg-purple-600 h-full rounded-full transition-all duration-100 relative"
                                        style={{
                                            width: `${
                                                (currentTime / duration) * 100
                                            }%`,
                                        }}
                                    >
                                        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-purple-600 rounded-full shadow-sm" />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {hasError && (
                            <div className="text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                Failed to load audio
                            </div>
                        )}
                    </div>
                    <audio
                        ref={audioRef}
                        src={attachment.url}
                        preload="metadata"
                        className="hidden"
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                    />
                </CardContent>
            </Card>
        );
    }

    return null;
});

AttachmentCard.displayName = 'AttachmentCard';
