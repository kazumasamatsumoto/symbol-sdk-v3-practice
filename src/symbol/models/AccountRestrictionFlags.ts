import { models } from "symbol-sdk/symbol";

// 使用例 - モデルのエクスポート例
export const AccountRestrictionFlags = models.AccountRestrictionFlags;

// 定数の説明
/**
 * アカウント制限フラグの値
 * 
 * AccountRestrictionFlags.ADDRESS - アドレス制限
 * AccountRestrictionFlags.MOSAIC_ID - モザイク制限
 * AccountRestrictionFlags.TRANSACTION_TYPE - トランザクションタイプ制限
 * AccountRestrictionFlags.OUTGOING - 送信制限
 * AccountRestrictionFlags.BLOCK - ブロックモード（設定されていない場合は許可モード）
 */

// 使用例のデモンストレーション - モザイク制限を持つオブジェクトの作成
const flags = new models.AccountRestrictionFlags(models.AccountRestrictionFlags.MOSAIC_ID.value);

// ブロックモードを確認
console.log("Is BLOCK mode:", flags.has(models.AccountRestrictionFlags.BLOCK.value)); // false - 許可モード

// モザイク制限を確認
console.log("Has MOSAIC_ID flag:", flags.has(models.AccountRestrictionFlags.MOSAIC_ID.value)); // true

// 他のフラグを確認
console.log("Has ADDRESS flag:", flags.has(models.AccountRestrictionFlags.ADDRESS.value)); // false
console.log("Has TRANSACTION_TYPE flag:", flags.has(models.AccountRestrictionFlags.TRANSACTION_TYPE.value)); // false

// シリアライズしてみる
console.log("Serialized:", flags.serialize());

// 文字列表現を確認
console.log("String representation:", flags.toString());

// JSON表現を確認
console.log("JSON representation:", flags.toJson());

// ブロックモード + トランザクションタイプ制限の例
const blockTransactionFlags = new models.AccountRestrictionFlags(
  models.AccountRestrictionFlags.TRANSACTION_TYPE.value | models.AccountRestrictionFlags.BLOCK.value
);
console.log("Block Transaction Flags:", blockTransactionFlags.toString());

// ファイルが単独で実行された場合のエントリポイント
// tsx ./src/symbol/models/AccountRestrictionFlags.ts で実行されます
