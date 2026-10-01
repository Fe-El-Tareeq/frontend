import { useQuery } from "@tanstack/react-query";
import { matchingApi } from "../api/matching";

export const MATCHING_KEYS = {
  all: ["matching"] as const,
  errandMatches: (errandId: string, limit?: number) =>
    [...MATCHING_KEYS.all, "errand", errandId, limit] as const,
  tripMatches: (tripId: string, limit?: number) =>
    [...MATCHING_KEYS.all, "trip", tripId, limit] as const,
};

export function useErrandMatches(errandId?: string, limit = 10) {
  const query = useQuery({
    queryKey: MATCHING_KEYS.errandMatches(errandId || "", limit),
    queryFn: () => matchingApi.getMatchesForErrand(errandId!, limit),
    enabled: Boolean(errandId),
    select: (res) => res.data,
  });

  return {
    matches: query.data?.matches || [],
    recalculatedAt: query.data?.recalculatedAt,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

export function useTripMatches(tripId?: string, limit = 10) {
  const query = useQuery({
    queryKey: MATCHING_KEYS.tripMatches(tripId || "", limit),
    queryFn: () => matchingApi.getMatchesForTrip(tripId!, limit),
    enabled: Boolean(tripId),
    select: (res) => res.data,
  });

  return {
    matches: query.data?.matches || [],
    recalculatedAt: query.data?.recalculatedAt,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
