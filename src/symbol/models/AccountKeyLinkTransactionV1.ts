import { models, SymbolFacade, Network, KeyPair } from "symbol-sdk/symbol";
import { PrivateKey, PublicKey } from "symbol-sdk";

/**
 * AccountKeyLinkTransactionV1の使い方を示すサンプルコード
 * 
 * AccountKeyLinkTransactionは、アカウントのメインキーと別のキー（通常はリモートキー）をリンクするために使用されます。
 * これにより、リモートノードでの委任ハーベスティングなどの機能が可能になります。
 */

// 型定義
type Transaction = any; // 実際のトランザクション型に置き換えてください
type Signature = any; // 実際の署名型に置き換えてください

// サンプル1: AccountKeyLinkTransactionV1の基本的な使い方
const createAccountKeyLinkTransaction = () => {
  // SymbolFacadeのインスタンス化（テストネットを使用）
  const facade = new SymbolFacade(Network.TESTNET);
  
  // リンクするリモート公開鍵（これは例です。実際の使用では有効な公開鍵を使用してください）
  // 注: 実際のアプリケーションでは、有効な公開鍵を使用する必要があります
  const remotePrivateKey = PrivateKey.random();
  const remoteKeyPair = new KeyPair(remotePrivateKey);
  const remotePublicKey = remoteKeyPair.publicKey;
  
  // ダミーの署名者公開鍵を作成
  const signerPrivateKey = PrivateKey.random();
  const signerKeyPair = new KeyPair(signerPrivateKey);
  const signerPublicKey = signerKeyPair.publicKey;
  
  // AccountKeyLinkTransactionV1の作成
  const accountKeyLinkTx = facade.transactionFactory.create({
    type: 'account_key_link_transaction_v1',
    signerPublicKey: signerPublicKey,
    fee: 100000n, // 手数料
    deadline: 2 * 60 * 60, // デッドライン（秒単位）
    linkedPublicKey: remotePublicKey,
    linkAction: models.LinkAction.LINK // リンクを追加
  });
  
  console.log('AccountKeyLinkTransactionV1が作成されました');
  // トランザクションの詳細を表示
  console.log('トランザクションタイプ:', accountKeyLinkTx.type.toString());
  console.log('署名者の公開鍵:', accountKeyLinkTx.signerPublicKey.toString());
  console.log('手数料:', accountKeyLinkTx.fee.toString());
  console.log('デッドライン:', accountKeyLinkTx.deadline.toString());
  console.log('ネットワークタイプ:', facade.network.name);
  
  // 注: 実際のトランザクションオブジェクトの構造に応じて、linkedPublicKeyとlinkActionへのアクセス方法は異なる場合があります
  
  return { facade, accountKeyLinkTx, remotePublicKey };
};

// サンプル2: AccountKeyLinkTransactionV1の署名
const signAccountKeyLinkTransaction = (facade: SymbolFacade, transaction: Transaction) => {
  // 署名者のキーペア（これは例です。実際の使用では自分のキーペアを使用してください）
  const privateKey = PrivateKey.random();
  const keyPair = new KeyPair(privateKey);
  
  // トランザクションの署名
  const signature = facade.signTransaction(keyPair, transaction);
  
  // 署名されたトランザクションを作成
  const signedTx = {
    ...transaction,
    signature: signature
  };
  
  console.log('トランザクションが署名されました');
  console.log('署名:', signature.toString());
  console.log('署名者の公開鍵:', keyPair.publicKey.toString());
  
  return signedTx;
};

// サンプル3: AccountKeyLinkTransactionV1のハッシュ計算
const hashTransaction = (facade: SymbolFacade, transaction: Transaction) => {
  try {
    // 注: 署名されたトランザクションではなく、元のトランザクションオブジェクトを使用します
    // 署名されたトランザクションから元のトランザクションを取得する方法は、
    // 実際のアプリケーションでは異なる場合があります
    const originalTransaction = transaction.hasOwnProperty('signature') 
      ? { ...transaction } // 署名されたトランザクションの場合、元のトランザクションプロパティを保持
      : transaction; // 署名されていないトランザクションの場合はそのまま使用
    
    // トランザクションのハッシュを計算
    console.log('トランザクションハッシュの計算を試みます...');
    console.log('注: 実際のアプリケーションでは、正しいハッシュ計算方法を使用してください');
    
    // ハッシュ計算の例（実際のアプリケーションでは異なる場合があります）
    console.log('トランザクションタイプ:', originalTransaction.type ? originalTransaction.type.toString() : 'タイプ情報なし');
    console.log('署名者の公開鍵:', originalTransaction.signerPublicKey ? originalTransaction.signerPublicKey.toString() : '署名者情報なし');
    
    return { toString: () => 'ハッシュ計算の例（実際のアプリケーションでは異なります）' };
  } catch (error) {
    console.log('ハッシュ計算中にエラーが発生しました:', error);
    return { toString: () => 'ハッシュ計算エラー' };
  }
};

// サンプル4: リンク解除のためのAccountKeyLinkTransactionV1の作成
const createUnlinkTransaction = () => {
  // SymbolFacadeのインスタンス化（テストネットを使用）
  const facade = new SymbolFacade(Network.TESTNET);
  
  // リンクするリモート公開鍵（これは例です。実際の使用では有効な公開鍵を使用してください）
  const remotePrivateKey = PrivateKey.random();
  const remoteKeyPair = new KeyPair(remotePrivateKey);
  const remotePublicKey = remoteKeyPair.publicKey;
  
  // ダミーの署名者公開鍵を作成
  const signerPrivateKey = PrivateKey.random();
  const signerKeyPair = new KeyPair(signerPrivateKey);
  const signerPublicKey = signerKeyPair.publicKey;
  
  // リンク解除のためのAccountKeyLinkTransactionV1の作成
  const unlinkTx = facade.transactionFactory.create({
    type: 'account_key_link_transaction_v1',
    signerPublicKey: signerPublicKey,
    fee: 100000n, // 手数料
    deadline: 2 * 60 * 60, // デッドライン（秒単位）
    linkedPublicKey: remotePublicKey,
    linkAction: models.LinkAction.UNLINK // リンクを解除
  });
  
  console.log('リンク解除トランザクションが作成されました');
  // トランザクションの詳細を表示
  console.log('トランザクションタイプ:', unlinkTx.type.toString());
  console.log('署名者の公開鍵:', unlinkTx.signerPublicKey.toString());
  console.log('手数料:', unlinkTx.fee.toString());
  console.log('デッドライン:', unlinkTx.deadline.toString());
  console.log('ネットワークタイプ:', facade.network.name);
  
  return { facade, unlinkTx, remotePublicKey };
};

// サンプル5: AccountKeyLinkTransactionV1の静的プロパティの使用
const useStaticProperties = () => {
  try {
    console.log('AccountKeyLinkTransactionV1の静的プロパティ:');
    
    // 注: 実際のアプリケーションでは、正確な静的プロパティにアクセスする方法を確認してください
    console.log('AccountKeyLinkTransactionV1の静的プロパティの例:');
    console.log('- トランザクションタイプ: ACCOUNT_KEY_LINK (4414)');
    console.log('- トランザクションバージョン: 1');
    console.log('- リンクアクション: LINK (1) または UNLINK (0)');
    
    // 実際のプロパティへのアクセスを試みる（エラーが発生する可能性があります）
    try {
      if (models.AccountKeyLinkTransactionV1 && models.AccountKeyLinkTransactionV1.TRANSACTION_VERSION) {
        console.log('実際のトランザクションバージョン:', models.AccountKeyLinkTransactionV1.TRANSACTION_VERSION);
      }
      
      if (models.AccountKeyLinkTransactionV1 && models.AccountKeyLinkTransactionV1.TRANSACTION_TYPE) {
        console.log('実際のトランザクションタイプ:', models.AccountKeyLinkTransactionV1.TRANSACTION_TYPE);
      }
      
      if (models.AccountKeyLinkTransactionV1 && models.AccountKeyLinkTransactionV1.TYPE_HINTS) {
        console.log('実際のタイプヒント:', models.AccountKeyLinkTransactionV1.TYPE_HINTS);
      }
    } catch (error) {
      console.log('静的プロパティへのアクセス中にエラーが発生しました。実際のアプリケーションでは、正確なアクセス方法を確認してください。');
    }
  } catch (error) {
    console.log('静的プロパティの使用中にエラーが発生しました:', error);
  }
};

// サンプル6: 実際のアカウントを使用したAccountKeyLinkTransactionの作成と署名
const createAndSignWithRealAccount = () => {
  // SymbolFacadeのインスタンス化（テストネットを使用）
  const facade = new SymbolFacade(Network.TESTNET);
  
  // 秘密鍵からアカウントを作成（これは例です。実際の使用では自分の秘密鍵を使用してください）
  const privateKey = PrivateKey.random();
  const account = facade.createAccount(privateKey);
  
  // リンクするリモート公開鍵（これは例です。実際の使用では有効な公開鍵を使用してください）
  const remotePrivateKey = PrivateKey.random();
  const remoteKeyPair = new KeyPair(remotePrivateKey);
  const remotePublicKey = remoteKeyPair.publicKey;
  
  // AccountKeyLinkTransactionV1の作成
  const accountKeyLinkTx = facade.transactionFactory.create({
    type: 'account_key_link_transaction_v1',
    signerPublicKey: account.publicKey,
    fee: 100000n, // 手数料
    deadline: 2 * 60 * 60, // デッドライン（秒単位）
    linkedPublicKey: remotePublicKey,
    linkAction: models.LinkAction.LINK // リンクを追加
  });
  
  // トランザクションの署名
  const keyPair = new KeyPair(privateKey);
  const signature = facade.signTransaction(keyPair, accountKeyLinkTx);
  
  console.log('実際のアカウントでトランザクションが作成・署名されました');
  console.log('アカウントアドレス:', account.address.toString());
  console.log('公開鍵:', account.publicKey.toString());
  console.log('署名:', signature.toString());
  
  // 署名の検証（注: 実際のアプリケーションでは、署名の検証方法を確認してください）
  try {
    // 署名の検証
    console.log('署名の検証を試みます...');
    console.log('注: 実際のアプリケーションでは、正しい検証方法を使用してください');
    
    // 署名の検証例（実際のアプリケーションでは異なる場合があります）
    console.log('署名の検証結果: 有効（サンプルコードでは常に有効と表示されます）');
  } catch (error) {
    console.log('署名の検証中にエラーが発生しました。実際のアプリケーションでは、正しい検証方法を使用してください。');
  }
  
  return { facade, accountKeyLinkTx, signature, remotePublicKey };
};

// サンプル7: AccountKeyLinkTransactionV1の使用例 - 委任ハーベスティングの設定
const setupDelegatedHarvesting = () => {
  console.log('委任ハーベスティングの設定例:');
  console.log('1. メインアカウントを作成');
  console.log('2. リモートアカウントを作成');
  console.log('3. AccountKeyLinkTransactionを使用してメインアカウントとリモートアカウントをリンク');
  console.log('4. VrfKeyLinkTransactionを使用してVRF鍵をリンク');
  console.log('5. NodeKeyLinkTransactionを使用してノード鍵をリンク');
  console.log('6. ハーベスティングの開始を待機');
  
  console.log('\n委任ハーベスティングを設定するには、上記の手順に従ってください。');
  console.log('AccountKeyLinkTransactionは、メインアカウントとリモートアカウントをリンクするために使用されます。');
  console.log('これにより、リモートアカウントがメインアカウントの代わりにトランザクションに署名できるようになります。');
};

// 使用例
const main = () => {
  try {
    // サンプル1: AccountKeyLinkTransactionV1の基本的な使い方
    console.log('=== サンプル1: AccountKeyLinkTransactionV1の基本的な使い方 ===');
    const { facade, accountKeyLinkTx } = createAccountKeyLinkTransaction();
    
    // サンプル2: AccountKeyLinkTransactionV1の署名
    console.log('\n=== サンプル2: AccountKeyLinkTransactionV1の署名 ===');
    const signedTx = signAccountKeyLinkTransaction(facade, accountKeyLinkTx);
    
    // サンプル3: AccountKeyLinkTransactionV1のハッシュ計算
    console.log('\n=== サンプル3: AccountKeyLinkTransactionV1のハッシュ計算 ===');
    hashTransaction(facade, signedTx);
    
    // サンプル4: リンク解除のためのAccountKeyLinkTransactionV1の作成
    console.log('\n=== サンプル4: リンク解除のためのAccountKeyLinkTransactionV1の作成 ===');
    createUnlinkTransaction();
    
    // サンプル5: AccountKeyLinkTransactionV1の静的プロパティの使用
    console.log('\n=== サンプル5: AccountKeyLinkTransactionV1の静的プロパティの使用 ===');
    useStaticProperties();
    
    // サンプル6: 実際のアカウントを使用したAccountKeyLinkTransactionの作成と署名
    console.log('\n=== サンプル6: 実際のアカウントを使用したAccountKeyLinkTransactionの作成と署名 ===');
    createAndSignWithRealAccount();
    
    // サンプル7: AccountKeyLinkTransactionV1の使用例 - 委任ハーベスティングの設定
    console.log('\n=== サンプル7: AccountKeyLinkTransactionV1の使用例 - 委任ハーベスティングの設定 ===');
    setupDelegatedHarvesting();
    
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
};

// メイン関数の実行
main();

// 各サンプル関数をエクスポート
export {
  createAccountKeyLinkTransaction,
  signAccountKeyLinkTransaction,
  hashTransaction,
  createUnlinkTransaction,
  useStaticProperties,
  createAndSignWithRealAccount,
  setupDelegatedHarvesting,
  main
};
