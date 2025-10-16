# HTML Full Screen Viewer

ブラウザ内で完結するコードエディタ＆プレビューシステム

## 概要

このプロジェクトは **GitHub Pages 上で動作する、サーバー不要のコードエディタ** です。
HTML、CSS、JavaScriptを個別に編集し、統合してプレビューできます。

## 特徴

- 完全クライアントサイドで動作（サーバー不要）
- 複数のコードプロジェクトを管理可能
- HTML / CSS / JavaScript を個別に編集
- リアルタイム全画面プレビュー
- localStorage による永続化
- GitHub Pages にそのままデプロイ可能
- `button`で動作する多様な機能

## 主なファイル構造

```
repository/
├── index.html              # メニューページ
├── code/
│   ├── html.html          # HTMLエディタ
│   ├── css.html           # CSSエディタ
│   └── js.html            # JavaScriptエディタ
└── view.html              # 全画面プレビュー
```

## 使い方

### 1. 新しいコードを作成

1. `index.html` を開く
2. 「コード名を入力」欄にプロジェクト名を入力（例: `my-project`）
3. 「作成」ボタンをクリック

### 2. コードを編集

保存されているコードのリストから：

- **HTML** ボタン → HTMLを編集
- **CSS** ボタン → CSSを編集
- **JS** ボタン → JavaScriptを編集

各エディタで：
- コードを入力
- 「💾 保存」で保存
- 「👁️ 保存してプレビュー」で即座にプレビュー

### 3. プレビュー

- **View** ボタンをクリック
- HTML、CSS、JSが統合された全画面プレビューが表示される

### 4. 管理機能

- **名前変更**: コード名を変更
- **削除**: プロジェクトを削除

## URL構造

```
/                                    # メニューページ
/code/html.html?code=プロジェクト名   # HTMLエディタ
/code/css.html?code=プロジェクト名    # CSSエディタ
/code/js.html?code=プロジェクト名     # JavaScriptエディタ
/view.html?code=プロジェクト名   # 全画面プレビュー
```

## デプロイ方法

### GitHub Pages

1. このリポジトリをGitHubにプッシュ
2. リポジトリの Settings → Pages
3. Source を `main` ブランチに設定
4. `https://ユーザー名.github.io/リポジトリ名/` でアクセス

### ローカル

HTTPサーバーを起動：

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve
```

ブラウザで `http://localhost:8000` を開く

## 技術仕様

### ストレージ構造

localStorage のキー形式：
```
code_{コード名}_{ファイルタイプ}
```

例：
- `code_my-project_html`
- `code_my-project_css`
- `code_my-project_js`

## キーボードショートカット

エディタ内：
- `Tab`: インデント挿入
- `Ctrl/Cmd + S`: 保存

## 制約事項

- localStorage を使用するため、同じブラウザ・端末でのみデータが保持される
- 他の端末とのデータ同期はできない
- ブラウザのストレージ制限（通常5-10MB）に従う
- `href` による外部遷移は機能しない（iframe内のため）

## セキュリティ注意

- JavaScriptコードはそのまま実行されるため、信頼できるコードのみを使用すること
- 外部から取得したコードを実行する場合は十分に注意すること

## ライセンス

MIT License

## デモ

[GitHub Pages でのデモはこちら](https://math-u-t.github.io/html-full-screen-viewer/)

## 貢献

[Issue](https://github.com/math-u-t/html-full-screen-viewer/issues) や [Pull Request](https://github.com/math-u-t/html-full-screen-viewer/pulls) を歓迎します。