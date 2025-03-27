import { generateNamespacePath } from "symbol-sdk/symbol";

// 基本的な使用例：単一の名前空間
const singleNamespacePath = generateNamespacePath("symbol");
console.log("単一の名前空間パス:", singleNamespacePath);
// 出力例: [9562080086528621131n]（実際の値は異なる場合があります）

// 2階層の名前空間の使用例
const twoLevelNamespacePath = generateNamespacePath("symbol.token");
console.log("2階層の名前空間パス:", twoLevelNamespacePath);
// 出力例: [9562080086528621131n, 16254116582899961033n]（実際の値は異なる場合があります）

// 3階層の名前空間の使用例
const threeLevelNamespacePath = generateNamespacePath("symbol.token.xym");
console.log("3階層の名前空間パス:", threeLevelNamespacePath);
// 出力例: [9562080086528621131n, 16254116582899961033n, 12667548005731715469n]（実際の値は異なる場合があります）

// 注意：完全修飾名前空間名は最大3階層まで指定可能です
// 各階層の名前空間IDは、親の名前空間IDと名前から生成されます
