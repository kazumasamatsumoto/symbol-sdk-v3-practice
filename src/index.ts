import { PrivateKey } from "symbol-sdk";

const aliceKey = PrivateKey.random(); // newを使わない
console.log("Alice's private key:", aliceKey);
