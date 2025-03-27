import { Hash256 } from "symbol-sdk";
import { proveMerkle } from "symbol-sdk/symbol";

// 必要な型の定義
interface MerklePart {
  hash: Hash256;
  isLeft: boolean;
}

interface PatriciaTreePath {
  path: Uint8Array;
  size: number;
}

class TreeNode {
  constructor(public path: PatriciaTreePath) {}
  
  get hexPath(): string {
    // バイト配列を16進数文字列に変換
    return Array.from(this.path.path)
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');
  }
  
  calculateHash(): Hash256 {
    // 簡易実装: 実際には適切なハッシュ計算が必要です
    return new Hash256('0000000000000000000000000000000000000000000000000000000000000000');
  }
}

class PatriciaMerkleProofResult {
  static VALID_POSITIVE = 1;
  static VALID_NEGATIVE = 2;
  static INCONCLUSIVE = 3;
  static STATE_HASH_DOES_NOT_MATCH_ROOTS = 4;
  static UNANCHORED_PATH_TREE = 5;
  static LEAF_VALUE_MISMATCH = 6;
  static UNLINKED_NODE = 7;
  static PATH_MISMATCH = 8;
}

/**
 * このファイルはproveMerkle関数の使用例を示しています。
 * proveMerkle関数は、マークルツリー内のリーフハッシュがルートハッシュに接続されているかどうかを検証します。
 */

// 使用例1: 基本的な使用方法
function basicUsageExample(): void {
  console.log("基本的なproveMerkle関数の使用例:");

  // リーフハッシュ（検証したいハッシュ）
  const leafHash = new Hash256(
    "9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08"
  );

  // ルートハッシュ（マークルツリーのルート）
  const rootHash = new Hash256(
    "1B4F0E9851971998E732078544C96B36C3D01CEDF7CAA332359D6F1D83567014"
  );

  // マークルパス（リーフからルートへのパス）
  const merklePath: Array<MerklePart> = [
    {
      hash: new Hash256(
        "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855"
      ),
      isLeft: true,
    },
    {
      hash: new Hash256(
        "CA978112CA1BBDCAFAC231B39A23DC4DA786EFF8147C4E72B9807785AFEE48BB"
      ),
      isLeft: false,
    },
  ];

  // マークルハッシュの検証
  const isValid = proveMerkle(leafHash, merklePath, rootHash);

  console.log(`検証結果: ${isValid ? "有効" : "無効"}`);
}

// 使用例2: 空のマークルパスの場合
function emptyPathExample(): void {
  console.log("\n空のマークルパスの例:");

  const leafHash = new Hash256(
    "9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08"
  );
  const rootHash = new Hash256(
    "9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08"
  );

  // 空のマークルパス（リーフハッシュとルートハッシュが同じ場合）
  const merklePath: Array<MerklePart> = [];

  const isValid = proveMerkle(leafHash, merklePath, rootHash);

  console.log(`検証結果: ${isValid ? "有効" : "無効"}`);
  console.log(
    "注: 空のマークルパスの場合、リーフハッシュとルートハッシュが同じであれば有効です。"
  );
}

// MerkleHashBuilderクラスの簡易実装
class MerkleHashBuilder {
  private _hashes: Hash256[] = [];
  
  update(componentHash: Hash256): void {
    this._hashes.push(componentHash);
  }
  
  final(): Hash256 {
    // 簡易実装: 実際には適切なハッシュ計算が必要です
    if (this._hashes.length === 0) {
      return new Hash256('0000000000000000000000000000000000000000000000000000000000000000');
    }
    
    // 例示のために最後に追加されたハッシュを返す
    return this._hashes[this._hashes.length - 1];
  }
}

// provePatriciaMerkle関数の簡易実装
function provePatriciaMerkle(
  encodedKey: Hash256,
  valueToTest: Hash256,
  merklePath: Array<TreeNode>,
  stateHash: Hash256,
  subcacheMerkleRoots: Array<Hash256>
): number {
  // 簡易実装: 実際には適切なパトリシアマークルツリーの検証ロジックが必要です
  
  // 例示のためにVALID_POSITIVEを返す
  return PatriciaMerkleProofResult.VALID_POSITIVE;
}

// 使用例3: MerkleHashBuilderを使用した例
function merkleHashBuilderExample(): void {
  console.log("\nMerkleHashBuilderを使用した例:");

  // マークルハッシュビルダーの作成
  const builder = new MerkleHashBuilder();

  // コンポーネントハッシュの追加
  builder.update(
    new Hash256(
      "CA978112CA1BBDCAFAC231B39A23DC4DA786EFF8147C4E72B9807785AFEE48BB"
    )
  );
  builder.update(
    new Hash256(
      "3E23E8160039594A33894F6564E1B1348BBD7A0088D42C4ACB73EEAED59C009D"
    )
  );

  // マークルハッシュの計算
  const rootHash = builder.final();

  console.log(`計算されたルートハッシュ: ${rootHash.toString()}`);

  // 特定のリーフハッシュがこのマークルツリーに含まれているかを検証
  const leafHash = new Hash256(
    "CA978112CA1BBDCAFAC231B39A23DC4DA786EFF8147C4E72B9807785AFEE48BB"
  );

  // 注: 実際のアプリケーションでは、適切なマークルパスを構築する必要があります
  // ここでは例示のために簡略化したパスを使用します
  const merklePath: Array<MerklePart> = [
    {
      hash: new Hash256(
        "3E23E8160039594A33894F6564E1B1348BBD7A0088D42C4ACB73EEAED59C009D"
      ),
      isLeft: false,
    },
  ];

  const isValid = proveMerkle(leafHash, merklePath, rootHash);
  console.log(`検証結果: ${isValid ? "有効" : "無効"}`);
}

// 使用例4: PatriciaMerkleProofResultの使用例
function patriciaMerkleExample(): void {
  console.log("\nPatriciaMerkleProofResultの使用例:");

  // この例では、provePatriciaMerkle関数の使用方法を示します
  const encodedKey = new Hash256(
    "9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08"
  );
  const valueToTest = new Hash256(
    "1B4F0E9851971998E732078544C96B36C3D01CEDF7CAA332359D6F1D83567014"
  );

  // TreeNodeの配列を作成
  // 注: 実際のアプリケーションでは、適切なTreeNodeの配列を構築する必要があります
  const merklePath: Array<TreeNode> = [];

  const stateHash = new Hash256(
    "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855"
  );
  const subcacheMerkleRoots = [
    new Hash256(
      "CA978112CA1BBDCAFAC231B39A23DC4DA786EFF8147C4E72B9807785AFEE48BB"
    ),
  ];

  // provePatriciaMerkle関数の呼び出し
  try {
    const result = provePatriciaMerkle(
      encodedKey,
      valueToTest,
      merklePath,
      stateHash,
      subcacheMerkleRoots
    );

    // 結果の解釈
    switch (result) {
      case PatriciaMerkleProofResult.VALID_POSITIVE:
        console.log("検証成功: 肯定的な結果");
        break;
      case PatriciaMerkleProofResult.VALID_NEGATIVE:
        console.log("検証成功: 否定的な結果");
        break;
      case PatriciaMerkleProofResult.INCONCLUSIVE:
        console.log("検証結果: 結論が出ない");
        break;
      case PatriciaMerkleProofResult.STATE_HASH_DOES_NOT_MATCH_ROOTS:
        console.log(
          "検証失敗: ステートハッシュがサブキャッシュマークルルートから導出できない"
        );
        break;
      case PatriciaMerkleProofResult.UNANCHORED_PATH_TREE:
        console.log(
          "検証失敗: 証明されるパスツリーのルートがサブキャッシュマークルルートではない"
        );
        break;
      case PatriciaMerkleProofResult.LEAF_VALUE_MISMATCH:
        console.log("検証失敗: リーフ値が期待値と一致しない");
        break;
      case PatriciaMerkleProofResult.UNLINKED_NODE:
        console.log(
          "検証失敗: 提供されたマークルハッシュにリンクされていないノードが含まれている"
        );
        break;
      case PatriciaMerkleProofResult.PATH_MISMATCH:
        console.log(
          "検証失敗: 実際のマークルパスがエンコードされたキーと一致しない"
        );
        break;
      default:
        console.log(`検証失敗: 不明なエラーコード ${result}`);
    }
  } catch (error: any) {
    console.log(`エラーが発生しました: ${error?.message || 'Unknown error'}`);
    console.log(
      "注: この例では、適切なTreeNodeの配列が必要です。実際のアプリケーションでは、適切なデータを提供してください。"
    );
  }

  // PatriciaMerkleProofResultの結果コードの説明
  console.log("\nPatriciaMerkleProofResultの結果コード:");
  console.log(
    `- VALID_POSITIVE (${PatriciaMerkleProofResult.VALID_POSITIVE}): 検証成功、肯定的な結果`
  );
  console.log(
    `- VALID_NEGATIVE (${PatriciaMerkleProofResult.VALID_NEGATIVE}): 検証成功、否定的な結果`
  );
  console.log(
    `- INCONCLUSIVE (${PatriciaMerkleProofResult.INCONCLUSIVE}): 検証結果、結論が出ない`
  );
  console.log(
    `- STATE_HASH_DOES_NOT_MATCH_ROOTS (${PatriciaMerkleProofResult.STATE_HASH_DOES_NOT_MATCH_ROOTS}): ステートハッシュがサブキャッシュマークルルートから導出できない`
  );
  console.log(
    `- UNANCHORED_PATH_TREE (${PatriciaMerkleProofResult.UNANCHORED_PATH_TREE}): 証明されるパスツリーのルートがサブキャッシュマークルルートではない`
  );
  console.log(
    `- LEAF_VALUE_MISMATCH (${PatriciaMerkleProofResult.LEAF_VALUE_MISMATCH}): リーフ値が期待値と一致しない`
  );
  console.log(
    `- UNLINKED_NODE (${PatriciaMerkleProofResult.UNLINKED_NODE}): 提供されたマークルハッシュにリンクされていないノードが含まれている`
  );
  console.log(
    `- PATH_MISMATCH (${PatriciaMerkleProofResult.PATH_MISMATCH}): 実際のマークルパスがエンコードされたキーと一致しない`
  );
}

// 使用例の実行
function runExamples(): void {
  basicUsageExample();
  emptyPathExample();
  merkleHashBuilderExample();
  patriciaMerkleExample();
}

// 例を実行
runExamples();
