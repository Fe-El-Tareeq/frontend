import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import type {
  ApiSuccessResponse,
  CityListData,
  NeighborhoodListData,
} from "../types";

export const locationsApi = {
  getCities: async () => {
    const res = await apiClient.get<ApiSuccessResponse<CityListData>>(
      ENDPOINTS.LOCATIONS.CITIES,
    );
    return res.data;
  },

  getNeighborhoods: async (cityKey?: string) => {
    const res = await apiClient.get<ApiSuccessResponse<NeighborhoodListData>>(
      ENDPOINTS.LOCATIONS.NEIGHBORHOODS,
      {
        params: cityKey ? { city: cityKey } : undefined,
      },
    );
    return res.data;
  },
};

