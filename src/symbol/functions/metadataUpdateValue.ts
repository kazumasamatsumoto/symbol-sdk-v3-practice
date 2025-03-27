import { metadataGenerateKey, metadataUpdateValue } from "symbol-sdk/symbol";

/**
 * metadataUpdateValue関数の使用例
 * 
 * この関数は、メタデータの古い値から新しい値への更新ペイロードを作成します。
 * Symbol blockchainでは、メタデータの更新時に差分のみを送信することで、
 * トランザクションサイズとコストを最適化します。
 */

// 例1: 初めてメタデータを設定する場合（oldValueがundefined）
function example1() {
  // 新しいメタデータ値（文字列をUint8Arrayに変換）
  const newValue = new TextEncoder().encode("Hello Symbol!");
  
  // oldValueがundefinedの場合（初めてメタデータを設定する場合）
  const oldValue = undefined;
  
  // 更新ペイロードを作成
  const payload = metadataUpdateValue(oldValue, newValue);
  
  console.log("例1: 初めてメタデータを設定");
  console.log("新しい値:", new TextDecoder().decode(newValue));
  console.log("ペイロード:", payload);
  console.log("ペイロードの長さ:", payload.length);
  console.log("----------------------------");
}

// 例2: 既存のメタデータを更新する場合
function example2() {
  // 古いメタデータ値
  const oldValue = new TextEncoder().encode("Hello Symbol!");
  
  // 新しいメタデータ値
  const newValue = new TextEncoder().encode("Hello Updated Symbol!");
  
  // 更新ペイロードを作成
  const payload = metadataUpdateValue(oldValue, newValue);
  
  console.log("例2: 既存のメタデータを更新");
  console.log("古い値:", new TextDecoder().decode(oldValue));
  console.log("新しい値:", new TextDecoder().decode(newValue));
  console.log("ペイロード:", payload);
  console.log("ペイロードの長さ:", payload.length);
  console.log("----------------------------");
}

// 例3: メタデータを削除する場合（新しい値を空にする）
function example3() {
  // 古いメタデータ値
  const oldValue = new TextEncoder().encode("Hello Symbol!");
  
  // 新しいメタデータ値（空）
  const newValue = new Uint8Array(0);
  
  // 更新ペイロードを作成
  const payload = metadataUpdateValue(oldValue, newValue);
  
  console.log("例3: メタデータを削除");
  console.log("古い値:", new TextDecoder().decode(oldValue));
  console.log("新しい値: (空)");
  console.log("ペイロード:", payload);
  console.log("ペイロードの長さ:", payload.length);
  console.log("----------------------------");
}

// 例4: metadataGenerateKey関数を使用してメタデータキーを生成
function example4() {
  // メタデータキーのシード文字列
  const seed = "my-metadata-key";
  
  // メタデータキーを生成
  const key = metadataGenerateKey(seed);
  
  console.log("例4: メタデータキーの生成");
  console.log("シード:", seed);
  console.log("生成されたキー:", key.toString());
  console.log("----------------------------");
}

// 例5: 実際のトランザクション作成の流れ（擬似コード）
function example5() {
  console.log("例5: メタデータトランザクション作成の流れ（擬似コード）");
  console.log(`
// 1. メタデータキーを生成
const key = metadataGenerateKey("my-account-metadata");

// 2. 古いメタデータ値を取得（ネットワークから取得するか、初めての場合はundefined）
const oldValue = undefined; // または既存の値

// 3. 新しいメタデータ値を準備
const newValue = new TextEncoder().encode("Account metadata value");

// 4. 更新ペイロードを作成
const payload = metadataUpdateValue(oldValue, newValue);

// 5. メタデータトランザクションを作成
const tx = AccountMetadataTransactionFactory.create(
  network,
  deadline,
  targetAddress, // メタデータを付与するアカウントのアドレス
  key,           // メタデータキー
  payload.length, // 値のサイズ
  payload        // 更新ペイロード
);

// 6. トランザクションに署名して送信
const signedTx = facade.signTransaction(tx, signerAccount);
await transactionRepository.announce(signedTx);
`);
  console.log("----------------------------");
}

// 実行
example1();
example2();
example3();
example4();
example5();
