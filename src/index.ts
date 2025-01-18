import { PrivateKey } from "symbol-sdk";
import { SymbolFacade, descriptors, models } from "symbol-sdk/symbol";

const facade = new SymbolFacade("testnet");

// 事前準備

// 新規生成
const aliceKey = PrivateKey.random(); // newを使わない
console.log("Alice's private key:", aliceKey);

// アドレスをネットワークに紐づける
