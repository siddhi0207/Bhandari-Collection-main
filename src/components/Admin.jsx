import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Admin() {
  // --- 1. STATE MANAGEMENT ---
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  
  const [status, setStatus] = useState('');
  const [products, setProducts] = useState([]);

  // --- 2. AUTHENTICATION & DATA FETCHING ---
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProducts();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProducts();
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus('Logging in...');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
      setStatus('');
    } else {
      setStatus('');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setProducts([]);
  };

  // --- 3. DATABASE OPERATIONS (FETCH, UPLOAD, DELETE) ---
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) console.error("Error fetching products:", error);
    else setProducts(data);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select an image first.");
      return;
    }

    setStatus('Uploading image...');
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) {
      alert(`Upload Error: ${uploadError.message}`);
      setStatus('');
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    setStatus('Saving product details...');

    const { error: dbError } = await supabase
      .from('products')
      .insert([
        { 
          title: title, 
          description: description, 
          price: price, 
          image_url: publicUrl 
        }
      ]);

    if (dbError) {
      alert(`Database Error: ${dbError.message}`);
      setStatus('');
    } else {
      setStatus('Product uploaded successfully!');
      setTitle('');
      setDescription('');
      setPrice('');
      setFile(null);
      fetchProducts(); 
    }
  };

  const handleDelete = async (productId, imageUrl) => {
    if (!window.confirm("Are you sure you want to delete this out-of-stock product?")) return;

    setStatus('Deleting product...');

    try {
      const urlParts = imageUrl.split('/product-images/');
      if (urlParts.length > 1) {
        const filePath = urlParts[1];
        await supabase.storage.from('product-images').remove([filePath]);
      }
    } catch (err) {
      console.error("Error deleting image file:", err);
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) {
      alert(`Delete Error: ${error.message}`);
      setStatus('');
    } else {
      setStatus('Product deleted successfully!');
      fetchProducts();
    }
  };

  // --- 4. RENDER LOGIC ---

  // UN-AUTHENTICATED VIEW (Login Form)
  if (!session) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#0F3832' }}>Admin Access</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
          <input 
            type="email" placeholder="Email" required
            value={email} onChange={e => setEmail(e.target.value)} 
            style={{ padding: '12px', border: '1px solid #ccc' }} 
          />
          <input 
            type="password" placeholder="Password" required
            value={password} onChange={e => setPassword(e.target.value)} 
            style={{ padding: '12px', border: '1px solid #ccc' }} 
          />
          <button type="submit" style={{ padding: '12px', backgroundColor: '#0F3832', color: 'white', border: 'none', cursor: 'pointer' }}>
            LOGIN
          </button>
        </form>
        {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
      </div>
    );
  }

  // AUTHENTICATED VIEW (Dashboard + Upload Form + Inventory Grid with Delete Option)
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#0F3832' }}>Inventory Dashboard</h2>
        <button onClick={handleLogout} style={{ padding: '8px 16px', backgroundColor: '#cc0000', color: 'white', border: 'none', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      <div style={{ backgroundColor: '#f9f9f9', padding: '2rem', borderRadius: '8px', marginBottom: '3rem' }}>
        <h3>Add New Saree</h3>
        <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <input type="text" placeholder="Title (e.g., Kanjivaram)" required value={title} onChange={e => setTitle(e.target.value)} style={{ padding: '10px' }} />
          <textarea placeholder="Description (e.g., baby pink)" required value={description} onChange={e => setDescription(e.target.value)} style={{ padding: '10px', minHeight: '80px' }} />
          <input type="number" placeholder="Price (e.g., 999)" required value={price} onChange={e => setPrice(e.target.value)} style={{ padding: '10px' }} />
          <input type="file" accept="image/*" required onChange={e => setFile(e.target.files[0])} style={{ padding: '10px' }} />
          
          <button type="submit" style={{ padding: '12px', backgroundColor: '#0056b3', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
            Upload Product
          </button>
        </form>
        {status && <p style={{ marginTop: '1rem', fontWeight: 'bold', color: '#0F3832' }}>{status}</p>}
      </div>

      <div>
        <h3>Existing Inventory ({products.length})</h3>
        {products.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: '#666' }}>No products uploaded yet.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            {products.map(product => (
              <div key={product.id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', position: 'relative' }}>
                <img src={product.image_url} alt={product.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }} />
                <h4 style={{ marginTop: '0.5rem' }}>{product.title}</h4>
                <p style={{ margin: '0.2rem 0', color: '#666' }}>₹{product.price}</p>
                
                <button 
                  onClick={() => handleDelete(product.id, product.image_url)} 
                  style={{ marginTop: '10px', width: '100%', padding: '8px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Delete Product
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}