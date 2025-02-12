# JustEat

## 基本情報

### 作者

神保 恒介

### アプリ名

JustEat

#### コンセプト

開いてスグ見つかる飲食店検索アプリ

#### こだわったポイント

- 開いてすぐに見つけるコンセプトを実現するため、画面遷移を極力なくしシームレスな操作を実現

### 公開したアプリの URL（Store にリリースしている場合）

- https://just-eat.kosuke.dev/

### 該当プロジェクトのリポジトリ URL（GitHub,GitLab など Git ホスティングサービスを利用されている場合）

- https://github.com/Alpha9n/just-eat

## 開発環境

### 開発環境

VisualStudio Code

### 開発言語

TypeScript 5.7.3

## 動作対象端末・OS

### 動作対象OS

- Chrome, Safari, Firefox (iOS / macOS)

## 開発期間

1/21 ~ 2/12 (約３週間)

## アプリケーション機能

### 機能一覧

- 現在地を中心とした飲食店の検索
- 地図上でのピン選択による位置指定検索
- 検索範囲の指定（300m〜3000m）
- 飲食店のページネーション付き一覧表示
- 飲食店の詳細情報の表示
- レスポンシブ対応（モバイル/デスクトップ）

### 画面一覧

SPAで構成されているため、画面遷移はありません。

- 検索入力画面 ：条件を指定して飲食店を検索する。
- 一覧画面 ：検索結果の飲食店を一覧表示する。
- 詳細画面 ：飲食店の詳細情報を表示する。

### 使用しているAPI,SDK,ライブラリなど

- ホットペッパーグルメサーチAPI
- React 19.0.0
- Next.js 15.1.5
- TypeScript 5.7.3
- pnpm 9.12.3
- google-map-react 2.2.1
- shadcn/ui
- pino
- Redux Toolkit
- Zod
- TailwindCSS

## 環境構築手順

### セットアップ手順

1. リポジトリのクローン

```bash
git clone https://github.com/Alpha9n/just-eat.git
cd just-eat
```

2. 依存関係のインストール

```bash
pnpm install
```

3. 必要なAPIキーの取得

- [ホットペッパーグルメサーチAPI](https://webservice.recruit.co.jp/doc/hotpepper/reference.html)のAPIキー
- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview)のAPIキー

4. 環境変数の設定

```bash
cp .env.example .env
```

`.env`に以下の環境変数を設定

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = Google Maps JavaScript APIのAPIキー
HOT_PEPPER_API_URL = Hot Pepper APIのURL
HOT_PEPPER_API_KEY = Hot Pepper APIのAPIキー
```

1. 開発サーバーの起動

```bash
npm run dev
```

1. ブラウザでアクセス
   [http://localhost:3000](http://localhost:3000)にアクセスして動作確認

### 注意事項

- ブラウザ側で位置情報の使用を許可する必要があります
    - 許可なしの場合東京駅起点に検索がされます。

## こだわったポイント

### 機能面

- 画面遷移を極力なくし、シームレスな操作性を実現
- 位置情報取得失敗時のフォールバック処理（東京駅を中心に表示）
- 取得が失敗した時のエラー表示・再度試すよう促す文面表示

### デザイン面

- モバイルファーストなデザイン
- SPAでの画面遷移を極力なくし、ユーザビリティを向上

### 技術面

- Zodによる型安全な API レスポンス処理
- Reduxによる状態管理の一元化
- shadcn/uiを使用したデザインの統一

## 自己評価

### 良かった点

- コンポーネントの分割する意識
- TypeScript / Zodによる型安全性の確保
- レスポンシブ対応の完全実装

### 改善点

- コミットの粒度を下げる
- 再レンダリングの最適化
- 自動化テスト(Vitest, Jest)の導入
- SPAを使う際はNext.jsを使用せず、Vite + React Routerを使用する。
- URLによるルーティングができていない点

## アドバイスして欲しいポイント

- コミット分割の粒度
- コンポーネントの分割をどういった基準で行うべきか
- Reduxを利用した状態管理のベストプラクティス

## 既知の不具合

- Drawerの高さを調節するとAPIに対してリクエストが送信されてしまう。
- 表示されている範囲と検索する範囲がずれてしまっている。
- 検索条件の絞り込みができない(未実装)
