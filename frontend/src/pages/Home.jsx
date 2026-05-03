import React, { useEffect, useState } from 'react';
import MangaList from '../components/MangaList';
import MangaForm from '../components/MangaForm';
import { apiUrl } from '../services/api';

const Home = () => {
  const [mangas, setMangas] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', genre: '', volumes: '', status: '', imageUrl: '' });
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(setMangas)
      .catch(() => setError('No se pudo cargar la lista de mangas.'));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const setImageUrl = (url) => {
    setForm(prev => ({ ...prev, imageUrl: url }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.title || !form.author) {
      setError('El título y el autor son obligatorios.');
      return;
    }
    
    const payload = {
      title: form.title,
      author: form.author,
      genre: form.genre,
      volumes: Number(form.volumes) || 0,
      status: form.status || 'Unknown',
      imageUrl: form.imageUrl
    };

    try {
      if (editingId) {
        const response = await fetch(`${apiUrl}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Error al actualizar el manga.');
        
        const updated = await response.json();
        setMangas(mangas.map(m => m.id === editingId ? updated : m));
        setEditingId(null);
      } else {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Error al guardar el manga.');
        
        const saved = await response.json();
        setMangas([...mangas, saved]);
      }

      setForm({ title: '', author: '', genre: '', volumes: '', status: '', imageUrl: '' });
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (manga) => {
    setForm({
      title: manga.title,
      author: manga.author,
      genre: manga.genre,
      volumes: manga.volumes,
      status: manga.status,
      imageUrl: manga.imageUrl || ''
    });
    setEditingId(manga.id);
    setError('');
  };

  const handleCancelEdit = () => {
    setForm({ title: '', author: '', genre: '', volumes: '', status: '', imageUrl: '' });
    setEditingId(null);
    setError('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este manga?')) return;

    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Error al eliminar el manga.');
      
      setMangas(mangas.filter(m => m.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand-box">
          <div className="brand-header">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR49lb1w_oUoJZW_g8glDWsz5EG_UnXNzU3kw&s" 
              alt="Irish Manga Logo" 
              className="brand-logo" 
            />
            <h1>Irish manga</h1>
          </div>
        </div>
      </header>

      <main className="content">
        <section className="list-card">
          <div className="section-header">
            <div>
              <h2>Catálogo de manga</h2>
              <p>Explora las historias más icónicas y añade tu colección exclusiva.</p>
            </div>
            <span>Mangas</span>
          </div>
          
          {error && <div className="error">{error}</div>}
          
          <MangaList 
            mangas={mangas} 
            handleEdit={handleEdit} 
            handleDelete={handleDelete} 
          />
        </section>

        <MangaForm 
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editingId={editingId}
          handleCancelEdit={handleCancelEdit}
          setImageUrl={setImageUrl}
        />
      </main>
    </div>
  );
};

export default Home;
