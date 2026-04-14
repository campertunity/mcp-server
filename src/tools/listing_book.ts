import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { CampertunityClient } from '../campertunity/client.js';

export const listingBookTool = (server: McpServer, campertunityClient: CampertunityClient) => {
  server.tool(
    'listing-book',
    'Get a booking URL for a campground or recreation site',
    {
      listingId: z.string().describe('The id of the listing to book.'),
      startDate: z.string().optional().describe('The start date of the booking. Format: YYYY-MM-DD'),
      endDate: z.string().optional().describe('The end date of the booking. Format: YYYY-MM-DD'),
      adults: z.number().default(1).describe('Number of adults. Default is 1.'),
      children: z.number().default(0).describe('Number of children. Default is 0.'),
    },
    async ({ listingId, startDate, endDate, adults, children }) => {
      try {
        const result = await campertunityClient.post(`/listings/campgrounds/${encodeURIComponent(listingId)}/book`, {
          startDate,
          endDate,
          adults,
          children,
        });
        return {
          content: [{ type: 'text', text: JSON.stringify(result), mimeType: 'application/json' }],
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
