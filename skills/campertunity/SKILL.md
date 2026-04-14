---
name: campertunity
description: Search for campgrounds, check availability and book campsites across the entire world
metadata: {"openclaw":{"homepage":"https://campertunity.com","install":[{"id":"npm","kind":"node","formula":"campertunity-ai-tools","bins":["campertunity-ai-tools"],"label":"Campertunity MCP Server"}],"requires":{"anyBins":["campertunity-ai-tools","npx"]}}}
---

## When to use

When the user wants to find campgrounds, check campsite availability, or book camping/glamping/RV sites.

## Setup

Add the MCP server to your config:

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
