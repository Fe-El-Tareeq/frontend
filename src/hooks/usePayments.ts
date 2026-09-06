import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentsApi } from "../api/payments";
import { WALLET_KEYS } from "./useWallet";
import type { CreateInvoiceRequest, InvoiceStatus } from "../types";

export const PAYMENT_KEYS = {
  all: ["payments"] as const,
  packages: () => [...PAYMENT_KEYS.all, "packages"] as const,
  invoices: (params?: { status?: InvoiceStatus; skip?: number; take?: number }) =>
    [...PAYMENT_KEYS.all, "invoices", params] as const,
  invoice: (id: string) => [...PAYMENT_KEYS.all, "invoice", id] as const,
};

export function usePayments() {
  const queryClient = useQueryClient();

  const packagesQuery = useQuery({
    queryKey: PAYMENT_KEYS.packages(),
    queryFn: () => paymentsApi.getPackages(),
    select: (res) => res.data.packages,
  });

  const createInvoiceMutation = useMutation({
    mutationFn: (payload: CreateInvoiceRequest) =>
      paymentsApi.createInvoice(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PAYMENT_KEYS.all });
    },
  });

  const mockPayMutation = useMutation({
    mutationFn: (invoiceId: string) => paymentsApi.mockPayInvoice(invoiceId),
    onSuccess: (_, invoiceId) => {
      queryClient.invalidateQueries({ queryKey: PAYMENT_KEYS.invoice(invoiceId) });
      queryClient.invalidateQueries({ queryKey: PAYMENT_KEYS.invoices() });
      queryClient.invalidateQueries({ queryKey: WALLET_KEYS.me });
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
    },
  });

  return {
    packages: packagesQuery.data || [],
    isLoadingPackages: packagesQuery.isLoading,
    createInvoice: createInvoiceMutation.mutateAsync,
    isCreatingInvoice: createInvoiceMutation.isPending,
    mockPay: mockPayMutation.mutateAsync,
    isPaying: mockPayMutation.isPending,
  };
}

export function useInvoiceDetail(id?: string) {
  const query = useQuery({
    queryKey: PAYMENT_KEYS.invoice(id || ""),
    queryFn: () => paymentsApi.getInvoiceById(id!),
    enabled: Boolean(id),
    select: (res) => res.data.invoice,
  });

  return {
    invoice: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
