import { useState } from 'react';
import Map, { Source, Layer, Popup, type StyleSpecification, type MapLayerMouseEvent } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import RouteLegend from './RouteLegend';
import IsochroneLegend from './IsochroneLegend';


const STYLE_SPECIFICATION: StyleSpecification = {
  version: 8,
  sources: {
    "raster-tiles": {
      type: "raster",
      tiles: [
        "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ],
      tileSize: 256
    }
  },
  layers: [
    {
      id: "background",
      type: "background",
      paint: {
        "background-color": "#1a1a1a"
      }
    },
    {
      id: "osm-tiles",
      type: "raster",
      source: "raster-tiles",
      minzoom: 0,
      maxzoom: 24,
      paint: {
        "raster-saturation": -1,
        "raster-contrast": 0,
        "raster-brightness-min": 0,
        "raster-brightness-max": 1,
        "raster-opacity": 0.7
      }
    }
  ]
};



function App() {
  const [hoveredStop, setHoveredStop] = useState<{
    name: string;
    longitude: number;
    latitude: number;
    stopId: string;
  } | null>(null);
  
  const [lockedStop, setLockedStop] = useState<{
    name: string;
    longitude: number;
    latitude: number;
    stopId: string;
  } | null>(null);


  const handleStopClick = (event: MapLayerMouseEvent) => {
    const feature = event.features?.[0];
    if (feature && feature.geometry.type === 'Point') {
      const stopData = {
        name: feature.properties?.stop_name || '',
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
        stopId: feature.properties?.stop_id || ''
      };
      
      // If clicking the same station that's already locked, unlock it
      if (lockedStop && lockedStop.stopId === stopData.stopId) {
        setLockedStop(null);
      } else {
        // Lock the clicked station
        setLockedStop(stopData);
      }
    }
  };

  const handleStopHover = (event: MapLayerMouseEvent) => {
    // Don't update hover state if a station is locked
    if (lockedStop) return;
    
    const feature = event.features?.[0];
    if (feature && feature.geometry.type === 'Point') {
      setHoveredStop({
        name: feature.properties?.stop_name || '',
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
        stopId: feature.properties?.stop_id || ''
      });
    }
  };

  const handleStopLeave = () => {
    // Don't clear hover state if a station is locked
    if (lockedStop) return;
    setHoveredStop(null);
  };


  return (
    <Map
      initialViewState={{
        longitude: 11.576,
        latitude: 48.137,
        zoom: 14
      }}
      style={{width: '100vw', height: '100vh'}}
      mapStyle={STYLE_SPECIFICATION}
      onClick={handleStopClick}
      onMouseEnter={handleStopHover}
      onMouseLeave={handleStopLeave}
      interactiveLayerIds={['stops-layer']}
    >
      {[
        '1-U1-G-015-2_0.geojson',
        '1-U2-G-015-2_0.geojson',
        '1-U3-G-015-2_0.geojson',
        '1-U4-G-015-2_0.geojson',
        '1-U5-G-015-2_0.geojson',
        '1-U6-G-015-2_0.geojson',
        '1-U7-G-015-2_0.geojson',
        '1-U8-G-015-2_0.geojson'
      ].map((filename, index) => (
        <Source
          key={filename}
          id={`route-${index}`}
          type="geojson"
          data={`/data/routes/${filename}`}
        >
          <Layer
            id={`route-layer-${index}`}
            type="line"
            paint={{
              'line-color': ['get', 'route_color'],
              'line-width': 4
            }}
          />
        </Source>
      ))}
      <Source
        id="stops"
        type="geojson"
        data="/data/stops/stops.geojson"
      >
        <Layer
          id="stops-layer"
          type="circle"
          paint={{
            'circle-color': '#ffffff',
            'circle-radius': 6,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#000000'
          }}
        />
      </Source>
      {(lockedStop || hoveredStop) && (
        <Source
          id="isochrones"
          type="geojson"
          data={`/data/isochrones/${(lockedStop || hoveredStop)?.stopId}.geojson`}
        >
          <Layer
            id="isochrones-layer"
            type="fill"
            paint={{
              'fill-color': ['get', 'fill'],
              'fill-opacity': 0.2
            }}
            beforeId="stops-layer"
          />
        </Source>
      )}
      {(lockedStop || hoveredStop) && (
        <Popup
          longitude={(lockedStop || hoveredStop)?.longitude || 0}
          latitude={(lockedStop || hoveredStop)?.latitude || 0}
          closeButton={false}
          closeOnClick={false}
          anchor="bottom"
        >
          <div>
            {(lockedStop || hoveredStop)?.name}
            {lockedStop && <span style={{ marginLeft: '8px', fontSize: '12px', color: '#666' }}>🔒</span>}
          </div>
        </Popup>
      )}
      <RouteLegend />
      <IsochroneLegend />
    </Map>
  );

}

export default App
