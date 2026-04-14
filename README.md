# MCP Server for Campertunity

[![smithery badge](https://smithery.ai/badge/@campertunity/mcp-server)](https://smithery.ai/server/@campertunity/mcp-server)

This server implements the Model Context Protocol (MCP) for Campertunity, providing AI models with tools to interact with camping and outdoor recreation data.

## MCP Client Config

```
{
  "mcpServers": {
    "campground-search-mcp-server": {
      "command": "npx",
      "args": ["-y", "campertunity-mcp-server@latest"]
    }
  }
}
```

## Setup

No API key is required to get started. To get higher rate limits, get an API key from [https://campertunity.com/mcp](https://campertunity.com/mcp) and set it as an environment variable:

```
{
  "mcpServers": {
    "campground-search-mcp-server": {
      "command": "npx",
      "args": ["-y", "campertunity-mcp-server@latest"],
      "env": {
        "CAMPERTUNITY_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Available Tools

### listing-search
Search for camping listings with various filters and criteria, or browse all listings with cursor pagination.
- **Parameters:**
  - `limit`: Number of results (default: 50, max: 1000)
  - `cursor`: Pagination cursor from a previous response (for browsing without search params)
  - `startDate`: Start date for availability (YYYY-MM-DD)
  - `endDate`: End date for availability (YYYY-MM-DD)
  - `adults`: Number of adults (default: 1)
  - `children`: Number of children (default: 0)
  - `latitude`: Center point latitude
  - `longitude`: Center point longitude
  - `radius`: Search radius in kilometers (default: 20)
  - `region`: Region/state to search in (geocoded if lat/lng not provided)
  - `city`: City to search in (geocoded if lat/lng not provided)
  - `country`: Country to search in (geocoded if lat/lng not provided)
  - `countryCode`: Country code to search in, e.g. "US", "CA" (geocoded if lat/lng not provided)
  - `filters`: Array of tags to filter by (see Tag enum below)
  - `campgroundDescription`: Natural language description of desired campground features

### listing-details
Get detailed information about a specific listing.
- **Parameters:**
  - `listingId`: ID of the listing to get details for

### listing-availability
Check availability of camping sites at a specific listing.
- **Parameters:**
  - `listingId`: ID of the listing to check
  - `siteIds`: Optional array of specific site IDs to check
  - `startDate`: Start date (YYYY-MM-DD)
  - `endDate`: End date (YYYY-MM-DD)

### listing-book
Get a booking URL for a listing.
- **Parameters:**
  - `listingId`: ID of the listing to book
  - `startDate`: Start date (YYYY-MM-DD)
  - `endDate`: End date (YYYY-MM-DD)
  - `adults`: Number of adults (default: 1)
  - `children`: Number of children (default: 0)

## Available Tags for Filtering

### Site Types
- tent
- rv
- lodging
- glamping
- cabin

### Access Types
- driveIn
- walkIn
- equestrian
- boat

### Activities
- biking
- boating
- fishing
- hiking
- horsebackRiding
- paddling
- windSports
- surfing
- swimming
- whitewaterPaddling
- wildlifeWatching

### Amenities
- picnicTable
- fires
- toilets
- outhouse
- potableWater
- petFriendly
- rvHookup
- rvSanitation
- trash
- showers
- wifi
- handicap

### Terrain
- beach
- cave
- desert
- forest
- hotSpring
- lake
- river
- swimmingHole
- waterfall
- creek

## Important Notice

The data provided through these tools is collected from multiple sources and enhanced with AI. To ensure data accuracy and respect intellectual property rights:

- Do not redistribute the data
- Do not save or cache the data
- Do not modify the data
- Always use real-time data through the server

For more information, visit [campertunity.com](https://campertunity.com)
