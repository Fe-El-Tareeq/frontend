import { useQuery } from "@tanstack/react-query";
import { locationsApi } from "../api/locations";

export const LOCATION_KEYS = {
  cities: ["locations", "cities"] as const,
  neighborhoods: (cityKey?: string) =>
    ["locations", "neighborhoods", cityKey || "all"] as const,
};

export function useLocations(selectedCityKey?: string) {
  const citiesQuery = useQuery({
    queryKey: LOCATION_KEYS.cities,
    queryFn: () => locationsApi.getCities(),
    select: (res) => res.data.cities,
    staleTime: 1000 * 60 * 60, // 1 hour cache
  });

  const neighborhoodsQuery = useQuery({
    queryKey: LOCATION_KEYS.neighborhoods(selectedCityKey),
    queryFn: () => locationsApi.getNeighborhoods(selectedCityKey),
    select: (res) => res.data.neighborhoods,
    staleTime: 1000 * 60 * 30, // 30 mins cache
  });

  return {
    cities: citiesQuery.data || [],
    isLoadingCities: citiesQuery.isLoading,
    isErrorCities: citiesQuery.isError,
    errorCities: citiesQuery.error,
    refetchCities: citiesQuery.refetch,
    neighborhoods: neighborhoodsQuery.data || [],
    isLoadingNeighborhoods: neighborhoodsQuery.isLoading,
    isErrorNeighborhoods: neighborhoodsQuery.isError,
    errorNeighborhoods: neighborhoodsQuery.error,
    refetchNeighborhoods: neighborhoodsQuery.refetch,
  };
}

