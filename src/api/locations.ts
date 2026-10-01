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

  getNeighborhoods: async (
    filter?: string | { zoneKey?: string; city?: string },
  ) => {
    const params =
      typeof filter === "string"
        ? { city: filter }
        : filter;
    const res = await apiClient.get<ApiSuccessResponse<NeighborhoodListData>>(
      ENDPOINTS.LOCATIONS.NEIGHBORHOODS,
      {
        params,
      },
    );
    return res.data;
  },
};

