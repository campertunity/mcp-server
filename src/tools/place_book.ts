import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { z } from 'zod';
import { CampertunityClient } from '../campertunity/client.js';

export const placeBookTool = (server: McpServer, campertunityClient: CampertunityClient) => {
  server.tool(
    'place-book',
    {
      placeId: z.string().describe('The id of the place to book.'),
      startDate: z.string().optional().describe('The start date of the booking. Format: YYYY-MM-DD'),
      endDate: z.string().optional().describe('The end date of the booking. Format: YYYY-MM-DD'),
      adults: z.number().default(1).describe('Number of adults. Default is 1.'),
      children: z.number().default(0).describe('Number of children. Default is 0.'),
    },
    async ({ placeId, startDate, endDate, adults, children }) => {
      try {
        const availability = await campertunityClient.post(`/place/book`, {
          placeId,
          startDate,
          endDate,
          adults,
          children,
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
