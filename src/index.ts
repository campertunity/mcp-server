#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CampertunityClient } from "./campertunity/client.js";
import { placeAvailabilityTool } from "./tools/place_availability.js";
import { placeBookTool } from "./tools/place_book.js";
import { placeDetailsTool } from "./tools/place_details.js";
import { placeSearchTool } from "./tools/place_search.js";

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

placeAvailabilityTool(server, campertunityClient);
placeBookTool(server, campertunityClient);
placeDetailsTool(server, campertunityClient);
placeSearchTool(server, campertunityClient);


async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Campertunity MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});