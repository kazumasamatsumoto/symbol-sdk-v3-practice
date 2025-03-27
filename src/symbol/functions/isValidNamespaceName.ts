import { isValidNamespaceName } from "symbol-sdk/symbol";

/**
 * isValidNamespaceName関数の使用例
 * 
 * この関数は名前空間の名前が有効かどうかをチェックします。
 * 
 * 注意: 実行結果から、以下の条件が適用されているようです:
 * - 空の文字列は無効
 * - アンダースコア(_)は有効
 * - 特殊文字(@など)は無効
 * - スペースは無効
 * - 長い名前（17文字以上）も有効
 */

// 有効な名前空間名の例
console.log('--- 有効な名前空間名の例 ---');
console.log(isValidNamespaceName("example")); // true
console.log(isValidNamespaceName("my-namespace")); // true
console.log(isValidNamespaceName("symbol123")); // true
console.log(isValidNamespaceName("test-namespace-123")); // true

// 無効な名前空間名の例
console.log('--- 無効な名前空間名の例 ---');
console.log(isValidNamespaceName("")); // false - 空の文字列
console.log(isValidNamespaceName("invalid_namespace")); // true - アンダースコアは有効
console.log(isValidNamespaceName("invalid@namespace")); // false - 特殊文字は使用不可
console.log(isValidNamespaceName("invalid namespace")); // false - スペースは使用不可

// 長さの制限に関する例
console.log('--- 長さの制限に関する例 ---');
// 長い名前も有効
const longRootNamespace = "thisnameistoolong"; // 17文字
console.log(isValidNamespaceName(longRootNamespace)); // true

// 子名前空間の例（実際の使用時には generateNamespaceId 関数と組み合わせて使用）
console.log('--- 子名前空間の例 ---');
const rootNamespace = "symbol";
const subNamespace = "test";
console.log(isValidNamespaceName(rootNamespace)); // true
console.log(isValidNamespaceName(subNamespace)); // true

// 実際のアプリケーションでの使用例
console.log('--- 実際のアプリケーションでの使用例 ---');
function createNamespace(namespaceName: string) {
  if (isValidNamespaceName(namespaceName)) {
    console.log(`名前空間 "${namespaceName}" を作成します`);
    // ここで実際の名前空間作成処理を行う
  } else {
    console.log(`名前空間名 "${namespaceName}" は無効です`);
  }
}

createNamespace("valid-name"); // 名前空間 "valid-name" を作成します
createNamespace("invalid@name"); // 名前空間名 "invalid@name" は無効です
