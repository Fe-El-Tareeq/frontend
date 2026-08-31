export type MessageType = "TEXT" | "VOICE";

export interface ChatMessage {
  message_id: string;
  errand_id: string;
  sender_id: string;
  sender_name: string;
  message_type: MessageType;
  content_text?: string;
  audio_url?: string;
  audio_duration_sec?: number;
  sent_at: string;
}

export interface ChatSyncRequestDTO {
  errand_id: string;
  last_sync_timestamp: string;
}

export interface ChatSyncResponseDTO {
  errand_id: string;
  server_timestamp: string;
  whatsapp_fallback_url?: string;
  new_messages: ChatMessage[];
}
