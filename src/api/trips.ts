import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";

export interface TripDto {
  id: string;
  travelerId: string;
  traveler?: {
    id: string;
    fullName: string;
    trustScore?: number;
  };
  originCity: string;
  originNeighborhood?: string;
  destinationCity: string;
  destinationNeighborhood?: string;
  departureDate: string;
  departureTime: string;
  capacityText: string;
  notes?: string | null;
  status: "OPEN" | "MATCHED" | "COMPLETED" | "CANCELLED";
  createdAt: string;
}

export interface CreateTripDto {
  originCity: string;
  originNeighborhoodId?: string;
  destinationCity: string;
  destinationNeighborhoodId?: string;
  departureDate: string;
  departureTime: string;
  capacityText: string;
  notes?: string;
}

export const tripsApi = {
  // GET /api/v1/trips
  getTrips: async (params?: { city?: string; sort?: string }): Promise<TripDto[]> => {
    try {
      const response = await apiClient.get<TripDto[]>(ENDPOINTS.TRIPS.LIST, { params });
      return response.data;
    } catch (error) {
      // If endpoint is not yet deployed or returns 404, throw to let hook handle fallback
      throw error;
    }
  },

  // GET /api/v1/trips/:id
  getTripById: async (id: string): Promise<TripDto> => {
    const response = await apiClient.get<TripDto>(ENDPOINTS.TRIPS.DETAIL(id));
    return response.data;
  },

  // POST /api/v1/trips
  createTrip: async (data: CreateTripDto): Promise<TripDto> => {
    const response = await apiClient.post<TripDto>(ENDPOINTS.TRIPS.CREATE, data);
    return response.data;
  },

  // POST /api/v1/trips/:id/book
  /*
   * ============================================================================
   * BACKEND INTEGRATION PLACEHOLDER: Book Space on Trip
   * Endpoint: POST /api/v1/trips/:id/book
   * ============================================================================
   */
  bookSpace: async (tripId: string, payload: { errandId?: string; notes?: string }) => {
    const response = await apiClient.post(ENDPOINTS.TRIPS.BOOK(tripId), payload);
    return response.data;
  },
};
