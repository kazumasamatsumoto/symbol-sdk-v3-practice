![CommonJs vs ES Modules Comparison](/docs/esmodules/svg/commonjs-vs-esmodules.svg)

この SVG では、CommonJS と ES Modules の主な違いを以下のように表現しました：

1. 設計思想の違い:

- CommonJS はサーバーサイド（Node.js）に最適化され、動的な読み込みを重視
- ES Modules はブラウザでの JavaScript 実行を考慮し、静的解析や最適化を重視

2. 実装の特徴:

- CommonJS は`require/exports`を使用し、同期的な読み込みと動的な依存関係解決
- ES Modules は`import/export`を使用し、静的解析可能で非同期読み込みをサポート

3. モジュール解決の方法:

- CommonJS は実行時に依存関係を解決
- ES Modules はコンパイル時に依存関係を解決し、tree-shaking などの最適化が可能

この違いが、あなたが経験していた設定の問題の根本的な原因となっています。Symbol SDK が ES Modules 形式で実装されているため、CommonJS 形式で実行しようとすると互換性の問題が発生するのです。

歴史的な流れを時系列でまとめた SVG を作成します。

![歴史的な背景](/docs/esmodules/svg/history-commonjs-esmodules.svg)

次に、CommonJS が解決しようとした問題とソリューションを視覚化します。

![commonjs以前の問題点と解決策](/docs/esmodules/svg/commonjs-solutions.svg)

最後に、ES Modules が解決しようとした問題とソリューションを視覚化します。

![ESModules以前の問題点と解決策](/docs/esmodules/svg/esmodules-solutions.svg)

これらの図で示したように、CommonJS と ES Modules は、それぞれの時代における異なるニーズと課題に対応するために開発されました。CommonJS は主にサーバーサイドでのモジュール化に焦点を当てていたのに対し、ES Modules はブラウザとサーバーの両方で動作する統一的なモジュールシステムを目指しました。

特に注目すべき点は：

1. CommonJS は Node.js の登場と共に広く採用され、NPM エコシステムの基盤となりました
2. ES Modules は静的解析が可能な設計により、より効率的なビルドとバンドリングを実現しました
3. 現在は両者が共存しており、それぞれの利点を活かした使い分けが可能です

これらのモジュールシステムの進化は、現代の JavaScript エコシステムの発展に大きく貢献しています。

はい、一つのプロジェクトでは可能な限りどちらか一方に統一することをお勧めします。その理由を詳しく説明します：

1. **ES Modules を選択する場合の利点**:

- モダンブラウザで直接サポートされている
- Tree Shaking による最適化が容易
- 静的解析が可能で、IDE のサポートが優れている
- TypeScript との相性が良い
- `import type` による型のみのインポートが可能
- 非同期インポート（Dynamic Import）のサポート

推奨されるプロジェクト:

- 新規プロジェクト
- ブラウザ中心のアプリケーション
- TypeScript を使用するプロジェクト
- モダンなビルドツール（Vite, Rollup など）を使用するプロジェクト

2. **CommonJS を選択する場合の利点**:

- Node.js でのネイティブサポート
- 既存の npm パッケージとの互換性が高い
- 動的なモジュール解決が容易
- require フックによる拡張が可能

推奨されるプロジェクト:

- レガシーな Node.js プロジェクト
- 古い npm パッケージに強く依存するプロジェクト
- スクリプト的な小規模な Node.js ツール

3. **混在させる場合の問題点**:

- ビルド設定が複雑になる
- バンドラーの設定が煩雑になる
- デバッグが困難になる
- チーム内での混乱を招く
- パフォーマンスの最適化が難しくなる

**具体的な選択の指針**:

```javascript
// 新規プロジェクトの場合（ES Modules推奨）
// package.json
{
  "type": "module",
  // ...
}

// コード
import { something } from './module.js';
export const newFeature = () => {};
```

または

```javascript
// レガシープロジェクトの場合（CommonJS推奨）
// package.json
{
  "type": "commonjs",
  // ...
}

// コード
const { something } = require('./module');
module.exports = { newFeature: () => {} };
```

**結論**: 新規プロジェクトを始める場合は、特別な理由がない限り ES Modules を選択することを推奨します。これは将来的な保守性、パフォーマンス最適化、ツールのサポートの観点から最も理想的です。ただし、既存のプロジェクトを移行する場合は、そのコストと利点を慎重に検討する必要があります。

## 仕組み的な違い

CommonJS と ES Modules の主な仕組みの違いを説明します。処理の流れを視覚化するとより理解しやすいと思うので、図示させていただきます。

![仕組み的な違い](/docs/module-mechanism.svg)

主な仕組みの違いは以下の通りです：

1. **読み込みのタイミング**:

   - CommonJS: 実行時（Runtime）に同期的に読み込み
   - ES Modules: パース時（Parse time）に静的解析で依存関係を把握

2. **メモリ割り当て**:

   - CommonJS: require 時に即座にメモリ割り当てと実行
   - ES Modules: 3 段階（構文解析 → インスタンス化 → 評価）で処理

3. **エラーの発生タイミング**:
   - CommonJS: 実行時にエラーが発生
   - ES Modules: 構文解析時に多くのエラーを検出可能

例えば、以下のようなケースで違いが出ます：

```javascript
// CommonJS
// a.js
const b = require("./b");
console.log(b); // {}

// b.js
const a = require("./a");
module.exports = { value: 123 };

// 循環参照でも実行時エラーにならない
```

```javascript
// ES Modules
// a.js
import { value } from "./b.js";
console.log(value); // Cannot access 'value' before initialization

// b.js
import { something } from "./a.js";
export const value = 123;

// 静的解析でエラーを検出
```

このような仕組みの違いにより：

1. **ビルドツールの挙動**:

   - CommonJS: 動的な解決が必要なため、複雑なバンドル処理が必要
   - ES Modules: 静的解析が可能なため、効率的な最適化が可能

2. **Tree Shaking**:
   - CommonJS: 動的な性質上、完全な Tree Shaking が困難
   - ES Modules: 静的解析により、未使用コードの削除が容易

実際の開発では、これらの違いは特にバンドルサイズやビルドパフォーマンスに影響を与えます。また、TypeScript のような静的型チェックツールとの相性にも影響します。

## まとめ

![まとめ](/docs/module-comprehensive.svg)

この SVG では、以下の重要なポイントを視覚的に説明しています：

1. **歴史的背景**:

- モジュールシステムの進化の過程
- 各時期における課題と解決策
- なぜ 2 つの規格が並存しているのか

2. **実行時の方法**:

- CommonJS と ES Modules の実行フローの違い
- それぞれのアプローチの特徴
- エラー検出のタイミングの違い

3. **対応策**:

- ファイル拡張子による明示的な区別
- package.json での設定方法
- 実行時の互換性確保の方法

このような包括的な理解は、プロジェクトの設計段階で適切な選択を行う際に重要になります。特に、エラーハンドリングの違いは、開発効率とコードの品質に大きく影響します。

この設計の背景には、JavaScript エコシステムの発展と、異なる実行環境（ブラウザと Node.js）での要件の違いが反映されています。現代では、この 2 つのアプローチを適切に使い分けることで、より堅牢なアプリケーション開発が可能になっています。
