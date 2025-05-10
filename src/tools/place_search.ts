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

export const placeSearchTool = (server: McpServer, campertunityClient: CampertunityClient) => {
  server.tool(
    'place-search',
    {
      limit: z.number().default(50).optional().describe('Number of places to return. Default is 50, max is 1000.'),
      startDate: z.string().optional().describe('Start date for availability search. Format: YYYY-MM-DD'),
      endDate: z.string().optional().describe('End date for availability search. Format: YYYY-MM-DD'),
      adults: z.number().optional().describe('Number of adults. Default is 1.'),
      children: z.number().optional().describe('Number of children. Default is 0.'),
      latitude: z.number().optional().describe('Latitude to filter by.'),
      longitude: z.number().optional().describe('Longitude to filter by.'),
      radius: z.number().optional().default(20).describe('Radius to filter by (in km).'),
      filters: z.array(z.enum(Object.values(Tag) as [string, ...string[]])).optional().describe('Filter out places that have specific tags.'),
      campgroundDescription: z.string().optional().describe('Describe the campground you are looking for. Note: not the location, but something about the campground like "has a pool" or "near a lake" or "has a playground"'),
    },
    async ({ limit, startDate, endDate, adults, children, latitude, longitude, radius, filters, campgroundDescription }) => {
      try {
        const params = new URLSearchParams();
        if (limit) params.set('limit', limit.toString());
        if (startDate) params.set('startDate', startDate);
        if (endDate) params.set('endDate', endDate);
        if (adults) params.set('adults', adults.toString());
        if (children) params.set('children', children.toString());
        if (latitude) params.set('latitude', latitude.toString());
        if (longitude) params.set('longitude', longitude.toString());
        if (radius) params.set('radius', radius.toString());
        if (filters) params.set('filters', filters.join(','));
        if (campgroundDescription) params.set('campgroundDescription', campgroundDescription);

        const places = await campertunityClient.get(`/place/search?${params.toString()}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(places), mimeType: 'application/json' }],
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
