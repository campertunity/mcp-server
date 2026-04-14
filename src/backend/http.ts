import {
  CampertunityBackend,
  SearchParams,
  AvailabilityParams,
  BookingParams,
} from "../types.js";

const DEFAULT_API_URL = "https://campertunity.com/public/api";

export class HttpBackend implements CampertunityBackend {
  private apiUrl: string;
  private apiKey?: string;

  constructor(apiUrl?: string, apiKey?: string) {
    this.apiUrl = apiUrl || process.env.CAMPERTUNITY_API_URL || DEFAULT_API_URL;
    this.apiKey = apiKey || process.env.CAMPERTUNITY_API_KEY;
  }

  private get headers(): Record<string, string> {
    const h: Record<string, string> = {};
    if (this.apiKey) {
      h["Authorization"] = `Bearer ${this.apiKey}`;
    }
    return h;
  }

  private async get(path: string) {
    const response = await fetch(`${this.apiUrl}${path}`, {
      method: "GET",
      headers: this.headers,
    });
    if (!response.ok) {
      throw new Error(`Campertunity API error: ${response.statusText}`);
    }
    return response.json();
  }

  private async post(path: string, data: any) {
    const response = await fetch(`${this.apiUrl}${path}`, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Campertunity API error: ${response.statusText}`);
    }
    return response.json();
  }

  async searchListings(params: SearchParams) {
    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value == null) continue;
      if (key === "filters") {
        queryParams.set(key, (value as string[]).join(","));
      } else {
        queryParams.set(key, String(value));
      }
    }
    return this.get(`/listings?${queryParams.toString()}`);
  }

  async getListingDetails(listingId: string) {
    return this.get(
      `/listings/campgrounds/${encodeURIComponent(listingId)}`
    );
  }

  async getListingAvailability(params: AvailabilityParams) {
    const { listingId, ...body } = params;
    return this.post(
      `/listings/campgrounds/${encodeURIComponent(listingId)}/availability`,
      body
    );
  }

  async getBookingUrl(params: BookingParams) {
    const { listingId, ...body } = params;
    return this.post(
      `/listings/campgrounds/${encodeURIComponent(listingId)}/book`,
      body
    );
  }
}
