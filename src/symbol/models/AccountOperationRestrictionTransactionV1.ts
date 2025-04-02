import { models, SymbolFacade } from "symbol-sdk/symbol";
/**
 * AccountOperationRestrictionTransactionV1の使用例
 */

// 例1: 特定のトランザクション操作のみを許可する
function createAllowOnlyTransaction() {
  // SymbolFacadeからトランザクションを作成する場合の例
  const facade = new SymbolFacade("testnet");

  // 許可する操作のリスト（トランザクションタイプの数値）
  const allowedOperations = [
    16724, // TRANSFER
    16718  // ACCOUNT_KEY_LINK
  ];

  // トランザクションの作成
  const transaction = facade.transactionFactory.create({
    type: "account_operation_restriction_transaction_v1",
    signerPublicKey: "0".repeat(64),
    fee: 100000n,
    deadline: 12345n,
    restrictionFlags: 129, // 操作許可フラグ（TRANSACTION_TYPE = 128, ALLOW = 1 と仮定）
    restrictionAdditions: allowedOperations,
    restrictionDeletions: [],
  });

  return transaction;
}

// 例2: 特定のトランザクション操作をブロックする
function createBlockTransaction() {
  // SymbolFacadeからトランザクションを作成する場合の例
  const facade = new SymbolFacade("mainnet");

  // ブロックする操作のリスト
  const blockedOperations = [
    16708, // ACCOUNT_METADATA
    16974  // MOSAIC_SUPPLY_CHANGE
  ];

  // トランザクションの作成
  const transaction = facade.transactionFactory.create({
    type: "account_operation_restriction_transaction_v1",
    signerPublicKey: "0".repeat(64),
    fee: 100000n,
    deadline: 12345n,
    restrictionFlags: 130, // 操作ブロックフラグ（TRANSACTION_TYPE = 128, BLOCK = 2 と仮定）
    restrictionAdditions: blockedOperations,
    restrictionDeletions: [],
  });

  return transaction;
}

// 例3: 既存の制限から操作を削除する
function removeOperationRestrictions() {
  const facade = new SymbolFacade("testnet");

  // 削除する操作のリスト
  const operationsToRemove = [
    16724 // TRANSFER
  ];

  // トランザクションの作成
  const transaction = facade.transactionFactory.create({
    type: "account_operation_restriction_transaction_v1",
    signerPublicKey: "0".repeat(64),
    fee: 100000n,
    deadline: 12345n,
    restrictionFlags: 129, // 既存のフラグと同じものを使用（TRANSACTION_TYPE = 128, ALLOW = 1 と仮定）
    restrictionAdditions: [],
    restrictionDeletions: operationsToRemove, // 削除する操作を指定
  });

  return transaction;
}

// 例4: 直接インスタンス化して使用する例
function createManualTransaction() {
  const transaction = new models.AccountOperationRestrictionTransactionV1();

  // トランザクションプロパティの設定
  transaction.restrictionFlags = 130 as unknown as models.AccountRestrictionFlags; // TRANSACTION_TYPE = 128, BLOCK = 2 と仮定
  transaction.restrictionAdditions = [
    // トランザクションタイプの配列
    16724, // TRANSFER 
    16718  // ACCOUNT_KEY_LINK
  ] as unknown as number[];
  transaction.restrictionDeletions = [] as unknown as number[];

  // その他の必要なトランザクションプロパティを設定
  transaction.deadline = new models.Timestamp(12345n);
  transaction.fee = new models.Amount(100000n);
  transaction.network = 152 as unknown as models.NetworkType; // テストネット
  transaction.signature = new models.Signature(new Uint8Array(64));
  transaction.signerPublicKey = new models.PublicKey(new Uint8Array(32));
  transaction.type = 16900 as unknown as models.TransactionType; // account_operation_restriction_transaction_v1
  transaction.version = 1;

  return transaction;
}

// 使用例の実行
console.log("操作許可トランザクションの例:", createAllowOnlyTransaction());
console.log("操作ブロックトランザクションの例:", createBlockTransaction());
console.log("操作制限削除トランザクションの例:", removeOperationRestrictions());
