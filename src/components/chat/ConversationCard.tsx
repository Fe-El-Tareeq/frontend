import type { FC } from "react";

export interface ConversationItemData {
  id: string;
  name: string;
  avatarInitials: string;
  avatarBg: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  isOnline: boolean;
}

interface ConversationCardProps {
  conversation: ConversationItemData;
  onSelect: (id: string) => void;
}

export const ConversationCard: FC<ConversationCardProps> = ({
  conversation,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(conversation.id)}
      className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors cursor-pointer text-right"
    >
      {/* Right Side in RTL: Avatar + Name & Message */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-full text-xs font-black text-white ${conversation.avatarBg}`}
          >
            {conversation.avatarInitials}
          </div>
          {conversation.isOnline && (
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white" />
          )}
        </div>

        <div className="text-right">
          <h3 className="text-xs font-black text-primary">
            {conversation.name}
          </h3>
          <p className="text-[11px] text-text-secondary mt-0.5 line-clamp-1 max-w-[200px]">
            {conversation.lastMessage}
          </p>
        </div>
      </div>

      {/* Left Side in RTL: Time and Unread Badge */}
      <div className="flex flex-col items-start gap-1">
        <span className="text-[10.5px] text-text-muted">
          {conversation.time}
        </span>
        {conversation.unreadCount > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F36F21] text-[10.5px] font-black text-white">
            {conversation.unreadCount}
          </span>
        )}
      </div>
    </div>
  );
};
