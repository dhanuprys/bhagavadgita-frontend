export interface Verse {
    number: number;
    sanskrit: string;
    translation: string;
    commentary: string;
}

export interface Chapter {
    number: number;
    title: string;
    summary: string;
    description: string;
    verses: Verse[];
}

export const chapters: Chapter[] = [
    {
        number: 1,
        title: 'Kesedihan Arjuna',
        summary:
            'Dilema moral Arjuna di medan perang dan keengganannya untuk berperang.',
        description:
            'Bab ini menjadi latar belakang untuk seluruh dialog, menyajikan krisis emosional dan kebingungan moral Arjuna ketika dihadapkan pada prospek berperang melawan kerabat dan gurunya sendiri dalam pertempuran besar.',
        verses: [
            {
                number: 1,
                sanskrit: 'dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ',
                translation:
                    'Di medan perang yang suci, di medan Kurukshetra, berkumpul dengan keinginan untuk berperang...',
                commentary:
                    'Sloka pembuka ini menetapkan latar dan keseriusan situasi yang akan terungkap.',
            },
            {
                number: 2,
                sanskrit:
                    'sañjaya uvāca dṛṣṭvā tu pāṇḍavānīkaṁ vyūḍhaṁ duryodhanas tadā',
                translation:
                    'Sanjaya berkata: Melihat pasukan Pandawa yang tersusun dalam formasi perang...',
                commentary:
                    'Sanjaya memulai narasinya kepada raja buta Dhritarashtra, menggambarkan pemandangan tersebut.',
            },
            {
                number: 3,
                sanskrit: 'paśyaitāṁ pāṇḍu-putrāṇām ācārya mahatīṁ camūm',
                translation:
                    'Lihatlah, wahai guru, pasukan yang perkasa dari putra-putra Pandu...',
                commentary:
                    'Duryodhana menyapa gurunya, menunjukkan kekuatan pasukan lawan.',
            },
        ],
    },
    {
        number: 2,
        title: 'Yoga Pengetahuan',
        summary:
            'Krishna memulai ajarannya tentang hakikat jiwa dan kewajiban.',
        description:
            'Dalam bab penting ini, Krishna memulai wacana filosofisnya, menjelaskan sifat kekal jiwa dan pentingnya melaksanakan kewajiban tanpa keterikatan pada hasil.',
        verses: [
            {
                number: 1,
                sanskrit:
                    'śrī-bhagavān uvāca kutas tvā kaśmalam idaṁ viṣame samupasthitam',
                translation:
                    'Tuhan Yang Maha Esa berkata: Dari mana datangnya khayalan ini padamu di saat krisis ini?',
                commentary:
                    'Krishna mulai mengatasi kebingungan dan kelumpuhan moral Arjuna dengan pertanyaan langsung.',
            },
            {
                number: 2,
                sanskrit: 'anārya-juṣṭam asvargyam akīrti-karam arjuna',
                translation:
                    'Ini tidak pantas bagi orang terhormat, tidak mengarah ke surga, dan membawa aib, wahai Arjuna.',
                commentary:
                    'Krishna menunjukkan bahwa keraguan Arjuna tidak layak bagi karakter mulianya.',
            },
            {
                number: 3,
                sanskrit:
                    'klaibyaṁ mā sma gamaḥ pārtha naitat tvayy upapadyate',
                translation:
                    'Jangan menyerah pada kelemahan, wahai putra Pritha. Ini tidak pantas bagimu.',
                commentary:
                    'Seruan untuk keberanian dan pemenuhan kewajiban dharma seseorang.',
            },
        ],
    },
    {
        number: 3,
        title: 'Yoga Tindakan',
        summary:
            'Jalan tindakan tanpa pamrih dan pentingnya melaksanakan kewajiban.',
        description:
            'Bab ini mengeksplorasi konsep karma yoga - jalan tindakan tanpa pamrih yang dilakukan tanpa keterikatan pada hasil, sebagai sarana pemurnian dan pertumbuhan spiritual.',
        verses: [
            {
                number: 1,
                sanskrit:
                    'arjuna uvāca jyāyasī cet karmaṇas te matā buddhir janārdana',
                translation:
                    'Arjuna berkata: Jika Engkau menganggap pengetahuan lebih unggul dari tindakan, wahai Krishna...',
                commentary:
                    'Arjuna mencari klarifikasi tentang hubungan antara pengetahuan dan tindakan.',
            },
            {
                number: 2,
                sanskrit: 'vyāmiśreṇeva vākyena buddhiṁ mohayasīva me',
                translation:
                    'Engkau sepertinya membingungkan pemahamanku dengan kata-kata yang bercampur ini.',
                commentary:
                    'Arjuna mengungkapkan kebingungannya tentang ajaran Krishna yang tampaknya bertentangan.',
            },
            {
                number: 3,
                sanskrit: "tad ekaṁ vada niścitya yena śreyo 'ham āpnuyām",
                translation:
                    'Karena itu, katakanlah dengan pasti jalan mana yang akan membawa kebaikan tertinggi bagiku.',
                commentary:
                    'Permintaan tulus untuk bimbingan yang jelas tentang jalan menuju kesejahteraan spiritual.',
            },
        ],
    },
    {
        number: 4,
        title: 'Yoga Pengetahuan Ilahi',
        summary: 'Krishna mengungkapkan sifat ilahinya dan konsep avatar.',
        description:
            'Dalam bab ini, Krishna mengungkapkan identitas ilahinya dan menjelaskan misteri inkarnasi ilahi, sambil terus menguraikan prinsip-prinsip tindakan tanpa pamrih.',
        verses: [
            {
                number: 1,
                sanskrit:
                    'śrī-bhagavān uvāca imaṁ vivasvate yogaṁ proktavān aham avyayam',
                translation:
                    'Tuhan Yang Maha Esa berkata: Aku mengajarkan yoga yang tidak dapat binasa ini kepada dewa matahari...',
                commentary:
                    'Krishna mengungkapkan garis keturunan kuno dari pengetahuan spiritual ini.',
            },
            {
                number: 2,
                sanskrit: "vivasvān manave prāha manur ikṣvākave 'bravīt",
                translation:
                    'Dewa matahari mengajarkannya kepada Manu, dan Manu mengajarkannya kepada Ikshvaku.',
                commentary:
                    'Kelanjutan pengetahuan ilahi melalui garis keturunan kerajaan.',
            },
            {
                number: 3,
                sanskrit: 'evaṁ paramparā-prāptam imaṁ rājarṣayo viduḥ',
                translation:
                    'Demikianlah diterima melalui suksesi guru, para resi raja memahami ilmu ini.',
                commentary:
                    'Pentingnya transmisi spiritual yang otentik melalui guru yang berkualitas.',
            },
        ],
    },
    {
        number: 5,
        title: 'Yoga Pelepasan',
        summary:
            'Hubungan antara pelepasan dan tindakan dalam kehidupan spiritual.',
        description:
            'Bab ini mengklarifikasi kontradiksi yang tampak antara jalan pelepasan dan jalan tindakan, menunjukkan bagaimana keduanya dapat mengarah pada tujuan spiritual yang sama ketika dipraktikkan dengan benar.',
        verses: [
            {
                number: 1,
                sanskrit:
                    'arjuna uvāca sannyāsaṁ karmaṇāṁ kṛṣṇa punar yogaṁ ca śaṁsasi',
                translation:
                    'Arjuna berkata: Wahai Krishna, Engkau memuji pelepasan tindakan dan juga yoga tindakan.',
                commentary:
                    'Arjuna berusaha memahami hubungan antara kedua jalan spiritual ini.',
            },
            {
                number: 2,
                sanskrit: 'yac chreya etayor ekaṁ tan me brūhi su-niścitam',
                translation:
                    'Katakanlah dengan pasti mana dari keduanya yang lebih baik bagiku.',
                commentary:
                    'Permintaan langsung untuk bimbingan dalam memilih jalan spiritual yang paling cocok.',
            },
            {
                number: 3,
                sanskrit:
                    'śrī-bhagavān uvāca sannyāsaḥ karma-yogaś ca niḥśreyasa-karāv ubhau',
                translation:
                    'Tuhan Yang Maha Esa berkata: Pelepasan dan yoga tindakan keduanya mengarah pada pembebasan.',
                commentary:
                    'Krishna menjelaskan bahwa kedua jalan dapat mengarah pada tujuan akhir yang sama.',
            },
        ],
    },
];

export function getChapter(chapterNumber: number): Chapter | undefined {
    return chapters.find((chapter) => chapter.number === chapterNumber);
}

export function getVerse(
    chapterNumber: number,
    verseNumber: number
): Verse | undefined {
    const chapter = getChapter(chapterNumber);
    return chapter?.verses.find((verse) => verse.number === verseNumber);
}

export function getRelatedVerses(
    chapterNumber: number,
    verseNumber: number,
    count = 3
): Verse[] {
    const chapter = getChapter(chapterNumber);
    if (!chapter) return [];

    const currentIndex = chapter.verses.findIndex(
        (verse) => verse.number === verseNumber
    );
    if (currentIndex === -1) return [];

    const related: Verse[] = [];

    // Get previous verses
    for (let i = Math.max(0, currentIndex - count); i < currentIndex; i++) {
        related.push(chapter.verses[i]);
    }

    // Get next verses
    for (
        let i = currentIndex + 1;
        i < Math.min(chapter.verses.length, currentIndex + count + 1);
        i++
    ) {
        related.push(chapter.verses[i]);
    }

    return related.slice(0, count);
}
