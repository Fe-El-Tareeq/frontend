import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { proposalsApi } from "../api/proposals";
import type { CreateProposalRequest } from "../types/proposals";

export const PROPOSALS_QUERY_KEYS = {
  inbox: (params?: Record<string, unknown>) => ["proposals", "inbox", params] as const,
  sent: (params?: Record<string, unknown>) => ["proposals", "sent", params] as const,
  errand: (errandId: string) => ["proposals", "errand", errandId] as const,
  trip: (tripId: string) => ["proposals", "trip", tripId] as const,
};

export function useSentProposals(params?: {
  status?: string;
  skip?: number;
  take?: number;
}) {
  const query = useQuery({
    queryKey: PROPOSALS_QUERY_KEYS.sent(params),
    queryFn: () => proposalsApi.getSentProposals(params),
    staleTime: 30_000,
  });

  return {
    proposals: query.data?.data.proposals ?? [],
    pagination: query.data?.data.pagination,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

export function useInboxProposals(params?: {
  status?: string;
  unread?: boolean;
  skip?: number;
  take?: number;
}) {
  const query = useQuery({
    queryKey: PROPOSALS_QUERY_KEYS.inbox(params),
    queryFn: () => proposalsApi.getInboxProposals(params),
    staleTime: 30_000,
  });

  return {
    proposals: query.data?.data.proposals ?? [],
    pagination: query.data?.data.pagination,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

export function useErrandProposals(errandId: string) {
  const query = useQuery({
    queryKey: PROPOSALS_QUERY_KEYS.errand(errandId),
    queryFn: () => proposalsApi.getErrandProposals(errandId),
    enabled: Boolean(errandId),
    staleTime: 30_000,
  });

  return {
    proposals: query.data?.data.proposals ?? [],
    pagination: query.data?.data.pagination,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

export function useTripProposals(tripId: string) {
  const query = useQuery({
    queryKey: PROPOSALS_QUERY_KEYS.trip(tripId),
    queryFn: () => proposalsApi.getTripProposals(tripId),
    enabled: Boolean(tripId),
    staleTime: 30_000,
  });

  return {
    proposals: query.data?.data.proposals ?? [],
    pagination: query.data?.data.pagination,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

export function useProposalsMutations() {
  const queryClient = useQueryClient();

  const createProposalMutation = useMutation({
    mutationFn: (payload: CreateProposalRequest) =>
      proposalsApi.createProposal(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposals"] });
    },
  });

  const acceptProposalMutation = useMutation({
    mutationFn: (id: string) => proposalsApi.acceptProposal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposals"] });
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
  });

  const rejectProposalMutation = useMutation({
    mutationFn: (id: string) => proposalsApi.rejectProposal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposals"] });
    },
  });

  const withdrawProposalMutation = useMutation({
    mutationFn: (id: string) => proposalsApi.withdrawProposal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposals"] });
    },
  });

  return {
    createProposal: createProposalMutation.mutateAsync,
    isCreating: createProposalMutation.isPending,
    acceptProposal: acceptProposalMutation.mutateAsync,
    isAccepting: acceptProposalMutation.isPending,
    rejectProposal: rejectProposalMutation.mutateAsync,
    isRejecting: rejectProposalMutation.isPending,
    withdrawProposal: withdrawProposalMutation.mutateAsync,
    isWithdrawing: withdrawProposalMutation.isPending,
  };
}
