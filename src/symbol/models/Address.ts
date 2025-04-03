import { Address } from "symbol-sdk/symbol";

/**
 * Symbol Addressクラスの使用例
 *
 * このファイルはSymbol SDKのAddressクラスの基本的な使い方を示しています。
 */

// 例1: 文字列からアドレスを作成する
const addressFromString = new Address("TDWZ55R5XEJFUTKL2FXIEKW2UTNFVNPB2VFMZZA");
console.log("文字列から作成したアドレス:", addressFromString.toString());

// 例2: バイト配列からアドレスを作成する
// 注: バイト配列は24バイト長である必要があります
const addressBytes = new Uint8Array([
  152, 237, 158, 246, 61, 185, 18, 90, 77, 75, 209, 110, 130, 42, 218, 164, 218,
  90, 181, 225, 213, 74, 204, 228
]);
const addressFromBytes = new Address(addressBytes);
console.log("バイト配列から作成したアドレス:", addressFromBytes.toString());

// 例3: 既存のアドレスからアドレスを作成する
const addressFromAddress = new Address(addressFromString);
console.log("既存のアドレスから作成したアドレス:", addressFromAddress.toString());

// 例4: デコードされた16進数文字列からアドレスを作成する
const hexString = "98FB8A1645F4FA5154725CF58F6E87F53A58F1F34C0A53EC";
const addressFromHex = Address.fromDecodedAddressHexString(hexString);
console.log("16進数文字列から作成したアドレス:", addressFromHex.toString());

// 例5: アドレスのバイト配列にアクセスする
console.log("アドレスのバイト配列:", addressFromString.bytes);

// 例6: アドレスをJSONに変換する
const jsonAddress = addressFromString.toJson();
console.log("JSON形式のアドレス:", jsonAddress);

// 例7: アドレスの比較
const isSameAddress = addressFromString.bytes.every((byte, index) => byte === addressFromAddress.bytes[index]);
console.log("2つのアドレスは同じか:", isSameAddress);

// 例8: アドレスの文字列表現を取得する
const addressString = addressFromString.toString();
console.log("アドレスの文字列表現:", addressString);

// 例9: アドレスクラスの定数を使用する
console.log("アドレスのバイトサイズ:", Address.SIZE);
console.log("エンコードされたアドレス文字列の長さ:", Address.ENCODED_SIZE);
console.log("バイト配列の名前:", Address.NAME);

// 例10: アドレスの検証
try {
  // 有効なアドレス文字列
  const validAddress = new Address("TDWZ55R5XEJFUTKL2FXIEKW2UTNFVNPB2VFMZZA");
  console.log("アドレスは有効です");
  
  // 無効なアドレス文字列（例えば長さが不正な場合）
  // const invalidAddress = new Address("INVALID_ADDRESS");
  // この行は例外をスローします
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(`アドレスは無効です: ${error.message}`);
  } else {
    console.log("アドレスは無効です: 不明なエラー");
  }
}

/**
 * 実行方法:
 *
 * ```
 * tsx .\src\symbol\models\Address.ts
 * ```
 */
