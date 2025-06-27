import { NavLink } from 'react-router';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbNavProps {
    items: Array<{
        label: string;
        href?: string;
    }>;
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
    return (
        <nav>
            {/* Mobile: Simple back link */}
            <div className="sm:hidden">
                <NavLink
                    to="/"
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <Home className="w-4 h-4" />
                    <span>Beranda</span>
                </NavLink>
            </div>

            {/* Desktop: Full breadcrumb */}
            <div className="hidden sm:flex items-center space-x-2 text-sm">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/60 backdrop-blur-sm border elegant-border">
                    <NavLink
                        to="/"
                        className="flex items-center hover:text-gray-600 transition-colors duration-200"
                    >
                        <Home className="w-4 h-4" />
                    </NavLink>
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-2"
                        >
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                            {item.href ? (
                                <NavLink
                                    to={item.href}
                                    className="hover:text-gray-600 transition-colors duration-200 font-medium"
                                >
                                    {item.label}
                                </NavLink>
                            ) : (
                                <span className="text-gray-900 font-medium">
                                    {item.label}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    );
}
