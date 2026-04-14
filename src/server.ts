import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CampertunityBackend } from "./types.js";
import { registerTools } from "./tools.js";

export function createMcpServer(backend: CampertunityBackend): McpServer {
  const server = new McpServer(
    {
      name: "campertunity",
      version: "0.1.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  registerTools(server, backend);

  return server;
}
