// 教本ファイル動的読み込みシステム
// 週次更新される教本MDファイルに対応

class TextbookLoader {
    constructor() {
        this.textbookPath = './textbook/';
        this.loadedTextbooks = new Map();
        this.fileList = [];
    }
    
    // 教本ファイル一覧を取得（将来的にAPIから取得予定）
    async getTextbookFiles() {
        // 現在はハードコーディング、将来的にはAPI経由で動的取得
        return [
            'ワイン入門講座01 ワイン概論.md',
            'ワイン入門講座02 ワイン造り.md',
            'ワイン入門講座03 ぶどう栽培.md',
            'ワイン入門講座04 ワインの生産地.md',
            'ワイン入門講座05 フランス概論.md',
            'ワイン入門講座06 フランス各論 ボルドー.md',
            'ワイン入門講座07 フランス各論 ブルゴーニュ.md',
            'ワイン入門講座08 フランス各論 ローヌ、ラングドック、プロヴァンス.md',
            'ワイン入門講座09 フランス各論 ロワール、アルザス、ジュラ.md',
            'ワイン入門講座10 フランス各論 シャンパーニュ.md',
            'ワイン入門講座11 ロゼワイン.md',
            'ワイン入門講座12 イタリア概論.md',
            'ワイン入門講座13 イタリア各論 ピエモンテ.md',
            'ワイン入門講座14 イタリア各論 トスカーナ.md'
        ];
    }
    
    // ファイル名からカテゴリを自動判定
    getCategoryFromFilename(filename) {
        const baseName = filename.toLowerCase();
        
        if (baseName.includes('概論') || baseName.includes('ワイン造り') || baseName.includes('ぶどう栽培') || baseName.includes('生産地')) {
            return '基礎';
        } else if (baseName.includes('フランス') || baseName.includes('ボルドー') || baseName.includes('ブルゴーニュ') || 
                   baseName.includes('ローヌ') || baseName.includes('シャンパーニュ') || baseName.includes('ロワール') || 
                   baseName.includes('アルザス')) {
            return 'フランス';
        } else if (baseName.includes('イタリア') || baseName.includes('ピエモンテ') || baseName.includes('トスカーナ')) {
            return 'イタリア';
        } else if (baseName.includes('ロゼ')) {
            return '基礎';
        } else {
            return 'その他';
        }
    }
    
    // 講座番号を抽出
    getLectureNumber(filename) {
        const match = filename.match(/(\d+)/);
        return match ? parseInt(match[1]) : 0;
    }
    
    // 新しいファイルを検出
    async detectNewFiles() {
        const currentFiles = await this.getTextbookFiles();
        const newFiles = currentFiles.filter(file => !this.fileList.includes(file));
        
        if (newFiles.length > 0) {
            this.fileList = currentFiles;
            return newFiles;
        }
        
        return [];
    }
    
    // ファイルの概要情報を取得
    getFileInfo(filename) {
        return {
            filename: filename,
            category: this.getCategoryFromFilename(filename),
            lectureNumber: this.getLectureNumber(filename),
            title: filename.replace('.md', ''),
            isNew: !this.loadedTextbooks.has(filename)
        };
    }
    
    // 全ファイルの情報一覧を取得
    async getAllFilesInfo() {
        const files = await this.getTextbookFiles();
        return files.map(file => this.getFileInfo(file));
    }
    
    // カテゴリ別ファイル数を取得
    async getCategoryCounts() {
        const filesInfo = await this.getAllFilesInfo();
        const counts = {};
        
        filesInfo.forEach(info => {
            counts[info.category] = (counts[info.category] || 0) + 1;
        });
        
        return counts;
    }
    
    // 新しいコンテンツの通知メッセージを生成
    generateNewContentMessage(newFiles) {
        if (newFiles.length === 0) {
            return null;
        }
        
        const fileInfos = newFiles.map(file => this.getFileInfo(file));
        const categories = [...new Set(fileInfos.map(info => info.category))];
        
        return {
            count: newFiles.length,
            files: fileInfos,
            categories: categories,
            message: `新しい教本が${newFiles.length}件追加されました！（${categories.join('、')}）`
        };
    }
    
    // 学習進捗に基づく推奨ファイルを取得
    getRecommendedFiles(userProgress = {}) {
        // 現在はシンプルな推奨ロジック
        // 将来的にはより高度な推奨システムを実装
        const basicFiles = [
            'ワイン入門講座01 ワイン概論.md',
            'ワイン入門講座02 ワイン造り.md',
            'ワイン入門講座03 ぶどう栽培.md'
        ];
        
        return basicFiles.map(file => this.getFileInfo(file));
    }
    
    // ファイル更新日時チェック（将来的な機能）
    async checkForUpdates() {
        // APIやファイルシステムからの更新確認
        // 現在は新規ファイル検出のみ実装
        return await this.detectNewFiles();
    }
    
    // 週次更新をシミュレート（開発/テスト用）
    simulateWeeklyUpdate() {
        const nextLecture = this.fileList.length + 1;
        const newFilename = `ワイン入門講座${String(nextLecture).padStart(2, '0')} 新規講座.md`;
        
        return {
            filename: newFilename,
            category: this.getCategoryFromFilename(newFilename),
            isSimulated: true,
            message: `週次更新: ${newFilename} が追加されました`
        };
    }
}

// シングルトンインスタンス
const textbookLoader = new TextbookLoader();

// 初期化時に実行する処理
const initializeTextbookLoader = async () => {
    try {
        const files = await textbookLoader.getTextbookFiles();
        textbookLoader.fileList = files;
        
        console.log('教本ローダー初期化完了:', {
            totalFiles: files.length,
            categories: await textbookLoader.getCategoryCounts()
        });
        
        return textbookLoader;
    } catch (error) {
        console.error('教本ローダー初期化エラー:', error);
        return null;
    }
};

// 新規コンテンツチェックの定期実行（10分間隔）
const startPeriodicCheck = () => {
    const checkInterval = 10 * 60 * 1000; // 10分
    
    setInterval(async () => {
        try {
            const newFiles = await textbookLoader.detectNewFiles();
            if (newFiles.length > 0) {
                const message = textbookLoader.generateNewContentMessage(newFiles);
                console.log('新しい教本を検出:', message);
                
                // UI更新イベントを発火
                document.dispatchEvent(new CustomEvent('newTextbooksDetected', {
                    detail: message
                }));
            }
        } catch (error) {
            console.error('定期チェックエラー:', error);
        }
    }, checkInterval);
};

// エクスポート
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TextbookLoader,
        textbookLoader,
        initializeTextbookLoader
    };
}

// DOMContentLoaded時に初期化
document.addEventListener('DOMContentLoaded', async () => {
    await initializeTextbookLoader();
    startPeriodicCheck();
});