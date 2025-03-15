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
