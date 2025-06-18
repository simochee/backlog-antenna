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

## 公開
- Chrome Web StoreとFirefox Add-onsへの自動公開をサポート
- バージョン管理にsemantic-releaseを使用
- ストア認証情報用のリポジトリシークレットが必要