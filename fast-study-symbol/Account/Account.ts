// 3.1 アカウント生成と秘密鍵と公開鍵の導出も

import { KeyPair, SymbolFacade } from "symbol-sdk/symbol";
import { PrivateKey } from "symbol-sdk";

const AccountKey = new KeyPair(PrivateKey.random());
console.log("AccountKey Hex", AccountKey);
console.log(
  "AccountKey has PrivateKey toString",
  AccountKey.privateKey.toString()
);
console.log(
  "AccountKey has PublicKey toString",
  AccountKey.publicKey.toString()
);

const facade = new SymbolFacade("testnet");

// アドレスの導出

const aliceAddress = facade.network.publicKeyToAddress(AccountKey.publicKey);
console.log("Alice's Address:", aliceAddress);
console.log("Alice's Address to String:", aliceAddress.toString());

// 秘密鍵からアカウント生成
// どうしようかな、さっき作成したkeyPairの秘密鍵からアカウントを復元して、
// そのアドレスと公開鍵から復元したアドレスが一致するか確認するか。
const recoveredAccountKey = new KeyPair(
  new PrivateKey(AccountKey.privateKey.toString())
);
const recoveredAliceAddress = facade.network.publicKeyToAddress(
  recoveredAccountKey.publicKey
);

// aliceAddressとrecoveredAliceAddressが等しいか確認
// trueになっていたらいいよね？

console.log(
  "Alice's Address is equal to Recovered Alice's Address:",
  aliceAddress.toString() === recoveredAliceAddress.toString()
);
