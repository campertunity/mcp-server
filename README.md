# Campertunity AI Tools

AI tools to search for campgrounds, check availability and book campsites across the entire world.

Includes **agent skill files** and an **MCP server** for AI-powered campground discovery.

## Agent Skill Files

This package includes skill files compatible with [OpenClaw](https://openclawlab.com), [Claude Code](https://claude.ai/claude-code), [Codex](https://openai.com/codex), and other agent platforms that support the SKILL.md format.

Install the skill:

```bash
# OpenClaw
openclaw skills install campertunity

# Claude Code / other platforms
# Copy skills/campertunity/SKILL.md to your workspace skills directory
```

## MCP Server

### Quick Start

```json
{
  "mcpServers": {
    "campertunity": {
      "command": "npx",
      "args": ["-y", "campertunity-ai-tools@latest"]
    }
  }
}
```

### API Key (optional)

No API key is required. For higher rate limits, get a key from [campertunity.com/mcp](https://campertunity.com/mcp):

```json
{
  "mcpServers": {
    "campertunity": {
      "command": "npx",
      "args": ["-y", "campertunity-ai-tools@latest"],
      "env": {
        "CAMPERTUNITY_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Available Tools

### listing-search

Search for campgrounds with filters and location-based search.

| Parameter | Type | Description |
|-----------|------|-------------|
| `limit` | number | Results to return (default: 50, max: 1000) |
| `cursor` | string | Pagination cursor from previous response |
| `startDate` | string | Availability start date (YYYY-MM-DD) |
| `endDate` | string | Availability end date (YYYY-MM-DD) |
| `adults` | number | Number of adults (default: 1) |
| `children` | number | Number of children (default: 0) |
| `latitude` | number | Center point latitude |
| `longitude` | number | Center point longitude |
| `radius` | number | Search radius in km (default: 20) |
| `region` | string | Region/state (geocoded if no lat/lng) |
| `city` | string | City (geocoded if no lat/lng) |
| `country` | string | Country (geocoded if no lat/lng) |
| `countryCode` | string | Country code, e.g. "US", "CA" |
| `filters` | string[] | Tags to filter by (see below) |
| `campgroundDescription` | string | Natural language description |

### listing-details

Get detailed information about a specific listing.

| Parameter | Type | Description |
|-----------|------|-------------|
| `listingId` | string | ID of the listing |

### listing-availability

Check campsite availability for specific dates.

| Parameter | Type | Description |
|-----------|------|-------------|
| `listingId` | string | ID of the listing |
| `siteIds` | string[] | Optional specific site IDs |
| `startDate` | string | Start date (YYYY-MM-DD) |
| `endDate` | string | End date (YYYY-MM-DD) |

### listing-book

Get a booking URL for a campground.

| Parameter | Type | Description |
|-----------|------|-------------|
| `listingId` | string | ID of the listing |
| `startDate` | string | Start date (YYYY-MM-DD) |
| `endDate` | string | End date (YYYY-MM-DD) |
| `adults` | number | Number of adults (default: 1) |
| `children` | number | Number of children (default: 0) |

## Filter Tags

**Site Types:** tent, rv, lodging, glamping, cabin

**Access:** driveIn, walkIn, equestrian, boat

**Activities:** biking, boating, fishing, hiking, horsebackRiding, paddling, windSports, surfing, swimming, whitewaterPaddling, wildlifeWatching

**Amenities:** picnicTable, fires, toilets, outhouse, potableWater, petFriendly, rvHookup, rvSanitation, trash, showers, wifi, handicap

**Terrain:** beach, cave, desert, forest, hotSpring, lake, river, swimmingHole, waterfall, creek

## Data Notice

Data is collected from multiple sources and enhanced with AI. Do not redistribute, cache, or modify the data. Always use real-time data through the server.

For more information, visit [campertunity.com](https://campertunity.com).
