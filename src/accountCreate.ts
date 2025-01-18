import { PrivateKey } from "symbol-sdk";
import { SymbolFacade, KeyPair } from "symbol-sdk/symbol";

const privateKey = PrivateKey.random();
console.log("Alice's private key:", privateKey.toString());

const keyPair = new KeyPair(privateKey);
console.log(`Public Key: ${keyPair.publicKey.toString()}`);

const facade = new SymbolFacade("testnet");

const aliceAddress = facade.network.publicKeyToAddress(keyPair.publicKey);
console.log("Alice's address:", aliceAddress.toString());
