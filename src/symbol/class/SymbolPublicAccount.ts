/**
 * SymbolPublicAccountクラスの使用例
 *
 * このサンプルコードでは、以下の機能を示しています：
 * 1. SymbolPublicAccountの作成方法
 * 2. アドレスと公開鍵の取得
 * 3. 公開鍵からアドレスの導出
 * 4. トランザクションの署名検証
 * 5. トランザクションハッシュと署名の操作
 * 6. SymbolAccountとSymbolPublicAccountの関係
 * 7. 公開アカウント情報の表示
 *
 * 実行方法: tsx src/symbol/class/SymbolPublicAccount.ts
 */

// 必要なモジュールをインポート
import { SymbolFacade, SymbolPublicAccount, SymbolAccount, Network, Address, KeyPair } from "symbol-sdk/symbol";
import { PublicKey, PrivateKey, Hash256, Signature } from "symbol-sdk";

// サンプルコードの実行
async function runSymbolPublicAccountSample() {
  console.log("SymbolPublicAccountのサンプルコードを実行します");

  // 1. SymbolPublicAccountの作成
  console.log("\n1. SymbolPublicAccountの作成");

  // ネットワークタイプの設定（テストネット）
  const networkType = Network.TESTNET;

  // SymbolFacadeの作成
  const facade = new SymbolFacade(networkType);

  // 公開鍵からSymbolPublicAccountを作成（SymbolFacadeを使用）
  const publicKeyString = "9A49366406ACA952B88BADF5F1E9BE6CE4968141035A60BE503273EA65456B24";
  const publicKey = new PublicKey(publicKeyString);
  const publicAccount = facade.createPublicAccount(publicKey);

  // SymbolPublicAccountクラスを直接使用して公開アカウントを作成
  const directPublicAccount = new SymbolPublicAccount(facade, publicKey);

  console.log("公開アカウントが作成されました");
  console.log("SymbolPublicAccountクラスを直接使用して作成した公開アカウント:");
  console.log(`- アドレス: ${directPublicAccount.address.toString()}`);
  console.log(`- 公開鍵: ${directPublicAccount.publicKey.toString()}`);

  // 2. アドレスと公開鍵の取得
  console.log("\n2. アドレスと公開鍵の取得");

  // アドレスの取得
  const address = publicAccount.address;
  console.log(`アドレス: ${address.toString()}`);

  // 公開鍵の取得
  console.log(`公開鍵: ${publicAccount.publicKey.toString()}`);

  // 3. 公開鍵からアドレスの導出
  console.log("\n3. 公開鍵からアドレスの導出");

  // ランダムな公開鍵を生成（実際のアプリケーションでは通常は既存の公開鍵を使用）
  const randomHex = Array.from({ length: 64 }, () =>
    "0123456789ABCDEF"[Math.floor(Math.random() * 16)]
  ).join("");
  const anotherPublicKey = new PublicKey(randomHex);

  // 公開鍵からアドレスを導出（SymbolFacadeを使用）
  const derivedPublicAccount = facade.createPublicAccount(anotherPublicKey);
  const derivedAddress = derivedPublicAccount.address;

  console.log(`ランダム公開鍵: ${anotherPublicKey.toString()}`);
  console.log(`導出されたアドレス: ${derivedAddress.toString()}`);

  // 4. トランザクションの署名検証
  console.log("\n4. トランザクションの署名検証");

  // 検証のためにアカウントを作成（実際のアプリケーションでは不要）
  const privateKey = PrivateKey.random();
  const account = facade.createAccount(privateKey);

  // 送金トランザクションの作成
  const recipientAddress = new Address("TDWBA6L3CZ6VTZAZPAISL3RWM5VKMHM6J6IM3LY");
  const transferTransaction = facade.transactionFactory.create({
    type: "transfer_transaction_v1",
    signerPublicKey: account.publicKey,
    recipientAddress: recipientAddress,
    mosaics: [
      { mosaicId: BigInt("0x72C0212E67A08BCE"), amount: BigInt(1000000) }, // 1 XYM
    ],
    message: new Uint8Array(Buffer.from("Symbolトランザクションの検証テスト", "utf8")),
  });

  // トランザクションの署名
  const signature = account.signTransaction(transferTransaction);

  // 署名の検証（アカウントの公開鍵を使用）
  const isVerified = facade.verifyTransaction(transferTransaction, signature);
  console.log(`トランザクション署名の検証結果: ${isVerified ? '成功' : '失敗'}`);

  // 5. トランザクションハッシュと署名の操作
  console.log("\n5. トランザクションハッシュと署名の操作");

  // トランザクションハッシュの作成
  const transactionHash = facade.hashTransaction(transferTransaction);
  console.log(`トランザクションハッシュ: ${transactionHash.toString()}`);

  // 署名の文字列表現
  console.log(`署名の文字列表現: ${signature.toString()}`);

  // 署名のバイト配列
  console.log(`署名のバイト長: ${signature.bytes.length} バイト`);

  // 新しいSignatureインスタンスの作成
  const signatureHex = signature.toString();
  const newSignature = new Signature(signatureHex);
  console.log(`新しく作成した署名: ${newSignature.toString()}`);

  // Hash256の操作
  const hashHex = "A6A95934F4457399B66CB32146C9B4B59998D2D03A7BE4ACBE7437169D5455C0";
  const hash256 = new Hash256(hashHex);
  console.log(`Hash256: ${hash256.toString()}`);

  // 6. SymbolAccountとSymbolPublicAccountの関係
  console.log("\n6. SymbolAccountとSymbolPublicAccountの関係");

  // SymbolAccountはSymbolPublicAccountを継承している
  console.log(`SymbolAccountはSymbolPublicAccountのインスタンスか: ${account instanceof SymbolPublicAccount ? 'はい' : 'いいえ'}`);

  // SymbolAccountからSymbolPublicAccountとしての機能を使用
  const accountAsPublicAccount = account as SymbolPublicAccount;
  console.log(`SymbolAccountから取得したアドレス: ${accountAsPublicAccount.address.toString()}`);

  // SymbolAccountとSymbolPublicAccountの違い
  console.log("SymbolAccountとSymbolPublicAccountの違い:");
  console.log("- SymbolPublicAccount: 公開鍵とアドレスのみを持ち、署名機能はありません");
  console.log("- SymbolAccount: SymbolPublicAccountを継承し、秘密鍵も持つため署名機能があります");

  // SymbolAccountの作成（KeyPairを使用）
  const keyPair = new KeyPair(privateKey);
  const symbolAccount = new SymbolAccount(facade, keyPair);
  console.log(`SymbolAccountから取得した公開鍵: ${symbolAccount.publicKey.toString()}`);

  // 7. 公開アカウント情報の表示
  console.log("\n7. 公開アカウント情報の表示");

  // アカウント情報の表示
  console.log("公開アカウント情報:");
  console.log(`- ネットワークタイプ: ${networkType === Network.TESTNET ? 'テストネット' : 'メインネット'}`);
  console.log(`- アドレス: ${publicAccount.address.toString()}`);
  console.log(`- 公開鍵: ${publicAccount.publicKey.toString()}`);

  // アドレスのフォーマット確認
  const rawAddress = publicAccount.address.toString();
  // アドレスの有効性を確認（例外が発生しなければ有効）
  let isValidAddress = true;
  try {
    new Address(rawAddress);
  } catch (error) {
    isValidAddress = false;
  }
  console.log(`- アドレスの有効性: ${isValidAddress ? '有効' : '無効'}`);
}

// サンプルコードの実行
runSymbolPublicAccountSample().catch((error) => {
  console.error("エラーが発生しました:", error);
});

/**
 * 実行方法:
 *
 * ```
 * tsx .\src\symbol\class\SymbolPublicAccount.ts
 * これは`SymbolPublicAccount.ts`というTypeScriptファイルで、Symbol（旧NEM）ブロックチェーンの公開アカウントを扱うためのサンプルコードです。

ファイルには以下の機能が含まれています：

1. SymbolPublicAccountの作成方法
2. アドレスと公開鍵の取得方法
3. 公開鍵からアドレスの導出
4. トランザクションの署名検証
5. トランザクションハッシュと署名の操作方法
6. SymbolAccountとSymbolPublicAccountの関係性
7. 公開アカウント情報の表示

コードは`runSymbolPublicAccountSample()`関数内でこれらの機能を順番に実装し、各ステップで詳細なコンソール出力を行います。Symbol SDK v3を使用して、公開鍵やアドレスの操作、トランザクションの作成と署名検証、ハッシュ操作などのブロックチェーン基本機能をデモンストレーションしています。

テストネット環境で動作するサンプルで、実行方法は「tsx src/symbol/class/SymbolPublicAccount.ts」とコメントに記載されています。

 */
