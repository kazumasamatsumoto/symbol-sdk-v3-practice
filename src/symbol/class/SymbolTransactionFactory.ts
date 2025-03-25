import { SymbolTransactionFactory, Network, Address, KeyPair } from "symbol-sdk/symbol";
import { PrivateKey, Signature } from "symbol-sdk";

console.log(SymbolTransactionFactory);

// Networkのインスタンスを作成
const TESTNET = Network.TESTNET;
const symbolTransactionFactory = new SymbolTransactionFactory(TESTNET);

console.log(symbolTransactionFactory);

console.log("SymbolTransactionFactoryのインスタンスが作成されました。");
console.log(`使用ネットワーク: ${TESTNET.name}`);

// アカウントの準備
const privateKey = PrivateKey.random();
const keyPair = new KeyPair(privateKey);
const publicKey = keyPair.publicKey;
console.log(`公開鍵: ${publicKey.toString()}`);

// 受信者アドレスの作成
const recipientAddress = new Address("TDWBA6L3CZ6VTZAZPAISL3RWM5VKMHM6J6IM3LY");
console.log(`受信者アドレス: ${recipientAddress.toString()}`);

// 送金トランザクションの作成
const tx = symbolTransactionFactory.create({
    type: "transfer_transaction_v1",
    signerPublicKey: publicKey,
    fee: 100_000n,
    deadline: 2 * 60 * 60,
    recipientAddress: recipientAddress,
    mosaics: [{ mosaicId: 0x72c0212e67a08bcen, amount: 1_000_000n }],
    message: Buffer.from("テストメッセージ", "utf8")
});

console.log("送金トランザクション作成完了:");
console.log(`- タイプ: ${tx.type.toString()}`);
console.log(`- 手数料: ${tx.fee.toString()}`);

// 埋め込みトランザクションの作成
const embeddedTx = symbolTransactionFactory.createEmbedded({
    type: "transfer_transaction_v1",
    signerPublicKey: publicKey,
    recipientAddress: recipientAddress,
    mosaics: [{ mosaicId: 0x72c0212e67a08bcen, amount: 1_000_000n }],
    message: Buffer.from("埋め込みトランザクション", "utf8")
});

console.log("埋め込みトランザクション作成完了:");
console.log(`- タイプ: ${embeddedTx.type.toString()}`);

// トランザクションのシリアライズとデシリアライズ
const serializedTx = tx.serialize();
console.log(`シリアライズされたトランザクションサイズ: ${serializedTx.length} バイト`);

const deserializedTx = SymbolTransactionFactory.deserialize(serializedTx);
console.log("デシリアライズされたトランザクション:");
console.log(`- タイプ: ${deserializedTx.type.toString()}`);

// 埋め込みトランザクションのシリアライズとデシリアライズ
const serializedEmbeddedTx = embeddedTx.serialize();
const deserializedEmbeddedTx = SymbolTransactionFactory.deserializeEmbedded(serializedEmbeddedTx);
console.log(`デシリアライズされた埋め込みトランザクションタイプ: ${deserializedEmbeddedTx.type.toString()}`);

// 署名の作成と付与
const signature = keyPair.sign(deserializedTx.serialize());
console.log(`署名: ${signature.toString()}`);

const signedTx = SymbolTransactionFactory.attachSignature(deserializedTx, signature);
console.log(`署名付きトランザクションJSONサイズ: ${signedTx.length}`);

// トランザクション名のルックアップ
const transactionName = SymbolTransactionFactory.lookupTransactionName(
    deserializedTx.type,
    deserializedTx.version
);
console.log(`トランザクション名: ${transactionName}`);

/**
 * 実行方法:
 *
 * ```
 * tsx .\src\symbol\class\SymbolTransactionFactory.ts
 * ```
 */

/**
 * `SymbolTransactionFactory`クラスを使うと、以下のことができます：

1. **様々な種類のトランザクションの作成**
   - 送金トランザクション（転送）
   - モザイク（トークン）の作成・変更
   - ネームスペースの登録
   - マルチシグアカウントの設定
   - メタデータの追加
   - ハッシュロック・シークレットロック
   - アカウントリンク、ノードリンク
   - その他多数のSymbolブロックチェーン固有のトランザクション

2. **埋め込みトランザクションの作成**
   - アグリゲートトランザクション（複数のトランザクションを一つにまとめたもの）内で使用するための埋め込みトランザクションを作成できます
   - これにより、複数の操作を原子的に（一つのユニットとして）実行することが可能になります

3. **バイナリデータからのトランザクションの復元**
   - `deserialize()`メソッドを使用して、バイナリ形式からトランザクションオブジェクトを復元
   - `deserializeEmbedded()`メソッドで埋め込みトランザクションを復元

4. **署名の付与**
   - `attachSignature()`メソッドで、作成したトランザクションに署名を付与し、ネットワークへ送信できる形式に変換

5. **トランザクション情報の取得**
   - `lookupTransactionName()`メソッドで、トランザクションタイプとバージョンから人間が読める形式の名前を取得

このクラスはSymbolブロックチェーンでの取引や操作を行うための基本的なブロックを構築するものです。ネットワークへのトランザクション送信自体は別のクラス（通常はRepositoryクラス）を使用しますが、`SymbolTransactionFactory`はそれらのトランザクションを正しいフォーマットで作成するための重要なコンポーネントです。

実用的なアプリケーションでは、このファクトリーを使って様々なブロックチェーン操作（資産の送金、トークンの作成、スマートコントラクトとの対話など）のためのトランザクションを作成し、それに署名して、ブロックチェーンネットワークに送信することができます。

 */