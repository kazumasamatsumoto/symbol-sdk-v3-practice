# モザイク

## ナンス(nonce)

ナンス(nonce)は「Number used ONCE」の略で、1 回限りの使用を意味する数値です。

このコードでは、モザイク作成時の一意性を確保するために使用されています。具体的には:

1. ランダムな 4 バイトの値を生成
2. それを 1 つの数値に変換
3. このランダムな値をモザイク ID の生成に使用

これにより、同じアカウントが同じ名前のモザイクを作成しても、異なるモザイク ID が生成されることが保証されます。

## crypto

crypto は JavaScript の組み込み API「Web Crypto API」のことです。暗号化機能を提供し、このコードでは getRandomValues()メソッドを使って暗号学的に安全な乱数を生成しています。

コードの`crypto.getRandomValues(array)`は、指定された配列(array)にランダムな値を格納します。これにより、予測不可能で一意なナンス値を生成できます。

[crypto のドキュメント](https://developer.mozilla.org/ja/docs/Web/API/Web_Crypto_API)

## モザイクトランザクションの出力サンプル

```bash
> tsx .\fast-study-symbol\Mosaic\mosaic.ts
mosaicDefTx EmbeddedMosaicDefinitionTransactionV1 {
  _signerPublicKey: PublicKey {
    bytes: Uint8Array(32) [
      171, 197, 126, 123, 104, 255, 106,
      162, 229, 243, 215, 230, 116, 208,
      113, 105, 127,   0, 241, 179, 119,
      174,  72,  76,  30, 219, 163, 238,
      178, 151,  97, 184
    ]
  },
  _version: 1,
  _network: NetworkType { value: 152 },
  _type: TransactionType { value: 16717 },
  _embeddedTransactionHeaderReserved_1: 0,
  _entityBodyReserved_1: 0,
  _id: MosaicId { size: 8, isSigned: false, value: 2434821340990670284n },
  _duration: BlockDuration { size: 8, isSigned: false, value: 0n },
  _nonce: MosaicNonce { size: 4, isSigned: false, value: 194779310 },
  _flags: MosaicFlags { value: 13 },
  _divisibility: 2
}
```
