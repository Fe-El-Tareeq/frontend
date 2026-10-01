import type { PaginationMeta } from "./api";

export type TicketStatus =
  | "OPEN"
  | "IN_PROGRESS"
  | "WAITING_FOR_USER"
  | "RESOLVED"
  | "CLOSED";

export type TicketCategory =
  | "PAYMENT_ISSUE"
  | "OPEN_REQUEST"
  | "CANCEL_REQUEST"
  | "GENERAL_INQUIRY";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  displayOrder: number;
  isActive?: boolean;
}

export interface SupportConfig {
  contactPhone?: string;
  contactEmail?: string;
  whatsappNumber?: string;
  workingHours?: string;
  categories: string[];
  faqs?: FAQItem[];
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  senderId: string;
  isAdmin: boolean;
  message: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  clientRequestKey?: string;
  clientMessageKey?: string;
  subject?: string;
  category: string;
  status: TicketStatus;
  messages?: TicketMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketRequest {
  clientRequestKey?: string;
  clientMessageKey?: string;
  subject?: string;
  category: string;
  message: string;
  priority?: string;
}

export interface CreateTicketMessageRequest {
  clientMessageKey?: string;
  message: string;
}

export interface TicketListResponseData {
  tickets: SupportTicket[];
  pagination: PaginationMeta;
}

export type ReportType =
  | "FRAUD_OR_SCAM"
  | "PROHIBITED_OR_DANGEROUS_ITEM"
  | "ABUSE_OR_THREAT"
  | "FAKE_ACCOUNT"
  | "FAILURE_TO_FULFILL"
  | "DAMAGED_OR_MISSING_ITEM"
  | "TECHNICAL_ISSUE"
  | "SAFETY"
  | "FRAUD"
  | "INAPPROPRIATE_BEHAVIOR"
  | "ITEM_MISMATCH"
  | "OTHER";

export type ReportStatus =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "RESOLVED"
  | "REJECTED";

export interface SupportReport {
  id: string;
  reporterId: string;
  clientRequestKey?: string;
  type: ReportType;
  description: string;
  reportedUserId?: string | null;
  assignmentId?: string | null;
  errandId?: string | null;
  tripId?: string | null;
  attachChatHistory?: boolean;
  chatRoomId?: string | null;
  status: ReportStatus;
  adminNotes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReportRequest {
  clientRequestKey?: string;
  type?: ReportType;
  description?: string;
  details?: string;
  reportedUserId?: string;
  assignmentId?: string;
  errandId?: string;
  tripId?: string;
  attachChatHistory?: boolean;
  chatRoomId?: string;
  targetType?: string;
  targetId?: string;
  reason?: string;
}

export interface ReportListResponseData {
  reports: SupportReport[];
  pagination: PaginationMeta;
}

