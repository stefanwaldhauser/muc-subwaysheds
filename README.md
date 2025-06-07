# Munich Subway Sheds 🥨

An interactive visualization of Munich's U-Bahn (subway) network showing how far you can travel from any station within specific time limits using public transit and walking.

![Munich Subway Sheds](https://img.shields.io/badge/Built%20with-React%20%2B%20TypeScript-blue?style=flat-square)
![MapLibre GL JS](https://img.shields.io/badge/Maps-MapLibre%20GL%20JS-green?style=flat-square)

## Features

- **Interactive Map**: Explore Munich's U-Bahn network on a dark-themed map
- **Isochrone Visualization**: Hover over any station to see travel time zones (10, 20, 30, 40 minutes)
- **Station Locking**: Click stations to "lock" their isochrones for comparison
- **Route Legend**: Visual guide to all 8 U-Bahn lines with their official colors
- **Detailed Information**: Learn how isochrones are calculated and what they represent

## How It Works

**The Problem**: If you're at a transit stop, how far can you realistically get within a certain amount of time using public transport + walking?

**The Calculation**:
1. Takes travel time data between transit stations
2. For each time limit (10, 20, 30, 40 minutes):
   - Finds all stations reachable within that time by transit
   - Calculates how much time is left over for walking (assumes 1.2 m/s walking speed)
   - Creates circular "walking zones" around each reachable station
   - Combines all these zones into one continuous area (isochrone)

**The Output**: Colored zones on a map showing what you can reach in each time limit.

## Usage

- **Hover** over any station to see its travel time zones
- **Click** a station to lock its visualization 
- **Click** the locked station again to unlock
- **Click** the info button (ⓘ) in the legend for detailed explanations

## Tech Stack

- **React** + **TypeScript** - UI framework and type safety
- **Vite** - Build tool and development server  
- **MapLibre GL JS** - Interactive maps and geospatial rendering
- **GeoJSON** - Geographic data format for routes, stations, and isochrones

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Data Sources & Credits

- **Idea inspired by**: [subwaysheds.com](https://subwaysheds.com)
- **Isochrone calculation adapted from**: [NYC Subway Isochrones](https://github.com/chriswhong/nyc-subway-isochrones)
- **MVG data from**: [mvg.de](https://www.mvg.de/verbindungen/Fahrplandaten.html)
- **Reach out with feedback**: [stefanwaldhauser.me](https://blog.stefanwaldhauser.me/)

## Project Structure

```
src/
├── App.tsx                 # Main map component
├── RouteLegend.tsx         # U-Bahn lines legend
└── IsochroneLegend.tsx     # Travel time zones legend

public/
└── data/
    ├── routes/             # U-Bahn line geometries
    ├── stops/              # Station locations  
    └── isochrones/         # Travel time zone polygons
```

## License

This project is for educational and research purposes. Transit data belongs to MVG (Münchner Verkehrsgesellschaft).

---

Built with ❤️ for Munich's amazing public transit system