import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tripsApi } from "../api/trips";
import type { CreateTripDto } from "../api/trips";

export const TRIPS_QUERY_KEY = ["trips"] as const;

export const useTrips = (params?: { city?: string; sort?: string }) => {
  const queryClient = useQueryClient();

  const {
    data: trips,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [...TRIPS_QUERY_KEY, params],
    queryFn: async () => {
      try {
        return await tripsApi.getTrips(params);
      } catch {
        // Return empty array on error so UI can display the structured EmptyState
        return [];
      }
    },
  });

  const createTripMutation = useMutation({
    mutationFn: (data: CreateTripDto) => tripsApi.createTrip(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRIPS_QUERY_KEY });
    },
  });

  return {
    trips: trips || [],
    isLoading,
    isError,
    error,
    refetch,
    createTrip: createTripMutation.mutateAsync,
    isCreating: createTripMutation.isPending,
  };
};

export const useTripDetail = (id: string) => {
  return useQuery({
    queryKey: [...TRIPS_QUERY_KEY, id],
    queryFn: () => tripsApi.getTripById(id),
    enabled: Boolean(id),
  });
};
