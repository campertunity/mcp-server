import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { CampertunityClient } from '../campertunity/client.js';

export const listingDetailsTool = (server: McpServer, campertunityClient: CampertunityClient) => {
  server.tool(
    'listing-details',
    'Get detailed information about a specific listing',
    {
      listingId: z.string().describe('The id of the listing to get details for.'),
    },
    async ({ listingId }) => {
      try {
        const listing = await campertunityClient.get(`/listings/campgrounds/${encodeURIComponent(listingId)}`);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(listing),
              mimeType: 'application/json',
            },
          ],
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
