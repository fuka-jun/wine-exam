# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**このプロジェクトは、すべての回答とコミュニケーションは日本語で行う**

## プロジェクト概要

ワインエキスパート試験対策のインタラクティブ学習アプリ。ピュアHTML/CSS/JavaScriptで構築されたクライアントサイドWebアプリ。

## アーキテクチャ

### 主要ファイル
- `script.js` - メインアプリ（WineQuizAppクラス）
- `questions.js` - 問題データ（WINE_QUESTIONSグローバル変数）
- `textbook-loader.js` - 教本管理（TextbookLoaderクラス）
- `textbook/` - 教本MDファイル群

### 問題データ構造
```javascript
{
    id: number,
    category: string, // '基礎', 'フランス', 'イタリア'
    difficulty: number, // 1-3
    question: string,
    options: string[4],
    correct: number,
    explanation: string,
    source: string
}
```

## 開発コマンド

```bash
# ローカル実行
python -m http.server 8000
# または
npx serve .
```

## 拡張時の注意点

- 新しい問題は`questions.js`のWINE_QUESTIONS配列に追加
- 新しい教本は`textbook/`ディレクトリに配置
- カテゴリ追加時は`index.html`の選択肢と`textbook-loader.js`の分類ロジックを更新