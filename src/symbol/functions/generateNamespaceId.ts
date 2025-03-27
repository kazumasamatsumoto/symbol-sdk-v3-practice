import { generateNamespaceId, generateNamespacePath, isValidNamespaceName } from "symbol-sdk/symbol";

// 基本的な名前空間IDの生成（親名前空間なし）
const rootNamespaceId = generateNamespaceId("company");
console.log("ルート名前空間ID:", rootNamespaceId.toString(16)); // 16進数で出力

// 親名前空間IDを使用した子名前空間IDの生成
const subNamespaceId = generateNamespaceId("department", rootNamespaceId);
console.log("子名前空間ID:", subNamespaceId.toString(16));

// 3階層の名前空間の例（親→子→孫）
const level3NamespaceId = generateNamespaceId("team", subNamespaceId);
console.log("孫名前空間ID:", level3NamespaceId.toString(16));

// 名前空間名の検証
const validName = "valid-namespace";
const invalidName = "Invalid@Namespace";
console.log(`"${validName}" は有効な名前空間名: ${isValidNamespaceName(validName)}`);
console.log(`"${invalidName}" は有効な名前空間名: ${isValidNamespaceName(invalidName)}`);

// 完全修飾名前空間名からのパス生成
const fullyQualifiedName = "company.department.team";
const namespacePath = generateNamespacePath(fullyQualifiedName);
console.log("名前空間パス:");
namespacePath.forEach((id, index) => {
  console.log(`レベル ${index + 1}: ${id.toString(16)}`);
});

// 実際のアプリケーションでの使用例
function createSubNamespace(parentName: string, subName: string): bigint {
  // 親名前空間のIDを取得
  const parentId = generateNamespaceId(parentName);
  
  // 子名前空間のIDを生成
  return generateNamespaceId(subName, parentId);
}

const projectNamespaceId = createSubNamespace("company", "project");
console.log("プロジェクト名前空間ID:", projectNamespaceId.toString(16));
