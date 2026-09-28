import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

// ==========================================
// TRADITIONAL INDIAN MOTIFS (PURE SVG)
// ==========================================

const LotusMotif = ({ className, style, fill = "var(--gold)" }) => (
  <svg viewBox="0 0 60 40" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <path d="M30 35 C15 35 10 20 20 5 C25 2 30 0 30 0 C30 0 35 2 40 5 C50 20 45 35 30 35 Z" fill="none" stroke={fill} strokeWidth="1.5" />
    <path d="M30 30 C20 30 15 20 18 10 C22 5 30 5 30 5 C30 5 38 5 42 10 C45 20 40 30 30 30 Z" fill={fill} opacity="0.8" />
  </svg>
);

export default function Store() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Make sure this is your newly updated number!
  const shopPhoneNumber = "919993257090"; 

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) console.error('Error fetching products:', error.message);
    else setProducts(data || []);
  };

  const changePage = (pageName) => {
    setCurrentPage(pageName);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 'smooth', top: 0 });
  };

  const filteredProducts = products.filter((item) => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bhandari-app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');

        :root {
          --maroon: #5A181D;
          --maroon-dark: #3A0F14;
          --gold: #D4AF37;
          --gold-muted: #C5A87C;
          --cream: #FAF7F2;
          --text-dark: #2C2621;
          
          --teal-hero: #0F3832; 
          --teal-dark: #0A2622;
          --whatsapp-green: #155D50;
          
          --weave-pattern: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v12H0z' fill='none'/%3E%3Cpath d='M0 0l6 6-6 6M12 0l-6 6 6 6' stroke='%23000000' stroke-width='0.5' opacity='0.04'/%3E%3C/svg%3E");
          --zari-border: url("data:image/svg+xml,%3Csvg width='40' height='10' viewBox='0 0 40 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 5 L10 0 L20 5 L10 10 Z M20 5 L30 0 L40 5 L30 10 Z' fill='none' stroke='%23C5A87C' stroke-width='0.8' opacity='0.7'/%3E%3Ccircle cx='10' cy='5' r='1.5' fill='%23C5A87C' opacity='0.9'/%3E%3Ccircle cx='30' cy='5' r='1.5' fill='%23C5A87C' opacity='0.9'/%3E%3C/svg%3E");
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body, html { 
          background-color: var(--cream); 
          color: var(--text-dark); 
          font-family: 'Inter', sans-serif; 
          overflow-x: hidden; 
        }

        .serif { font-family: 'Playfair Display', serif; }
        .designer-font { font-family: 'Cinzel', serif; }

        /* ========================================= */
        /* ELEGANT NAVBAR                            */
        /* ========================================= */
        .navbar {
          background-color: var(--maroon-dark);
          background-image: var(--weave-pattern);
          border-bottom: 1px solid var(--gold-muted);
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 4px 15px rgba(0,0,0,0.4);
        }

        .nav-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem 2rem 0 2rem;
        }

        .designer-logo {
          text-align: center;
          cursor: pointer;
          margin-bottom: 1.2rem;
        }

        .brand-name {
          font-size: 2.2rem;
          color: var(--gold);
          letter-spacing: 6px;
          line-height: 1;
          font-weight: 500;
        }
        
        .brand-sub {
          color: var(--cream);
          font-size: 0.75rem;
          letter-spacing: 8px;
          text-transform: uppercase;
          margin-top: 8px;
          font-weight: 300;
          opacity: 0.8;
        }

        .nav-links-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          gap: 3.5rem;
          border-top: 1px solid rgba(197, 168, 124, 0.2);
          padding: 1rem 0;
        }

        .nav-item {
          color: var(--cream);
          background: none;
          border: none;
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 400;
          cursor: pointer;
          transition: color 0.3s ease;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        .nav-item:hover, .nav-item.active { color: var(--gold); }

        .mobile-hamburger { display: none; background: none; border: none; position: absolute; right: 2rem; top: 2rem; cursor: pointer; }
        .hamburger-line { width: 25px; height: 1px; background: var(--gold); margin: 6px 0; }

        @media (max-width: 768px) {
          .nav-links-wrapper { display: none; flex-direction: column; gap: 1.5rem; padding-bottom: 1.5rem; }
          .nav-links-wrapper.open { display: flex; }
          .mobile-hamburger { display: block; }
          .brand-name { font-size: 1.8rem; }
        }

        /* ========================================= */
        /* PERFECTLY ALIGNED TEAL HERO SECTION       */
        /* ========================================= */
        .hero-section {
          background: var(--weave-pattern), linear-gradient(135deg, var(--teal-dark) 0%, var(--teal-hero) 100%);
          background-color: var(--teal-hero);
          position: relative;
          min-height: 85vh;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 5rem 6%;
          overflow: hidden;
          border-bottom: 8px solid var(--gold-muted);
        }

        .hero-zari-top { position: absolute; top: 0; left: 0; width: 100%; height: 20px; background-image: var(--zari-border); opacity: 0.6; z-index: 20; }
        
        .actual-peacock-img {
          height: 125%; 
          max-height: 750px;
          object-fit: contain;
          z-index: 5;
          filter: drop-shadow(0px 20px 30px rgba(0,0,0,0.6));
          pointer-events: none;
          margin-right: 1rem;
        }

        .hero-content-box {
          position: relative;
          z-index: 10;
          border: 1px solid var(--gold-muted);
          padding: 4rem 3.5rem;
          background-color: #0A2622;
          background: rgba(10, 38, 34, 0.75);
          backdrop-filter: blur(8px);
          max-width: 680px;
          width: 100%;
          outline: 1px solid var(--gold-muted);
          outline-offset: -8px; 
          box-shadow: 0 20px 50px rgba(0,0,0,0.6);
          margin-left: 1rem;
        }

        @media (max-width: 1024px) {
          .hero-section { flex-direction: column; justify-content: center; padding: 4rem 2rem; text-align: center; }
          .hero-content-box { margin: 0 auto 2rem auto; padding: 3rem 2rem; }
          .actual-peacock-img { height: 450px; margin: 0 auto; }
        }

        .hero-heading {
          font-size: clamp(2.2rem, 3.8vw, 3.5rem);
          color: var(--gold);
          line-height: 1.25;
          margin-bottom: 1rem;
          font-weight: 400;
          letter-spacing: 2px;
        }
        
        .hero-subheading {
          font-size: 1.15rem;
          color: var(--cream);
          font-style: italic;
          margin-bottom: 2.5rem;
          font-weight: 300;
          letter-spacing: 1px;
        }

        .btn-elegant {
          background: transparent;
          color: var(--gold);
          border: 1px solid var(--gold);
          padding: 1rem 3rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 3px;
          cursor: pointer;
          transition: all 0.4s ease;
        }
        .btn-elegant:hover { background: var(--gold); color: var(--teal-dark); }

        /* ========================================= */
        /* SEARCH BAR                                */
        /* ========================================= */
        .search-container {
          max-width: 600px;
          margin: 4rem auto;
          padding: 0 1.5rem;
        }
        
        .search-input {
          width: 100%;
          padding: 1rem 2rem;
          font-family: 'Lora', serif;
          font-size: 1rem;
          color: var(--text-dark);
          background-color: transparent;
          border: 1px solid var(--gold-muted);
          outline: none;
          text-align: center;
          transition: border-color 0.3s;
        }
        .search-input:focus { border-color: var(--teal-hero); }

        /* ========================================= */
        /* PRODUCT GRID                              */
        /* ========================================= */
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 3rem;
          max-width: 1400px;
          margin: 0 auto 5rem auto;
          padding: 0 2rem;
        }

        .saree-card {
          background-color: #FFFFFF;
          border: 1px solid var(--gold-muted);
          padding: 10px; 
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
          position: relative;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }

        .saree-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(15, 56, 50, 0.15), 0 0 0 1px var(--gold-muted);
          z-index: 10;
        }

        .saree-card-inner {
          border: 1px solid rgba(197, 168, 124, 0.4); 
          padding: 12px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .saree-image-wrapper {
          width: 100%;
          height: 380px;
          background-color: #F7F5F0;
          margin-bottom: 1.5rem;
          overflow: hidden;
          position: relative;
        }

        .saree-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .saree-card:hover .saree-image-wrapper img { transform: scale(1.06); }

        .saree-details {
          text-align: center;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .saree-title {
          font-family: 'Playfair Display', serif;
          font-weight: 600;
          font-size: 1.15rem;
          color: var(--text-dark);
          margin-bottom: 0.5rem;
        }

        .saree-desc {
          font-size: 0.85rem;
          color: #777;
          margin-bottom: 1.2rem;
          line-height: 1.5;
        }

        .saree-price {
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--teal-hero);
          margin-bottom: 1.5rem;
        }

        .btn-whatsapp-book {
          background-color: var(--whatsapp-green);
          color: #FFFFFF;
          border: none;
          padding: 0.8rem;
          width: 100%;
          font-weight: 500;
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 1.5px;
          cursor: pointer;
          text-decoration: none;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s ease;
        }
        .btn-whatsapp-book:hover { background-color: var(--teal-dark); }

        /* ========================================= */
        /* FEATURE CARDS                             */
        /* ========================================= */
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          max-width: 1000px;
          margin: 4rem auto;
          padding: 0 2rem;
        }

        .feature-box {
          background-color: var(--cream);
          border: 1px solid var(--gold-muted);
          padding: 3rem 2rem;
          text-align: center;
          transition: transform 0.3s ease;
          outline: 1px solid var(--gold-muted);
          outline-offset: -6px;
        }
        .feature-box:hover { transform: translateY(-5px); border-color: var(--teal-hero); outline-color: var(--teal-hero); }

        .feature-title {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          color: var(--teal-hero);
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        .feature-subtitle {
          font-size: 0.9rem;
          color: #666;
          letter-spacing: 1px;
        }

        /* ========================================= */
        /* DESIGNER FOOTER                           */
        /* ========================================= */
        .footer {
          background-color: var(--maroon-dark);
          background-image: var(--weave-pattern);
          color: var(--gold-muted);
          padding: 5rem 2rem 2rem 2rem;
          text-align: center;
          border-top: 4px solid var(--gold);
          position: relative;
        }
      `}</style>

      {/* ========================================= */}
      {/* DESIGNER NAVBAR                           */}
      {/* ========================================= */}
      <nav className="navbar">
        <div className="nav-inner">
          <div className="designer-logo" onClick={() => changePage('home')}>
            <h1 className="brand-name designer-font">BHANDARI</h1>
            <div className="brand-sub designer-font">COLLECTION</div>
          </div>

          <button className="mobile-hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </button>

          <div className={`nav-links-wrapper ${mobileMenuOpen ? 'open' : ''}`}>
            <button onClick={() => changePage('home')} className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}>Home</button>
            <button onClick={() => changePage('collection')} className={`nav-item ${currentPage === 'collection' ? 'active' : ''}`}>Collection</button>
            <button onClick={() => changePage('about')} className={`nav-item ${currentPage === 'about' ? 'active' : ''}`}>Heritage</button>
            <button onClick={() => changePage('contact')} className={`nav-item ${currentPage === 'contact' ? 'active' : ''}`}>Contact</button>
          </div>
        </div>
      </nav>

      {/* ========================================= */}
      {/* PAGE RENDERING                            */}
      {/* ========================================= */}
      <div style={{ minHeight: '80vh' }}>
        
        {currentPage === 'home' && (
          <div>
            <div className="hero-section">
              <div className="hero-zari-top"></div>
              
              <div className="hero-content-box">
                <LotusMotif style={{ width: '40px', height: '40px', margin: '0 auto 1.5rem auto' }} />
                <h1 className="hero-heading designer-font">EXPLORE THE COLLECTION</h1>
                <p className="hero-subheading serif">Handcrafted Sarees of Heritage and Artistry.</p>
                <button onClick={() => changePage('collection')} className="btn-elegant">
                  VIEW CATALOGUE
                </button>
              </div>

              <img 
                src="/peacock.png" 
                alt="Bhandari Peacock" 
                className="actual-peacock-img"
              />
            </div>

            <div className="search-container">
              <input 
                type="text" 
                placeholder="Search handcrafted sarees..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            {products.length > 0 ? (
              <div className="product-grid">
                {(searchQuery ? filteredProducts : products.slice(0, 6)).map((item) => (
                  <div key={item.id} className="saree-card">
                    <div className="saree-card-inner">
                      <div className="saree-image-wrapper">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.title} />
                        ) : (
                          <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', color:'#999'}}>
                            <LotusMotif style={{width:'30px', height:'30px', opacity: 0.3}} />
                          </div>
                        )}
                      </div>
                      <div className="saree-details">
                        <h3 className="saree-title">{item.title}</h3>
                        <p className="saree-desc">{item.description}</p>
                        <p className="saree-price">₹{item.price}</p>
                        <a 
                          href={`https://wa.me/${shopPhoneNumber}?text=${encodeURIComponent(`Namaste, I am interested in purchasing: *${item.title}* (Price: ₹${item.price})`)}`}
                          target="_blank" rel="noopener noreferrer" 
                          className="btn-whatsapp-book"
                        >
                          <svg style={{marginRight: '8px'}} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                          BOOK ON WHATSAPP
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{textAlign: 'center', padding: '4rem', fontSize: '1rem', color: '#888'}}>Loading collection...</p>
            )}

            <div style={{ textAlign: 'center', marginTop: '6rem' }}>
               <h2 className="designer-font" style={{fontSize: '2rem', color: 'var(--teal-hero)', letterSpacing: '2px'}}>Our Promise</h2>
               <div style={{width: '40px', height: '1px', background: 'var(--gold)', margin: '1rem auto 0 auto'}}></div>
            </div>
            <div className="feature-grid">
              <div className="feature-box">
                <h3 className="feature-title">100%</h3>
                <p className="feature-subtitle">Authentic Fabrics</p>
              </div>
              <div className="feature-box">
                <h3 className="feature-title">500+</h3>
                <p className="feature-subtitle">Happy Customers</p>
              </div>
              <div className="feature-box">
                <h3 className="feature-title">Direct</h3>
                <p className="feature-subtitle">WhatsApp Booking</p>
              </div>
              <div className="feature-box">
                <h3 className="feature-title">Pan India</h3>
                <p className="feature-subtitle">Delivery</p>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'collection' && (
          <div style={{ paddingTop: '4rem' }}>
            <h1 className="designer-font" style={{textAlign: 'center', fontSize: '2.5rem', color: 'var(--teal-hero)', marginBottom: '1rem', letterSpacing: '2px'}}>Handpicked Sarees</h1>
            <p className="serif" style={{textAlign: 'center', fontSize: '1rem', color: '#666', marginBottom: '3rem', fontStyle: 'italic'}}>
              Every piece is chosen for its fabric, craftsmanship and finish.
            </p>
            
            <div className="search-container" style={{ marginTop: '0', marginBottom: '4rem' }}>
              <input 
                type="text" 
                placeholder="Search catalog..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="product-grid">
              {filteredProducts.map((item) => (
                <div key={item.id} className="saree-card">
                  <div className="saree-card-inner">
                    <div className="saree-image-wrapper">
                      {item.image_url ? <img src={item.image_url} alt={item.title} /> : <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}><LotusMotif style={{width:'30px', height:'30px', opacity: 0.3}} /></div>}
                    </div>
                    <div className="saree-details">
                      <h3 className="saree-title">{item.title}</h3>
                      <p className="saree-desc">{item.description}</p>
                      <p className="saree-price">₹{item.price}</p>
                      <a 
                          href={`https://wa.me/${shopPhoneNumber}?text=${encodeURIComponent(`Namaste, I am interested in purchasing: *${item.title}* (Price: ₹${item.price})`)}`}
                          target="_blank" rel="noopener noreferrer" 
                          className="btn-whatsapp-book"
                        >
                          <svg style={{marginRight: '8px'}} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                          BOOK ON WHATSAPP
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'about' && (
          <div style={{ margin: '6rem auto', maxWidth: '800px', textAlign: 'center', padding: '0 2rem' }}>
            <LotusMotif style={{width: '50px', height: '50px', margin: '0 auto 2rem auto', fill: 'var(--teal-hero)'}} />
            <h1 className="designer-font" style={{fontSize: '2.5rem', color: 'var(--teal-hero)', marginBottom: '1.5rem', letterSpacing: '2px'}}>Woven with tradition, styled for today</h1>
            <div style={{width: '40px', height: '1px', background: 'var(--gold)', margin: '0 auto 3rem auto'}}></div>
            <p className="serif" style={{fontSize: '1.1rem', lineHeight: '2', color: '#555'}}>
              Bhandari Collection is a boutique dedicated to bringing you authentic, beautifully crafted sarees sourced directly from skilled weavers. From everyday cottons to bridal silks, every saree in our catalog is chosen for its quality, comfort and elegance.
            </p>
          </div>
        )}

        {currentPage === 'contact' && (
          <div style={{ margin: '6rem auto', maxWidth: '700px', textAlign: 'center', padding: '0 2rem' }}>
             <h4 className="designer-font" style={{letterSpacing: '4px', color: 'var(--gold-muted)', marginBottom: '1rem', fontSize: '0.85rem'}}>GET IN TOUCH</h4>
             <h1 className="serif" style={{fontSize: '3rem', color: 'var(--teal-hero)', marginBottom: '2rem'}}>Let's find your perfect saree</h1>
             <p className="serif" style={{fontSize: '1.1rem', color: '#666', marginBottom: '4rem', lineHeight: '1.8', fontStyle: 'italic'}}>
                Have a question about fabric, size or availability? Reach out anytime — we usually reply within minutes on WhatsApp.
             </p>
             <div style={{display: 'flex', gap: '2rem', justifyContent: 'center'}}>
                <a href={`https://wa.me/${shopPhoneNumber}`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp-book" style={{maxWidth: '220px', padding: '1rem'}}>
                  MESSAGE US
                </a>
                <a href={`tel:+${shopPhoneNumber}`} style={{border: '1px solid var(--teal-hero)', color: 'var(--teal-hero)', padding: '1rem 2.5rem', textDecoration: 'none', fontWeight: '500', fontFamily: 'Inter', letterSpacing: '1px'}}>
                  CALL US
                </a>
             </div>
          </div>
        )}

      </div>

      {/* ========================================= */}
      {/* DESIGNER FOOTER WITH ADDRESS              */}
      {/* ========================================= */}
      <footer className="footer">
        <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '10px', backgroundImage: 'var(--zari-border)', opacity: 0.4}}></div>
        
        <h2 className="designer-font" style={{ fontSize: '2rem', marginBottom: '1.5rem', letterSpacing: '6px', color: 'var(--gold)', fontWeight: '400' }}>
          BHANDARI COLLECTION
        </h2>
        
        <p className="serif" style={{fontSize: '1rem', marginBottom: '3rem', color: 'var(--cream)', maxWidth: '400px', margin: '0 auto 3rem auto', lineHeight: '1.6', opacity: 0.8}}>
          Infront of Jain Mandir, Gol Bazar, Budhwari Para, Dongargarh - 491445
        </p>

        <div style={{display: 'flex', gap: '3rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap'}}>
          <button onClick={() => changePage('home')} style={{background:'none', border:'none', color:'var(--gold-muted)', cursor:'pointer', fontFamily: 'Inter', fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase'}}>Home</button>
          <button onClick={() => changePage('collection')} style={{background:'none', border:'none', color:'var(--gold-muted)', cursor:'pointer', fontFamily: 'Inter', fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase'}}>Collections</button>
          <button onClick={() => changePage('about')} style={{background:'none', border:'none', color:'var(--gold-muted)', cursor:'pointer', fontFamily: 'Inter', fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase'}}>About Us</button>
          <button onClick={() => changePage('contact')} style={{background:'none', border:'none', color:'var(--gold-muted)', cursor:'pointer', fontFamily: 'Inter', fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase'}}>Contact</button>
        </div>
        
        <div style={{width: '100px', height: '1px', background: 'var(--gold)', margin: '0 auto 2rem auto', opacity: 0.3}}></div>
        <p style={{fontSize: '0.75rem', opacity: 0.5, letterSpacing: '2px', fontFamily: 'Inter', textTransform: 'uppercase'}}>© 2026 Saree Collection. All rights reserved.</p>
      </footer>

    </div>
  );
}