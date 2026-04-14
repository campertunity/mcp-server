import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { z } from 'zod';
import { CampertunityClient } from '../campertunity/client.js';

export enum Tag {
  // SiteType
  tent = 'tent',
  rv = 'rv',
  lodging = 'lodging',
  glamping = 'glamping',
  cabin = 'cabin',

  // AccessType
  driveIn = 'driveIn',
  walkIn = 'walkIn',
  equestrian = 'equestrian',
  boat = 'boat',

  // Activities
  biking = 'biking',
  boating = 'boating',
  fishing = 'fishing',
  hiking = 'hiking',
  horsebackRiding = 'horsebackRiding',
  paddling = 'paddling',
  windSports = 'windSports',
  surfing = 'surfing',
  swimming = 'swimming',
  whitewaterPaddling = 'whitewaterPaddling',
  wildlifeWatching = 'wildlifeWatching',

  // Amenities
  picnicTable = 'picnicTable',
  fires = 'fires',
  toilets = 'toilets',
  outhouse = 'outhouse',
  potableWater = 'potableWater',
  petFriendly = 'petFriendly',
  rvHookup = 'rvHookup',
  rvSanitation = 'rvSanitation',
  trash = 'trash',
  showers = 'showers',
  wifi = 'wifi',
  handicap = 'handicap',

  // Terrain
  beach = 'beach',
  cave = 'cave',
  desert = 'desert',
  forest = 'forest',
  hotSpring = 'hotSpring',
  lake = 'lake',
  river = 'river',
  swimmingHole = 'swimmingHole',
  waterfall = 'waterfall',
  creek = 'creek',
}

export const listingSearchTool = (server: McpServer, campertunityClient: CampertunityClient) => {
  server.tool(
    'listing-search',
    'Search for campgrounds and outdoor recreation listings',
    {
      limit: z.number().default(50).optional().describe('Number of listings to return. Default is 50, max is 1000.'),
      cursor: z.string().optional().describe('Pagination cursor from a previous response. Used for browsing all listings without search params.'),
      startDate: z.string().optional().describe('Start date for availability search. Format: YYYY-MM-DD'),
      endDate: z.string().optional().describe('End date for availability search. Format: YYYY-MM-DD'),
      adults: z.number().optional().describe('Number of adults. Default is 1.'),
      children: z.number().optional().describe('Number of children. Default is 0.'),
      latitude: z.number().optional().describe('Latitude to filter by.'),
      longitude: z.number().optional().describe('Longitude to filter by.'),
      radius: z.number().optional().default(20).describe('Radius to filter by (in km).'),
      region: z.string().optional().describe('Region/state to search in. Will be geocoded to coordinates if latitude/longitude not provided.'),
      city: z.string().optional().describe('City to search in. Will be geocoded to coordinates if latitude/longitude not provided.'),
      country: z.string().optional().describe('Country to search in. Will be geocoded to coordinates if latitude/longitude not provided.'),
      countryCode: z.string().optional().describe('Country code to search in (e.g. "US", "CA"). Will be geocoded to coordinates if latitude/longitude not provided.'),
      filters: z.array(z.enum(Object.values(Tag) as [string, ...string[]])).optional().describe('Filter out listings that have specific tags.'),
      campgroundDescription: z.string().optional().describe('Describe the campground you are looking for. Note: not the location, but something about the campground like "has a pool" or "near a lake" or "has a playground"'),
    },
    async ({ limit, cursor, startDate, endDate, adults, children, latitude, longitude, radius, region, city, country, countryCode, filters, campgroundDescription }) => {
      try {
        const params = new URLSearchParams();
        if (limit) params.set('limit', limit.toString());
        if (cursor) params.set('cursor', cursor);
        if (startDate) params.set('startDate', startDate);
        if (endDate) params.set('endDate', endDate);
        if (adults) params.set('adults', adults.toString());
        if (children) params.set('children', children.toString());
        if (latitude) params.set('latitude', latitude.toString());
        if (longitude) params.set('longitude', longitude.toString());
        if (radius) params.set('radius', radius.toString());
        if (region) params.set('region', region);
        if (city) params.set('city', city);
        if (country) params.set('country', country);
        if (countryCode) params.set('countryCode', countryCode);
        if (filters) params.set('filters', filters.join(','));
        if (campgroundDescription) params.set('campgroundDescription', campgroundDescription);

        const listings = await campertunityClient.get(`/listings?${params.toString()}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(listings), mimeType: 'application/json' }],
        };
      } catch (error) {
        return {
          content: [{ type: 'text', text: 'Error: ' + (error as Error).message }],
          isError: true,
        };
      }
    }
  );
};
