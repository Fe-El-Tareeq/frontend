export type MessageType = "TEXT" | "VOICE" | "IMAGE";

export interface ChatUserSummary {
  id: string;
  fullName: string | null;
  trustScore: number;
  profileImageUrl?: string | null;
  isVerified?: boolean;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  clientMessageKey: string;
  type: MessageType;
  text?: string | null;
  voiceNoteUrl?: string | null;
  voiceNoteDurationSec?: number | null;
  imageUrl?: string | null;
  isRead: boolean;
  readAt?: string | null;
  sentAt: string;
  sender?: ChatUserSummary | null;
}

export interface ChatAssignmentSummary {
  id: string;
  status: string;
  errandId: string;
  tripId?: string;
  acceptedAt?: string | null;
  completedAt?: string | null;
  cancelledAt?: string | null;
  errand?: {
    id: string;
    title: string;
    status?: string;
  } | null;
}

export interface ChatParticipantsSummary {
  requester: ChatUserSummary | null;
  traveler: ChatUserSummary | null;
}

export interface ChatRoomSummary {
  id: string;
  assignmentId: string;
  assignment?: ChatAssignmentSummary | null;
  participants?: ChatParticipantsSummary;
  createdAt: string;
  updatedAt: string;
  lastMessageAt?: string | null;
  latestMessage?: ChatMessage | null;
  lastMessage?: ChatMessage | null;
  unreadCount?: number;
  peer?: ChatUserSummary | null;
}

export interface ChatRoom {
  id: string;
  assignmentId: string;
  assignment?: ChatAssignmentSummary | null;
  participants?: ChatParticipantsSummary;
  createdAt: string;
  updatedAt: string;
  lastMessageAt?: string | null;
  peer?: ChatUserSummary | null;
}

export interface ChatSendTextRequest {
  clientMessageKey: string;
  type: "TEXT";
  text: string;
}

export interface ChatSendVoiceRequest {
  clientMessageKey: string;
  type: "VOICE";
  voiceNoteUrl: string;
  voiceNoteDurationSec: number;
}

export interface ChatSendImageRequest {
  clientMessageKey: string;
  type: "IMAGE";
  imageUrl: string;
}

export type ChatSendMessageRequest =
  | ChatSendTextRequest
  | ChatSendVoiceRequest
  | ChatSendImageRequest;

export interface ChatMessagesPagination {
  order: "desc" | "asc";
  limit: number;
  hasMore: boolean;
  nextBefore?: string | null;
}

export interface ChatMessagesResponseData {
  messages: ChatMessage[];
  pagination: ChatMessagesPagination;
}

export interface ChatSyncResponseData {
  messages: ChatMessage[];
  sync: {
    serverTime: string;
    nextSince: string;
    limit: number;
  };
}

export interface ChatReadResponseData {
  read: {
    count: number;
    readAt: string;
  };
}
