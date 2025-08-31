// ワインエキスパート試験問題データベース
// 教本データから抽出した問題集

const WINE_QUESTIONS = [
    // 基礎知識（概論・醸造・栽培）
    {
        id: 1,
        category: '基礎',
        subcategory: 'ワイン造り',
        difficulty: 1,
        question: 'ワイン醸造において、アルコール発酵を行う微生物は何ですか？',
        options: ['酵母', '細菌', 'カビ', 'ウイルス'],
        correct: 0,
        explanation: '酵母（イースト）がブドウの糖分をアルコールと二酸化炭素に分解してワインを作ります。',
        source: 'ワイン入門講座02 ワイン造り'
    },
    {
        id: 2,
        category: '基礎',
        subcategory: 'ワイン造り',
        difficulty: 1,
        question: 'アルコール発酵の化学式で正しいものは？',
        options: ['糖分 + 酵母 → アルコール + 水', '糖分 + 酵母 → アルコール + 二酸化炭素', '糖分 + 細菌 → アルコール + 酢酸', '糖分 + カビ → アルコール + 乳酸'],
        correct: 1,
        explanation: 'アルコール発酵では「糖分 + 酵母 → アルコール + 二酸化炭素」の反応が起こります。',
        source: 'ワイン入門講座02 ワイン造り'
    },
    {
        id: 3,
        category: '基礎',
        subcategory: 'ワイン造り',
        difficulty: 2,
        question: 'マセラシオン（浸漬）とは何の工程ですか？',
        options: ['ブドウを圧搾する工程', 'ブドウ果皮から色素やタンニンを抽出する工程', '発酵を促進する工程', 'ワインを濾過する工程'],
        correct: 1,
        explanation: 'マセラシオンは赤ワイン醸造において、ブドウ果皮から色素、タンニン、香り成分を抽出する重要な工程です。',
        source: 'ワイン入門講座02 ワイン造り'
    },
    {
        id: 4,
        category: '基礎',
        subcategory: 'ぶどう栽培',
        difficulty: 2,
        question: 'ブドウ栽培における「テロワール」とは何を意味しますか？',
        options: ['ブドウの品種', '土壌・気候・地形の総合的な環境', '醸造技術', 'ワインの熟成期間'],
        correct: 1,
        explanation: 'テロワールは土壌、気候、地形、そしてその土地の伝統や文化を含めた総合的な環境要因を指します。',
        source: 'ワイン入門講座03 ぶどう栽培'
    },
    {
        id: 5,
        category: '基礎',
        subcategory: 'ワイン概論',
        difficulty: 1,
        question: 'ワインの主要な酸味成分は？',
        options: ['クエン酸', '酒石酸', '乳酸', '酢酸'],
        correct: 1,
        explanation: '酒石酸がワインの主要な酸味成分で、ワインの骨格を形成します。',
        source: 'ワイン入門講座01 ワイン概論'
    },

    // フランス
    {
        id: 6,
        category: 'フランス',
        subcategory: 'ボルドー',
        difficulty: 2,
        question: 'ボルドー左岸の主要ブドウ品種は何ですか？',
        options: ['メルロ', 'カベルネ・ソーヴィニヨン', 'ピノ・ノワール', 'シャルドネ'],
        correct: 1,
        explanation: 'ボルドー左岸は砂礫質土壌でカベルネ・ソーヴィニヨンの栽培に適しています。晩熟な品種で、力強いワインを生み出します。',
        source: 'ワイン入門講座06 フランス各論 ボルドー'
    },
    {
        id: 7,
        category: 'フランス',
        subcategory: 'ボルドー',
        difficulty: 2,
        question: 'ボルドー右岸の主要ブドウ品種は？',
        options: ['カベルネ・ソーヴィニヨン', 'メルロ', 'ピノ・ノワール', 'シラー'],
        correct: 1,
        explanation: 'ボルドー右岸は粘土質や石灰質土壌で、早熟なメルロの栽培に向いています。メルロはボルドーで最も栽培面積の広い品種です。',
        source: 'ワイン入門講座06 フランス各論 ボルドー'
    },
    {
        id: 8,
        category: 'フランス',
        subcategory: 'ボルドー',
        difficulty: 3,
        question: 'ボルドーの「五大シャトー」に含まれないものは？',
        options: ['シャトー・ラフィット・ロスチャイルド', 'シャトー・ラトゥール', 'シャトー・ペトリュス', 'シャトー・マルゴー'],
        correct: 2,
        explanation: 'シャトー・ペトリュスはポムロールの名門シャトーですが、五大シャトーには含まれません。五大シャトーは1855年格付けの1級シャトーです。',
        source: 'ワイン入門講座06 フランス各論 ボルドー'
    },
    {
        id: 9,
        category: 'フランス',
        subcategory: 'ブルゴーニュ',
        difficulty: 2,
        question: 'ブルゴーニュ地方の赤ワイン用主要品種は？',
        options: ['カベルネ・ソーヴィニヨン', 'メルロ', 'ピノ・ノワール', 'シラー'],
        correct: 2,
        explanation: 'ブルゴーニュの赤ワインは主にピノ・ノワール種から造られます。繊細で優雅な味わいが特徴です。',
        source: 'ワイン入門講座07 フランス各論 ブルゴーニュ'
    },
    {
        id: 10,
        category: 'フランス',
        subcategory: 'シャンパーニュ',
        difficulty: 2,
        question: 'シャンパーニュ地方で使用される主要な白ブドウ品種は？',
        options: ['シャルドネ', 'ソーヴィニヨン・ブラン', 'リースリング', 'セミヨン'],
        correct: 0,
        explanation: 'シャンパーニュでは主にシャルドネ、ピノ・ノワール、ピノ・ムニエが使用されます。シャルドネは唯一の白ブドウ品種です。',
        source: 'ワイン入門講座10 フランス各論 シャンパーニュ'
    },
    {
        id: 11,
        category: 'フランス',
        subcategory: 'ローヌ、ラングドック、プロヴァンス',
        difficulty: 2,
        question: 'コート・デュ・ローヌ地方北部の代表的赤ワイン品種は？',
        options: ['カベルネ・ソーヴィニヨン', 'ピノ・ノワール', 'シラー', 'ガメイ'],
        correct: 2,
        explanation: 'ローヌ地方北部ではシラー種が主要品種です。南部ではグルナッシュ種が中心となります。',
        source: 'ワイン入門講座08 フランス各論 ローヌ、ラングドック、プロヴァンス'
    },
    {
        id: 12,
        category: 'フランス',
        subcategory: 'ボルドー',
        difficulty: 3,
        question: 'ソーテルヌワインの特徴は？',
        options: ['辛口白ワイン', '甘口白ワイン', 'スパークリングワイン', 'ロゼワイン'],
        correct: 1,
        explanation: 'ソーテルヌは貴腐菌（ボトリティス・シネレア）がついたブドウから造られる世界最高級の甘口白ワインです。',
        source: 'ワイン入門講座06 フランス各論 ボルドー'
    },

    // イタリア
    {
        id: 13,
        category: 'イタリア',
        subcategory: 'ピエモンテ',
        difficulty: 2,
        question: 'バローロワインの原料となるブドウ品種は？',
        options: ['サンジョヴェーゼ', 'ネッビオーロ', 'バルベーラ', 'プリミティーヴォ'],
        correct: 1,
        explanation: 'バローロは「ワインの王」と呼ばれ、100%ネッビオーロ種から造られるピエモンテ州の最高級ワインです。',
        source: 'ワイン入門講座13 イタリア各論 ピエモンテ'
    },
    {
        id: 14,
        category: 'イタリア',
        subcategory: 'トスカーナ',
        difficulty: 2,
        question: 'キャンティワインの主要品種は？',
        options: ['サンジョヴェーゼ', 'ネッビオーロ', 'モンテプルチアーノ', 'アリアニコ'],
        correct: 0,
        explanation: 'キャンティは主にサンジョヴェーゼ種から造られるトスカーナ州の代表的ワインです。',
        source: 'ワイン入門講座14 イタリア各論 トスカーナ'
    },
    {
        id: 15,
        category: 'イタリア',
        subcategory: 'イタリア概論',
        difficulty: 2,
        question: 'イタリアワインの最高格付けは？',
        options: ['DOC', 'DOCG', 'IGT', 'VdT'],
        correct: 1,
        explanation: 'DOCGは「統制保証原産地呼称」でイタリアワインの最高格付けです。品質が国によって保証されています。',
        source: 'ワイン入門講座12 イタリア概論'
    },
    {
        id: 16,
        category: 'イタリア',
        subcategory: 'ピエモンテ',
        difficulty: 3,
        question: 'バルバレスコワインについて正しいものは？',
        options: ['サンジョヴェーゼ種から造られる', 'ヴェネト州の代表ワイン', 'ネッビオーロ種から造られる', '白ワイン'],
        correct: 2,
        explanation: 'バルバレスコもバローロと同様、ピエモンテ州でネッビオーロ種から造られる高級赤ワインです。',
        source: 'ワイン入門講座13 イタリア各論 ピエモンテ'
    },

    // 応用・総合問題
    {
        id: 17,
        category: '基礎',
        subcategory: 'ロゼワイン',
        difficulty: 2,
        question: 'ロゼワインの製法で最も一般的なものは？',
        options: ['赤と白のワインを混ぜる', '赤ワイン用ブドウを短時間醸し発酵', '白ワイン用ブドウを皮ごと発酵', '特殊な酵母を使用'],
        correct: 1,
        explanation: 'ロゼワインは赤ワイン用ブドウを短時間だけ皮と接触させて色素を抽出する「直接圧搾法」や「セニエ法」で造られます。',
        source: 'ワイン入門講座11 ロゼワイン'
    },
    {
        id: 18,
        category: '基礎',
        subcategory: 'ワイン概論',
        difficulty: 1,
        question: 'ワインの適正保存温度（摂氏）は？',
        options: ['5-8度', '12-15度', '18-22度', '25-28度'],
        correct: 1,
        explanation: 'ワインは12-15度程度の一定した涼しい温度で保存するのが理想的です。温度変化を避けることも重要です。',
        source: 'ワイン入門講座01 ワイン概論'
    },
    {
        id: 19,
        category: 'フランス',
        subcategory: 'ボルドー',
        difficulty: 3,
        question: '1855年のボルドー格付けで唯一の「特別1級」に格付けされたシャトーは？',
        options: ['シャトー・ラフィット', 'シャトー・ディケム', 'シャトー・オー・ブリオン', 'シャトー・マルゴー'],
        correct: 1,
        explanation: 'シャトー・ディケムはソーテルヌ・バルサックの格付けで唯一の「特別1級（Premier Cru Supérieur）」です。',
        source: 'ワイン入門講座06 フランス各論 ボルドー'
    },
    {
        id: 20,
        category: 'フランス',
        subcategory: 'ロワール、アルザス、ジュラ',
        difficulty: 2,
        question: 'アルザス地方の主要白ブドウ品種でないものは？',
        options: ['リースリング', 'ゲヴュルツトラミネール', 'ピノ・グリ', 'シャルドネ'],
        correct: 3,
        explanation: 'アルザスの主要品種は「貴品種4品種」：リースリング、ゲヴュルツトラミネール、ピノ・グリ、ミュスカです。シャルドネは栽培されていません。',
        source: 'ワイン入門講座09 フランス各論 ロワール、アルザス、ジュラ'
    },

    // 追加の基礎問題
    {
        id: 21,
        category: '基礎',
        subcategory: 'ワインの生産地',
        difficulty: 1,
        question: '世界最大のワイン生産国は？',
        options: ['フランス', 'イタリア', 'スペイン', 'アメリカ'],
        correct: 1,
        explanation: 'イタリアは世界最大のワイン生産国で、多様な品種と製法でワインを生産しています。',
        source: 'ワイン入門講座04 ワインの生産地'
    },
    {
        id: 22,
        category: '基礎',
        subcategory: 'ぶどう栽培',
        difficulty: 2,
        question: 'ブドウ栽培に最適な気候は？',
        options: ['熱帯気候', '地中海性気候', '大陸性気候', '亜寒帯気候'],
        correct: 1,
        explanation: '地中海性気候は温暖で乾燥した夏と、温和で雨の多い冬が特徴で、ブドウ栽培に最適です。',
        source: 'ワイン入門講座03 ぶどう栽培'
    },

    // 追加のフランス問題
    {
        id: 23,
        category: 'フランス',
        subcategory: 'フランス概論',
        difficulty: 1,
        question: 'フランスワインの品質分類で最高位は？',
        options: ['AOC', 'IGP', 'AOP', 'Vin de France'],
        correct: 2,
        explanation: 'AOP（原産地統制呼称）がフランスワインの最高品質分類です。以前のAOCから名称変更されました。',
        source: 'ワイン入門講座05 フランス概論'
    },
    {
        id: 24,
        category: 'フランス',
        subcategory: 'ブルゴーニュ',
        difficulty: 3,
        question: 'ブルゴーニュの格付けで最高位は？',
        options: ['地域名アペラシオン', '村名アペラシオン', 'プルミエ・クリュ', 'グラン・クリュ'],
        correct: 3,
        explanation: 'グラン・クリュ（特級畑）がブルゴーニュの最高格付けです。33のクリマ（区画）が認定されています。',
        source: 'ワイン入門講座07 フランス各論 ブルゴーニュ'
    },

    // 追加のイタリア問題
    {
        id: 25,
        category: 'イタリア',
        subcategory: 'トスカーナ',
        difficulty: 2,
        question: 'スーパータスカンワインの特徴は？',
        options: ['伝統的なキャンティの製法', '国際品種を使用した革新的ワイン', 'DOCG格付けワイン', '白ワイン専門'],
        correct: 1,
        explanation: 'スーパータスカンは伝統的な規則にとらわれず、カベルネ・ソーヴィニヨンなど国際品種を使った革新的な高品質ワインです。',
        source: 'ワイン入門講座14 イタリア各論 トスカーナ'
    }
];

// カテゴリ別問題数の統計
const getCategoryStats = () => {
    const stats = {};
    WINE_QUESTIONS.forEach(q => {
        if (!stats[q.category]) {
            stats[q.category] = 0;
        }
        stats[q.category]++;
    });
    return stats;
};

// 難易度別問題数の統計
const getDifficultyStats = () => {
    const stats = { 1: 0, 2: 0, 3: 0 };
    WINE_QUESTIONS.forEach(q => {
        stats[q.difficulty]++;
    });
    return stats;
};

// カテゴリでフィルタリング
const getQuestionsByCategory = (category) => {
    if (category === 'all') return WINE_QUESTIONS;
    return WINE_QUESTIONS.filter(q => q.category === category);
};

// 難易度でフィルタリング
const getQuestionsByDifficulty = (difficulty) => {
    return WINE_QUESTIONS.filter(q => q.difficulty === difficulty);
};

// ランダムに問題を選択
const getRandomQuestions = (count, category = 'all', difficulty = null) => {
    let questions = getQuestionsByCategory(category);
    
    if (difficulty) {
        questions = questions.filter(q => q.difficulty === difficulty);
    }
    
    // Fisher-Yates shuffle
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled.slice(0, Math.min(count, shuffled.length));
};

// エクスポート（Node.js環境でも使用可能）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        WINE_QUESTIONS,
        getCategoryStats,
        getDifficultyStats,
        getQuestionsByCategory,
        getQuestionsByDifficulty,
        getRandomQuestions
    };
}