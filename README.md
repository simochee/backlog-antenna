# WXT template

## Features

- 完全な WXT の開発環境
- Biome と Lefthook による Git Hook ベースの Linter / Formatter
- commitlint と Conventional Commits によるバージョニング
- Chrome Web Store と Add-ons for Firefox への自動公開

## Usage

- [このリポジトリから、新しいリポジトリを作成](https://github.com/new?template_name=wxt-template&template_owner=simochee)
- [リポジトリにシークレットを登録](#repository-secrets)
- GitHub Actions ワークフローや `package.json`、 `wxt.config.ts` などに拡張機能の情報を入力
- 開発開始！

## Repositry Variables

Chrome Web Store と Add-ons for Firefox から取得できる拡張機能の ID を設定します。

- `CHROME_EXTENSION_ID`
- `FIREFOX_EXTENSION_ID`

## Repository Secrets

[`wxt submit init`](https://wxt.dev/api/cli/wxt-submit-init.html) で作成される `.env.submit` を元に、次の値を設定してください。

### Chrome Web Store

- `CHROME_CLIENT_ID`
- `CHROME_CLIENT_SECRET`
- `CHROME_REFRESH_TOKEN`

### Add-ons for Firefox

- `FIREFOX_JWT_ISSUER`
- `FIREFOX_JWT_SECRET`

## Additional: React + Tailwind CSS

はじめに、必要な依存関係を追加でインストールします。

```sh
pnpm add react{,-dom}
pnpm add -D @tsconfig/vite-react @types/react{,-dom} tailwindcss @tailwindcss/vite
```

`tsconfig.json` を更新します。

```bash
echo "$(jq '.extends |= ["@tsconfig/vite-react"] + (. // [])' tsconfig.json)" > tsconfig.json
```

つぎに、Tailwind CSS の Vite Plugin を `wxt.config.ts` に設定します。

```diff
+ import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
+  vite: () => ({
+    plugins: [tailwindcss()],
+  }),
});
```

さいごに、 Tailwind CSS のエントリーポイントとなる CSS ファイルを作成します。

```sh
echo "@import \"tailwindcss\";" > assets/styles.css
```

CSS ファイルはエントリーポイントの HTML ファイルで参照することで利用可能になります。

```diff
+  <link rel="stylesheet" href="~/assets/styles.css">
```

## License

MIT

## README Template

README のテンプレートは、次のプレースホルダーを置き換えてからご利用ください。

- `REPOSITORY_OWNER`
- `REPOSITORY_NAME`
- `EXTENSION_NAME`
- `SHORT_DESCRIPTION`
- `LONG_DESCRIPTION`
- `CHROME_EXTENSION_ID`
- `FIREFOX_EXTENSION_ID`

<details><summary>テンプレートを確認</summary>

<img src="assets/icon.png" width="96" height="96" alt="">

# EXTENSION_NAME

![](https://img.shields.io/github/license/REPOSITORY_OWNER/REPOSITORY_NAME)
![](https://img.shields.io/github/actions/workflow/status/REPOSITORY_OWNER/REPOSITORY_NAME/.github%2Fworkflows%2Fsubmit.yaml?label=Submit%20to%20Web%20Store)

> **Browser Extension:** SHORT_DESCRIPTION

LONG_DESCRIPTION

## Install

[link-chrome]: https://chromewebstore.google.com/detail/CHROME_EXTENSION_ID 'Chrome Web Store'
[link-firefox]: https://addons.mozilla.org/en-US/firefox/addon/FIREFOX_EXTENSION_ID/ 'Add-ons for Firefox'

[<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/chrome/chrome.svg" width="32" alt="Chrome">][link-chrome]
[<img src="https://img.shields.io/chrome-web-store/v/CHROME_EXTENSION_ID" alt="Chrome Web Store">][link-chrome]
also compatible with
[<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/edge/edge.svg" width="24" alt="Edge">][link-chrome]
[<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/opera/opera.svg" width="24" alt="Opera">][link-chrome]
[<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/brave/brave.svg" width="24" alt="Brave">][link-chrome]

[<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/firefox/firefox.svg" width="32" alt="Firefox">][link-firefox]
[<img src="https://img.shields.io/amo/v/FIREFOX_EXTENSION_ID" alt="Add-ons for Firefox">][link-firefox]

## License

MIT

</details>