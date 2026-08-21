import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errandsApi } from "../api/errands";
import type { ErrandCreateRequest, ErrandFilterParams, ErrandUpdateRequest } from "../types";

export const ERRAND_KEYS = {
  all: ["errands"] as const,
  list: (params?: ErrandFilterParams) => ["errands", "list", params] as const,
  detail: (id: string) => ["errands", "detail", id] as const,
};

export function useErrands(params?: ErrandFilterParams) {
  const queryClient = useQueryClient();

  const errandsQuery = useQuery({
    queryKey: ERRAND_KEYS.list(params),
    queryFn: () => errandsApi.getErrands(params),
    select: (res) => res.data,
  });

  const createErrandMutation = useMutation({
    mutationFn: (data: ErrandCreateRequest) => errandsApi.createErrand(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ERRAND_KEYS.all });
    },
  });

  const updateErrandMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ErrandUpdateRequest }) =>
      errandsApi.updateErrand(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ERRAND_KEYS.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: ERRAND_KEYS.all });
    },
  });

  const cancelErrandMutation = useMutation({
    mutationFn: (id: string) => errandsApi.cancelErrand(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ERRAND_KEYS.detail(id) });
      queryClient.invalidateQueries({ queryKey: ERRAND_KEYS.all });
    },
  });

  return {
    errands: errandsQuery.data?.errands || [],
    pagination: errandsQuery.data?.pagination,
    isLoading: errandsQuery.isLoading,
    isError: errandsQuery.isError,
    error: errandsQuery.error,
    refetch: errandsQuery.refetch,
    createErrand: createErrandMutation.mutateAsync,
    isCreating: createErrandMutation.isPending,
    updateErrand: updateErrandMutation.mutateAsync,
    isUpdating: updateErrandMutation.isPending,
    cancelErrand: cancelErrandMutation.mutateAsync,
    isCancelling: cancelErrandMutation.isPending,
  };
}

export function useErrandDetail(id: string) {
  const errandQuery = useQuery({
    queryKey: ERRAND_KEYS.detail(id),
    queryFn: () => errandsApi.getErrandById(id),
    enabled: !!id,
    select: (res) => res.data.errand,
  });

  return {
    errand: errandQuery.data,
    isLoading: errandQuery.isLoading,
    isError: errandQuery.isError,
    error: errandQuery.error,
  };
}
