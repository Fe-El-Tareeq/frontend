import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tripsApi } from "../api/trips";
import type { CreateTripRequest, TripFilterParams, UpdateTripRequest } from "../types";

export const TRIPS_QUERY_KEY = ["trips"] as const;

export const useTrips = (params?: TripFilterParams) => {
  const queryClient = useQueryClient();

  const tripsQuery = useQuery({
    queryKey: [...TRIPS_QUERY_KEY, params],
    queryFn: () => tripsApi.getTrips(params),
    select: (res) => res.data,
  });

  const createTripMutation = useMutation({
    mutationFn: (data: CreateTripRequest) => tripsApi.createTrip(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRIPS_QUERY_KEY });
    },
  });

  const updateTripMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTripRequest }) =>
      tripsApi.updateTrip(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRIPS_QUERY_KEY });
    },
  });

  const cancelTripMutation = useMutation({
    mutationFn: (id: string) => tripsApi.cancelTrip(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRIPS_QUERY_KEY });
    },
  });

  return {
    trips: tripsQuery.data?.trips || [],
    pagination: tripsQuery.data?.pagination,
    isLoading: tripsQuery.isLoading,
    isError: tripsQuery.isError,
    error: tripsQuery.error,
    refetch: tripsQuery.refetch,
    createTrip: createTripMutation.mutateAsync,
    isCreating: createTripMutation.isPending,
    updateTrip: updateTripMutation.mutateAsync,
    isUpdating: updateTripMutation.isPending,
    cancelTrip: cancelTripMutation.mutateAsync,
    isCancelling: cancelTripMutation.isPending,
  };
};

export const useTripDetail = (id: string) => {
  const tripQuery = useQuery({
    queryKey: [...TRIPS_QUERY_KEY, id],
    queryFn: () => tripsApi.getTripById(id),
    enabled: Boolean(id),
    select: (res) => ("trip" in res.data ? res.data.trip : res.data),
  });

  return {
    trip: tripQuery.data,
    isLoading: tripQuery.isLoading,
    isError: tripQuery.isError,
    error: tripQuery.error,
    refetch: tripQuery.refetch,
  };
};
