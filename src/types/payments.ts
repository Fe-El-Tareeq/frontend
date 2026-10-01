import type { PaginationMeta } from "./api";

export type InvoiceStatus =
  | "PENDING"
  | "PENDING_VERIFICATION"
  | "PAID"
  | "FAILED"
  | "EXPIRED";

export type PaymentMethod = "QR" | "OTP" | "BANK_TRANSFER";

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

export interface BankAccountDetails {
  beneficiaryName: string;
  accountNumber: string;
  iban: string;
  bankName: string;
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
  paymentMethod?: PaymentMethod;
  providerInvoiceId?: string | null;
  referenceCode?: string | null;
  hasTransferReceipt?: boolean;
  rejectionNotes?: string | null;
  reviewedAt?: string | null;
  paymentPhone?: string | null;
  otpExpiresAt?: string | null;
  qrCodePayload?: string | null;
  paymentUrl?: string | null;
  status: InvoiceStatus;
  createdAt: string;
  expiresAt: string;
  paidAt?: string | null;
  failedAt?: string | null;
  tokenPackage?: PaymentTokenPackage;
  bankAccount?: BankAccountDetails;
  bankDetails?: BankAccountDetails;
  walletTransaction?: {
    id: string;
    tokenAmount: number;
    transactionType: string;
  } | null;
}

export interface CreateInvoiceRequest {
  tokenPackageId?: string;
  packageId?: string;
  clientRequestKey?: string;
  paymentMethod?: PaymentMethod;
  method?: PaymentMethod;
  paymentPhone?: string;
}

export interface CreateInvoiceResponseData {
  created: boolean;
  invoice: PaymentInvoice;
  bankAccount?: BankAccountDetails;
  mockOtp?: string;
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

export interface VerifyPaymentOtpRequest {
  otp?: string;
  otpCode?: string;
}

export interface RejectBankTransferRequest {
  notes: string;
}

