![CommonJs vs ES Modules Comparison](/docs/commonjs-vs-esmodules.svg)

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
