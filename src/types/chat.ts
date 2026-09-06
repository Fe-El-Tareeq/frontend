export type MessageType = "TEXT" | "VOICE";

export interface ChatUserSummary {
  id: string;
  fullName: string | null;
  trustScore: number;
  profileImageUrl?: string | null;
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
  isRead: boolean;
  readAt?: string | null;
  sentAt: string;
  sender?: ChatUserSummary;
}

export interface ChatRoomSummary {
  id: string;
  assignmentId: string;
  createdAt: string;
  updatedAt: string;
  lastMessageAt?: string | null;
  lastMessage?: ChatMessage | null;
  unreadCount?: number;
  peer?: ChatUserSummary | null;
}

export interface ChatRoom {
  id: string;
  assignmentId: string;
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

export type ChatSendMessageRequest = ChatSendTextRequest | ChatSendVoiceRequest;

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
