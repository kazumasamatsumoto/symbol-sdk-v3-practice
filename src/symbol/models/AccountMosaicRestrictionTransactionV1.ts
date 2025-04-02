import { models, SymbolFacade } from "symbol-sdk/symbol";
/**
 * AccountMosaicRestrictionTransactionV1の使用例
 */

// 例1: 特定のモザイクのみを許可する
function createAllowOnlyTransaction() {
  // SymbolFacadeからトランザクションを作成する場合の例
  const facade = new SymbolFacade("testnet");

  // 許可するモザイクのリスト
  const allowedMosaics = [
    0x72C0212E67A08BCEn, // 例: XYM
    0x3A8416DB2D53B6C8n  // 例: 別のモザイクID
  ].map(id => id); // UnresolvedMosaicIdに変換

  // トランザクションの作成
  const transaction = facade.transactionFactory.create({
    type: "account_mosaic_restriction_transaction_v1",
    signerPublicKey: "0".repeat(64),
    fee: 100000n,
    deadline: 12345n,
    restrictionFlags: 65, // モザイク許可フラグ（MOSAIC = 64, ALLOW = 1 と仮定）
    restrictionAdditions: allowedMosaics,
    restrictionDeletions: [],
  });

  return transaction;
}

// 例2: 特定のモザイクをブロックする
function createBlockTransaction() {
  // SymbolFacadeからトランザクションを作成する場合の例
  const facade = new SymbolFacade("mainnet");

  // ブロックするモザイクのリスト
  const blockedMosaics = [
    0x3A8416DB2D53B6C8n  // 例: ブロックするモザイクID
  ].map(id => id); // UnresolvedMosaicIdに変換

  // トランザクションの作成
  const transaction = facade.transactionFactory.create({
    type: "account_mosaic_restriction_transaction_v1",
    signerPublicKey: "0".repeat(64),
    fee: 100000n,
    deadline: 12345n,
    restrictionFlags: 66, // モザイクブロックフラグ（MOSAIC = 64, BLOCK = 2 と仮定）
    restrictionAdditions: blockedMosaics,
    restrictionDeletions: [],
  });

  return transaction;
}

// 例3: 既存の制限からモザイクを削除する
function removeMosaicRestrictions() {
  const facade = new SymbolFacade("testnet");

  // 削除するモザイクのリスト
  const mosaicsToRemove = [
    0x72C0212E67A08BCEn  // 例: XYM
  ].map(id => id); // UnresolvedMosaicIdに変換

  // トランザクションの作成
  const transaction = facade.transactionFactory.create({
    type: "account_mosaic_restriction_transaction_v1",
    signerPublicKey: "0".repeat(64),
    fee: 100000n,
    deadline: 12345n,
    restrictionFlags: 65, // 既存のフラグと同じものを使用（MOSAIC = 64, ALLOW = 1 と仮定）
    restrictionAdditions: [],
    restrictionDeletions: mosaicsToRemove, // 削除するモザイクを指定
  });

  return transaction;
}

// 例4: 直接インスタンス化して使用する例
function createManualTransaction() {
  const transaction = new models.AccountMosaicRestrictionTransactionV1();

  // トランザクションプロパティの設定
  transaction.restrictionFlags = 66 as unknown as models.AccountRestrictionFlags; // MOSAIC = 64, BLOCK = 2 と仮定
  transaction.restrictionAdditions = [
    // UnresolvedMosaicIdの形式でモザイクを設定
    // 実際の実装ではモザイクIDオブジェクトを作成する必要があります
  ];
  transaction.restrictionDeletions = [];

  // その他の必要なトランザクションプロパティを設定
  transaction.deadline = new models.Timestamp(12345n);
  transaction.fee = new models.Amount(100000n);
  transaction.network = 152 as unknown as models.NetworkType; // テストネット
  transaction.signature = new models.Signature(new Uint8Array(64));
  transaction.signerPublicKey = new models.PublicKey(new Uint8Array(32));
  transaction.type = 16642 as unknown as models.TransactionType; // account_mosaic_restriction_transaction_v1
  transaction.version = 1;

  return transaction;
}

// 使用例の実行
console.log("モザイク許可トランザクションの例:", createAllowOnlyTransaction());
console.log("モザイクブロックトランザクションの例:", createBlockTransaction());
console.log("モザイク制限削除トランザクションの例:", removeMosaicRestrictions());
