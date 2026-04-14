#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CampertunityClient } from "./campertunity/client.js";
import { listingAvailabilityTool } from "./tools/listing_availability.js";
import { listingBookTool } from "./tools/listing_book.js";
import { listingDetailsTool } from "./tools/listing_details.js";
import { listingSearchTool } from "./tools/listing_search.js";

const campertunityClient = new CampertunityClient();
const server = new McpServer(
  {
    name: "campertunity-model-context-protocol-server",
    version: "0.0.1",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

listingAvailabilityTool(server, campertunityClient);
listingBookTool(server, campertunityClient);
listingDetailsTool(server, campertunityClient);
listingSearchTool(server, campertunityClient);


async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Campertunity MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
