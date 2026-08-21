import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import type { ApiSuccessResponse, NeighborhoodListData } from "../types";

export const locationsApi = {
  getNeighborhoods: async () => {
    const res = await apiClient.get<ApiSuccessResponse<NeighborhoodListData>>(
      ENDPOINTS.LOCATIONS.NEIGHBORHOODS
    );
    return res.data;
  },
};
