import { createContext, useContext } from "react";
import type { ConnectivityStatus } from "./connectivity";

export interface OfflineContextValue {
  status: ConnectivityStatus;
  isOffline: boolean;
  hydrated: boolean;
  lastSyncedAt?: number;
}

export const OfflineContext = createContext<OfflineContextValue>({
  status: "ONLINE",
  isOffline: false,
  hydrated: false,
});

export function useOfflineStatus() {
  return useContext(OfflineContext);
}
