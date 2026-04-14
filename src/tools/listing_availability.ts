import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { CampertunityClient } from '../campertunity/client.js';

export const listingAvailabilityTool = (server: McpServer, campertunityClient: CampertunityClient) => {
  server.tool(
    'listing-availability',
    'Check availability for specific campsites at a listing',
    {
      listingId: z.string().describe('The id of the listing to check availability for.'),
      siteIds: z.array(z.string()).optional().describe('The ids of the sites to check availability for.'),
      startDate: z.string().describe('The start date to check availability for. Format: YYYY-MM-DD'),
      endDate: z.string().describe('The end date to check availability for. Format: YYYY-MM-DD'),
    },
    async ({ listingId, siteIds, startDate, endDate }) => {
      try {
        const availability = await campertunityClient.post(`/listings/campgrounds/${encodeURIComponent(listingId)}/availability`, {
          siteIds,
          startDate,
          endDate,
        });
        return {
          content: [{ type: 'text', text: JSON.stringify(availability), mimeType: 'application/json' }],
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
