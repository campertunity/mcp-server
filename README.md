# MCP Server for Campertunity

This server implements the Model Context Protocol (MCP) for Campertunity, providing AI models with tools to interact with camping and outdoor recreation data.

## MCP Client Config

```
{
  "mcpServers": {
    "campground-search-mcp-server": {
      "command": "npx",
      "args": ["-y", "campertunity-mcp-server"],
      "env": {
        "CAMPERTUNITY_API_KEY": "your_api_key_here",
      }
    }
  }
}
```


## Setup

1. Get your API key from [https://campertunity.com/mcp](https://campertunity.com/mcp)
2. Set the environment variable:
   ```
   CAMPERTUNITY_API_KEY=your_api_key_here
   ```

## Available Tools

### place-search
Search for camping places with various filters and criteria.
- **Parameters:**
  - `limit`: Number of results (default: 50, max: 1000)
  - `startDate`: Start date for availability (YYYY-MM-DD)
  - `endDate`: End date for availability (YYYY-MM-DD)
  - `adults`: Number of adults (default: 1)
  - `children`: Number of children (default: 0)
  - `latitude`: Center point latitude
  - `longitude`: Center point longitude
  - `radius`: Search radius in kilometers (default: 20)
  - `filters`: Array of tags to filter by (see Tag enum below)
  - `campgroundDescription`: Natural language description of desired campground features

### place-details
Get detailed information about a specific camping place.
- **Parameters:**
  - `placeId`: ID of the place to get details for

### place-availability
Check availability of camping sites at a specific place.
- **Parameters:**
  - `placeId`: ID of the place to check
  - `siteIds`: Optional array of specific site IDs to check
  - `startDate`: Start date (YYYY-MM-DD)
  - `endDate`: End date (YYYY-MM-DD)

### place-book
Book a camping site.
- **Parameters:**
  - `placeId`: ID of the place to book
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