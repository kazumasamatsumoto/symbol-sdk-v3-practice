import { MessageEncoder, KeyPair } from "symbol-sdk/symbol";
import { PrivateKey } from "symbol-sdk";

console.log(MessageEncoder);

// 例: 自分のED25519の秘密鍵からKeyPairを作成（obtainYourPrivateKeyはご自身で実装する関数）
const keyPair = new KeyPair(PrivateKey.random());

// MessageEncoderのインスタンスを生成
const messageEncoder = new MessageEncoder(keyPair);

// 自分の公開鍵（メッセージエンコーダに設定されているもの）
console.log("My Public Key:", messageEncoder.publicKey);

// 送信先の公開鍵（例: recipientPublicKeyを用意）
const recipientPublicKey = keyPair.publicKey; // ご自身で送信先の公開鍵を取得

// 暗号化したいメッセージ（Uint8Array形式に変換）
const message = new TextEncoder().encode(
  "こんにちは、メッセージ暗号化テスト！"
);

// 推奨のフォーマットでメッセージを暗号化
const encodedMessage = messageEncoder.encode(recipientPublicKey, message);
console.log("Encoded Message:", encodedMessage);

// --- 復号の例 ---
// ※復号を試すには、受信側が自身のKeyPairや公開鍵を利用してtryDecodeする必要があります。
// ここでは受信側の公開鍵としてrecipientPublicKeyを用いていますが、実際は受信側が自分のKeyPairで復号します。
const tryDecodeResult = messageEncoder.tryDecode(
  recipientPublicKey,
  encodedMessage
);
console.log("Try Decode Result:", tryDecodeResult);

/**
 * 実行方法:
 *
 * ```
 * tsx .\src\symbol\class\MessageEncoder.ts
 * 
 * このファイルは、Symbol ブロックチェーンでのメッセージ暗号化と復号化を示すサンプルコードです。

主な内容:
- Symbol SDK から `MessageEncoder` と `KeyPair` クラスをインポート
- ランダムな秘密鍵から `KeyPair` を生成
- `MessageEncoder` インスタンスを作成して公開鍵を出力
- 「こんにちは、メッセージ暗号化テスト！」というテキストを暗号化
- 暗号化されたメッセージを復号化

このコードでは、メッセージの送信者と受信者が同じ（テスト用）ですが、実際のユースケースでは異なる公開鍵を使用します。`MessageEncoder` クラスを使えば、Symbol ブロックチェーン上で安全にメッセージをやり取りできます。

 */