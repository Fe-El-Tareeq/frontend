import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import type {
  ApiSuccessResponse,
  Wallet,
  WalletFilterParams,
  WalletTransactionsData,
} from "../types";

export const walletApi = {
  getWallet: async () => {
    const res = await apiClient.get<ApiSuccessResponse<Wallet>>(
      ENDPOINTS.WALLET.ME,
    );
    return res.data;
  },

  getTransactions: async (params?: WalletFilterParams) => {
    const res = await apiClient.get<ApiSuccessResponse<WalletTransactionsData>>(
      ENDPOINTS.WALLET.TRANSACTIONS,
      { params },
    );
    return res.data;
  },
};
