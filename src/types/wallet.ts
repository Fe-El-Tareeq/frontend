import type { PaginationMeta } from "./api";

export type TransactionType =
  | "TOKEN_TOP_UP"
  | "ERRAND_POST_DEBIT"
  | "TRIP_POST_DEBIT"
  | "ERRAND_ACCEPT_DEBIT"
  | "ADMIN_CREDIT"
  | "ADMIN_DEBIT"
  | "REFUND"
  | "SIGNUP_BONUS";

export interface Wallet {
  id: string;
  userId: string;
  tokenBalance: number;
  createdAt: string;
  updatedAt: string;
}

export interface WalletTransaction {
  id: string;
  transactionType: TransactionType;
  tokenAmount: number;
  balanceBefore: number;
  balanceAfter: number;
  referenceType?: string | null;
  referenceId?: string | null;
  idempotencyKey?: string | null;
  description?: string | null;
  createdAt: string;
}

export interface WalletTransactionsData {
  transactions: WalletTransaction[];
  pagination: PaginationMeta;
}

export interface GenerateQRRequestDTO {
  token_package_id: string;
  amount_nis: number;
  payment_provider: "JAWWAL_PAY" | "PALPAY";
}

export interface GenerateQRResponseDTO {
  invoice_id: string;
  qr_code_payload: string;
  amount_nis: number;
  tokens_to_credit: number;
  expires_at: string;
}
