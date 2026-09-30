import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { assignmentsApi } from "../api/assignments";
import type {
  AssignmentCreateRequest,
  AssignmentCancelRequest,
  StartDeliveryRequest,
  UpdateEstimatedDeliveryTimeRequest,
} from "../types";

export const ASSIGNMENT_KEYS = {
  all: ["assignments"] as const,
  lists: () => [...ASSIGNMENT_KEYS.all, "list"] as const,
  list: (params?: { skip?: number; take?: number }) =>
    [...ASSIGNMENT_KEYS.lists(), params] as const,
  details: () => [...ASSIGNMENT_KEYS.all, "detail"] as const,
  detail: (id: string) => [...ASSIGNMENT_KEYS.details(), id] as const,
};

export function useAssignments(params?: { skip?: number; take?: number }) {
  const queryClient = useQueryClient();

  const assignmentsQuery = useQuery({
    queryKey: ASSIGNMENT_KEYS.list(params),
    queryFn: async () =>
      (await assignmentsApi.getAssignments(params)) ?? {
        success: true,
        message: "",
        data: { assignments: [], pagination: { total: 0, page: 1, limit: 10, totalPages: 0 } },
      },
    select: (res) => res.data,
  });

  const createAssignmentMutation = useMutation({
    mutationFn: (payload: AssignmentCreateRequest) =>
      assignmentsApi.createAssignment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.all });
    },
  });

  const pickupMutation = useMutation({
    mutationFn: (id: string) => assignmentsApi.markPickedUp(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.detail(id) });
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.lists() });
    },
  });

  const startDeliveryMutation = useMutation({
    mutationFn: (vars: { id: string; payload?: StartDeliveryRequest } | string) => {
      if (typeof vars === "string") {
        return assignmentsApi.startDelivery(vars);
      }
      return assignmentsApi.startDelivery(vars.id, vars.payload);
    },
    onSuccess: (_, variables) => {
      const id = typeof variables === "string" ? variables : variables.id;
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.detail(id) });
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.lists() });
    },
  });

  const updateEstimatedDeliveryTimeMutation = useMutation({
    mutationFn: (vars: {
      id: string;
      payload?: UpdateEstimatedDeliveryTimeRequest;
      estimatedDeliveryAt?: string | null;
      estimatedDeliveryTime?: string | null;
    }) => {
      const payload: UpdateEstimatedDeliveryTimeRequest =
        vars.payload ?? {
          estimatedDeliveryAt:
            vars.estimatedDeliveryAt !== undefined
              ? vars.estimatedDeliveryAt
              : vars.estimatedDeliveryTime ?? null,
        };
      return assignmentsApi.updateEstimatedDeliveryTime(vars.id, payload);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ASSIGNMENT_KEYS.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.lists() });
    },
  });

  const completeMutation = useMutation({
    mutationFn: (id: string) => assignmentsApi.completeAssignment(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.detail(id) });
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.lists() });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload?: AssignmentCancelRequest;
    }) => assignmentsApi.cancelAssignment(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.detail(id) });
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.lists() });
    },
  });

  return {
    assignments: assignmentsQuery.data?.assignments || [],
    pagination: assignmentsQuery.data?.pagination,
    isLoading: assignmentsQuery.isLoading,
    isError: assignmentsQuery.isError,
    error: assignmentsQuery.error,
    refetch: assignmentsQuery.refetch,
    createAssignment: createAssignmentMutation.mutateAsync,
    isCreating: createAssignmentMutation.isPending,
    markPickedUp: pickupMutation.mutateAsync,
    isPickingUp: pickupMutation.isPending,
    startDelivery: startDeliveryMutation.mutateAsync,
    isStartingDelivery: startDeliveryMutation.isPending,
    updateEstimatedDeliveryTime:
      updateEstimatedDeliveryTimeMutation.mutateAsync,
    isUpdatingEstimatedDeliveryTime:
      updateEstimatedDeliveryTimeMutation.isPending,
    completeAssignment: completeMutation.mutateAsync,
    isCompleting: completeMutation.isPending,
    cancelAssignment: cancelMutation.mutateAsync,
    isCancelling: cancelMutation.isPending,
  };
}

export function useAssignmentDetail(id?: string) {
  const query = useQuery({
    queryKey: ASSIGNMENT_KEYS.detail(id || ""),
    queryFn: () => assignmentsApi.getAssignmentById(id!),
    enabled: Boolean(id),
    select: (res) => res.data.assignment,
  });

  return {
    assignment: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
