/**
 * NetworkTimestampクラスの使用例
 *
 * このサンプルコードは、Symbol BlockchainのNetworkTimestampクラスの基本的な使い方と
 * 応用例を示しています。NetworkTimestampクラスは、Symbolネットワークのタイムスタンプを
 * ミリ秒単位で表現するためのクラスです。
 *
 * 主な機能:
 * 1. NetworkTimestampのインスタンス作成 - 異なる方法でのインスタンス生成
 * 2. Networkクラスとの連携 - 日時とネットワークタイムスタンプの相互変換
 * 3. タイムスタンプの操作 - 時間、分、秒、ミリ秒の追加
 * 4. エポックタイムスタンプの確認 - isEpochalプロパティの使用
 * 5. 組み込みネットワーク（MAINNET, TESTNET）の使用
 * 6. タイムスタンプの比較 - タイムスタンプ値の比較方法
 *
 * 実行方法:
 * npx tsx src/symbol/class/NetworkTimestampSample.ts
 */

import { NetworkTimestamp, Network } from "symbol-sdk/symbol";
import { Hash256 } from "symbol-sdk"; // 実際のライブラリパスに合わせて修正

console.log(NetworkTimestamp);

/**
 * 16進文字列をUint8Array（32バイトの配列）に変換する関数
 * Symbolネットワークの生成ハッシュシードなどのバイナリデータを扱うために使用
 */
function hexToUint8Array(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) {
    throw new Error("Invalid hex string");
  }
  const array = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    array[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return array;
}

/**
 * NetworkTimestampクラスのサンプルコードを実行する関数
 * 各セクションごとに異なる機能と使用例を示しています
 */
async function runNetworkTimestampSample() {
  console.log("NetworkTimestampクラスの使用例");
  console.log("==============================");

  /**
   * 1. NetworkTimestampのインスタンス作成
   *
   * NetworkTimestampクラスのインスタンスを作成する方法を示します。
   * - bigint値を直接使用する方法
   * - 数値を使用する方法（自動的にbigintに変換される）
   */
  console.log("\n1. NetworkTimestampのインスタンス作成");

  // 直接タイムスタンプ値を指定して作成
  const timestamp1 = new NetworkTimestamp(12345678n);
  console.log(`タイムスタンプ1: ${timestamp1.toString()}`);

  // 数値を指定して作成（自動的にbigintに変換される）
  const timestamp2 = new NetworkTimestamp(87654321);
  console.log(`タイムスタンプ2: ${timestamp2.toString()}`);

  /**
   * 2. Networkクラスを使用してタイムスタンプを作成
   *
   * Networkクラスを使用して、日時とネットワークタイムスタンプの相互変換を行う方法を示します。
   * - カスタムネットワークの作成
   * - 現在時刻からネットワークタイムスタンプへの変換
   * - ネットワークタイムスタンプから日時への変換
   */
  console.log("\n2. Networkクラスを使用してタイムスタンプを作成");

  // カスタムネットワークの作成
  const name = "サンプルネットワーク";
  const identifier = 0x68; // ネットワーク識別子
  const epochTime = new Date("2021-03-16T00:00:00Z"); // ネットワークのエポックタイム
  const generationHashSeedHex =
    "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
  const generationHashSeed = hexToUint8Array(
    generationHashSeedHex
  ) as unknown as Hash256;

  const myNetwork = new Network(
    name,
    identifier,
    epochTime,
    generationHashSeed
  );
  console.log(`ネットワーク名: ${myNetwork.name}`);
  console.log(`エポックタイム: ${epochTime.toISOString()}`);

  // 現在時刻からネットワークタイムスタンプを作成
  const now = new Date();
  const currentTimestamp = myNetwork.fromDatetime(now);
  console.log(`現在時刻: ${now.toISOString()}`);
  console.log(
    `現在のネットワークタイムスタンプ: ${currentTimestamp.toString()}`
  );

  // ネットワークタイムスタンプから日時に変換
  const convertedDatetime = myNetwork.toDatetime(currentTimestamp);
  console.log(
    `タイムスタンプから変換した日時: ${convertedDatetime.toISOString()}`
  );

  /**
   * 3. タイムスタンプの操作
   *
   * NetworkTimestampクラスが提供するメソッドを使用して、タイムスタンプを操作する方法を示します。
   * - addHours: 時間を追加
   * - addMinutes: 分を追加
   * - addSeconds: 秒を追加
   * - addMilliseconds: ミリ秒を追加
   * - メソッドチェーンによる複数の操作の連結
   */
  console.log("\n3. タイムスタンプの操作");

  // 時間を追加
  const plusOneHour = currentTimestamp.addHours(1);
  console.log(`1時間後のタイムスタンプ: ${plusOneHour.toString()}`);
  console.log(
    `1時間後の日時: ${myNetwork.toDatetime(plusOneHour).toISOString()}`
  );

  // 分を追加
  const plus30Minutes = currentTimestamp.addMinutes(30);
  console.log(`30分後のタイムスタンプ: ${plus30Minutes.toString()}`);
  console.log(
    `30分後の日時: ${myNetwork.toDatetime(plus30Minutes).toISOString()}`
  );

  // 秒を追加
  const plus45Seconds = currentTimestamp.addSeconds(45);
  console.log(`45秒後のタイムスタンプ: ${plus45Seconds.toString()}`);
  console.log(
    `45秒後の日時: ${myNetwork.toDatetime(plus45Seconds).toISOString()}`
  );

  // ミリ秒を追加
  const plus500Milliseconds = currentTimestamp.addMilliseconds(500);
  console.log(`500ミリ秒後のタイムスタンプ: ${plus500Milliseconds.toString()}`);
  console.log(
    `500ミリ秒後の日時: ${myNetwork
      .toDatetime(plus500Milliseconds)
      .toISOString()}`
  );

  // 複数の操作を連鎖させる
  const combinedTimestamp = currentTimestamp
    .addHours(2)
    .addMinutes(15)
    .addSeconds(30);
  console.log(
    `2時間15分30秒後のタイムスタンプ: ${combinedTimestamp.toString()}`
  );
  console.log(
    `2時間15分30秒後の日時: ${myNetwork
      .toDatetime(combinedTimestamp)
      .toISOString()}`
  );

  /**
   * 4. エポックタイムスタンプの確認
   *
   * エポックタイムスタンプ（値が0のタイムスタンプ）の特性と、
   * isEpochalプロパティを使用してタイムスタンプがエポックかどうかを確認する方法を示します。
   */
  console.log("\n4. エポックタイムスタンプの確認");

  // エポックタイムスタンプの作成（値は0）
  const epochalTimestamp = new NetworkTimestamp(0n);
  console.log(`エポックタイムスタンプ: ${epochalTimestamp.toString()}`);
  console.log(`isEpochal: ${epochalTimestamp.isEpochal}`);

  // 非エポックタイムスタンプの確認
  console.log(
    `現在のタイムスタンプがエポックか: ${currentTimestamp.isEpochal}`
  );

  /**
   * 5. 組み込みネットワーク（MAINNET, TESTNET）の使用
   *
   * Symbolの組み込みネットワーク（MAINNET, TESTNET）を使用して、
   * 日時とネットワークタイムスタンプの相互変換を行う方法を示します。
   * 各ネットワークは異なるエポックタイムを持っているため、同じ日時でも
   * 異なるタイムスタンプ値になります。
   */
  console.log("\n5. 組み込みネットワークの使用");

  // MAINNETの使用
  const mainnetNow = Network.MAINNET.fromDatetime(now);
  console.log(`MAINNET現在のタイムスタンプ: ${mainnetNow.toString()}`);
  console.log(
    `MAINNET日時に変換: ${Network.MAINNET.toDatetime(mainnetNow).toISOString()}`
  );

  // TESTNETの使用
  const testnetNow = Network.TESTNET.fromDatetime(now);
  console.log(`TESTNET現在のタイムスタンプ: ${testnetNow.toString()}`);
  console.log(
    `TESTNET日時に変換: ${Network.TESTNET.toDatetime(testnetNow).toISOString()}`
  );

  /**
   * 6. タイムスタンプの比較
   *
   * NetworkTimestampインスタンス間の比較方法を示します。
   * タイムスタンプの比較は、内部のtimestampプロパティ（bigint型）を
   * 使用して行います。
   */
  console.log("\n6. タイムスタンプの比較");

  const timestamp3 = new NetworkTimestamp(1000n);
  const timestamp4 = new NetworkTimestamp(2000n);

  console.log(`タイムスタンプ3: ${timestamp3.toString()}`);
  console.log(`タイムスタンプ4: ${timestamp4.toString()}`);
  console.log(
    `タイムスタンプ3 < タイムスタンプ4: ${
      timestamp3.timestamp < timestamp4.timestamp
    }`
  );
  console.log(
    `タイムスタンプ3 > タイムスタンプ4: ${
      timestamp3.timestamp > timestamp4.timestamp
    }`
  );
  console.log(
    `タイムスタンプ3 === タイムスタンプ4: ${
      timestamp3.timestamp === timestamp4.timestamp
    }`
  );
}

// サンプルコードの実行
runNetworkTimestampSample().catch((err) => {
  console.error("エラーが発生しました:", err);
});
