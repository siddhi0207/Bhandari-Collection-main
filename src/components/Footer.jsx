// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#f8f9fa', padding: '2rem', marginTop: 'auto', borderTop: '1px solid #eaeaea' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        
        <div>
          <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Bhandari Collections</h3>
          <p style={{ margin: 0, color: '#666' }}>Premium Sarees & Authentic Ethnic Wear.</p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <strong style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Visit Our Store:</strong>
          
          <p style={{ margin: '0 0 10px 0', color: '#666', lineHeight: '1.5' }}>
            Infront of Jain Mandir, Gol Bazar<br />
            Budhwari Para, Dongargarh - 491445
          </p>
          
          <a 
            href="https://www.google.com/maps/search/?api=1&query=Jain+Mandir+Gol+Bazar+Budhwari+Para+Dongargarh+491445" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#0066cc', textDecoration: 'none', fontWeight: 'bold' }}
          >
            📍 Open in Google Maps
          </a>
        </div>
      </div>
    </footer>
  );
}