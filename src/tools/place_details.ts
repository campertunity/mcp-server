import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { CampertunityClient } from '../campertunity/client.js';

// NOTE: This is a tool since tools are more supported by the MCP protocol
export const placeDetailsTool = (server: McpServer, campertunityClient: CampertunityClient) => {
  server.tool(
    'place-details',
    {
      placeId: z.string().describe('The id of the place to get details for.'),
    },
    async ({ placeId }) => {
      try {
        const place = await campertunityClient.get(`/place/details?placeId=${placeId}`);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(place),
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
