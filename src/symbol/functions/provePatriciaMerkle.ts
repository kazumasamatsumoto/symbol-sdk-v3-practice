import {
  provePatriciaMerkle,
  deserializePatriciaTreeNodes,
} from "symbol-sdk/symbol";
import { Hash256 } from "symbol-sdk";

/**
 * Path in a Patricia merkle treee.
 */
export type PatriciaTreePath = {
  /**
   * Bytes composing the full path.
   */
  path: Uint8Array;
  /**
   * Length (in nibbles) of the path.
   */
  size: number;
};

/**
 *  Node in a compact Patricia tree.
 */
export class TreeNode {
  /**
   * Creates a tree node.
   * @param {PatriciaTreePath} path Node path.
   */
  constructor(path: PatriciaTreePath) {
    this.path = path;
  }

  /**
   * Node path.
   * @type {PatriciaTreePath}
   */
  path: PatriciaTreePath;

  /**
   * Gets hex representation of path.
   * @returns {string} Hex representation of path.
   */
  get hexPath(): string {
    return Array.from(this.path.path)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  /**
   * Calculates node hash.
   * @returns {Hash256} Hash of the node.
   */
  calculateHash(): Hash256 {
    // 実際の実装では、ノードのハッシュを計算するロジックが必要です
    // この例では、ダミーのハッシュを返します
    return new Hash256(
      "0000000000000000000000000000000000000000000000000000000000000000"
    );
  }
}

/**
 *  Leaf node in a compact Patricia tree.
 */
export class LeafNode extends TreeNode {
  /**
   * Creates a leaf node.
   * @param {PatriciaTreePath} path Leaf path.
   * @param {Hash256} value Leaf value.
   */
  constructor(path: PatriciaTreePath, value: Hash256) {
    super(path);
    this.value = value;
  }

  /**
   * Leaf value.
   * @type {Hash256}
   */
  value: Hash256;
}

/**
 *  Branch node in a compact Patricia tree.
 */
export class BranchNode extends TreeNode {
  /**
   * Creates a branch node.
   * @param {PatriciaTreePath} path Branch path.
   * @param {Array<Hash256>} links Branch links.
   */
  constructor(path: PatriciaTreePath, links: Array<Hash256>) {
    super(path);
    this.links = links;
  }

  /**
   * Branch links.
   * @type {Array<Hash256>}
   */
  links: Array<Hash256>;
}

/**
 * Possible results of a patricia merkle proof.
 */
export class PatriciaMerkleProofResult {
  /**
   * Proof is valid (positive).
   * @type {number}
   */
  static VALID_POSITIVE: number = 1;

  /**
   * Proof is valid (negative).
   * @type {number}
   */
  static VALID_NEGATIVE: number = 2;

  /**
   * Negative proof is inconclusive.
   * @type {number}
   */
  static INCONCLUSIVE: number = 3;

  /**
   * State hash cannot be derived from subcache merkle roots.
   * @type {number}
   */
  static STATE_HASH_DOES_NOT_MATCH_ROOTS: number = 4;

  /**
   * Root of the path tree being proven is not a subcache merkle root.
   * @type {number}
   */
  static UNANCHORED_PATH_TREE: number = 5;

  /**
   * Leaf value does not match expected value.
   * @type {number}
   */
  static LEAF_VALUE_MISMATCH: number = 6;

  /**
   * Provided merkle hash contains an unlinked node.
   * @type {number}
   */
  static UNLINKED_NODE: number = 7;

  /**
   * Actual merkle path does not match encoded key.
   * @type {number}
   */
  static PATH_MISMATCH: number = 8;
}

/**
 * provePatriciaMerkle関数の使用例
 *
 * この例では、Patricia Merkleツリーの証明を行う方法を示します。
 * 実際のアプリケーションでは、ブロックチェーンノードからこれらの値を取得することになります。
 */

// 使用例1: 基本的な証明の実行
function basicProofExample(): void {
  console.log("基本的なPatricia Merkle証明の例:");

  // 1. 証明したい状態のエンコードされたキー（通常はアドレスやアカウント状態のキー）
  const encodedKey = new Hash256(
    "C54AFD996DF1F52748EBC5B40F8D0DC242A6A661299149F5F96A0C21AFFCA482"
  );

  // 2. 期待される値（証明したい値）
  const valueToTest = new Hash256(
    "B778A39A3663719DFC5E48C9D78431B1E45C2AF9DF538782BF199C189DABEAC7"
  );

  // 3. マークルパス（ノードのリスト）- 通常はブロックチェーンノードから取得
  // この例では手動でノードを作成していますが、実際にはdeserializePatriciaTreeNodes関数を使用して
  // シリアル化されたバッファからノードを取得することが一般的です
  const path1: PatriciaTreePath = {
    path: new Uint8Array([0xc5, 0x4a, 0xfd]),
    size: 6, // nibbleの数（バイト数の2倍）
  };

  const path2: PatriciaTreePath = {
    path: new Uint8Array([0xc5, 0x4a, 0xfd, 0x99]),
    size: 8,
  };

  // リーフノードの作成
  const leafNode = new LeafNode(
    {
      path: new Uint8Array([
        0xc5, 0x4a, 0xfd, 0x99, 0x6d, 0xf1, 0xf5, 0x27, 0x48, 0xeb, 0xc5, 0xb4,
        0x0f, 0x8d, 0x0d, 0xc2,
      ]),
      size: 32,
    },
    valueToTest
  );

  // ブランチノードの作成
  const branchNode = new BranchNode(path1, [
    new Hash256(
      "0000000000000000000000000000000000000000000000000000000000000000"
    ),
    new Hash256(
      "0000000000000000000000000000000000000000000000000000000000000000"
    ),
    new Hash256(
      "0000000000000000000000000000000000000000000000000000000000000000"
    ),
    new Hash256(
      "0000000000000000000000000000000000000000000000000000000000000000"
    ),
    new Hash256(
      "0000000000000000000000000000000000000000000000000000000000000000"
    ),
    new Hash256(
      "0000000000000000000000000000000000000000000000000000000000000000"
    ),
    new Hash256(
      "0000000000000000000000000000000000000000000000000000000000000000"
    ),
    new Hash256(
      "0000000000000000000000000000000000000000000000000000000000000000"
    ),
    new Hash256(
      "0000000000000000000000000000000000000000000000000000000000000000"
    ),
    new Hash256(
      "9876543210ABCDEF9876543210ABCDEF9876543210ABCDEF9876543210ABCDEF"
    ), // リーフノードへのリンク
    new Hash256(
      "0000000000000000000000000000000000000000000000000000000000000000"
    ),
    new Hash256(
      "0000000000000000000000000000000000000000000000000000000000000000"
    ),
    new Hash256(
      "0000000000000000000000000000000000000000000000000000000000000000"
    ),
    new Hash256(
      "0000000000000000000000000000000000000000000000000000000000000000"
    ),
    new Hash256(
      "0000000000000000000000000000000000000000000000000000000000000000"
    ),
    new Hash256(
      "0000000000000000000000000000000000000000000000000000000000000000"
    ),
  ]);

  // マークルパス（ルートからリーフへのパス）
  const merklePath: Array<TreeNode> = [branchNode, leafNode];

  // 4. ブロックヘッダーからの状態ハッシュ
  const stateHash = new Hash256(
    "1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF"
  );

  // 5. サブキャッシュマークルルート
  const subcacheMerkleRoots: Array<Hash256> = [
    new Hash256(
      "FEDCBA0987654321FEDCBA0987654321FEDCBA0987654321FEDCBA0987654321"
    ),
    branchNode.calculateHash(), // この例では、ブランチノードのハッシュをサブキャッシュルートとして使用
    new Hash256(
      "AABBCCDDEEFF00112233445566778899AABBCCDDEEFF00112233445566778899"
    ),
  ];

  // Patricia Merkle証明の実行
  const result = provePatriciaMerkle(
    encodedKey,
    valueToTest,
    merklePath,
    stateHash,
    subcacheMerkleRoots
  );

  // 結果の解釈
  console.log("証明結果コード:", result);

  // 結果の意味を表示
  switch (result) {
    case PatriciaMerkleProofResult.VALID_POSITIVE:
      console.log("証明は有効（肯定的）です。");
      break;
    case PatriciaMerkleProofResult.VALID_NEGATIVE:
      console.log("証明は有効（否定的）です。");
      break;
    case PatriciaMerkleProofResult.INCONCLUSIVE:
      console.log("否定的な証明は決定的ではありません。");
      break;
    case PatriciaMerkleProofResult.STATE_HASH_DOES_NOT_MATCH_ROOTS:
      console.log(
        "状態ハッシュはサブキャッシュマークルルートから導出できません。"
      );
      break;
    case PatriciaMerkleProofResult.UNANCHORED_PATH_TREE:
      console.log(
        "証明されているパスツリーのルートはサブキャッシュマークルルートではありません。"
      );
      break;
    case PatriciaMerkleProofResult.LEAF_VALUE_MISMATCH:
      console.log("リーフ値が期待値と一致しません。");
      break;
    case PatriciaMerkleProofResult.UNLINKED_NODE:
      console.log(
        "提供されたマークルハッシュにリンクされていないノードが含まれています。"
      );
      break;
    case PatriciaMerkleProofResult.PATH_MISMATCH:
      console.log("実際のマークルパスがエンコードされたキーと一致しません。");
      break;
    default:
      console.log("不明な結果コード。");
  }
}

// 使用例2: シリアル化されたバッファからのノードの取得と証明
function deserializeNodesExample(): void {
  console.log("\nシリアル化されたバッファからのノードの取得と証明の例:");

  // 実際のアプリケーションでは、このバッファはブロックチェーンノードから取得します
  // この例では、仮想的なバッファを作成しています
  const buffer = new Uint8Array([
    // ノードのシリアル化データ（実際のデータはもっと複雑）
    0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c,
    0x0d, 0x0e, 0x0f, 0x10,
  ]);

  try {
    // バッファからノードを取得
    const nodes = deserializePatriciaTreeNodes(buffer);
    console.log(`${nodes.length}個のノードを取得しました。`);

    // 実際のアプリケーションでは、これらのノードを使用して証明を行います
    // ここでは、取得したノードの情報を表示するだけです
    nodes.forEach((node, index) => {
      console.log(`ノード ${index + 1}:`);
      console.log(`- パス (Hex): ${node.hexPath}`);
      console.log(`- ハッシュ: ${node.calculateHash().toString()}`);

      if (node instanceof LeafNode) {
        console.log(`- タイプ: リーフノード`);
        console.log(`- 値: ${node.value.toString()}`);
      } else if (node instanceof BranchNode) {
        console.log(`- タイプ: ブランチノード`);
        console.log(`- リンク数: ${node.links.length}`);
      }
    });

    // 実際の証明は上記の基本的な例と同様に行います
  } catch (error) {
    console.error("ノードの取得に失敗しました:", error);
  }
}

// 使用例を実行
// 注: 実際のアプリケーションでは、これらの関数は適切なタイミングで呼び出されます
basicProofExample();
deserializeNodesExample();
