import { PrivateKey } from "symbol-sdk";
import { SymbolFacade, KeyPair, models } from "symbol-sdk/symbol";

const NODE = "http://sym-test-03.opening-line.jp:3000/";

const facade = new SymbolFacade("testnet");
const AlicePrivateKey =
  "33047CFD3ABA8E1B6FE047182F9B0118E2FA7E7D9E33865533AB582973F3B2A8";
const AlicePublicKey =
  "ABC57E7B68FF6AA2E5F3D7E674D071697F00F1B377AE484C1EDBA3EEB29761B8";
const BobAddress = "TCSMJNJTRI76YPGQFDEZBFL3XTM4L3AWELOGBDY";
const privateKey = new PrivateKey(
  "EDB671EB741BD676969D8A035271D1EE5E75DF33278083D877F23615EB839FEC"
);
const keyPair = new KeyPair(new PrivateKey(AlicePrivateKey));

const message = "Hello, Symbol!";
const transaction = facade.transactionFactory.create({
  type: "transfer_transaction_v1",
  signerPublicKey: AlicePublicKey,
  deadline: facade.network.fromDatetime(new Date()).addHours(2).timestamp,
  recipientAddress: BobAddress,
  mosaics: [
    { mosaicId: BigInt("0x72c0212e67a08bce"), amount: BigInt("1000000") },
  ],
  message: message,
});

transaction.fee = new models.Amount(BigInt(transaction.size * 100));

const sig = facade.signTransaction(keyPair, transaction);
const jsonPayload = facade.transactionFactory.static.attachSignature(
  transaction,
  sig
);

console.log("JSON Payload:", jsonPayload);

// アナウンス
const res = await fetch(new URL("/transactions", NODE), {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: jsonPayload,
}).then((res) => res.json());

console.log("結果発表", res);
