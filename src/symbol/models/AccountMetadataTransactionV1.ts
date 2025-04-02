import { models, SymbolFacade, Network, KeyPair } from "symbol-sdk/symbol";
import { PrivateKey, PublicKey } from "symbol-sdk";

/**
 * AccountMetadataTransactionV1の使い方を示すサンプルコード
 * 
 * AccountMetadataTransactionは、アカウントに関連付けられたメタデータを追加または変更するために使用されます。
 * メタデータは、アカウントに追加情報を関連付けることができる汎用的な仕組みです。
 */

// 型定義
type Transaction = any; // 実際のトランザクション型に置き換えてください
type Signature = any; // 実際の署名型に置き換えてください

// サンプル1: AccountMetadataTransactionV1の基本的な使い方
const createAccountMetadataTransaction = () => {
    // SymbolFacadeのインスタンス化（テストネットを使用）
    const facade = new SymbolFacade(Network.TESTNET);

    // ダミーの署名者公開鍵を作成
    const signerPrivateKey = PrivateKey.random();
    const signerKeyPair = new KeyPair(signerPrivateKey);
    const signerPublicKey = signerKeyPair.publicKey;

    // ターゲットアカウントを作成（これは例です。実際の使用では有効なアドレスを使用してください）
    const targetPrivateKey = PrivateKey.random();
    const targetAccount = facade.createAccount(targetPrivateKey);
    const targetAddress = targetAccount.address;

    // メタデータ値を作成
    const metadataValue = "Hello, World!";
    const encodedValue = new TextEncoder().encode(metadataValue);

    // メタデータキーを作成（これは例です。実際の使用では意味のあるキーを使用してください）
    const scopedMetadataKey = 0x0000000000000001n;

    // AccountMetadataTransactionV1の作成
    const accountMetadataTx = facade.transactionFactory.create({
        type: 'account_metadata_transaction_v1',
        signerPublicKey: signerPublicKey,
        fee: 100000n, // 手数料
        deadline: 2 * 60 * 60, // デッドライン（秒単位）
        targetAddress: targetAddress,
        scopedMetadataKey: scopedMetadataKey,
        valueSizeDelta: encodedValue.length, // 値のサイズの変更
        value: encodedValue // メタデータの値
    });

    console.log('AccountMetadataTransactionV1が作成されました');
    // トランザクションの詳細を表示
    console.log('トランザクションタイプ:', accountMetadataTx.type.toString());
    console.log('署名者の公開鍵:', accountMetadataTx.signerPublicKey.toString());
    console.log('手数料:', accountMetadataTx.fee.toString());
    console.log('デッドライン:', accountMetadataTx.deadline.toString());
    console.log('ネットワークタイプ:', facade.network.name);
    console.log('ターゲットアドレス:', targetAddress.toString());
    console.log('メタデータキー:', scopedMetadataKey.toString());
    console.log('メタデータ値:', metadataValue);

    return { facade, accountMetadataTx, targetAddress, scopedMetadataKey };
};

// サンプル2: AccountMetadataTransactionV1の署名
const signAccountMetadataTransaction = (facade: SymbolFacade, transaction: Transaction) => {
    // 署名者のキーペア（これは例です。実際の使用では自分のキーペアを使用してください）
    const privateKey = PrivateKey.random();
    const keyPair = new KeyPair(privateKey);

    // トランザクションの署名
    const signature = facade.signTransaction(keyPair, transaction);

    // 署名されたトランザクションを作成
    const signedTx = {
        ...transaction,
        signature: signature
    };

    console.log('トランザクションが署名されました');
    console.log('署名:', signature.toString());
    console.log('署名者の公開鍵:', keyPair.publicKey.toString());

    return signedTx;
};

// サンプル3: 既存のメタデータ値を更新するためのAccountMetadataTransactionV1の作成
const updateExistingMetadata = () => {
    // SymbolFacadeのインスタンス化（テストネットを使用）
    const facade = new SymbolFacade(Network.TESTNET);

    // ダミーの署名者公開鍵を作成
    const signerPrivateKey = PrivateKey.random();
    const signerKeyPair = new KeyPair(signerPrivateKey);
    const signerPublicKey = signerKeyPair.publicKey;

    // ターゲットアカウントを作成（これは例です。実際の使用では有効なアドレスを使用してください）
    const targetPrivateKey = PrivateKey.random();
    const targetAccount = facade.createAccount(targetPrivateKey);
    const targetAddress = targetAccount.address;

    // 新しいメタデータ値を作成
    const oldMetadataValue = "Hello, World!";
    const newMetadataValue = "Updated Value!";
    const oldEncodedValue = new TextEncoder().encode(oldMetadataValue);
    const newEncodedValue = new TextEncoder().encode(newMetadataValue);

    // 注: 実際のメタデータ更新では、メタデータ値を XOR 演算で更新します
    // 以下は簡略化された例です

    // メタデータキーを作成（これは例です。実際の使用では意味のあるキーを使用してください）
    const scopedMetadataKey = 0x0000000000000001n;

    // メタデータ値のサイズの変更を計算
    const valueSizeDelta = newEncodedValue.length - oldEncodedValue.length;

    // AccountMetadataTransactionV1の作成（メタデータの更新）
    const updateMetadataTx = facade.transactionFactory.create({
        type: 'account_metadata_transaction_v1',
        signerPublicKey: signerPublicKey,
        fee: 100000n, // 手数料
        deadline: 2 * 60 * 60, // デッドライン（秒単位）
        targetAddress: targetAddress,
        scopedMetadataKey: scopedMetadataKey,
        valueSizeDelta: valueSizeDelta, // 値のサイズの変更
        value: newEncodedValue // 新しいメタデータの値
    });

    console.log('メタデータ更新用のAccountMetadataTransactionV1が作成されました');
    console.log('トランザクションタイプ:', updateMetadataTx.type.toString());
    console.log('署名者の公開鍵:', updateMetadataTx.signerPublicKey.toString());
    console.log('ターゲットアドレス:', targetAddress.toString());
    console.log('メタデータキー:', scopedMetadataKey.toString());
    console.log('古いメタデータ値:', oldMetadataValue);
    console.log('新しいメタデータ値:', newMetadataValue);
    console.log('値のサイズの変更:', valueSizeDelta);

    return { facade, updateMetadataTx, targetAddress, scopedMetadataKey };
};

// サンプル4: メタデータを削除するためのAccountMetadataTransactionV1の作成
const deleteMetadata = () => {
    // SymbolFacadeのインスタンス化（テストネットを使用）
    const facade = new SymbolFacade(Network.TESTNET);

    // ダミーの署名者公開鍵を作成
    const signerPrivateKey = PrivateKey.random();
    const signerKeyPair = new KeyPair(signerPrivateKey);
    const signerPublicKey = signerKeyPair.publicKey;

    // ターゲットアカウントを作成（これは例です。実際の使用では有効なアドレスを使用してください）
    const targetPrivateKey = PrivateKey.random();
    const targetAccount = facade.createAccount(targetPrivateKey);
    const targetAddress = targetAccount.address;

    // 削除するメタデータ値
    const metadataValue = "Hello, World!";
    const encodedValue = new TextEncoder().encode(metadataValue);

    // メタデータキーを作成（これは例です。実際の使用では意味のあるキーを使用してください）
    const scopedMetadataKey = 0x0000000000000001n;

    // AccountMetadataTransactionV1の作成（メタデータの削除）
    // 注: 削除するには、現在の値と同じ値を指定し、valueSizeDeltaを負の値にします
    const deleteMetadataTx = facade.transactionFactory.create({
        type: 'account_metadata_transaction_v1',
        signerPublicKey: signerPublicKey,
        fee: 100000n, // 手数料
        deadline: 2 * 60 * 60, // デッドライン（秒単位）
        targetAddress: targetAddress,
        scopedMetadataKey: scopedMetadataKey,
        valueSizeDelta: -encodedValue.length, // 値のサイズを減らす（削除）
        value: encodedValue // 現在のメタデータの値（削除するには現在の値を指定する必要があります）
    });

    console.log('メタデータ削除用のAccountMetadataTransactionV1が作成されました');
    console.log('トランザクションタイプ:', deleteMetadataTx.type.toString());
    console.log('署名者の公開鍵:', deleteMetadataTx.signerPublicKey.toString());
    console.log('ターゲットアドレス:', targetAddress.toString());
    console.log('メタデータキー:', scopedMetadataKey.toString());
    console.log('削除するメタデータ値:', metadataValue);

    return { facade, deleteMetadataTx, targetAddress, scopedMetadataKey };
};

// サンプル5: メタデータの値をXOR演算で更新する方法（実際のユースケース）
const updateMetadataValueWithXOR = () => {
    // SymbolFacadeのインスタンス化（テストネットを使用）
    const facade = new SymbolFacade(Network.TESTNET);

    // ダミーの署名者公開鍵を作成
    const signerPrivateKey = PrivateKey.random();
    const signerKeyPair = new KeyPair(signerPrivateKey);
    const signerPublicKey = signerKeyPair.publicKey;

    // ターゲットアカウントを作成（これは例です。実際の使用では有効なアドレスを使用してください）
    const targetPrivateKey = PrivateKey.random();
    const targetAccount = facade.createAccount(targetPrivateKey);
    const targetAddress = targetAccount.address;

    // 現在のメタデータ値と新しいメタデータ値
    const currentValue = new TextEncoder().encode("Current Value");
    const newValue = new TextEncoder().encode("New Value Here");

    // メタデータキーを作成（これは例です。実際の使用では意味のあるキーを使用してください）
    const scopedMetadataKey = 0x0000000000000001n;

    // XOR演算を用いて差分を計算
    // 注: この例では簡略化のために小さな配列を使用していますが、実際には配列のサイズが異なる場合があります
    const xorDifference = new Uint8Array(Math.max(currentValue.length, newValue.length));

    for (let i = 0; i < xorDifference.length; i++) {
        const currentByte = i < currentValue.length ? currentValue[i] : 0;
        const newByte = i < newValue.length ? newValue[i] : 0;
        xorDifference[i] = currentByte ^ newByte;
    }

    // メタデータ値のサイズの変更を計算
    const valueSizeDelta = newValue.length - currentValue.length;

    // AccountMetadataTransactionV1の作成（XOR演算を用いたメタデータの更新）
    const xorUpdateTx = facade.transactionFactory.create({
        type: 'account_metadata_transaction_v1',
        signerPublicKey: signerPublicKey,
        fee: 100000n, // 手数料
        deadline: 2 * 60 * 60, // デッドライン（秒単位）
        targetAddress: targetAddress,
        scopedMetadataKey: scopedMetadataKey,
        valueSizeDelta: valueSizeDelta, // 値のサイズの変更
        value: xorDifference // XOR演算を用いた差分の値
    });

    console.log('XOR演算を用いたメタデータ更新用のAccountMetadataTransactionV1が作成されました');
    console.log('トランザクションタイプ:', xorUpdateTx.type.toString());
    console.log('署名者の公開鍵:', xorUpdateTx.signerPublicKey.toString());
    console.log('ターゲットアドレス:', targetAddress.toString());
    console.log('メタデータキー:', scopedMetadataKey.toString());
    console.log('現在のメタデータ値:', new TextDecoder().decode(currentValue));
    console.log('新しいメタデータ値:', new TextDecoder().decode(newValue));
    console.log('値のサイズの変更:', valueSizeDelta);

    return { facade, xorUpdateTx, targetAddress, scopedMetadataKey };
};

// 使用例
const main = () => {
    try {
        // サンプル1: AccountMetadataTransactionV1の基本的な使い方
        console.log('=== サンプル1: AccountMetadataTransactionV1の基本的な使い方 ===');
        const { facade, accountMetadataTx } = createAccountMetadataTransaction();

        // サンプル2: AccountMetadataTransactionV1の署名
        console.log('\n=== サンプル2: AccountMetadataTransactionV1の署名 ===');
        signAccountMetadataTransaction(facade, accountMetadataTx);

        // サンプル3: 既存のメタデータ値を更新するためのAccountMetadataTransactionV1の作成
        console.log('\n=== サンプル3: 既存のメタデータ値を更新するためのAccountMetadataTransactionV1の作成 ===');
        updateExistingMetadata();

        // サンプル4: メタデータを削除するためのAccountMetadataTransactionV1の作成
        console.log('\n=== サンプル4: メタデータを削除するためのAccountMetadataTransactionV1の作成 ===');
        deleteMetadata();

        // サンプル5: メタデータの値をXOR演算で更新する方法（実際のユースケース）
        console.log('\n=== サンプル5: メタデータの値をXOR演算で更新する方法（実際のユースケース） ===');
        updateMetadataValueWithXOR();

    } catch (error) {
        console.error('エラーが発生しました:', error);
    }
};

// メイン関数の実行
main();

// 各サンプル関数をエクスポート
export {
    createAccountMetadataTransaction,
    signAccountMetadataTransaction,
    updateExistingMetadata,
    deleteMetadata,
    updateMetadataValueWithXOR,
    main
};
