## TypeScript の設定

symbol-sdk を TypeScript プロジェクトで使用する際に、以下のようなエラーが発生する場合があります：

```
Cannot find module 'symbol-sdk/symbol' or its corresponding type declarations.
```

このエラーを解決するには、以下の設定が必要です：

### 設定の概要図

![TypeScript Module Resolution](/docs/esmodules/svg/typescript-module-resolution.svg)

1. `tsconfig.json`の設定を更新：

```json
{
  "compilerOptions": {
    "module": "Node16",
    "moduleResolution": "node16"
  }
}
```

2. `package.json`で ES モジュールを有効化：

```json
{
  "type": "module"
}
```

3. ts-node で ES モジュールを使用する場合は、実行時に`--esm`フラグを追加：

```json
{
  "scripts": {
    "start": "ts-node --esm src/index.ts"
  }
}
```

これらの設定により、symbol-sdk の型定義が正しく解決され、TypeScript の型チェックが正常に機能するようになります。

## Symbol SDK のモジュール設計と実行時の設定について

Symbol SDK は最新の JavaScript/TypeScript のモジュールシステムを採用しており、ES モジュール（ECMAScript Modules）として実装されています。このモジュール設計により、より良い tree-shaking（未使用コードの除去）やパッケージの最適化が可能になっていますが、実行時に特別な設定が必要になります。

### なぜ ts-node で直接実行できないのか？

![Symbol SDK モジュール解決の仕組み](/docs/esmodules/svg/module-resolution-flow.svg)

ts-node で直接実行できない理由は、以下の要因が組み合わさっているためです：

1. **Symbol SDK のモジュール形式**

   - Symbol SDK は ES モジュールとして実装されています
   - ES モジュールは`import/export`構文を使用し、静的な依存関係解析が可能

2. **デフォルトの ts-node 動作**

   - 通常の ts-node は CommonJS 形式（`require/module.exports`）として実行します
   - CommonJS と ES モジュール間の互換性の問題により、直接的な import が失敗します

3. **TypeScript のモジュール解決**
   - TypeScript のモジュール解決システムは、実行時の Node.js の動作とは異なる場合があります
   - コンパイル時と実行時で異なるモジュール解決方式が使用されると問題が発生

### なぜ--loader ts-node/esm オプションで動くのか？

このオプションが機能する理由は以下の通りです：

1. **ESM ローダーの有効化**

   ```json
   // package.json
   {
     "type": "module",
     "scripts": {
       "start": "node --loader ts-node/esm src/index.ts"
     }
   }
   ```

   - `type: "module"`により、プロジェクト全体が ES モジュールとして扱われます
   - `--loader ts-node/esm`は、TypeScript ファイルを ES モジュールとして正しく解釈します

2. **TypeScript の設定**

   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "module": "NodeNext",
       "target": "ESNext"
     },
     "ts-node": {
       "esm": true,
       "experimentalSpecifierResolution": "node"
     }
   }
   ```

   - `module: "NodeNext"`により、最新の Node.js のモジュール解決方式を使用
   - `experimentalSpecifierResolution: "node"`で、Node.js スタイルの解決を有効化

3. **実行時の動作**
   - ts-node/esm ローダーが TypeScript ファイルを検出
   - ES モジュールとしてトランスパイル
   - Symbol SDK の ES モジュールとして実装された機能を正しく import

この設定により、開発時の TypeScript の型チェックと実行時のモジュール解決の両方が正しく機能し、Symbol SDK を問題なく使用できるようになります。
