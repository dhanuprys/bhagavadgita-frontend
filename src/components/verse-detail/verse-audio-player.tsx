'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Download,
    SkipBack,
    SkipForward,
} from 'lucide-react';

interface VerseAudioPlayerProps {
    audioUrl: string;
}

export function VerseAudioPlayer({ audioUrl }: VerseAudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.8);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handleEnded = () => setIsPlaying(false);
        const handleLoadStart = () => setIsLoading(true);
        const handleCanPlay = () => setIsLoading(false);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('loadstart', handleLoadStart);
        audio.addEventListener('canplay', handleCanPlay);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('loadstart', handleLoadStart);
            audio.removeEventListener('canplay', handleCanPlay);
        };
    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (value: number[]) => {
        const audio = audioRef.current;
        if (!audio) return;

        const newTime = value[0];
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleVolumeChange = (value: number[]) => {
        const audio = audioRef.current;
        if (!audio) return;

        const newVolume = value[0];
        audio.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
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

    const skipBackward = () => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.currentTime = Math.max(0, audio.currentTime - 10);
    };

    const skipForward = () => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.currentTime = Math.min(duration, audio.currentTime + 10);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const downloadAudio = () => {
        const link = document.createElement('a');
        link.href = audioUrl;
        // link.download = `bhagavad-gita-${chapterNumber}-${verseNumber}.mp3`;
        link.click();
    };

    return (
        <div className="bg-gradient-to-b from-purple-800 to-slate-900 rounded-xl p-6 shadow-lg border border-slate-700/50">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h3 className="text-white font-medium text-lg">
                        Audio Narasi
                    </h3>
                    {/* <p className="text-slate-300 text-sm">Ayat {verseNumber}</p> */}
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={downloadAudio}
                    className="text-slate-300 hover:text-white hover:bg-white/10"
                >
                    <Download className="w-4 h-4" />
                </Button>
            </div>

            {/* Progress Bar */}
            <div className="mb-5">
                <Slider
                    value={[currentTime]}
                    max={duration || 100}
                    step={1}
                    onValueChange={handleSeek}
                    className="w-full mb-2"
                    disabled={!duration}
                />
                <div className="flex justify-between text-sm text-slate-400">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mb-5">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={skipBackward}
                    className="text-slate-300 hover:text-white hover:bg-white/10 w-10 h-10"
                    disabled={!duration}
                >
                    <SkipBack className="w-4 h-4" />
                </Button>

                <Button
                    onClick={togglePlay}
                    disabled={isLoading}
                    className="w-12 h-12 rounded-full bg-white text-slate-900 hover:bg-slate-100 shadow-lg transition-all duration-200"
                >
                    {isLoading ? (
                        <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                    ) : isPlaying ? (
                        <Pause className="w-5 h-5" />
                    ) : (
                        <Play className="w-5 h-5 ml-0.5" />
                    )}
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={skipForward}
                    className="text-slate-300 hover:text-white hover:bg-white/10 w-10 h-10"
                    disabled={!duration}
                >
                    <SkipForward className="w-4 h-4" />
                </Button>
            </div>

            {/* Volume Controls */}
            <div className="max-w-[300px] mx-auto flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMute}
                    className="text-slate-300 hover:text-white hover:bg-white/10"
                >
                    {isMuted ? (
                        <VolumeX className="w-4 h-4" />
                    ) : (
                        <Volume2 className="w-4 h-4" />
                    )}
                </Button>
                <div className="flex-1">
                    <Slider
                        value={[isMuted ? 0 : volume]}
                        max={1}
                        step={0.1}
                        onValueChange={handleVolumeChange}
                        className="w-full"
                    />
                </div>
                <span className="text-slate-400 text-sm w-10 text-right">
                    {Math.round((isMuted ? 0 : volume) * 100)}%
                </span>
            </div>

            {/* Audio Element */}
            <audio
                ref={audioRef}
                src={audioUrl}
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
        </div>
    );
}
