import { BreadcrumbNav } from '@/components/shared/breadcrumb-nav';
import { MobileNavigation } from '@/components/shared/mobile-navigation';
import { QuickNavigation } from '@/components/shared/quick-navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import SafeWidth from '@/components/safe-width';
import { useTitle } from '@/hooks/use-title';
import { ArrowRight, Code, ExternalLink, FileJson, Server } from 'lucide-react';

export default function ApiDocsPage() {
    useTitle('Dokumentasi API');

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            {/* Header with Quick Navigation */}
            <div className="relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-6xl">
                    <div className="flex justify-end mb-8">
                        <div className="hidden sm:block">
                            <QuickNavigation />
                        </div>
                    </div>
                </div>
            </div>

            <SafeWidth className="space-y-8">
                <BreadcrumbNav
                    items={[
                        {
                            label: 'Dokumentasi API',
                            href: '/api-docs',
                        },
                    ]}
                />

                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Badge
                                variant="secondary"
                                className="bg-gray-100 text-gray-700 border-0"
                            >
                                Sumber Pengembang
                            </Badge>
                            <Badge
                                variant="outline"
                                className="bg-white border elegant-border"
                            >
                                API
                            </Badge>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                            Dokumentasi API Gita
                        </h1>
                        <p className="text-gray-600 text-lg md:text-xl max-w-3xl">
                            Akses kebijaksanaan Bhagavad Gita secara terprogram
                            melalui API kami yang komprehensif.
                        </p>
                    </div>

                    <Card className="bg-white/80 backdrop-blur-sm border elegant-border shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Server className="w-5 h-5 text-primary" />
                                Overview API
                            </CardTitle>
                            <CardDescription>
                                Semua yang perlu Anda ketahui tentang endpoint
                                API kami dan cara menggunakannya.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p>
                                API kami menyediakan akses komprehensif ke teks
                                Bhagavad Gita, terjemahan, dan data terkait.
                                Gunakan untuk membangun aplikasi, situs web,
                                atau layanan yang menggabungkan informasi
                                positif dari Gita.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                                <Button
                                    size="lg"
                                    className="gap-2 bg-purple-600"
                                    onClick={() =>
                                        window.open(
                                            'https://gita-api.dedan.my.id/docs',
                                            '_blank'
                                        )
                                    }
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Kunjungi Dokumentasi API
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-white/80 backdrop-blur-sm border elegant-border shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileJson className="w-5 h-5 text-primary" />
                                    Endpoint yang Tersedia
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <ArrowRight className="w-4 h-4 mt-1 text-primary" />
                                        <div>
                                            <p className="font-medium">Bab</p>
                                            <p className="text-sm text-gray-600">
                                                Dapatkan daftar semua bab atau
                                                detail bab tertentu
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ArrowRight className="w-4 h-4 mt-1 text-primary" />
                                        <div>
                                            <p className="font-medium">Sloka</p>
                                            <p className="text-sm text-gray-600">
                                                Ambil sloka berdasarkan bab atau
                                                dapatkan detail sloka tertentu
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ArrowRight className="w-4 h-4 mt-1 text-primary" />
                                        <div>
                                            <p className="font-medium">
                                                Terjemahan
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Akses beberapa terjemahan untuk
                                                setiap sloka
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ArrowRight className="w-4 h-4 mt-1 text-primary" />
                                        <div>
                                            <p className="font-medium">
                                                Pencarian
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Cari di seluruh teks Bhagavad
                                                Gita
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/80 backdrop-blur-sm border elegant-border shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Code className="w-5 h-5 text-primary" />
                                    Memulai
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <p>Untuk memulai dengan API Gita:</p>
                                    <ol className="list-decimal list-inside space-y-2 pl-4">
                                        <li>
                                            Kunjungi{' '}
                                            <a
                                                href="https://gita-api.dedan.my.id"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary hover:underline"
                                            >
                                                dokumentasi API
                                            </a>{' '}
                                            kami
                                        </li>
                                        <li>
                                            Tinjau endpoint dan parameter yang
                                            tersedia
                                        </li>
                                        <li>
                                            Buat permintaan API pertama Anda
                                            menggunakan contoh yang disediakan
                                        </li>
                                        <li>
                                            Integrasikan API ke dalam aplikasi
                                            Anda
                                        </li>
                                    </ol>
                                    <p className="text-sm text-gray-600 mt-4">
                                        Tidak diperlukan autentikasi untuk akses
                                        publik. Untuk penggunaan komersial atau
                                        batas rate yang lebih tinggi, silakan
                                        hubungi kami.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="bg-white/80 backdrop-blur-sm border elegant-border shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                Contoh Permintaan
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                                <pre className="text-sm">
                                    <code>
                                        {`// Ambil sloka tertentu
fetch('https://gita-api.dedan.my.id/chapter/2/verse/47')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`}
                                    </code>
                                </pre>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </SafeWidth>

            {/* Mobile Navigation */}
            <MobileNavigation />
        </div>
    );
}
