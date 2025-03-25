import {
  deserializePatriciaTreeNodes,
  provePatriciaMerkle,
} from "symbol-sdk/symbol";
import { Hash256 } from "symbol-sdk";

// TreeNodeの型定義
interface PatriciaTreePath {
  path: Uint8Array;
  size: number;
}

interface TreeNode {
  path: PatriciaTreePath;
  hexPath: string;
  calculateHash(): Hash256;
}

interface LeafNode extends TreeNode {
  value: Hash256;
}

interface BranchNode extends TreeNode {
  links: Array<Hash256>;
}

// PatriciaMerkleProofResultの定数
const PatriciaMerkleProofResult = {
  VALID_POSITIVE: 0,
  VALID_NEGATIVE: 1,
  INCONCLUSIVE: 2,
  STATE_HASH_DOES_NOT_MATCH_ROOTS: 3,
  UNANCHORED_PATH_TREE: 4,
  LEAF_VALUE_MISMATCH: 5,
  UNLINKED_NODE: 6,
  PATH_MISMATCH: 7,
};

/**
 * deserializePatriciaTreeNodesの使用例を示すサンプルコード
 */

// 1. バイナリデータの準備（例：ネットワークから受信したデータ）
// 実際のアプリケーションでは、このデータはAPIレスポンスやファイルから取得します
function createSampleBuffer(): Uint8Array {
  // このサンプルデータは実際のパトリシアツリーノードのシリアライズ形式に従っていません
  // 実際のデータはSymbol APIから取得する必要があります
  return new Uint8Array([
    /* サンプルデータ */
  ]);
}

/**
 * deserializePatriciaTreeNodesの基本的な使い方
 */
function basicUsage(): void {
  console.log("=== deserializePatriciaTreeNodesの基本的な使い方 ===");

  // 1. バイナリデータの準備
  const buffer = createSampleBuffer();

  // 2. deserializePatriciaTreeNodesを使用してノードをデシリアライズ
  const nodes = deserializePatriciaTreeNodes(buffer);

  // 3. デシリアライズされたノードの情報を表示
  console.log(`デシリアライズされたノード数: ${nodes.length}`);

  // 4. 各ノードの情報を表示
  nodes.forEach((node: TreeNode, index: number) => {
    console.log(`ノード ${index + 1}:`);
    console.log(`  パス: ${node.hexPath}`);

    // ノードの種類に応じた情報を表示
    // 注: 実際のコードでは、型ガードを使用して型を判別する必要があります
    const leafNode = node as LeafNode;
    if (leafNode.value) {
      console.log("  タイプ: LeafNode");
      console.log(`  値: ${leafNode.value.toString()}`);
    } else {
      const branchNode = node as BranchNode;
      if (branchNode.links) {
        console.log("  タイプ: BranchNode");
        console.log(`  リンク数: ${branchNode.links.length}`);
        branchNode.links.forEach((link: Hash256, linkIndex: number) => {
          console.log(`    リンク ${linkIndex + 1}: ${link.toString()}`);
        });
      } else {
        console.log("  タイプ: TreeNode");
      }
    }

    // ノードのハッシュを計算して表示
    const hash = node.calculateHash();
    console.log(`  ハッシュ: ${hash.toString()}`);
  });
}

/**
 * deserializePatriciaTreeNodesとprovePatriciaMerkleを組み合わせた使用例
 */
function proofExample(): void {
  console.log("\n=== パトリシアマークル証明の例 ===");

  // 1. バイナリデータの準備
  const buffer = createSampleBuffer();

  // 2. ノードをデシリアライズ
  const nodes = deserializePatriciaTreeNodes(buffer);

  // 証明に必要なパラメータを準備
  // 実際のアプリケーションでは、これらの値は適切なソースから取得する必要があります
  const encodedKey = new Hash256(new Uint8Array(32).fill(1)); // サンプルキー
  const valueToTest = new Hash256(new Uint8Array(32).fill(2)); // テストする値
  const stateHash = new Hash256(new Uint8Array(32).fill(3)); // 状態ハッシュ
  const subcacheMerkleRoots = [new Hash256(new Uint8Array(32).fill(4))]; // サブキャッシュマークルルート

  // 3. パトリシアマークル証明を実行
  const result = provePatriciaMerkle(
    encodedKey,
    valueToTest,
    nodes,
    stateHash,
    subcacheMerkleRoots
  );

  // 4. 結果を解釈して表示
  console.log(`証明結果コード: ${result}`);

  switch (result) {
    case PatriciaMerkleProofResult.VALID_POSITIVE:
      console.log("証明は有効（肯定的）です");
      break;
    case PatriciaMerkleProofResult.VALID_NEGATIVE:
      console.log("証明は有効（否定的）です");
      break;
    case PatriciaMerkleProofResult.INCONCLUSIVE:
      console.log("証明は結論が出ません");
      break;
    case PatriciaMerkleProofResult.STATE_HASH_DOES_NOT_MATCH_ROOTS:
      console.log(
        "状態ハッシュがサブキャッシュマークルルートから導出できません"
      );
      break;
    case PatriciaMerkleProofResult.UNANCHORED_PATH_TREE:
      console.log(
        "証明されるパスツリーのルートがサブキャッシュマークルルートではありません"
      );
      break;
    case PatriciaMerkleProofResult.LEAF_VALUE_MISMATCH:
      console.log("リーフの値が期待される値と一致しません");
      break;
    case PatriciaMerkleProofResult.UNLINKED_NODE:
      console.log(
        "提供されたマークルハッシュにリンクされていないノードが含まれています"
      );
      break;
    case PatriciaMerkleProofResult.PATH_MISMATCH:
      console.log("実際のマークルパスがエンコードされたキーと一致しません");
      break;
    default:
      console.log("不明な結果コード");
  }
}

/**
 * 実際のアプリケーションでの使用例
 */
function realWorldExample(): void {
  console.log("\n=== 実際のアプリケーションでの使用例 ===");

  // 1. Symbol APIからマークルパスを取得する（擬似コード）
  // const response = await fetch('https://symbol-node.example.com/merkle-path?address=...');
  // const merklePathData = await response.arrayBuffer();
  // const buffer = new Uint8Array(merklePathData);

  // サンプルとして空のバッファを使用
  const buffer = new Uint8Array(0);

  // 2. ノードをデシリアライズ
  const nodes = deserializePatriciaTreeNodes(buffer);

  // 3. ノードが空でない場合の処理
  if (nodes.length > 0) {
    console.log("マークルパスが取得されました");

    // 4. ノードの情報を処理
    // ...
  } else {
    console.log("マークルパスが空です");
  }
}

// 使用例を実行
basicUsage();
proofExample();
realWorldExample();

// エクスポート（他のファイルから使用できるようにする）
export { basicUsage, proofExample, realWorldExample };

/**
 * ファイルを更新して、サンプル関数のコメントを外しました。これで、ファイルを実行すると、各関数が実行され、コンソールに出力が表示されるはずです。

ただし、現在のサンプルデータは空のバッファを使用しているため、実際のノードはデシリアライズされません。実際のアプリケーションでは、Symbol APIから取得した実際のデータを使用する必要があります。

次に、ユーザーに対して、変更内容と実行方法を説明しましょう。

PS C:\Users\kazum\portfolio\symbol-sdk-v3> tsx .\src\symbol\functions\deserializePatriciaTreeNodes.ts
=== deserializePatriciaTreeNodesの基本的な使い方 ===
デシリアライズされたノード数: 0

=== パトリシアマークル証明の例 ===
証明結果コード: 32769
不明な結果コード

=== 実際のアプリケーションでの使用例 ===
マークルパスが空です
 */
