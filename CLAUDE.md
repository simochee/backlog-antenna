# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

WXTフレームワーク、React、Tailwind CSSで構築されたブラウザ拡張機能プロジェクトです。「backlog-antenna」という名前で、Chrome Web StoreとFirefox Add-onsの両方での公開をサポートしています。

## 開発コマンド

- `pnpm dev` - ホットリロード付きの開発サーバーを開始
- `pnpm build` - 本番用に拡張機能をビルド
- `pnpm postinstall` - Gitフックをインストールし、WXT環境を準備（`pnpm install`後に自動実行）

### 開発向け環境変数

- `WXT_INITIAL_SPACES` - 初期スペースを設定する環境変数
  - フォーマット: `<spaceDomain>:<apiKey>,<spaceDomain>:<apiKey>,...`
  - 例: `WXT_INITIAL_SPACES="example.backlog.com:your-api-key,another.backlog.jp:another-key"`
  - 開発時にスペースを手動で追加する手間を省くために使用
  - ストレージが空の場合のみ初期値として設定される

## コード品質とフォーマット

- Biomeをリント・フォーマットに使用（lefthookのpre-commitフックで設定）
- Commitlintが従来のコミットメッセージを強制
- 手動でのリント・フォーマットコマンドは不要 - すべてGitフックで処理

### JSDoc運用

- exportされている関数・型定義にはJSDocを追加する
- exportされていない内部変数・関数にはJSDocは不要
- JSDocには以下の内容を含める：
  - 関数・型の説明（日本語）
  - `@param` パラメータの説明（型情報は不要、意味のみ記載）
  - `@returns` 戻り値の説明（型情報は不要、意味のみ記載）
  - `@throws` エラーの条件（該当する場合のみ）
- 型定義のプロパティには個別コメントを付けない、型定義単位でのみJSDocを記載する

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

### コミット運用
- 指示がない場合は作業ごとにコミットすること
- 指示がない場合は作業内容が追跡できる単位ごとにコミットすること

### プルリクエスト運用
- プルリクエストのタイトルはConventional Commitに従ったものにすること
- プルリクエストのマージは特別な指示がない場合はsquash mergeにすること

## コーディング規約

### React Components
- React.FCを使用してコンポーネントを定義する
- PropsはInterfaceではなくtype aliasで定義する
- default exportを使用する

### Hooks
- カスタムhookは抽象的なAPIを提供する（items, append, update, remove）
- TanStack React Queryを活用してデータ管理とキャッシュを行う
- hookの返却値にコメントは不要
- CRUD操作の命名：
  - Create: append
  - Read: items
  - Update: update
  - Delete: remove

### State Management
- 複雑な状態管理は専用hookに分離する
- 手動でのReact Query管理は避け、統一されたhookを使用する
- mutation成功時は自動的にクエリを無効化する

### Type Definitions
- 型定義はtypes/ディレクトリに配置する
- exportされた型のみJSDocを記載する
- 実装に不要な型は削除し、必要最小限に保つ

### Error Handling
- UIでのエラー表示にはalertではなくErrorをthrowする
- 上位コンポーネントでエラーを適切にハンドリングする
- コンソールエラーログには詳細な情報を含める

### Authentication
- セキュリティ上の理由でOAuth2のclient_secretが必要な認証方式は避ける
- API Key認証を基本とする
- 認証情報は安全に保存・管理する

### Form Handling
- Conform.jsとValibotを使用してフォーム管理と検証を行う
- 編集フォームではreadOnlyプロパティを適切に使用する
- initialValueを使用して既存データの編集に対応する

### Browser Extension APIs
- WXTフレームワークの統合ブラウザAPIを使用する
- `import { browser } from "wxt/browser"`でアクセスする
- クロスブラウザ対応のため、直接のbrowser APIアクセスは避ける

### Function Parameters
- 関数の引数は可能な限りシンプルにする
- 複数の関連パラメータがある場合は、オブジェクト全体を渡して内部で分割代入を使用する
- 例：`update(space)`で`space.spaceDomain`を内部で使用

### Code Comments and Documentation
- 返却値やオブジェクトのプロパティにコメントは不要
- 実装の詳細をコメントで説明するより、わかりやすい命名を心がける
- TODOコメントは実装時に具体的な内容に置き換えるか削除する

### API Design
- hookやサービスのAPIは抽象的で再利用可能な設計にする
- 具体的なドメイン名ではなく、汎用的な操作名を使用する（spaces.append など）
- 一貫性のあるネーミングパターンを維持する

### Error Handling Strategy
- undefinedチェックを明示的に行う（例：responseUrlの検証）
- エラーメッセージは日本語で具体的な内容を記載する
- 例外が発生する可能性のある箇所では事前にバリデーションを行う

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

## テスト戦略（将来実装予定）

### 推奨テストツール

#### Unit Testing
- **Vitest** (v2.1.8+) - Viteベースの高速テストランナー
- **@vitest/ui** - テスト結果のビジュアル表示
- **jsdom** - ブラウザ環境のシミュレーション

#### Component Testing  
- **@testing-library/react** (v16.1.0+) - ユーザー中心のコンポーネントテスト
- **@testing-library/jest-dom** - DOM要素のマッチャー拡張
- **@testing-library/user-event** - ユーザーインタラクションのシミュレーション

#### E2E Testing
- **@playwright/test** (v1.49.1+) - クロスブラウザE2Eテスト
- **puppeteer** (v23.12.0+) - ブラウザ拡張機能特化テスト

#### API Mocking
- **msw** (v2.8.0+) - Backlog API呼び出しのモック化

### テスト観点

#### 1. Unit Testing
- **Custom Hooks**: useNotifications、useIssues、useBacklogApiのロジック検証
- **Utility Functions**: backlog.tsのステータス変換、日付処理など
- **ページネーション**: minIdベースの無限スクロール実装
- **キャッシュ戦略**: 3分間staleTime、セッション中gcTime設定

#### 2. Integration Testing
- **API Integration**: 認証フロー（API Key、OAuth2）、Rate Limit対応
- **Storage Integration**: storage.localの読み書き、データ整合性
- **Query管理**: TanStack Queryのキャッシュ・無効化戦略

#### 3. Component Testing
- **仮想化コンポーネント**: TanStack Virtual無限スクロールの描画・操作
- **Router Integration**: TanStack Routerのナビゲーション、状態永続化
- **エラーハンドリング**: ローディング・エラー状態の適切な表示

#### 4. E2E Testing
- **拡張機能ライフサイクル**: インストール・設定・利用の完全フロー
- **権限管理**: manifest.json権限、storage.local、タブアクセス
- **クロスブラウザ**: Chrome・Firefox両対応の動作確認

### 段階的導入計画

#### Phase 1: 基盤整備（1-2週間）
- Vitest + React Testing Library環境構築
- MSWによるAPI Mock環境整備
- 基本的なテスト設定とCI/CD統合

#### Phase 2: Core機能テスト（2-3週間）
- Custom Hooks単体テスト実装
- 重要コンポーネント（無限スクロール）テスト
- API統合テストの網羅的実装

#### Phase 3: E2E拡張（2-3週間）
- Playwright環境構築
- ブラウザ拡張機能E2Eテスト実装
- ビジュアルリグレッションテスト導入

#### Phase 4: 継続改善（継続）
- テストカバレッジ向上
- パフォーマンステスト追加
- 新機能開発時のテストファースト開発

### 期待される効果

#### 開発効率向上
- リグレッション防止による安心したリファクタリング
- 自動テスト実行による品質保証の効率化
- バグ発見の早期化とデバッグ工数削減

#### 保守性向上
- テストコードによるLiving Documentation
- 仕様変更時の影響範囲明確化
- エッジケースの体系的な検証

#### 品質保証強化
- カバレッジ可視化による網羅性確保
- クロスブラウザでの動作保証
- ユーザー体験に近い統合テスト

## Urls

- [Backlog ヘルプセンター](https://support-ja.backlog.com/hc/ja)
- [Backlog API とは](https://developer.nulab.com/ja/docs/backlog/)
- [npm:backlog-js](https://www.npmjs.com/package/backlog-js)
