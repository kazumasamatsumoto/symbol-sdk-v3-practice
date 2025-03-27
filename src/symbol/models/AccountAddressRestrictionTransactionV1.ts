import { models, SymbolFacade } from "symbol-sdk/symbol";
/**
 * AccountAddressRestrictionTransactionV1の使用例
 */

// 例1: 特定のアドレスからのトランザクションのみを許可する
function createAllowOnlyTransaction() {
  // SymbolFacadeからトランザクションを作成する場合の例
  const facade = new SymbolFacade("testnet");

  // 許可するアドレスのリスト
  const allowedAddresses = [
    "TBULEA-UG2CZQ-ISUR44-2HWA6U-AKGWIX-HDABJV-IPS4",
    "TBULE4-BIQNRZ-63IATS-D6VYJT-QZMJ22-QGQKIB-IPSQ",
  ].map((address) => new SymbolFacade.Address(address));

  // トランザクションの作成
  const transaction = facade.transactionFactory.create({
    type: "account_address_restriction_transaction_v1",
    signerPublicKey: "0".repeat(64),
    fee: 100000n,
    deadline: 12345n,
    restrictionFlags: 1, // アドレス許可フラグ（ADDRESS = 1と仮定）
    restrictionAdditions: allowedAddresses,
    restrictionDeletions: [],
  });

  return transaction;
}

// 例2: 特定のアドレスからのトランザクションをブロックする
function createBlockTransaction() {
  // SymbolFacadeからトランザクションを作成する場合の例
  const facade = new SymbolFacade("mainnet");

  // ブロックするアドレスのリスト
  const blockedAddresses = [
    "NBULE4-BIQNRZ-63IATS-D6VYJT-QZMJ22-QGQKIB-IPSQ",
  ].map((address) => new SymbolFacade.Address(address));

  // トランザクションの作成
  const transaction = facade.transactionFactory.create({
    type: "account_address_restriction_transaction_v1",
    signerPublicKey: "0".repeat(64),
    fee: 100000n,
    deadline: 12345n,
    restrictionFlags: 3, // アドレスブロックフラグ（ADDRESS = 1, BLOCK = 2と仮定）
    restrictionAdditions: blockedAddresses,
    restrictionDeletions: [],
  });

  return transaction;
}

// 例3: 既存の制限からアドレスを削除する
function removeAddressRestrictions() {
  const facade = new SymbolFacade("testnet");

  // 削除するアドレスのリスト
  const addressesToRemove = [
    "TBULEA-UG2CZQ-ISUR44-2HWA6U-AKGWIX-HDABJV-IPS4",
  ].map((address) => new SymbolFacade.Address(address));

  // トランザクションの作成
  const transaction = facade.transactionFactory.create({
    type: "account_address_restriction_transaction_v1",
    signerPublicKey: "0".repeat(64),
    fee: 100000n,
    deadline: 12345n,
    restrictionFlags: 1, // 既存のフラグと同じものを使用（ADDRESS = 1と仮定）
    restrictionAdditions: [],
    restrictionDeletions: addressesToRemove, // 削除するアドレスを指定
  });

  return transaction;
}

// 例4: 直接インスタンス化して使用する例
function createManualTransaction() {
  const transaction = new models.AccountAddressRestrictionTransactionV1();

  // トランザクションプロパティの設定
  transaction.restrictionFlags = 3 as unknown as models.AccountRestrictionFlags; // ADDRESS = 1, BLOCK = 2と仮定
  transaction.restrictionAdditions = [
    // UnresolvedAddressの形式でアドレスを設定
    // 実際の実装ではアドレスオブジェクトを作成する必要があります
  ];
  transaction.restrictionDeletions = [];

  // その他の必要なトランザクションプロパティを設定
  // transaction.signature = ...
  // transaction.signerPublicKey = ...
  // transaction.network = ...
  // transaction.type = ...
  // transaction.fee = ...
  // transaction.deadline = ...

  return transaction;
}

// 使用例の実行
console.log("アドレス許可トランザクションの例:", createAllowOnlyTransaction());
console.log("アドレスブロックトランザクションの例:", createBlockTransaction());
console.log(
  "アドレス制限削除トランザクションの例:",
  removeAddressRestrictions()
);
