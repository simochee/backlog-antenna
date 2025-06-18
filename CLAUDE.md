# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

WXTフレームワーク、React、Tailwind CSSで構築されたブラウザ拡張機能プロジェクトです。「backlog-antenna」という名前で、Chrome Web StoreとFirefox Add-onsの両方での公開をサポートしています。

## 開発コマンド

- `pnpm dev` - ホットリロード付きの開発サーバーを開始
- `pnpm build` - 本番用に拡張機能をビルド
- `pnpm postinstall` - Gitフックをインストールし、WXT環境を準備（`pnpm install`後に自動実行）

## コード品質とフォーマット

- Biomeをリント・フォーマットに使用（lefthookのpre-commitフックで設定）
- Commitlintが従来のコミットメッセージを強制
- 手動でのリント・フォーマットコマンドは不要 - すべてGitフックで処理

## アーキテクチャ

### WXTフレームワーク構造
- `entrypoints/background/` - バックグラウンドスクリプト
- `entrypoints/popup/` - ポップアップUI（React + Tailwind CSS）
- `wxt.config.ts` - WXTとViteの設定
- `locales/` - i18nファイル（ja.yaml、en.yaml）でデフォルトロケールは日本語

### 技術スタック
- **フレームワーク**: WXT（Web Extension Toolkit）
- **UI**: React 19（StrictMode使用）
- **スタイリング**: Tailwind CSS 4.x（Viteプラグイン経由）
- **ビルド**: Vite with TypeScript
- **パッケージマネージャー**: pnpm（v10.12.1）

### 主要設定
- マニフェストは`__MSG_*__`プレースホルダーでi18nを使用
- 拡張機能アイコン生成用のauto-iconsモジュール
- TypeScriptはWXTとVite-Reactの両方の設定を継承
- Tailwind CSSは`@tailwindcss/vite`プラグインで統合

## 開発ガイドライン

### ブランチ運用
- **develop、mainブランチでの直接作業は禁止**
- 対応を開始する前に、ブランチ名と予定される対応内容が一致しているか確認すること
- すべての対応は独立したブランチで行うこと
- 新しい対応を始めるときは必ず新しいブランチを切ること
- ブランチ作成後は`git worktree`で独立した作業環境を確保すること

### コミット運用
- 指示がない場合は作業ごとにコミットすること
- 指示がない場合は作業内容が追跡できる単位ごとにコミットすること

### プルリクエスト運用
- プルリクエストのタイトルはConventional Commitに従ったものにすること
- プルリクエストのマージは特別な指示がない場合はsquash mergeにすること

## 仕様

### 機能要件
- 複数のスペースにログインできる
  - スペースをショートカットキーで切り替え
  - スペースの並び変え
- ログインは API Key か OAuth2 で行う
- 拡張機能のバッジに各スペースの未読件数の合計数を表示
  - バッジの件数に加算しないスペースを設定できる
- 各スペースごとの機能
  - 自分へのおすすめを一覧表示
  - 自分がアクセスした課題の一覧表示
  - 自分が参加しているプロジェクトを一覧表示

### 非機能要件
- 取得した Backlog に関するデータは一時的にキャッシュを保持する
- *.backlog.com と *.backlog.jp 以外への通信を行わない
- 課題の一覧は Infinite Scroll (Virtual Scroll) で実装する
- Rate Limit の場合はエラーになった呼び出しごとにモードレスなエラーにリトライボタンを表示する
- 不明な API エラーの場合は、エラービューにリロードボタンを表示する

### API・権限要件
- Backlog API を npm:backlog-js で呼び出す
- 認証は API Key と OAuth2 Access Token の双方に対応する
- OAuth2 は launchWebAuthFlow を利用する
- タイマーを利用し、定期的に未読件数を取得する
- デスクトップ通知を利用し、未読があることを知らせる
- 取得したデータのキャッシュを storage.local に保持する
- スペースの追加・削除・並び変えは options で行う
  - それ以外は popup で行う

### ルーティング

#### Popup

- / : storage.local の状態から表示されていたルートにリダイレクト
- /(spaceKey)/notifications : 自分の受け取ったお知らせ一覧
- /(spaceKey)/projects : プロジェクト一覧
- /(spaceKey)/issues : 最近見た課題一覧

#### Options

- / : 設定項目一覧

## Urls

- [Backlog ヘルプセンター](https://support-ja.backlog.com/hc/ja)
- [Backlog API とは](https://developer.nulab.com/ja/docs/backlog/)
- [npm:backlog-js](https://www.npmjs.com/package/backlog-js)
