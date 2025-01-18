import { PrivateKey } from "symbol-sdk";
import { KeyPair } from "symbol-sdk/symbol";

const privateKey = new PrivateKey(
  "EDB671EB741BD676969D8A035271D1EE5E75DF33278083D877F23615EB839FEC"
);
console.log(`Private Key: ${privateKey.toString()}`);

const keyPair = new KeyPair(privateKey);
console.log(`Public Key: ${keyPair.publicKey.toString()}`);
