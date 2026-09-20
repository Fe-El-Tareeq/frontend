import { API_BASE_URL } from "../api/endpoints";

export type ConnectivityStatus = "ONLINE" | "OFFLINE";
type Listener = (status: ConnectivityStatus) => void;

export class ConnectivityMonitor {
  private status: ConnectivityStatus;
  private listeners = new Set<Listener>();
  private abortController: AbortController | null = null;
  private readonly probeUrl: string;
  private readonly fetcher: typeof fetch;

  constructor(
    probeUrl = `${API_BASE_URL}/health`,
    fetcher: typeof fetch = fetch,
  ) {
    this.probeUrl = probeUrl;
    this.fetcher = fetcher;
    this.status = typeof navigator !== "undefined" && !navigator.onLine ? "OFFLINE" : "ONLINE";
  }

  getSnapshot = () => this.status;

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  start() {
    window.addEventListener("online", this.handleBrowserOnline);
    window.addEventListener("offline", this.handleBrowserOffline);
    if (navigator.onLine) void this.probe();
    return () => {
      window.removeEventListener("online", this.handleBrowserOnline);
      window.removeEventListener("offline", this.handleBrowserOffline);
      this.abortController?.abort();
    };
  }

  async probe() {
    if (!navigator.onLine) {
      this.update("OFFLINE");
      return false;
    }
    this.abortController?.abort();
    const controller = new AbortController();
    this.abortController = controller;
    const timeout = window.setTimeout(() => controller.abort(), 5_000);
    try {
      const response = await this.fetcher(this.probeUrl, {
        method: "GET",
        cache: "no-store",
        signal: controller.signal,
      });
      this.update(response.ok ? "ONLINE" : "OFFLINE");
      return response.ok;
    } catch {
      this.update("OFFLINE");
      return false;
    } finally {
      window.clearTimeout(timeout);
      if (this.abortController === controller) this.abortController = null;
    }
  }

  private handleBrowserOnline = () => void this.probe();
  private handleBrowserOffline = () => this.update("OFFLINE");

  private update(next: ConnectivityStatus) {
    if (this.status === next) return;
    this.status = next;
    this.listeners.forEach((listener) => listener(next));
  }
}

export const connectivityMonitor = new ConnectivityMonitor();
