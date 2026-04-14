#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { HttpBackend } from "./backend/http.js";
import { createMcpServer } from "./server.js";

// Re-export for library consumers
export { createMcpServer } from "./server.js";
export { registerTools } from "./tools.js";
export { HttpBackend } from "./backend/http.js";
export type {
  CampertunityBackend,
  SearchParams,
  AvailabilityParams,
  BookingParams,
} from "./types.js";

async function runServer() {
  const backend = new HttpBackend();
  const server = createMcpServer(backend);
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Campertunity MCP Server running on stdio");
}

// Only start stdio server when executed directly (not imported as library)
if (require.main === module) {
  runServer().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
  });
}
