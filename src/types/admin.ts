import type { PaginationMeta } from "./api";
import type { PaymentInvoice } from "./payments";
import type { FAQItem } from "./support";

export interface AdminInvoiceReviewItem extends PaymentInvoice {
  transferReceiptUrl?: string | null;
  receiptUrlExpiresInSeconds?: number;
  user?: {
    id: string;
    fullName?: string | null;
    phone: string;
  };
}

export interface AdminInvoicesListData {
  invoices: AdminInvoiceReviewItem[];
  pagination: PaginationMeta;
}

export interface AdminVerificationDocument {
  url: string;
  expiresInSeconds?: number;
}

export interface AdminVerificationReviewDetail {
  id: string;
  userId: string;
  status: "UNVERIFIED" | "PENDING_REVIEW" | "VERIFIED" | "REJECTED";
  submittedAt: string;
  reviewedAt?: string | null;
  rejectionReason?: string | null;
  idFrontImage?: AdminVerificationDocument;
  idBackImage?: AdminVerificationDocument;
  selfieImage?: AdminVerificationDocument;
  user?: {
    id: string;
    fullName?: string | null;
    phone: string;
  };
}

export interface AdminVerificationsListData {
  verifications: AdminVerificationReviewDetail[];
  pagination: PaginationMeta;
}

export interface CreateFaqRequest {
  question: string;
  answer: string;
  displayOrder?: number;
  isActive?: boolean;
}

export interface UpdateFaqRequest {
  question?: string;
  answer?: string;
  displayOrder?: number;
  isActive?: boolean;
}

export interface ReorderFaqsRequest {
  items: Array<{ id: string; displayOrder: number }>;
}

export interface AdminFaqsListData {
  faqs: FAQItem[];
  pagination: PaginationMeta;
}
