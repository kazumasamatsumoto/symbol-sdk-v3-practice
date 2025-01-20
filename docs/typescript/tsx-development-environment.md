TSX を使用した環境構築の手順と構成を図式化します。

![TSX を使用した環境構築の手順と構成を図式化](/docs/tsx-development-environment.svg)

環境構築の手順は以下の通りです：

1. プロジェクトの初期化

```bash
# プロジェクトディレクトリの作成
mkdir your-project
cd your-project

# package.jsonの初期化
npm init -y
```

2. 必要なパッケージのインストール

```bash
# TSXとTypeScriptのインストール
npm install -D tsx typescript @types/node

# プロジェクトの依存パッケージのインストール（例：symbol-sdk）
npm install symbol-sdk
```

3. TypeScript 設定ファイルの作成

```bash
# tsconfig.jsonの生成
npx tsc --init
```

4. tsconfig.json の設定

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

5. package.json の更新

```json
{
  "type": "module",
  "scripts": {
    "start": "tsx src/index.ts",
    "dev": "tsx watch src/index.ts"
  }
}
```

6. プロジェクト構造の作成

```bash
mkdir src
touch src/index.ts
```

7. 実行

```bash
# 一度だけ実行
npm run start

# 開発モード（ファイル変更を監視）
npm run dev
```

この環境の主な特徴：

- TSX が TypeScript ファイルを直接実行できる
- ESModules 形式のインポートに完全対応
- 高速な実行と開発体験
- ファイル監視機能による自動再起動
- TypeScript の型チェックが有効

デバッグ設定を追加する場合は、`.vscode/launch.json`を以下のように設定できます：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug with TSX",
      "runtimeExecutable": "tsx",
      "runtimeArgs": ["${file}"],
      "skipFiles": ["<node_internals>/**"],
      "outFiles": ["${workspaceFolder}/dist/**/*.js"]
    }
  ]
}
```

これで、VSCode でのデバッグ実行も可能になります。
