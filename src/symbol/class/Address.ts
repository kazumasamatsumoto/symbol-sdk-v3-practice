import { Address } from "symbol-sdk/symbol";

/**
 * Addressクラスの使用例
 *
 * このファイルはSymbol SDKのAddressクラスの基本的な使い方を示しています。
 */

console.log(Address);

// 文字列からアドレスを作成
const addressFromString = new Address(
  "TDWZ55R5XEJFUTKL2FXIEKW2UTNFVNPB2VFMZZA"
);
console.log("文字列から作成したアドレス:", addressFromString.toString());

// バイト配列からアドレスを作成
const bytes = new Uint8Array([
  152, 237, 158, 246, 61, 185, 18, 90, 77, 75, 209, 110, 130, 42, 218, 164, 218,
  90, 181, 225, 213, 74, 204, 228,
]);
const addressFromBytes = new Address(bytes);
console.log("バイト配列から作成したアドレス:", addressFromBytes.toString());

// 既存のアドレスからアドレスを作成
const addressFromAddress = new Address(addressFromString);
console.log(
  "既存のアドレスから作成したアドレス:",
  addressFromAddress.toString()
);

// デコードされた16進数文字列からアドレスを作成
const hexString = "98FB8A1645F4FA5154725CF58F6E87F53A58F1F34C0A53EC";
const addressFromHex = Address.fromDecodedAddressHexString(hexString);
console.log("16進数文字列から作成したアドレス:", addressFromHex.toString());

// アドレスのバイト配列にアクセス
console.log("アドレスのバイト配列:", addressFromString.bytes);

// JSONに変換
const jsonAddress = addressFromString.toJson();
console.log("JSON形式のアドレス:", jsonAddress);

// 定数の使用例
console.log("アドレスのバイトサイズ:", Address.SIZE);
console.log("エンコードされたアドレス文字列の長さ:", Address.ENCODED_SIZE);
console.log("バイト配列の名前:", Address.NAME);

/**
 * 実行方法:
 *
 * ```
 * tsx .\src\symbol\class\Address.ts
 * ```
 */
