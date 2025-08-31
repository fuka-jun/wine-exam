// ワインエキスパート試験勉強アプリ - メインJavaScript

class WineQuizApp {
    constructor() {
        this.currentQuestionIndex = 0;
        this.questions = [];
        this.userAnswers = [];
        this.selectedCategory = 'all';
        this.selectedSubcategory = 'all';
        this.questionCount = 10;
        this.score = 0;
        this.currentAnswerSelected = false;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadProgress();
        this.updateProgressDisplay();
        this.setupNewContentNotification();
        this.updateSubcategoryOptions();
        this.updateAvailableQuestions();
        this.updateQuestionCountOptions();
    }
    
    setupEventListeners() {
        // スタート画面のイベント
        document.getElementById('start-btn').addEventListener('click', () => {
            this.startQuiz();
        });
        
        // メインカテゴリ選択
        document.getElementById('main-category-select').addEventListener('change', (e) => {
            this.selectedCategory = e.target.value;
            this.updateSubcategoryOptions();
            this.updateAvailableQuestions();
            this.updateQuestionCountOptions();
        });
        
        // サブカテゴリ選択
        document.getElementById('sub-category-select').addEventListener('change', (e) => {
            this.selectedSubcategory = e.target.value;
            this.updateAvailableQuestions();
            this.updateQuestionCountOptions();
        });
        
        // 問題数選択
        document.getElementById('question-count').addEventListener('change', (e) => {
            this.questionCount = parseInt(e.target.value);
        });
        
        // 問題画面のイベント
        document.getElementById('next-btn').addEventListener('click', () => {
            this.nextQuestion();
        });
        
        // 結果画面のイベント
        document.getElementById('retry-btn').addEventListener('click', () => {
            this.startQuiz();
        });
        
        document.getElementById('review-btn').addEventListener('click', () => {
            this.startReview();
        });
        
        document.getElementById('home-btn').addEventListener('click', () => {
            this.showScreen('start-screen');
        });
    }
    
    // 新規コンテンツ通知の設定
    setupNewContentNotification() {
        document.addEventListener('newTextbooksDetected', (event) => {
            this.showNewContentNotification(event.detail);
        });
    }
    
    // 新規コンテンツ通知表示
    showNewContentNotification(data) {
        // 通知バナーを動的に作成
        const notification = document.createElement('div');
        notification.className = 'new-content-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">🆕</span>
                <span class="notification-text">${data.message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        // ヘッダーの後に挿入
        const header = document.querySelector('header');
        header.insertAdjacentElement('afterend', notification);
        
        // 5秒後に自動削除
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
        
        console.log('新規教本通知:', data);
    }
    
    async startQuiz() {
        try {
            await this.loadQuestions();
            this.setupQuiz();
            this.showScreen('quiz-screen');
            this.displayQuestion();
        } catch (error) {
            console.error('クイズ開始エラー:', error);
            alert('問題の読み込みに失敗しました。');
        }
    }
    
    async loadQuestions() {
        // 仮の問題データ（後で外部ファイルから読み込み）
        const allQuestions = await this.getQuestionData();
        
        // カテゴリフィルタリング
        let filteredQuestions = allQuestions;
        if (this.selectedCategory !== 'all') {
            filteredQuestions = allQuestions.filter(q => q.category === this.selectedCategory);
        }
        if (this.selectedSubcategory !== 'all') {
            filteredQuestions = filteredQuestions.filter(q => q.subcategory === this.selectedSubcategory);
        }
        
        // ランダムに指定数の問題を選択
        this.questions = this.shuffleArray(filteredQuestions).slice(0, this.questionCount);
        
        if (this.questions.length === 0) {
            throw new Error('該当する問題が見つかりません');
        }
    }
    
    async getQuestionData() {
        // 外部の問題データファイルから読み込み
        return WINE_QUESTIONS;
    }
    
    setupQuiz() {
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        this.currentAnswerSelected = false;
        
        // UI更新
        let categoryDisplay = this.selectedCategory === 'all' ? '全て' : this.selectedCategory;
        if (this.selectedSubcategory !== 'all') {
            categoryDisplay += ` > ${this.selectedSubcategory}`;
        }
        document.getElementById('category').textContent = `カテゴリ: ${categoryDisplay}`;
    }
    
    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        
        // 選択肢をランダムに並び替え
        const shuffledOptions = this.shuffleOptions(question);
        
        // 問題情報の表示
        document.getElementById('question-counter').textContent = 
            `${this.currentQuestionIndex + 1}/${this.questions.length}`;
        document.getElementById('current-category').textContent = `${question.category} > ${question.subcategory}`;
        document.getElementById('question-text').textContent = question.question;
        
        // 選択肢の表示
        const optionButtons = document.querySelectorAll('.option-btn');
        optionButtons.forEach((btn, index) => {
            btn.textContent = shuffledOptions.options[index];
            btn.className = 'option-btn';
            btn.disabled = false;
            btn.onclick = () => this.selectAnswer(index, shuffledOptions.correctIndex);
        });
        
        // 解説を非表示
        document.getElementById('explanation').classList.add('hidden');
        
        // 次へボタンを無効化
        document.getElementById('next-btn').disabled = true;
        this.currentAnswerSelected = false;
    }
    
    selectAnswer(selectedIndex, correctIndex = null) {
        if (this.currentAnswerSelected) return;
        
        this.currentAnswerSelected = true;
        const question = this.questions[this.currentQuestionIndex];
        const optionButtons = document.querySelectorAll('.option-btn');
        
        // 正解インデックスを決定（選択肢がシャッフルされている場合は引数から、そうでなければ元の正解）
        const actualCorrectIndex = correctIndex !== null ? correctIndex : question.correct;
        
        // 選択した回答をハイライト
        optionButtons[selectedIndex].classList.add('selected');
        
        // 正解/不正解の表示
        optionButtons.forEach((btn, index) => {
            btn.disabled = true;
            if (index === actualCorrectIndex) {
                btn.classList.add('correct');
            } else if (index === selectedIndex && index !== actualCorrectIndex) {
                btn.classList.add('incorrect');
            }
        });
        
        // 回答を記録
        const isCorrect = selectedIndex === actualCorrectIndex;
        this.userAnswers.push({
            questionId: question.id,
            selectedAnswer: selectedIndex,
            correctAnswer: question.correct,
            isCorrect: isCorrect
        });
        
        if (isCorrect) {
            this.score++;
        }
        
        // 解説を表示
        document.getElementById('explanation-text').textContent = question.explanation;
        document.getElementById('explanation').classList.remove('hidden');
        
        // 次へボタンを有効化
        document.getElementById('next-btn').disabled = false;
        
        // スコア更新
        this.updateScore();
    }
    
    nextQuestion() {
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex >= this.questions.length) {
            this.showResults();
        } else {
            this.displayQuestion();
        }
    }
    
    showResults() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        
        // 結果表示
        document.getElementById('final-score').textContent = `${this.score}/${this.questions.length}`;
        document.getElementById('score-percentage').textContent = `正答率: ${percentage}%`;
        
        // カテゴリ別結果
        this.displayCategoryResults();
        
        // 間違えた問題
        this.displayWrongQuestions();
        
        // 学習履歴を保存
        this.saveProgress();
        
        this.showScreen('result-screen');
    }
    
    displayCategoryResults() {
        const categoryResults = {};
        
        this.questions.forEach((question, index) => {
            const category = question.category;
            if (!categoryResults[category]) {
                categoryResults[category] = { correct: 0, total: 0 };
            }
            categoryResults[category].total++;
            if (this.userAnswers[index].isCorrect) {
                categoryResults[category].correct++;
            }
        });
        
        const container = document.getElementById('category-results');
        container.innerHTML = '';
        
        Object.entries(categoryResults).forEach(([category, result]) => {
            const percentage = Math.round((result.correct / result.total) * 100);
            const div = document.createElement('div');
            div.className = 'category-result';
            div.innerHTML = `
                <span>${category}</span>
                <span>${result.correct}/${result.total} (${percentage}%)</span>
            `;
            container.appendChild(div);
        });
    }
    
    displayWrongQuestions() {
        const wrongAnswers = this.userAnswers.filter(answer => !answer.isCorrect);
        const wrongList = document.getElementById('wrong-list');
        wrongList.innerHTML = '';
        
        if (wrongAnswers.length === 0) {
            const li = document.createElement('li');
            li.textContent = '全問正解です！素晴らしい！';
            li.style.borderLeftColor = '#4caf50';
            wrongList.appendChild(li);
            return;
        }
        
        wrongAnswers.forEach(answer => {
            const question = this.questions.find(q => q.id === answer.questionId);
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${question.question}</strong><br>
                <small>正解: ${question.options[answer.correctAnswer]}</small>
            `;
            wrongList.appendChild(li);
        });
    }
    
    startReview() {
        // 間違えた問題のみで復習クイズを開始
        const wrongQuestions = this.questions.filter((question, index) => 
            !this.userAnswers[index].isCorrect
        );
        
        if (wrongQuestions.length === 0) {
            alert('復習する問題がありません！');
            return;
        }
        
        this.questions = wrongQuestions;
        this.setupQuiz();
        this.showScreen('quiz-screen');
        this.displayQuestion();
    }
    
    updateScore() {
        document.getElementById('score').textContent = `スコア: ${this.score}/${this.currentQuestionIndex + 1}`;
    }
    
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }
    
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    shuffleOptions(question) {
        const options = [...question.options];
        const correctAnswer = question.correct;
        
        // インデックスの配列を作成 [0, 1, 2, 3]
        const indices = [0, 1, 2, 3];
        const shuffledIndices = this.shuffleArray(indices);
        
        // シャッフルされたインデックスに基づいて選択肢を並び替え
        const shuffledOptions = shuffledIndices.map(index => options[index]);
        
        // 新しい正解のインデックスを見つける
        const newCorrectIndex = shuffledIndices.indexOf(correctAnswer);
        
        return {
            options: shuffledOptions,
            correctIndex: newCorrectIndex
        };
    }
    
    // 学習履歴管理
    saveProgress() {
        const progress = {
            totalQuestions: (this.getProgress().totalQuestions || 0) + this.questions.length,
            totalCorrect: (this.getProgress().totalCorrect || 0) + this.score,
            lastPlayed: new Date().toISOString(),
            categoryStats: this.updateCategoryStats()
        };
        
        localStorage.setItem('wineQuizProgress', JSON.stringify(progress));
    }
    
    getProgress() {
        const saved = localStorage.getItem('wineQuizProgress');
        return saved ? JSON.parse(saved) : {};
    }
    
    loadProgress() {
        // 起動時に学習履歴をロード
        this.updateProgressDisplay();
    }
    
    updateProgressDisplay() {
        const progress = this.getProgress();
        const totalQuestions = progress.totalQuestions || 0;
        const totalCorrect = progress.totalCorrect || 0;
        const percentage = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
        
        document.getElementById('progress-text').textContent = 
            totalQuestions > 0 
                ? `学習履歴: ${totalCorrect}/${totalQuestions}問正解 (${percentage}%)`
                : '学習履歴: まだありません';
        
        // カテゴリ別進捗表示
        this.updateCategoryProgress(progress.categoryStats || {});
    }
    
    updateCategoryProgress(categoryStats) {
        const container = document.getElementById('category-progress');
        container.innerHTML = '';
        
        if (Object.keys(categoryStats).length === 0) {
            container.innerHTML = '<p class="no-stats">まだ学習データがありません</p>';
            return;
        }
        
        Object.entries(categoryStats).forEach(([category, stats]) => {
            const percentage = Math.round((stats.correct / stats.total) * 100);
            const div = document.createElement('div');
            div.className = 'category-progress-item';
            
            div.innerHTML = `
                <div class="category-info">
                    <span class="category-name">${category}</span>
                    <span class="category-score">${stats.correct}/${stats.total} (${percentage}%)</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
            `;
            
            container.appendChild(div);
        });
    }
    
    updateCategoryStats() {
        const progress = this.getProgress();
        const categoryStats = progress.categoryStats || {};
        
        this.questions.forEach((question, index) => {
            const category = question.category;
            if (!categoryStats[category]) {
                categoryStats[category] = { correct: 0, total: 0 };
            }
            categoryStats[category].total++;
            if (this.userAnswers[index].isCorrect) {
                categoryStats[category].correct++;
            }
        });
        
        return categoryStats;
    }
    
    updateSubcategoryOptions() {
        const subCategorySelect = document.getElementById('sub-category-select');
        subCategorySelect.innerHTML = '<option value="all">全サブカテゴリ</option>';
        
        if (this.selectedCategory === 'all') {
            subCategorySelect.classList.add('hidden');
            this.selectedSubcategory = 'all';
            return;
        }
        
        // 選択されたメインカテゴリのサブカテゴリを取得
        const subcategories = [...new Set(
            WINE_QUESTIONS
                .filter(q => q.category === this.selectedCategory)
                .map(q => q.subcategory)
        )].sort();
        
        subcategories.forEach(subcategory => {
            const option = document.createElement('option');
            option.value = subcategory;
            option.textContent = subcategory;
            subCategorySelect.appendChild(option);
        });
        
        subCategorySelect.classList.remove('hidden');
        this.selectedSubcategory = 'all';
    }
    
    updateAvailableQuestions() {
        const allQuestions = WINE_QUESTIONS;
        let availableQuestions;
        
        if (this.selectedCategory === 'all') {
            availableQuestions = allQuestions.length;
        } else {
            let filtered = allQuestions.filter(q => q.category === this.selectedCategory);
            if (this.selectedSubcategory !== 'all') {
                filtered = filtered.filter(q => q.subcategory === this.selectedSubcategory);
            }
            availableQuestions = filtered.length;
        }
        
        document.getElementById('available-questions').textContent = 
            `利用可能な問題数: ${availableQuestions}問`;
    }
    
    updateQuestionCountOptions() {
        const allQuestions = WINE_QUESTIONS;
        let availableQuestions;
        
        if (this.selectedCategory === 'all') {
            availableQuestions = allQuestions.length;
        } else {
            let filtered = allQuestions.filter(q => q.category === this.selectedCategory);
            if (this.selectedSubcategory !== 'all') {
                filtered = filtered.filter(q => q.subcategory === this.selectedSubcategory);
            }
            availableQuestions = filtered.length;
        }
        
        const questionCountSelect = document.getElementById('question-count');
        const currentValue = parseInt(questionCountSelect.value) || 10;
        
        // 選択肢をクリア
        questionCountSelect.innerHTML = '';
        
        // 利用可能な問題数に応じて選択肢を生成
        const options = [5, 10, 20, 50];
        options.forEach(count => {
            if (count <= availableQuestions) {
                const option = document.createElement('option');
                option.value = count;
                option.textContent = `${count}問`;
                questionCountSelect.appendChild(option);
            }
        });
        
        // 利用可能な問題数がすべての標準選択肢より少ない場合
        if (availableQuestions < 5) {
            for (let i = 1; i <= availableQuestions; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = `${i}問`;
                questionCountSelect.appendChild(option);
            }
        }
        
        // 現在の値を可能な範囲で復元
        const newValue = Math.min(currentValue, availableQuestions);
        const availableOptions = Array.from(questionCountSelect.options).map(opt => parseInt(opt.value));
        
        if (availableOptions.includes(newValue)) {
            questionCountSelect.value = newValue;
        } else {
            // 最も近い小さい値を選択
            const closestValue = availableOptions.filter(val => val <= newValue).pop() || availableOptions[0];
            questionCountSelect.value = closestValue;
        }
        
        this.questionCount = parseInt(questionCountSelect.value);
    }
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    new WineQuizApp();
});