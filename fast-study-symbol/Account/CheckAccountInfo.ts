import { aliceAddress, NODE } from "./configure.js";
import { AccountInfo, MosaicInfo, ApiError } from "./types.js";

type ApiResponse<T> = {
  account?: T;
  mosaic?: T;
};

/**
 * Symbol Node APIからデータを取得する汎用関数
 * @param endpoint APIエンドポイント
 * @returns 取得したデータ
 * @throws ApiError API呼び出しに失敗した場合
 */
async function fetchData<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(new URL(endpoint, NODE), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status,
        endpoint
      );
    }

    const data = (await response.json()) as ApiResponse<T>;
    const result = endpoint.includes("/accounts/") ? data.account : data.mosaic;

    if (!result) {
      throw new ApiError("No data returned from API", undefined, endpoint);
    }

    return result;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      `Failed to fetch data: ${error instanceof Error ? error.message : "Unknown error"}`,
      undefined,
      endpoint
    );
  }
}

/**
 * モザイク量をフォーマットする
 * @param amount モザイク量（文字列）
 * @param divisibility 可分性
 * @returns フォーマットされた量
 */
function formatAmount(amount: string, divisibility: number): string {
  if (divisibility <= 0) return amount;

  const integerPart = amount.slice(0, amount.length - divisibility) || "0";
  const decimalPart = amount.slice(-divisibility).padStart(divisibility, "0");
  return `${integerPart}.${decimalPart}`;
}

/**
 * アカウントの最初のモザイク情報を取得する
 * @returns フォーマットされたモザイク量
 * @throws ApiError API呼び出しに失敗した場合
 */
async function getAccountMosaicAmount(): Promise<string> {
  try {
    // アカウント情報の取得
    const accountInfo = await fetchData<AccountInfo>(`/accounts/${aliceAddress}`);

    if (!accountInfo.mosaics || accountInfo.mosaics.length === 0) {
      throw new ApiError("No mosaics found for this account");
    }

    const [firstMosaic] = accountInfo.mosaics;
    
    // モザイク情報の取得
    const mosaicInfo = await fetchData<MosaicInfo>(`/mosaics/${firstMosaic.id}`);
    
    // 金額のフォーマット
    return formatAmount(firstMosaic.amount, mosaicInfo.divisibility);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("Failed to get account mosaic amount", undefined, "/accounts");
  }
}

// メイン処理の実行
getAccountMosaicAmount()
  .then(amount => {
    console.log("Account Mosaic Amount:", amount);
  })
  .catch(error => {
    if (error instanceof ApiError) {
      console.error(`API Error: ${error.message}`, {
        status: error.status,
        endpoint: error.endpoint
      });
    } else {
      console.error("Application error:", error);
    }
    process.exit(1);
  });
