import { useQuery } from "@tanstack/react-query";
import { locationsApi } from "../api/locations";

export const LOCATION_KEYS = {
  neighborhoods: ["locations", "neighborhoods"] as const,
};

export function useLocations() {
  const neighborhoodsQuery = useQuery({
    queryKey: LOCATION_KEYS.neighborhoods,
    queryFn: () => locationsApi.getNeighborhoods(),
    select: (res) => res.data.neighborhoods,
    staleTime: 1000 * 60 * 30, // 30 mins cache
  });

  return {
    neighborhoods: neighborhoodsQuery.data || [],
    isLoadingNeighborhoods: neighborhoodsQuery.isLoading,
    isErrorNeighborhoods: neighborhoodsQuery.isError,
    errorNeighborhoods: neighborhoodsQuery.error,
    refetchNeighborhoods: neighborhoodsQuery.refetch,
  };
}
