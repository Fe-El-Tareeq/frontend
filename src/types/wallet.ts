import type { PaginationMeta } from "./api";

export type TransactionType =
  | "SIGNUP_BONUS"
  | "TOKEN_TOP_UP"
  | "ERRAND_POST_DEBIT"
  | "TRIP_POST_DEBIT"
  | "ERRAND_ACCEPT_DEBIT"
  | "ERRAND_CANCEL_REFUND"
  | "TRIP_CANCEL_REFUND"
  | "ADMIN_CREDIT"
  | "ADMIN_DEBIT"
  | "REFUND";

export interface Wallet {
  id: string;
  userId: string;
  tokenBalance: number;
  totalTokensPurchased?: number;
  totalTokensSpent?: number;
  createdAt: string;
  updatedAt: string;
}

export interface WalletTransaction {
  id: string;
  transactionType: TransactionType;
  tokenAmount: number;
  balanceBefore?: number | null;
  balanceAfter?: number | null;
  source?: "WALLET_TRANSACTION" | "PAYMENT_INVOICE";
  status?: "SUCCESS" | "PENDING" | "PENDING_VERIFICATION" | "FAILED" | "EXPIRED";
  paymentMethod?: string | null;
  referenceCode?: string | null;
  rejectionNotes?: string | null;
  referenceType?: string | null;
  referenceId?: string | null;
  idempotencyKey?: string | null;
  description?: string | null;
  createdAt: string;
}

export interface WalletFilterParams {
  status?: string;
  transactionType?: TransactionType;
  skip?: number;
  take?: number;
}

export interface WalletTransactionsData {
  transactions: WalletTransaction[];
  pagination: PaginationMeta;
}


export interface GenerateQRRequestDTO {
  token_package_id: string;
  amount_nis: number;
  payment_provider: "JAWWAL_PAY";
}

export interface GenerateQRResponseDTO {
  invoice_id: string;
  qr_code_payload: string;
  amount_nis: number;
  tokens_to_credit: number;
  expires_at: string;
}
