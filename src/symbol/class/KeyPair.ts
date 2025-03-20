import { KeyPair } from "symbol-sdk/symbol";
import { PrivateKey } from "symbol-sdk";

console.log(KeyPair);

// KeyPairのインスタンス化
const keyPair = new KeyPair(PrivateKey.random());

// 公開鍵の取得
const publicKey = keyPair.publicKey;
console.log("Public Key:", publicKey);

// 署名したいメッセージ（Uint8Array形式）
const message = new TextEncoder().encode("Hello, world!");

// 署名の生成
const signature = keyPair.sign(message);
console.log("Signature:", signature);

/**
 * 実行方法:
 *
 * ```
 * tsx .\src\symbol\class\KeyPair.ts
 * ```
 * このファイルは Symbol ブロックチェーンの鍵ペア操作を示すサンプルコードです。

具体的には：
- `symbol-sdk`から`KeyPair`と`PrivateKey`クラスをインポート
- ランダムな秘密鍵から新しい鍵ペアを作成
- 公開鍵を取得して表示
- "Hello, world!"というテキストメッセージを署名
- 生成された署名を表示

このコードは暗号鍵ペアの基本的な使用方法と、デジタル署名の作成プロセスを示しています。Symbol SDKの主要な暗号機能をシンプルに実証しています。

 */