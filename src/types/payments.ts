import type { PaginationMeta } from "./api";

export type InvoiceStatus = "PENDING" | "PAID" | "FAILED" | "EXPIRED";

export interface PaymentTokenPackage {
  id: string;
  name: string;
  tokenAmount: number;
  bonusTokens: number;
  priceNis: number;
  totalTokens: number;
  isActive: boolean;
  currency: string;
}

export interface PaymentInvoice {
  id: string;
  clientRequestKey: string;
  tokenPackageId: string;
  tokenAmount: number;
  bonusTokens: number;
  totalTokens: number;
  amountNis: number;
  currency: string;
  paymentProvider: string;
  providerInvoiceId?: string | null;
  qrCodePayload?: string | null;
  paymentUrl?: string | null;
  status: InvoiceStatus;
  createdAt: string;
  expiresAt: string;
  paidAt?: string | null;
  failedAt?: string | null;
  tokenPackage?: PaymentTokenPackage;
  walletTransaction?: {
    id: string;
    tokenAmount: number;
    transactionType: string;
  } | null;
}

export interface CreateInvoiceRequest {
  tokenPackageId: string;
  clientRequestKey: string;
}

export interface CreateInvoiceResponseData {
  created: boolean;
  invoice: PaymentInvoice;
}

export interface InvoicesListData {
  invoices: PaymentInvoice[];
  pagination: PaginationMeta;
}

export interface MockPayResponseData {
  processed: boolean;
  reason: string;
  invoice: PaymentInvoice;
}
