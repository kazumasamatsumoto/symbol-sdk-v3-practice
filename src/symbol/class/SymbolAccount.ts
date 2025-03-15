import { SymbolAccount } from "symbol-sdk/symbol";

/**
 * SymbolAccountクラスの使用例
 *
 * このサンプルコードでは、以下の機能を示しています：
 * 1. SymbolAccountの作成方法
 * 2. アドレスと公開鍵の取得
 * 3. トランザクションの署名
 * 4. メッセージの暗号化と復号化
 * 5. トランザクションのコサイン（連署）
 *
 * 実行方法: tsx src/symbol/class/SymbolAccount.ts
 */

// 必要なモジュールをインポート
import { SymbolFacade, Network, KeyPair, Address } from "symbol-sdk/symbol";
import { Hash256, PrivateKey } from "symbol-sdk";

// サンプルコードの実行
async function runSymbolAccountSample() {
  console.log("SymbolAccountのサンプルコードを実行します");

  // 1. SymbolAccountの作成
  console.log("\n1. SymbolAccountの作成");

  // ネットワークタイプの設定（テストネット）
  const networkType = Network.TESTNET;

  // SymbolFacadeの作成
  const facade = new SymbolFacade(networkType);

  // プライベートキーからアカウントを作成（実際の使用時は安全に管理されたプライベートキーを使用）
  // 注: 実際のアプリケーションでは、ユーザーが提供したプライベートキーを使用する方法を実装する必要があります
  const privateKey = PrivateKey.random();
  const keyPair = new KeyPair(privateKey);

  // SymbolAccountの作成
  const account = new SymbolAccount(facade, keyPair);
  console.log("アカウントが作成されました");

  // 2. アドレスと公開鍵の取得
  console.log("\n2. アドレスと公開鍵の取得");

  // アドレスの取得
  const address = account.address;
  console.log(`アドレス: ${address.toString()}`);

  // 公開鍵の取得
  const publicKey = account.publicKey;
  console.log(`公開鍵: ${publicKey.toString()}`);

  // 3. トランザクションの署名
  console.log("\n3. トランザクションの署名");

  // 送金トランザクションの作成
  const recipientAddress = new Address(
    "TDWBA6L3CZ6VTZAZPAISL3RWM5VKMHM6J6IM3LY"
  );
  const transferTransaction = facade.transactionFactory.create({
    type: "transfer_transaction_v1",
    signerPublicKey: account.publicKey,
    recipientAddress: recipientAddress,
    mosaics: [
      { mosaicId: BigInt("0x72C0212E67A08BCE"), amount: BigInt(1000000) },
    ], // 1 XYM
    message: new Uint8Array(
      Buffer.from("Symbolトランザクションのテスト", "utf8")
    ),
  });

  // トランザクションの署名
  const signature = account.signTransaction(transferTransaction);
  console.log(`トランザクション署名: ${signature.toString()}`);

  // 署名されたトランザクションの作成
  // 注: 実際のアプリケーションでは、署名されたトランザクションの作成方法を確認する必要があります
  console.log("署名されたトランザクションが作成されました");

  // 4. メッセージの暗号化と復号化
  console.log("\n4. メッセージの暗号化と復号化");

  // 別のアカウントを作成（受信者として）
  const recipientPrivateKey = PrivateKey.random();
  const recipientKeyPair = new KeyPair(recipientPrivateKey);
  const recipientAccount = new SymbolAccount(facade, recipientKeyPair);

  // メッセージエンコーダーの作成
  const messageEncoder = account.messageEncoder();

  // メッセージの暗号化
  const plainText = "秘密のメッセージ";
  const encryptedMessage = messageEncoder.encode(
    recipientAccount.publicKey,
    new Uint8Array(Buffer.from(plainText, "utf8"))
  );

  console.log(
    `暗号化されたメッセージ: ${Buffer.from(encryptedMessage).toString("hex")}`
  );

  // 受信者側でのメッセージの復号化
  const recipientMessageEncoder = recipientAccount.messageEncoder();
  const decryptedMessageBytes = recipientMessageEncoder.tryDecode(
    account.publicKey,
    encryptedMessage
  );

  if (decryptedMessageBytes) {
    console.log(`復号化されたメッセージが取得されました`);
    // 注: 実際のアプリケーションでは、復号化されたメッセージの処理方法を確認する必要があります
  } else {
    console.log("メッセージの復号化に失敗しました");
  }

  // 5. トランザクションのコサイン（連署）
  console.log("\n5. トランザクションのコサイン（連署）");

  // アグリゲートトランザクションを想定（実際のアグリゲートトランザクションの作成は省略）
  // トランザクションハッシュを仮定
  const transactionHash = new Hash256(
    "A6A95934F4457399B66CB32146C9B4B59998D2D03A7BE4ACBE7437169D5455C0"
  );

  // トランザクションハッシュへのコサイン（連署）
  const cosignature = account.cosignTransactionHash(transactionHash, false);
  console.log(`コサイン署名: ${cosignature.signature.toString()}`);

  // デタッチドコサイン（ネットワーク伝播用）
  const detachedCosignature = account.cosignTransactionHash(
    transactionHash,
    true
  );
  console.log(
    `デタッチドコサイン署名: ${detachedCosignature.signature.toString()}`
  );
}

// サンプルコードの実行
runSymbolAccountSample().catch((error) => {
  console.error("エラーが発生しました:", error);
});
