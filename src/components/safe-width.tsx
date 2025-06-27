import { cn } from '@/lib/utils';

interface SafeWidthProps {
    children: React.ReactNode;
    className?: string;
}

export default function SafeWidth({ children, className }: SafeWidthProps) {
    return (
        <div className={cn('max-w-[65rem] mx-auto px-4', className)}>
            {children}
        </div>
    );
}
