import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { registerSW } from "virtual:pwa-register";
import "./index.css";
import "./i18n";
import App from "./App";
import { OfflineDataProvider } from "./offline/OfflineDataProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const status = (error as { response?: { status?: number } }).response
          ?.status;
        return failureCount < 2 && (!status || status === 408 || status === 429 || status >= 500);
      },
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 5000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 1000 * 60 * 2, // 2 minutes stale time
    },
    mutations: { retry: false },
  },
});

if (import.meta.env.PROD) {
  registerSW({ immediate: true });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <OfflineDataProvider>
        <App />
      </OfflineDataProvider>
    </QueryClientProvider>
  </StrictMode>,
);
