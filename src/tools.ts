import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { CampertunityBackend } from "./types.js";

const Tag = z.enum([
  // SiteType
  "tent", "rv", "lodging", "glamping", "cabin",
  // AccessType
  "driveIn", "walkIn", "equestrian", "boat",
  // Activities
  "biking", "boating", "fishing", "hiking", "horsebackRiding",
  "paddling", "windSports", "surfing", "swimming",
  "whitewaterPaddling", "wildlifeWatching",
  // Amenities
  "picnicTable", "fires", "toilets", "outhouse", "potableWater",
  "petFriendly", "rvHookup", "rvSanitation", "trash", "showers",
  "wifi", "handicap",
  // Terrain
  "beach", "cave", "desert", "forest", "hotSpring", "lake",
  "river", "swimmingHole", "waterfall", "creek",
]);

function jsonResult(data: any) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(data), mimeType: "application/json" }],
  };
}

function errorResult(message: string) {
  return {
    content: [{ type: "text" as const, text: "Error: " + message }],
    isError: true,
  };
}

export function registerTools(server: McpServer, backend: CampertunityBackend) {
  server.tool(
    "listing-search",
    "Search for campgrounds and outdoor recreation listings",
    {
      limit: z.number().default(50).optional().describe("Number of listings to return. Default is 50, max is 1000."),
      cursor: z.string().optional().describe("Pagination cursor from a previous response."),
      startDate: z.string().optional().describe("Start date for availability search. Format: YYYY-MM-DD"),
      endDate: z.string().optional().describe("End date for availability search. Format: YYYY-MM-DD"),
      adults: z.number().optional().describe("Number of adults. Default is 1."),
      children: z.number().optional().describe("Number of children. Default is 0."),
      latitude: z.number().optional().describe("Latitude to filter by."),
      longitude: z.number().optional().describe("Longitude to filter by."),
      radius: z.number().optional().default(20).describe("Radius to filter by (in km)."),
      region: z.string().optional().describe("Region/state to search in. Will be geocoded to coordinates if latitude/longitude not provided."),
      city: z.string().optional().describe("City to search in. Will be geocoded to coordinates if latitude/longitude not provided."),
      country: z.string().optional().describe("Country to search in. Will be geocoded to coordinates if latitude/longitude not provided."),
      countryCode: z.string().optional().describe('Country code to search in (e.g. "US", "CA"). Will be geocoded to coordinates if latitude/longitude not provided.'),
      filters: z.array(Tag).optional().describe("Filter out listings that have specific tags."),
      campgroundDescription: z.string().optional().describe('Describe the campground you are looking for. Note: not the location, but something about the campground like "has a pool" or "near a lake"'),
    },
    async (params) => {
      try {
        return jsonResult(await backend.searchListings(params));
      } catch (error) {
        return errorResult((error as Error).message);
      }
    }
  );

  server.tool(
    "listing-details",
    "Get detailed information about a specific listing",
    {
      listingId: z.string().describe("The id of the listing to get details for."),
    },
    async ({ listingId }) => {
      try {
        return jsonResult(await backend.getListingDetails(listingId));
      } catch (error) {
        return errorResult((error as Error).message);
      }
    }
  );

  server.tool(
    "listing-availability",
    "Check availability for specific campsites at a listing",
    {
      listingId: z.string().describe("The id of the listing to check availability for."),
      siteIds: z.array(z.string()).optional().describe("The ids of the sites to check availability for."),
      startDate: z.string().describe("The start date to check availability for. Format: YYYY-MM-DD"),
      endDate: z.string().describe("The end date to check availability for. Format: YYYY-MM-DD"),
    },
    async (params) => {
      try {
        return jsonResult(await backend.getListingAvailability(params));
      } catch (error) {
        return errorResult((error as Error).message);
      }
    }
  );

  server.tool(
    "listing-book",
    "Get a booking URL for a campground or recreation site",
    {
      listingId: z.string().describe("The id of the listing to book."),
      startDate: z.string().optional().describe("The start date of the booking. Format: YYYY-MM-DD"),
      endDate: z.string().optional().describe("The end date of the booking. Format: YYYY-MM-DD"),
      adults: z.number().default(1).describe("Number of adults. Default is 1."),
      children: z.number().default(0).describe("Number of children. Default is 0."),
    },
    async (params) => {
      try {
        return jsonResult(await backend.getBookingUrl(params));
      } catch (error) {
        return errorResult((error as Error).message);
      }
    }
  );
}
