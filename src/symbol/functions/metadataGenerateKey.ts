import { metadataGenerateKey, metadataUpdateValue } from "symbol-sdk/symbol";

/**
 * 使用例1: 文字列からメタデータキーを生成する
 */
function exampleGenerateKey() {
  // アカウントメタデータのキーを生成
  const accountMetadataKeySeed = "account_metadata_key";
  const accountMetadataKey = metadataGenerateKey(accountMetadataKeySeed);
  console.log(`アカウントメタデータキー: ${accountMetadataKey.toString()}`);

  // モザイクメタデータのキーを生成
  const mosaicMetadataKeySeed = "mosaic_metadata_key";
  const mosaicMetadataKey = metadataGenerateKey(mosaicMetadataKeySeed);
  console.log(`モザイクメタデータキー: ${mosaicMetadataKey.toString()}`);

  // ネームスペースメタデータのキーを生成
  const namespaceMetadataKeySeed = "namespace_metadata_key";
  const namespaceMetadataKey = metadataGenerateKey(namespaceMetadataKeySeed);
  console.log(`ネームスペースメタデータキー: ${namespaceMetadataKey.toString()}`);

  return {
    accountMetadataKey,
    mosaicMetadataKey,
    namespaceMetadataKey
  };
}

/**
 * 使用例2: メタデータ値の更新ペイロードを作成する
 */
function exampleUpdateValue() {
  // 文字列をUint8Arrayに変換するヘルパー関数
  const stringToUint8Array = (str: string): Uint8Array => {
    const encoder = new TextEncoder();
    return encoder.encode(str);
  };

  // 新しいメタデータ値を設定する例（古い値がない場合）
  const newValue1 = stringToUint8Array("初めてのメタデータ値");
  const payload1 = metadataUpdateValue(undefined, newValue1);
  console.log("新規メタデータペイロード:", Array.from(payload1));

  // 既存のメタデータ値を更新する例
  const oldValue = stringToUint8Array("古いメタデータ値");
  const newValue2 = stringToUint8Array("更新されたメタデータ値");
  const payload2 = metadataUpdateValue(oldValue, newValue2);
  console.log("更新メタデータペイロード:", Array.from(payload2));

  return {
    newValuePayload: payload1,
    updateValuePayload: payload2
  };
}

/**
 * 使用例3: 実際のシナリオでの使用方法
 */
function exampleRealWorldUsage() {
  // メタデータキーの生成
  const userProfileKeySeed = "user_profile";
  const userProfileKey = metadataGenerateKey(userProfileKeySeed);
  
  // JSONオブジェクトをメタデータ値として保存
  const userProfile = {
    name: "田中太郎",
    age: 30,
    interests: ["ブロックチェーン", "プログラミング"]
  };
  
  // JSONをUint8Arrayに変換
  const profileData = stringToUint8Array(JSON.stringify(userProfile));
  
  // 新しいメタデータ値を設定
  const payload = metadataUpdateValue(undefined, profileData);
  
  console.log(`ユーザープロファイルキー: ${userProfileKey.toString()}`);
  console.log(`ペイロードサイズ: ${payload.length} バイト`);
  
  return {
    key: userProfileKey,
    payload
  };
}

// 文字列をUint8Arrayに変換するヘルパー関数
function stringToUint8Array(str: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

// 使用例を実行
console.log("=== メタデータキー生成の例 ===");
const keys = exampleGenerateKey();

console.log("\n=== メタデータ値更新の例 ===");
const payloads = exampleUpdateValue();

console.log("\n=== 実際のシナリオでの使用例 ===");
const realWorldExample = exampleRealWorldUsage();
