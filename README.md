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
