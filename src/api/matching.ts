import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import type {
  ApiSuccessResponse,
  MatchingTripsForErrandResponseData,
  MatchingErrandsForTripResponseData,
} from "../types";

export const matchingApi = {
  getMatchesForErrand: async (errandId: string, limit = 10) => {
    const res = await apiClient.get<
      ApiSuccessResponse<MatchingTripsForErrandResponseData>
    >(ENDPOINTS.MATCHING.ERRAND_TRIPS(errandId), {
      params: { limit },
    });
    return res.data;
  },

  getMatchesForTrip: async (tripId: string, limit = 10) => {
    const res = await apiClient.get<
      ApiSuccessResponse<MatchingErrandsForTripResponseData>
    >(ENDPOINTS.MATCHING.TRIP_ERRANDS(tripId), {
      params: { limit },
    });
    return res.data;
  },
};
