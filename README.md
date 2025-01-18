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

![TypeScript Module Resolution](docs/typescript-module-resolution.svg)

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
