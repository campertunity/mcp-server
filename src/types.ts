export interface SearchParams {
  limit?: number;
  cursor?: string;
  startDate?: string;
  endDate?: string;
  adults?: number;
  children?: number;
  latitude?: number;
  longitude?: number;
  radius?: number;
  region?: string;
  city?: string;
  country?: string;
  countryCode?: string;
  filters?: string[];
  campgroundDescription?: string;
}

export interface AvailabilityParams {
  listingId: string;
  siteIds?: string[];
  startDate: string;
  endDate: string;
}

export interface BookingParams {
  listingId: string;
  startDate?: string;
  endDate?: string;
  adults?: number;
  children?: number;
}

export interface CampertunityBackend {
  searchListings(params: SearchParams): Promise<any>;
  getListingDetails(listingId: string): Promise<any>;
  getListingAvailability(params: AvailabilityParams): Promise<any>;
  getBookingUrl(params: BookingParams): Promise<any>;
}
