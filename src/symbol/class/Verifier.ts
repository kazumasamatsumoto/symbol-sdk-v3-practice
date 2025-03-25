import { Verifier, KeyPair } from "symbol-sdk/symbol";
import { PrivateKey } from "symbol-sdk";

// ランダムな秘密鍵を生成
const privateKey = PrivateKey.random();

// KeyPairの生成
const keyPair = new KeyPair(privateKey);

// 公開鍵の取得
const publicKey = keyPair.publicKey;

// Verifierインスタンスの作成
const verifier = new Verifier(publicKey);

// 検証するメッセージ
const message = new Uint8Array([1, 2, 3, 4, 5]);

// メッセージに署名
const signature = keyPair.sign(message);

// 署名の検証
const isValid = verifier.verify(message, signature);

console.log('秘密鍵:', Buffer.from(privateKey.bytes).toString('hex'));
console.log('公開鍵:', Buffer.from(publicKey.bytes).toString('hex'));
console.log('署名:', Buffer.from(signature.bytes).toString('hex'));
console.log('署名の検証結果:', isValid);

/**
 * 実行方法:
 *
 * ```
 * tsx .\src\symbol\class\Verifier.ts
 * ```
 * はい、このファイルは署名の検証ができます。具体的な流れを説明させていただきます：

1. 署名の生成と検証の流れ：
   - ランダムな秘密鍵（`privateKey`）を生成
   - その秘密鍵から`KeyPair`を作成
   - `KeyPair`から公開鍵（`publicKey`）を取得
   - メッセージ（`[1, 2, 3, 4, 5]`）に対して署名を生成
   - `Verifier`を使用して署名を検証

2. 実際の使用例：
   - このコードを実行すると、以下の情報が表示されます：
     - 生成された秘密鍵（16進数形式）
     - 生成された公開鍵（16進数形式）
     - 生成された署名（16進数形式）
     - 検証結果（`true`になるはずです）

3. 検証の仕組み：
   - `verifier.verify(message, signature)`メソッドは、以下の3つの要素を使用して検証を行います：
     - 検証対象のメッセージ
     - 署名
     - 公開鍵

このコードは、Symbolブロックチェーンの署名検証の基本的な機能を実装しています。実際の使用では、以下のような場面で活用できます：

- トランザクションの署名検証
- メッセージの署名検証
- アカウントの所有権の確認

必要に応じて、検証するメッセージや署名を変更することができます。

 */