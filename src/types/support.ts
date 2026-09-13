import type { PaginationMeta } from "./api";

export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
export type TicketPriority = "LOW" | "NORMAL" | "HIGH" | "URGENT";

export interface SupportConfig {
  contactPhone?: string;
  contactEmail?: string;
  whatsappNumber?: string;
  workingHours?: string;
  categories: string[];
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
  subject: string;
  category: string;
  priority: TicketPriority;
  status: TicketStatus;
  messages?: TicketMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketRequest {
  subject: string;
  category: string;
  message: string;
  priority?: TicketPriority;
}

export interface CreateTicketMessageRequest {
  message: string;
}

export interface TicketListResponseData {
  tickets: SupportTicket[];
  pagination: PaginationMeta;
}

export type ReportTargetType = "USER" | "ERRAND" | "TRIP" | "ASSIGNMENT" | "OTHER";
export type ReportStatus = "PENDING" | "INVESTIGATING" | "RESOLVED" | "DISMISSED";

export interface SupportReport {
  id: string;
  reporterId: string;
  targetType: ReportTargetType;
  targetId: string;
  reason: string;
  description: string;
  status: ReportStatus;
  adminNotes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReportRequest {
  targetType: ReportTargetType;
  targetId: string;
  reason: string;
  description: string;
}

export interface ReportListResponseData {
  reports: SupportReport[];
  pagination: PaginationMeta;
}
