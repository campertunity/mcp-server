import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { CampertunityClient } from '../campertunity/client.js';

export const placeAvailabilityTool = (server: McpServer, campertunityClient: CampertunityClient) => {
  server.tool(
    'place-availability',
    {
      placeId: z.string().describe('The id of the place to check availability for.'),
      siteIds: z.array(z.string()).optional().describe('The ids of the sites to check availability for.'),
      startDate: z.string().describe('The start date to check availability for. Format: YYYY-MM-DD'),
      endDate: z.string().describe('The end date to check availability for. Format: YYYY-MM-DD'),
    },
    async ({ placeId, siteIds, startDate, endDate }) => {
      try {
        const availability = await campertunityClient.post(`/place/availability`, {
          placeId,
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
