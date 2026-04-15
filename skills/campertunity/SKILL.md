---
name: campertunity
description: Search for campgrounds, check availability and book campsites across the entire world
metadata: {"openclaw":{"homepage":"https://campertunity.com","install":[{"id":"npm","kind":"node","formula":"campertunity-ai-tools","bins":["campertunity-ai-tools"],"label":"Campertunity MCP Server"}],"requires":{"anyBins":["campertunity-ai-tools","npx"]}}}
---

## When to use

When the user wants to find campgrounds, check campsite availability, or book camping/glamping/RV sites.

## Setup

This skill calls tools provided by the Campertunity MCP server. The MCP server must be configured in the host (e.g. OpenClaw, Claude Desktop, Cursor) — the skill itself only tells the agent *when* and *how* to call the tools.

**Hosted (recommended)** — no install, just point your client at the hosted endpoint:

```json
{
  "mcpServers": {
    "campertunity": {
      "url": "https://campertunity.com/mcp-server",
      "transport": "http"
    }
  }
}
```

For stdio-only clients, bridge via `mcp-remote`:

```json
{
  "mcpServers": {
    "campertunity": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://campertunity.com/mcp-server"]
    }
  }
}
```

**Local (stdio)** — run the server locally via npx:

```json
{
  "mcpServers": {
    "campertunity": {
      "command": "npx",
      "args": ["-y", "campertunity-ai-tools"]
    }
  }
}
```

## Available tools

- **listing-search** - Search campgrounds by location, amenities, dates, and filters (pet-friendly, RV hookups, hiking, etc.)
- **listing-details** - Get full details about a specific campground (description, amenities, photos, reviews)
- **listing-availability** - Check campsite availability for specific dates
- **listing-book** - Get a booking URL for a campground

## Workflow

1. Use `listing-search` to find campgrounds matching the user's criteria
   - Always include location (city/region/country or lat/lng)
   - Use filters for specific needs (petFriendly, rv, hiking, etc.)
   - Include dates if the user has them
2. Present results in a clear table with name, distance, rating, and price
3. If the user wants more info, use `listing-details` for the specific listing
4. Check availability with `listing-availability` when the user has dates
5. Provide a booking link with `listing-book`

## Tips

- If a search returns no results, try broadening the radius or removing filters
- Availability is not supported for all listings — some will return a link to check manually
- The `campgroundDescription` parameter supports natural language (e.g. "near a lake with swimming")
