import SafeWidth from '../safe-width';

export default function About() {
    return (
        <SafeWidth>
            <div className="fade-in">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border elegant-border shadow-sm">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                        Tentang Kitab Suci Ini
                    </h2>
                    <div className="space-y-4 text-gray-600 leading-relaxed">
                        <p>
                            Bhagavad Gita, yang sering disebut sebagai Gita,
                            adalah kitab suci Hindu yang terdiri dari 700 Sloka
                            yang merupakan bagian dari epos Mahabharata. Kitab
                            ini menyajikan sintesis ide-ide Hindu tentang
                            dharma, bhakti teistik, dan cita-cita yoga moksha.
                        </p>
                        <p>
                            Melalui delapan belas bab, dialog mendalam ini
                            membahas dilema moral dan filosofis yang dihadapi
                            Arjuna, menawarkan kebijaksanaan abadi tentang
                            kewajiban, tindakan, pengabdian, dan jalan menuju
                            pembebasan spiritual.
                        </p>
                    </div>
                </div>
            </div>
        </SafeWidth>
    );
}
