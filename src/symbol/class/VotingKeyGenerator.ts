import { KeyPair, VotingKeysGenerator } from "symbol-sdk/symbol";
import { PrivateKey } from "symbol-sdk";

console.log(VotingKeysGenerator);

/**
 * Symbol ブロックチェーンの投票鍵生成のサンプルコード
 *
 * このサンプルでは、VotingKeysGeneratorクラスを使用して
 * 特定のエポック範囲に対する投票鍵を生成する方法を示します。
 */

// ステップ1: 投票用のルート鍵ペアを生成
// 実際のアプリケーションでは、安全に保管された既存の鍵を使用することが多い
const rootPrivateKey = PrivateKey.random();
const rootKeyPair = new KeyPair(rootPrivateKey);
console.log("ルート公開鍵:", rootKeyPair.publicKey.toString());

// ステップ2: VotingKeysGeneratorのインスタンスを作成
// 第2引数の秘密鍵ジェネレータは省略可能（デフォルトのジェネレータが使用される）
const votingKeysGenerator = new VotingKeysGenerator(rootKeyPair);

// ステップ3: 特定のエポック範囲の投票鍵を生成
// エポックはブロックチェーンの時間単位（例：1エポック = 約1日）
const startEpoch = 1n; // 開始エポック（BigInt型）
const endEpoch = 30n; // 終了エポック（BigInt型）- 例えば1ヶ月分

// 投票鍵を生成（シリアライズされたバイナリデータとして返される）
const serializedVotingKeys = votingKeysGenerator.generate(startEpoch, endEpoch);
console.log(
  `エポック ${startEpoch} から ${endEpoch} までの投票鍵を生成しました`
);
console.log(
  `シリアライズされた投票鍵のサイズ: ${serializedVotingKeys.length} バイト`
);

// ステップ4: 生成された投票鍵の使用例
// 通常、この投票鍵はVotingKeyLinkTransactionを通じてアカウントにリンクされる
// または、ノード設定ファイルに保存される

// シリアライズされた投票鍵をBase64エンコードして表示（保存や転送に便利）
const base64VotingKeys = Buffer.from(serializedVotingKeys).toString("base64");
console.log("Base64エンコードされた投票鍵:");
console.log(base64VotingKeys);

// 実際のアプリケーションでは、以下のようにVotingKeyLinkTransactionを作成することが多い
/*
import { SymbolFacade, TransactionFactory } from 'symbol-sdk/symbol';

// ネットワークに応じたファサードを作成
const facade = new SymbolFacade('testnet');

// 投票鍵リンクトランザクションを作成
const votingKeyLinkTx = facade.transactionFactory.createEmbedded({
    type: 'voting_key_link_transaction_v1',
    signerPublicKey: account.publicKey,
    linkedPublicKey: rootKeyPair.publicKey, // 投票ルート公開鍵
    startEpoch,
    endEpoch,
    linkAction: 'link'
});

// このトランザクションをアグリゲートトランザクションに追加して署名・アナウンス
*/

/**
 * カスタム秘密鍵ジェネレータの実装例
 * 
 * 注意: このサンプルではカスタム秘密鍵ジェネレータの使用例は省略しています。
 * 実際のアプリケーションでは、VotingKeysGeneratorのコンストラクタの第2引数に
 * カスタム秘密鍵生成関数を指定することができます。
 * 
 * 例:
 * ```
 * function customPrivateKeyGenerator(rootPrivateKey: Uint8Array, epoch: bigint): Uint8Array {
 *   // カスタムロジックで特定のエポック用の秘密鍵を生成
 *   // ...
 *   return generatedPrivateKey;
 * }
 * 
 * const customVotingKeysGenerator = new VotingKeysGenerator(rootKeyPair, customPrivateKeyGenerator);
 * const customSerializedVotingKeys = customVotingKeysGenerator.generate(startEpoch, endEpoch);
 * ```
 */

/**
 * 実行方法:
 *
 * ```
 * tsx ./src/symbol/class/VotingKeyGenerator.ts
 * ```
 *
 * 注意:
 * - このサンプルを実行するには symbol-sdk がインストールされている必要があります
 * - 実際のブロックチェーンアプリケーションでは、秘密鍵の安全な管理が重要です
 * - 投票鍵はSymbolブロックチェーンのコンセンサスメカニズムで使用されます
 */
