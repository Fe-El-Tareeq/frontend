import { useQuery } from "@tanstack/react-query";
import { walletApi } from "../api/wallet";
import { useAuthStore } from "../store/useAuthStore";

export const WALLET_KEYS = {
  me: ["wallet", "me"] as const,
  transactions: (params?: { skip?: number; take?: number }) =>
    ["wallet", "transactions", params] as const,
};

export function useWallet() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const walletQuery = useQuery({
    queryKey: WALLET_KEYS.me,
    queryFn: () => walletApi.getWallet(),
    enabled: isAuthenticated,
    select: (res) => res.data,
  });

  return {
    wallet: walletQuery.data,
    tokenBalance: walletQuery.data?.tokenBalance ?? 0,
    isLoadingWallet: walletQuery.isLoading,
    isErrorWallet: walletQuery.isError,
    refetchWallet: walletQuery.refetch,
  };
}

export function useWalletTransactions(params?: {
  skip?: number;
  take?: number;
}) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const transactionsQuery = useQuery({
    queryKey: WALLET_KEYS.transactions(params),
    queryFn: () => walletApi.getTransactions(params),
    enabled: isAuthenticated,
    select: (res) => res.data,
  });

  return {
    transactions: transactionsQuery.data?.transactions || [],
    pagination: transactionsQuery.data?.pagination,
    isLoadingTransactions: transactionsQuery.isLoading,
    isErrorTransactions: transactionsQuery.isError,
    refetchTransactions: transactionsQuery.refetch,
  };
}
