# symbol-sdk-v3-practice

## 秘密鍵の生成

おそらく symbol-sdk の中に秘密鍵生成用のメソッドがあると思われます。
new をしてインスタンス生成しようとして怒られて new をなくすと動いたので、その理由は以下になります。

このエラーは TypeScript の型チェックに関連しています。

エラーの原因を説明すると：

1. `new PrivateKey.random()`という構文が問題を引き起こしています
2. TypeScript は`PrivateKey.random()`をコンストラクタとして扱おうとしていますが、`random()`は静的メソッドとして定義されているはずです

正しい使い方は以下のようになります：

```typescript
import { PrivateKey } from "symbol-sdk";

const aliceKey = PrivateKey.random(); // newを使わない
console.log("Alice's private key:", aliceKey);
```

`new`を使う必要がない理由：

- `PrivateKey.random()`は新しい PrivateKey インスタンスを返す静的ファクトリメソッドです
- このメソッドは内部で既にオブジェクトの生成を行っているため、外部で`new`を使う必要はありません

これは一般的なデザインパターンの一つで、ファクトリメソッドパターンと呼ばれるものに近い実装です。

## TypeScript の設定

symbol-sdk を TypeScript プロジェクトで使用する際に、以下のようなエラーが発生する場合があります：

```
Cannot find module 'symbol-sdk/symbol' or its corresponding type declarations.
```

このエラーを解決するには、以下の設定が必要です：

### 設定の概要図

![TypeScript Module Resolution](./docs/typescript-module-resolution.svg)

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

## Symbol SDKのモジュール設計と実行時の設定について

Symbol SDKは最新のJavaScript/TypeScriptのモジュールシステムを採用しており、ESモジュール（ECMAScript Modules）として実装されています。このモジュール設計により、より良い tree-shaking（未使用コードの除去）やパッケージの最適化が可能になっていますが、実行時に特別な設定が必要になります。

### なぜts-nodeで直接実行できないのか？

![Symbol SDK モジュール解決の仕組み](/docs/module-resolution-flow.svg)

ts-nodeで直接実行できない理由は、以下の要因が組み合わさっているためです：

1. **Symbol SDKのモジュール形式**
   - Symbol SDKはESモジュールとして実装されています
   - ESモジュールは`import/export`構文を使用し、静的な依存関係解析が可能

2. **デフォルトのts-node動作**
   - 通常のts-nodeはCommonJS形式（`require/module.exports`）として実行します
   - CommonJSとESモジュール間の互換性の問題により、直接的なimportが失敗します

3. **TypeScriptのモジュール解決**
   - TypeScriptのモジュール解決システムは、実行時のNode.jsの動作とは異なる場合があります
   - コンパイル時と実行時で異なるモジュール解決方式が使用されると問題が発生

### なぜ--loader ts-node/esmオプションで動くのか？

このオプションが機能する理由は以下の通りです：

1. **ESMローダーの有効化**
   ```json
   // package.json
   {
     "type": "module",
     "scripts": {
       "start": "node --loader ts-node/esm src/index.ts"
     }
   }
   ```
   - `type: "module"`により、プロジェクト全体がESモジュールとして扱われます
   - `--loader ts-node/esm`は、TypeScriptファイルをESモジュールとして正しく解釈します

2. **TypeScriptの設定**
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
   - `module: "NodeNext"`により、最新のNode.jsのモジュール解決方式を使用
   - `experimentalSpecifierResolution: "node"`で、Node.jsスタイルの解決を有効化

3. **実行時の動作**
   - ts-node/esmローダーがTypeScriptファイルを検出
   - ESモジュールとしてトランスパイル
   - Symbol SDKのESモジュールとして実装された機能を正しくimport

この設定により、開発時のTypeScriptの型チェックと実行時のモジュール解決の両方が正しく機能し、Symbol SDKを問題なく使用できるようになります。
