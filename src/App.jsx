import { useState, useEffect } from 'react';
import Store from './components/Store';
import Admin from './components/Admin';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if URL has #admin to unlock the admin panel secretly
    const checkAdminRoute = () => {
      if (window.location.hash === '#admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    return () => window.removeEventListener('hashchange', checkAdminRoute);
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fcfbfa', display: 'flex', flexDirection: 'column', fontFamily: '"Playfair Display", Georgia, serif' }}>
      
      {/* Injecting keyframe animations for smooth fades */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .product-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(212, 175, 55, 0.2);
        }
      `}</style>

      {/* Render Admin or Store cleanly without exposing admin links to customers */}
      <main style={{ flex: 1, width: '100%' }}>
        {isAdmin ? <Admin /> : <Store />}
      </main>

    </div>
  );
}