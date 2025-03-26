import { generateMosaicId } from "symbol-sdk/symbol";
import { Address, Network } from "symbol-sdk/symbol";
import { PublicKey } from "symbol-sdk";

/**
 * 使用例: generateMosaicId関数
 * 
 * この関数はオーナーアドレスとナンス値からモザイクIDを生成します。
 * モザイクIDはSymbolブロックチェーン上でモザイク（トークン）を一意に識別するために使用されます。
 */

// 基本的な使用例
const ownerAddress = new Address("TDWZ55R5XEJFUTKL2FXIEKW2UTNFVNPB2VFMZZA");
const nonce = 12345; // ナンス値
const mosaicId = generateMosaicId(ownerAddress, nonce);
console.log(`アドレス ${ownerAddress.toString()} とナンス ${nonce} から生成されたモザイクID: ${mosaicId.toString()}`);

// 異なるナンス値を使用した例
const nonce2 = 67890;
const mosaicId2 = generateMosaicId(ownerAddress, nonce2);
console.log(`同じアドレスで異なるナンス ${nonce2} を使用した場合のモザイクID: ${mosaicId2.toString()}`);

// ネットワークからアドレスを取得して使用する例
const publicKeyHex = "9A49366406ACA952B88BADF5F1E9BE6CE4968141035A60BE503273EA65456B24";
const publicKey = new PublicKey(publicKeyHex);
const mainnetAddress = Network.MAINNET.publicKeyToAddress(publicKey);
const mainnetMosaicId = generateMosaicId(mainnetAddress, nonce);
console.log(`メインネットアドレス ${mainnetAddress.toString()} から生成されたモザイクID: ${mainnetMosaicId.toString()}`);

// 実際のアプリケーションでの使用例
function createUniqueAssetId(address: Address, assetCounter: number): string {
    try {
        const id = generateMosaicId(address, assetCounter);
        return id.toString(16).toUpperCase(); // 16進数表記に変換
    } catch (error) {
        console.error(`エラー: モザイクIDの生成に失敗しました`, error);
        return "";
    }
}

// ヘルパー関数の使用
const assetCounter = 1;
const hexMosaicId = createUniqueAssetId(ownerAddress, assetCounter);
console.log(`アセットカウンター ${assetCounter} を使用した16進数モザイクID: 0x${hexMosaicId}`);

// 複数のモザイクIDを生成する例
function generateMultipleMosaicIds(address: Address, startNonce: number, count: number): bigint[] {
    const mosaicIds: bigint[] = [];
    for (let i = 0; i < count; i++) {
        mosaicIds.push(generateMosaicId(address, startNonce + i));
    }
    return mosaicIds;
}

const multipleMosaicIds = generateMultipleMosaicIds(ownerAddress, 1000, 3);
console.log("連続したナンス値から生成された複数のモザイクID:");
multipleMosaicIds.forEach((id, index) => {
    console.log(`モザイクID ${index + 1}: ${id.toString()}`);
});
