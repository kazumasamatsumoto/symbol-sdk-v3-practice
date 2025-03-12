// 適切なインポート方法は環境に合わせてください
import { Network, KeyPair, SymbolFacade } from 'symbol-sdk/symbol';
import { Hash256, PrivateKey } from 'symbol-sdk'; // ※実際のライブラリパスに合わせて修正

// 16進文字列をUint8Array（32バイトの配列）に変換する関数
function hexToUint8Array(hex: string): Uint8Array {
    if (hex.length % 2 !== 0) {
        throw new Error('Invalid hex string');
    }
    const array = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
        array[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    }
    return array;
}


// 1. 新しいNetworkインスタンスを作成
const name = "My Symbol Network";            // ネットワーク名
const identifier = 0x68;                      // ネットワーク識別子（例：16進数で表現）
const epochTime = new Date('2020-03-29T00:00:00Z'); // ネットワークのエポックタイム
// 例として、32バイト（64文字）の16進数文字列を用意する
const generationHashSeedHex = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
// Uint8Arrayに変換
const generationHashSeed = hexToUint8Array(generationHashSeedHex) as unknown as Hash256;
const myNetwork = new Network(name, identifier, epochTime, generationHashSeed);

console.log("Network name:", myNetwork.name);
console.log("Network identifier:", myNetwork.identifier);
console.log("Generation hash seed:", myNetwork.generationHashSeed);

// 2. 日時とネットワークタイムスタンプの相互変換の例
const now = new Date();
// 日時からネットワークタイムスタンプへ変換
const networkTimestamp = myNetwork.fromDatetime(now);
console.log("Network timestamp:", networkTimestamp);

// ネットワークタイムスタンプから日時へ変換
const datetimeFromTimestamp = myNetwork.toDatetime(networkTimestamp);
console.log("Datetime from network timestamp:", datetimeFromTimestamp);

// 3. アドレスの検証例
const publicKey = new KeyPair(PrivateKey.random()).publicKey; // ここは実際のアドレス文字列に置き換え
const facade = new SymbolFacade(myNetwork);
const address = facade.network.publicKeyToAddress(publicKey);
const isValid = myNetwork.isValidAddressString(address.toString());
console.log("Is valid address:", isValid);

// 4. 公開鍵からアドレスへの変換例
const addressFromPublicKey = myNetwork.publicKeyToAddress(publicKey);
console.log("Address from public key:", addressFromPublicKey);

// 5. 既存のシンボルネットワーク（MAINNET, TESTNET）の利用例
console.log("MAINNET:", Network.MAINNET.toString());
console.log("TESTNET:", Network.TESTNET.toString());
