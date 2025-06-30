import { BrushCleaningIcon, GlobeIcon, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { NavLink } from 'react-router';
import { clearConversation } from '@/lib/storage';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';

interface ChatHeaderProps {
    messageCount: number;
    isMobile?: boolean;
}

export function ChatHeader({ messageCount, isMobile }: ChatHeaderProps) {
    const handleClearChat = () => {
        clearConversation();
        window.location.reload();
    };

    if (isMobile) {
        return (
            <div>
                <div className="p-4">
                    <div className="flex items-center gap-3">
                        <motion.div
                            whileHover={{ rotate: 180 }}
                            transition={{
                                type: 'spring',
                                stiffness: 300,
                                damping: 20,
                            }}
                            className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center shadow-sm border border-slate-200/50"
                        >
                            <Sparkles className="w-5 h-5 text-slate-600" />
                        </motion.div>
                        <div className="flex-1">
                            <h1 className="text-lg font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                                BhagavadAI
                            </h1>
                            <p className="text-xs text-slate-500">Dedan Labs</p>
                        </div>
                        <div className="flex gap-1">
                            <Dialog>
                                <DialogTrigger>
                                    <Button
                                        variant="ghost"
                                        className="text-red-600 font-semibold hover:text-red-600 hover:bg-red-500/20"
                                    >
                                        <BrushCleaningIcon />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogTitle>
                                        Apakah anda yakin ingin membersihkan
                                        chat?
                                    </DialogTitle>
                                    <DialogDescription>
                                        Tindakan ini tidak dapat dipulihkan!
                                    </DialogDescription>
                                    <DialogFooter>
                                        <Button
                                            onClick={handleClearChat}
                                            variant="ghost"
                                            className="text-red-600 font-semibold hover:text-red-600 hover:bg-red-500/20"
                                        >
                                            Ya, Hapus
                                        </Button>
                                        <DialogClose>
                                            <Button variant="ghost">
                                                Batal
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <NavLink to="/">
                                <Button variant="outline">
                                    <GlobeIcon />
                                    pustaka
                                </Button>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="bg-purple-100">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 2 }}
                        className="text-center bg-purple-700 text-white p-2 text-sm"
                    >
                        Sumber informasi kami belum sepenuhnya memiliki
                        keakuratan tinggi.{' '}
                        <a
                            href="https://forms.gle/Y8n7QVUQU33zCFaK8"
                            className="underline font-semibold"
                        >
                            Bantu kami memperbaikinya
                        </a>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-75"></div>
                        <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse delay-150"></div>
                    </div>
                    <div>
                        <span className="font-semibold text-slate-700">
                            Chat dengan BhagavadAI
                        </span>
                        {messageCount > 0 && (
                            <span className="text-xs text-slate-500 ml-2">
                                ({messageCount} chat)
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex gap-x-2">
                    <Dialog>
                        <DialogTrigger>
                            <Button
                                variant="ghost"
                                className="text-red-600 font-semibold hover:text-red-600 hover:bg-red-500/20"
                            >
                                <BrushCleaningIcon />
                                bersihkan chat
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>
                                Apakah anda yakin ingin membersihkan chat?
                            </DialogTitle>
                            <DialogDescription>
                                Tindakan ini tidak dapat dipulihkan!
                            </DialogDescription>
                            <DialogFooter>
                                <DialogClose>
                                    <Button variant="ghost">Batal</Button>
                                </DialogClose>
                                <Button
                                    onClick={handleClearChat}
                                    variant="ghost"
                                    className="text-red-600 font-semibold hover:text-red-600 hover:bg-red-500/20"
                                >
                                    Ya, Hapus
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <NavLink to="/">
                        <Button variant="outline">
                            <GlobeIcon />
                            buka pustaka
                        </Button>
                    </NavLink>
                </div>
            </div>
            <div className="rounded-md mt-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="text-muted-foreground rounded-md p-2 text-sm"
                >
                    Sumber informasi kami belum sepenuhnya memiliki keakuratan
                    tinggi.{' '}
                    <a
                        href="https://forms.gle/Y8n7QVUQU33zCFaK8"
                        className="underline font-semibold text-black"
                    >
                        Bantu kami memperbaikinya
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
