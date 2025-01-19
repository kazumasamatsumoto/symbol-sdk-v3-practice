// 3.1 アカウント生成と秘密鍵と公開鍵の導出も
// 基本情報をここにまとめます。（毎回生成するのもかったるいので）

import { KeyPair, SymbolFacade } from "symbol-sdk/symbol";
import { PrivateKey } from "symbol-sdk";

export const privateKey =
  "33047CFD3ABA8E1B6FE047182F9B0118E2FA7E7D9E33865533AB582973F3B2A8";
export const publicKey =
  "ABC57E7B68FF6AA2E5F3D7E674D071697F00F1B377AE484C1EDBA3EEB29761B8";
export const aliceAddress = "TBBTGWHSQGQRYF7GGCNSQEVO4CLKYRZPVZ4B7GA";
export const facade = new SymbolFacade("testnet");

export const NODE = "https://test02.xymnodes.com:3001";
