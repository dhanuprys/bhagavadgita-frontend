import { NavLink } from 'react-router';
import { Button } from '../ui/button';
import { ArrowLeftIcon } from 'lucide-react';

export default function NavigationBack() {
    return (
        <div className="flex justify-center pt-8">
            <Button
                variant="outline"
                asChild
                className="bg-white/80 backdrop-blur-sm border elegant-border"
            >
                <NavLink to="/" className="flex items-center gap-2">
                    <ArrowLeftIcon className="w-4 h-4" />
                    <span>Kembali ke Bab-Bab</span>
                </NavLink>
            </Button>
        </div>
    );
}
