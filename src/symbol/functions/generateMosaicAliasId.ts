import { generateMosaicAliasId, generateNamespacePath } from "symbol-sdk/symbol";

/**
 * 使用例: generateMosaicAliasId関数
 * 
 * この関数は完全修飾されたモザイク名（例: "namespace.subnamespace.mosaicname"）から
 * モザイクIDを生成します。
 */

// 基本的な使用例
const fullyQualifiedName = "symbol.token";
const mosaicId = generateMosaicAliasId(fullyQualifiedName);
console.log(`モザイク名 "${fullyQualifiedName}" から生成されたモザイクID: ${mosaicId.toString()}`);

// サブネームスペースを含む使用例
const nestedName = "symbol.exchange.token";
const nestedMosaicId = generateMosaicAliasId(nestedName);
console.log(`ネストされたモザイク名 "${nestedName}" から生成されたモザイクID: ${nestedMosaicId.toString()}`);

// generateNamespacePathと組み合わせた使用例
const namespacePath = generateNamespacePath(fullyQualifiedName);
console.log(`"${fullyQualifiedName}" のネームスペースパス:`, namespacePath.map(id => id.toString()));

// 実際のアプリケーションでの使用例
function getMosaicIdFromAlias(aliasName: string): string {
    try {
        const id = generateMosaicAliasId(aliasName);
        return id.toString(16).toUpperCase(); // 16進数表記に変換
    } catch (error) {
        console.error(`エラー: "${aliasName}" からモザイクIDを生成できませんでした`, error);
        return "";
    }
}

// 関数の使用
const hexMosaicId = getMosaicIdFromAlias("symbol.currency");
console.log(`"symbol.currency" の16進数モザイクID: 0x${hexMosaicId}`);
