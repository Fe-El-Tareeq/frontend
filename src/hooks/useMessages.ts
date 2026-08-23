import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { messagesApi } from "../api/messages";

export const MESSAGES_QUERY_KEY = ["messages"] as const;

export const useConversations = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [...MESSAGES_QUERY_KEY, "conversations"],
    queryFn: () => messagesApi.getConversations(),
  });

  return {
    conversations: data || [],
    isLoading,
    isError,
    refetch,
  };
};

export const useChat = (conversationId: string) => {
  const queryClient = useQueryClient();

  const { data: messages, isLoading, isError, refetch } = useQuery({
    queryKey: [...MESSAGES_QUERY_KEY, "chat", conversationId],
    queryFn: () => messagesApi.getChatMessages(conversationId),
    enabled: Boolean(conversationId),
  });

  const sendMutation = useMutation({
    mutationFn: (text: string) => messagesApi.sendMessage(conversationId, text),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...MESSAGES_QUERY_KEY, "chat", conversationId],
      });
    },
  });

  return {
    messages: messages || [],
    isLoading,
    isError,
    refetch,
    sendMessage: sendMutation.mutateAsync,
    isSending: sendMutation.isPending,
  };
};
