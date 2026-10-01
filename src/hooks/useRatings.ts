import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ratingsApi } from "../api/ratings";
import type { RatingCreateRequest } from "../types";

export const RATING_KEYS = {
  all: ["ratings"] as const,
  pending: (params?: { skip?: number; take?: number }) =>
    [...RATING_KEYS.all, "pending", params] as const,
  meReceived: (params?: { skip?: number; take?: number }) =>
    [...RATING_KEYS.all, "meReceived", params] as const,
  meSummary: () => [...RATING_KEYS.all, "meSummary"] as const,
  assignment: (id: string) => [...RATING_KEYS.all, "assignment", id] as const,
};

export function useRatings() {
  const queryClient = useQueryClient();

  const submitRatingMutation = useMutation({
    mutationFn: (payload: RatingCreateRequest) =>
      ratingsApi.submitRating(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RATING_KEYS.all });
    },
  });

  return {
    submitRating: submitRatingMutation.mutateAsync,
    isSubmitting: submitRatingMutation.isPending,
  };
}

export function usePendingRatings(params?: { skip?: number; take?: number }) {
  const query = useQuery({
    queryKey: RATING_KEYS.pending(params),
    queryFn: () => ratingsApi.getPendingRatings(params),
    select: (res) => res.data,
  });

  return {
    pendingRatings: query.data?.pendingRatings || [],
    pagination: query.data?.pagination,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}

export function useUserRatingSummary() {
  const query = useQuery({
    queryKey: RATING_KEYS.meSummary(),
    queryFn: () => ratingsApi.getMySummary(),
    select: (res) => res.data,
  });

  return {
    summary: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
