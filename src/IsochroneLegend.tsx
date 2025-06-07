const ISOCHRONE_LEGEND = [
  { duration: "10 minutes", color: "#0570b0" },
  { duration: "20 minutes", color: "#74a9cf" },
  { duration: "30 minutes", color: "#bdc9e1" },
  { duration: "40 minutes", color: "#f1eef6" }
];

import { useState } from 'react';

function IsochroneLegend() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      backgroundColor: 'rgba(40, 40, 40, 0.9)',
      padding: '15px',
      borderRadius: '8px',
      fontSize: '14px',
      fontFamily: 'Arial, sans-serif',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      maxWidth: showDetails ? '400px' : '300px'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '10px' 
      }}>
        <div style={{ fontWeight: 'bold', color: '#fff', marginRight: '8px' }}>Travel Time Zones</div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          style={{
            background: 'none',
            border: '1px solid #666',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            color: '#fff',
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          i
        </button>
      </div>
      <div style={{ fontSize: '12px', color: '#ccc', marginBottom: '10px', lineHeight: '1.4' }}>
        Hover over a station to see how far you can travel using subway + walking
      </div>
      {ISOCHRONE_LEGEND.map((item) => (
        <div key={item.duration} style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '5px'
        }}>
          <div style={{
            width: '20px',
            height: '12px',
            backgroundColor: item.color,
            marginRight: '10px',
            borderRadius: '2px',
            border: '1px solid #666'
          }}></div>
          <span style={{ color: '#fff', fontWeight: '400' }}>{item.duration}</span>
        </div>
      ))}
      
      {showDetails && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '6px',
          fontSize: '12px',
          color: '#ccc',
          lineHeight: '1.4'
        }}>
          <div style={{ fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>How This Works:</div>
          
          <div style={{ marginBottom: '8px' }}>
            <strong style={{ color: '#fff' }}>The Problem:</strong> If you're at a transit stop, how far can you realistically get within a certain amount of time using public transport + walking?
          </div>
          
          <div style={{ marginBottom: '8px' }}>
            <strong style={{ color: '#fff' }}>The Calculation:</strong>
            <ol style={{ margin: '4px 0', paddingLeft: '16px' }}>
              <li>Takes travel time data between transit stations</li>
              <li>For each time limit (10, 20, 30, 40 minutes):
                <ul style={{ marginTop: '2px', paddingLeft: '16px' }}>
                  <li>Finds all stations reachable within that time by transit</li>
                  <li>Calculates how much time is left over for walking (assumes 1.2 m/s walking speed)</li>
                  <li>Creates circular "walking zones" around each reachable station</li>
                  <li>Combines all these zones into one continuous area (isochrone)</li>
                </ul>
              </li>
            </ol>
          </div>
          
          <div style={{ marginBottom: '8px' }}>
            <strong style={{ color: '#fff' }}>The Output:</strong> Colored zones on a map showing what you can reach in each time limit.
          </div>
          
          <div style={{ marginBottom: '12px' }}>
            This is useful for urban planning, finding apartments, or understanding transit accessibility - basically answering "what can I reach from this location within X minutes?"
          </div>
          
          <div style={{ 
            borderTop: '1px solid #555', 
            paddingTop: '8px', 
            fontSize: '11px',
            color: '#999'
          }}>
            <div style={{ fontWeight: 'bold', color: '#ccc', marginBottom: '6px' }}>Credits & Data Sources:</div>
            <div style={{ marginBottom: '3px' }}>
              Idea inspired by <a href="https://subwaysheds.com" target="_blank" rel="noopener noreferrer" style={{ color: '#74a9cf', textDecoration: 'none' }}>subwaysheds.com</a>
            </div>
            <div style={{ marginBottom: '3px' }}>
              Isochrone calculation adapted from <a href="https://github.com/chriswhong/nyc-subway-isochrones" target="_blank" rel="noopener noreferrer" style={{ color: '#74a9cf', textDecoration: 'none' }}>NYC Subway Isochrones</a>
            </div>
            <div style={{ marginBottom: '3px' }}>
              MVG data from <a href="https://www.mvg.de/verbindungen/Fahrplandaten.html" target="_blank" rel="noopener noreferrer" style={{ color: '#74a9cf', textDecoration: 'none' }}>mvg.de</a>
            </div>
            <div>
              Reach out with feedback: <a href="https://blog.stefanwaldhauser.me/" target="_blank" rel="noopener noreferrer" style={{ color: '#74a9cf', textDecoration: 'none' }}>stefanwaldhauser.me</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IsochroneLegend;
