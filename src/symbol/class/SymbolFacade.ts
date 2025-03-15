import { SymbolFacade } from "symbol-sdk/symbol";
import { PrivateKey, PublicKey } from "symbol-sdk";

console.log(SymbolFacade);

/**
 * SymbolFacadeクラスの使用方法を示すサンプルコード
 *
 * このファイルでは、SymbolFacadeクラスの主要な機能と使い方を示します。
 * SymbolFacadeはSymbolブロックチェーンと対話するためのファサードクラスで、
 * トランザクションの作成、署名、検証などの機能を提供します。
 */

// サンプルコードの実行関数
async function runSymbolFacadeSample() {
  try {
    console.log("SymbolFacadeサンプルの実行を開始します...");

    /**
     * 1. SymbolFacadeのインスタンス化
     *
     * SymbolFacadeはネットワーク名または Network オブジェクトを受け取ります。
     * 一般的なネットワーク名: 'mainnet', 'testnet'
     */
    const facade = new SymbolFacade("testnet");
    console.log(`ネットワーク: ${facade.network.name}`);

    /**
     * 2. アカウントの作成
     *
     * 秘密鍵からSymbolアカウントを作成します。
     * 実際のアプリケーションでは、安全に生成された秘密鍵を使用してください。
     */
    // ランダムな秘密鍵を生成（サンプル用）
    // 注: 実際のアプリケーションでは、安全に生成・保管された秘密鍵を使用してください
    const privateKey = PrivateKey.random();
    console.log(`生成された秘密鍵: ${privateKey.toString()}`);

    // 秘密鍵からアカウントを作成
    const account = facade.createAccount(privateKey);
    console.log(`アカウントアドレス: ${account.address.toString()}`);
    console.log(`公開鍵: ${account.publicKey.toString()}`);

    /**
     * 3. 公開鍵からパブリックアカウントの作成
     *
     * 公開鍵のみを持つアカウント（署名できないアカウント）を作成します。
     */
    const publicAccount = facade.createPublicAccount(account.publicKey);
    console.log(
      `パブリックアカウントアドレス: ${publicAccount.address.toString()}`
    );

    /**
     * 4. 現在のネットワークタイムスタンプの取得
     *
     * ブロックチェーンのタイムスタンプは通常のUNIXタイムスタンプとは異なります。
     * このメソッドは現在のネットワークタイムスタンプを取得します。
     */
    const timestamp = facade.now();
    console.log(`現在のネットワークタイムスタンプ: ${timestamp.toString()}`);

    /**
     * 5. BIP32パスの生成
     *
     * 指定されたアカウントIDに対応するBIP32パスを生成します。
     * これは階層的決定性ウォレット（HD Wallet）で使用されます。
     */
    const accountId = 0; // 最初のアカウント
    const bip32Path = facade.bip32Path(accountId);
    console.log(
      `アカウントID ${accountId} のBIP32パス: [${bip32Path.join(", ")}]`
    );

    /**
     * 6. トランザクションの作成
     *
     * トランザクションファクトリーを使用してトランザクションを作成します。
     * ここでは転送トランザクションを例として使用します。
     */
    // 受信者アドレスを作成
    const recipientAddress = new SymbolFacade.Address(
      "TDZBCWHAVA62R4JFZJJUXQWXLIRTUK5KZHFR5AQ"
    );

    // トランザクションファクトリーを使用して転送トランザクションを作成
    // 注: 実際のアプリケーションでは、Symbol SDKのドキュメントを参照して
    // 正確なトランザクションタイプの指定方法を確認してください
    const transferTransaction = facade.transactionFactory.create({
      type: "transfer_transaction_v1", // トランザクションタイプ
      signerPublicKey: account.publicKey,
      fee: 100_000n, // 手数料（マイクロXYM単位）
      deadline: 2 * 60 * 60, // デッドライン（秒単位）
      recipientAddress: recipientAddress,
      mosaics: [
        {
          mosaicId: 0x72c0212e67a08bcen, // ネットワーク通貨のID
          amount: 1_000_000n, // 1 XYM（マイクロXYM単位）
        },
      ],
      message: Buffer.from("サンプルメッセージ", "utf8"),
    });

    console.log("トランザクション作成完了:");
    console.log(`- タイプ: ${transferTransaction.type.toString()}`);
    console.log(`- 手数料: ${transferTransaction.fee.toString()}`);
    console.log(`- デッドライン: ${transferTransaction.deadline.toString()}`);

    /**
     * 7. トランザクションの署名
     *
     * 作成したトランザクションに署名します。
     * 署名されたトランザクションはネットワークにアナウンスできます。
     */
    // 秘密鍵からキーペアを作成
    const keyPair = new SymbolFacade.KeyPair(privateKey);

    // トランザクションに署名
    const signature = facade.signTransaction(keyPair, transferTransaction);
    console.log(`署名: ${signature.toString()}`);

    /**
     * 8. トランザクションの検証
     *
     * 署名されたトランザクションが有効かどうかを検証します。
     */
    const isValid = facade.verifyTransaction(transferTransaction, signature);
    console.log(`トランザクション署名の検証結果: ${isValid ? "有効" : "無効"}`);

    /**
     * 9. トランザクションのハッシュ計算
     *
     * トランザクションのハッシュを計算します。
     * このハッシュはトランザクションを一意に識別するために使用されます。
     */
    const transactionHash = facade.hashTransaction(transferTransaction);
    console.log(`トランザクションハッシュ: ${transactionHash.toString()}`);

    /**
     * 10. 署名ペイロードの抽出
     *
     * トランザクションから署名すべきペイロードを抽出します。
     * これは署名プロセスの一部として使用されます。
     */
    const signingPayload = facade.extractSigningPayload(transferTransaction);
    console.log(`署名ペイロードサイズ: ${signingPayload.length} バイト`);

    /**
     * 11. トランザクションの連署
     *
     * マルチシグトランザクションなどで使用される連署を作成します。
     */
    const cosignature = facade.cosignTransaction(keyPair, transferTransaction);
    console.log(`連署: ${cosignature.signature.toString()}`);

    /**
     * 12. トランザクションハッシュの連署
     *
     * トランザクションハッシュに対する連署を作成します。
     * これはトランザクション全体を持っていない場合に使用できます。
     */
    const hashCosignature = SymbolFacade.cosignTransactionHash(
      keyPair,
      transactionHash
    );
    console.log(`ハッシュ連署: ${hashCosignature.signature.toString()}`);

    /**
     * 13. 共有キーの導出
     *
     * 自分のキーペアと相手の公開鍵から共有キーを導出します。
     * これは暗号化通信などで使用されます。
     */
    // 別のアカウントの公開鍵（例として）
    // 注: 実際のアプリケーションでは、実在する公開鍵を使用してください
    // ここでは、別のキーペアを生成して、その公開鍵を使用します
    const otherKeyPair = new SymbolFacade.KeyPair(PrivateKey.random());
    const otherPublicKey = otherKeyPair.publicKey;
    console.log(`別のアカウントの公開鍵: ${otherPublicKey.toString()}`);

    // 共有キーを導出
    const sharedKey = SymbolFacade.deriveSharedKey(keyPair, otherPublicKey);
    console.log(`共有キー: ${Buffer.from(sharedKey.bytes).toString("hex")}`);

    /**
     * 14. 埋め込みトランザクションの作成
     *
     * アグリゲートトランザクション内で使用される埋め込みトランザクションを作成します。
     */
    // 埋め込みトランザクションを作成
    // 注: 実際のアプリケーションでは、Symbol SDKのドキュメントを参照して
    // 正確なトランザクションタイプの指定方法を確認してください
    const embeddedTransaction = facade.transactionFactory.createEmbedded({
      type: "transfer_transaction_v1", // トランザクションタイプ
      signerPublicKey: account.publicKey,
      recipientAddress: recipientAddress,
      mosaics: [
        {
          mosaicId: 0x72c0212e67a08bcen,
          amount: 1_000_000n,
        },
      ],
      message: Buffer.from("埋め込みトランザクションのメッセージ", "utf8"),
    });

    console.log(
      `埋め込みトランザクションタイプ: ${embeddedTransaction.type.toString()}`
    );

    /**
     * 15. 埋め込みトランザクションのハッシュ計算
     *
     * アグリゲートトランザクション内の埋め込みトランザクションのハッシュを計算します。
     */
    const embeddedTransactionsHash = SymbolFacade.hashEmbeddedTransactions([
      embeddedTransaction,
    ]);
    console.log(
      `埋め込みトランザクションハッシュ: ${embeddedTransactionsHash.toString()}`
    );

    /**
     * 16. BIP32ノードからキーペアの導出
     *
     * BIP32ノードからSymbolキーペアを導出します。
     * これはHDウォレットの実装で使用されます。
     */
    // 注: 実際のBIP32ノードの作成には追加のライブラリが必要です
    console.log(`BIP32曲線名: ${SymbolFacade.BIP32_CURVE_NAME}`);

    console.log("SymbolFacadeサンプルの実行が完了しました。");
  } catch (error) {
    console.error("エラーが発生しました:", error);
  }
}

// サンプルコードの実行
// 注: 実際に実行する場合はコメントを解除してください
runSymbolFacadeSample().catch(console.error);

// エクスポート（必要に応じて）
export { runSymbolFacadeSample };
