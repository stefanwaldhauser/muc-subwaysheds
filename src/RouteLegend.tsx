const ROUTE_LEGEND = [
  { name: "U1", color: "#46B450" },
  { name: "U2", color: "#B4283C" },
  { name: "U3", color: "#E66432" },
  { name: "U4", color: "#00A082" },
  { name: "U5", color: "#A06E1E" },
  { name: "U6", color: "#005A96" },
  { name: "U7", color: "#46B450" },
  { name: "U8", color: "#B4283C" }
];

function RouteLegend() {
  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '20px',
      backgroundColor: 'rgba(40, 40, 40, 0.9)',
      padding: '15px',
      borderRadius: '8px',
      fontSize: '14px',
      fontFamily: 'Arial, sans-serif',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#fff' }}>U-Bahn Lines</div>
      {ROUTE_LEGEND.map((route) => (
        <div key={route.name} style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '5px' 
        }}>
          <div style={{
            width: '20px',
            height: '4px',
            backgroundColor: route.color,
            marginRight: '10px',
            borderRadius: '2px'
          }}></div>
          <span style={{ color: '#fff', fontWeight: '500' }}>{route.name}</span>
        </div>
      ))}
    </div>
  );
}

export default RouteLegend;