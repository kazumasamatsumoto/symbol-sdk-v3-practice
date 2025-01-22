// 今日はトランザクションを練習します。
// トランザクションの作成ではアカウントAからアカウントBへと送信します。
// アカウントBの鍵は一度どこかで生成しておいておく
// configure.tsに生成した秘密鍵を確保しておく
// できた！

import { TextEncoder } from "node:util";
import {
  facade,
  AlicePublicKey,
  BobAddress,
  AlicePrivateKey,
  NODE,
} from "../Account/configure.js";
import { models } from "symbol-sdk/symbol";
import { KeyPair } from "symbol-sdk/symbol";
import { PrivateKey } from "symbol-sdk";
// 次はトランザクションを作成する
// 必要なものはmessageDataとトランザクションとトランザクションの手数料

// メッセージデータ
const messageData = new Uint8Array([
  0x00,
  ...new TextEncoder().encode("Hello, Symbol!"),
]);

// トランザクション
const tx = facade.transactionFactory.create({
  type: "transfer_transaction_v1",
  signerPublicKey: AlicePublicKey,
  deadline: facade.network.fromDatetime(new Date()).addHours(2).timestamp,
  recipientAddress: BobAddress,
  mosaics: [{ mosaicId: 0x72c0212e67a08bcen, amount: 1000000n }],
  message: messageData,
});

// トランザクションの手数料
tx.fee = new models.Amount(BigInt(tx.size * 100));

console.log("トランザクションの中身を確認します。", tx);

// 署名

// singTransaction関数にはキーペアとトランザクションの二つの材料が必要です
// キーペアはrandomで教材では生成していましたが、スタンドアローンのアプリ（独立しているアプリ）ではキャッシュ保存ができないため
// 秘密鍵からキーペアを生成します。

// キーペアを生成する
// 最初に保存したのは文字列だったため、Uint8Arrayに変換します。

const keyPair = new KeyPair(new PrivateKey(AlicePrivateKey));

const sig = facade.signTransaction(keyPair, tx);
const jsonPayload = facade.transactionFactory.static.attachSignature(tx, sig);

// アナウンス
const res = await fetch(new URL("/transactions", NODE), {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: jsonPayload,
})
  .then((res) => res.json())
  .then((json) => {
    return json;
  });

console.log("結果発表", res);
