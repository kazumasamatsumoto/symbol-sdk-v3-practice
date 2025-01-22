# Facade とはなんなのか？

Facade は「建物の正面」を意味する英単語です。プログラミングでは「複雑なシステムの正面に立つシンプルな入り口」という意味で使われます。

例えば...

家の正面玄関を想像してください：

- 外から見える部分：きれいな玄関ドア（= Facade）
- その裏側：複雑な配線、配管、構造材（= 複雑なシステム）

訪問者は玄関からスムーズに家に入れます。配線や配管の複雑な仕組みを知る必要はありません。

プログラミングでの Facade も同じ考え方です：

```typescript
// Facadeを使わない場合（複雑）
const networkConfig = new NetworkConfig("testnet");
const cryptoEngine = new CryptoEngine();
const addressFormatter = new AddressFormatter(networkConfig);
const address = addressFormatter.format(
  cryptoEngine.convertPublicKeyToAddress(publicKey)
);

// Facadeを使う場合（シンプル）
const facade = new SymbolFacade("testnet");
const address = facade.network.publicKeyToAddress(publicKey);
```

つまり、Facade は：

- 複雑な処理を隠してくれる「きれいな正面玄関」
- 開発者が簡単に使える「シンプルな入り口」
- 内部の複雑な処理を気にせずに使える「インターフェース」

という役割を果たしているわけです。

## symbol-sdk での Facade の役割

![SymbolFacadeについて](/docs/designpattern/svg/facade-pattern.svg)

Facade は設計パターンの 1 つで、Symbol SDK での`SymbolFacade`クラスの役割を説明しましょう。

`SymbolFacade`は以下の役割を果たしています：

1. 統合インターフェース

- ネットワーク設定
- トランザクション作成
- アドレス生成
- 暗号化処理
  などの機能を 1 つのインターフェースにまとめています。

2. 具体的な機能例：

```typescript
const facade = new SymbolFacade("testnet");

// ネットワーク関連の操作
const address = facade.network.publicKeyToAddress(publicKey);

// トランザクション作成
const tx = facade.transactionFactory.create({
  type: "transfer",
  // ... other parameters
});

// 署名操作
const signature = facade.signTransaction(tx, privateKey);
```

3. メリット：

- 複雑な Symbol ブロックチェーンの操作を簡潔に記述可能
- ネットワーク（testnet/mainnet）の違いを抽象化
- 下位レベルの実装詳細を隠蔽
- API の一貫性を保証

あなたのコードでは、`SymbolFacade`を testnet で初期化し、アドレス生成機能を利用しています。これにより、低レベルの暗号化処理やネットワーク固有のアドレスフォーマットを意識することなく、公開鍵からアドレスへの変換が実行できています。
