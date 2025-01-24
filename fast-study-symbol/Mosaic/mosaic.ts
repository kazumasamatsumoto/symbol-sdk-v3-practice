// モザイクの作成

import { generateMosaicId, models } from "symbol-sdk/symbol";
import { facade, nowDate } from "../Account/configure.js";
import { aliceKeyPairRecoveredFromPrivateKeyString } from "../Account/configure.js";

let flag = models.MosaicFlags.NONE.value;
flag += models.MosaicFlags.SUPPLY_MUTABLE.value;
flag += models.MosaicFlags.RESTRICTABLE.value;
flag += models.MosaicFlags.REVOKABLE.value;

const flags = new models.MosaicFlags(flag);

// ナンス設定
const array = new Uint8Array(models.MosaicNonce.SIZE);
crypto.getRandomValues(array);

const nonce = new models.MosaicNonce(
  array[0] * 0x0000001 +
    array[1] * 0x0000100 +
    array[2] * 0x0010000 +
    array[3] * 0x0100000
);

// モザイクの定義

// aliceAddressがAddress型のためいったんキーペアを復元してそこから公開鍵でAddress型を作成

const aliceAddressTypeAddress = facade.network.publicKeyToAddress(
  aliceKeyPairRecoveredFromPrivateKeyString.publicKey
);

const mosaicId = new models.MosaicId(
  generateMosaicId(aliceAddressTypeAddress, Number(nonce.value))
);

const mosaicIdBigInt = BigInt(mosaicId.value);

const mosaicDefTx = facade.transactionFactory.createEmbedded({
  type: "mosaic_definition_transaction_v1",
  signerPublicKey: aliceKeyPairRecoveredFromPrivateKeyString.publicKey,
  id: mosaicId,
  divisibility: 2,
  duration: new models.BlockDuration(0n),
  nonce: nonce,
  flags: flags,
});

//  モザイクの変更
const mosaicChangeTx = facade.transactionFactory.createEmbedded({
  type: "mosaic_supply_change_transaction_v1",
  signerPublicKey: aliceKeyPairRecoveredFromPrivateKeyString.publicKey,
  mosaicId: new models.UnresolvedMosaicId(mosaicIdBigInt),
  delta: new models.Amount(1000000n),
  action: models.MosaicSupplyChangeAction.INCREASE,
});

// モザイクの作成とモザイクの変更をアグリゲートトランザクションにて実行する

// マークルハッシュの算出
const embeddedTransaction = [mosaicDefTx, mosaicChangeTx];
const merkleHash = facade.static.hashEmbeddedTransactions(embeddedTransaction);

// アグリゲートTxの作成
// ここの公開鍵は文字列である必要がある。Uint8Array[32]の時と文字列の時があるからややこしい。
const aggregateTx = facade.transactionFactory.create({
  type: "aggregate_complete_transaction_v2",
  signerPublicKey: aliceKeyPairRecoveredFromPrivateKeyString.publicKey,
  deadline: facade.network.fromDatetime(new Date()).addHours(2).timestamp,
  transactionHash: merkleHash,
  transactions: embeddedTransaction,
});

console.log(aggregateTx);

// 連署により追加される連署情報のサイズを追加して最終的なTxサイズを算出する
// const requiredCosignatures = 0;
// const calculatedCosignatures = requiredCosignatures > aggregateTx
