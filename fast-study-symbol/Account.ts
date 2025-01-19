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

const aliceAddress = facade.network.publicKeyToAddress(AccountKey.publicKey);
console.log("Alice's Address:", aliceAddress);
console.log("Alice's Address to String:", aliceAddress.toString());
