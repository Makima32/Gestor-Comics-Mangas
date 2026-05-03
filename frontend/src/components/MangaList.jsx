import React from 'react';

const MangaList = ({ mangas, handleEdit, handleDelete }) => {
  const handleImageError = (e) => {
    e.target.style.opacity = '0.5';
  };

  return (
    <div className="manga-grid">
      {mangas.map((manga) => (
        <article key={manga.id} className="manga-item">
          {manga.imageUrl ? (
            <img 
              className="manga-cover" 
              src={manga.imageUrl} 
              alt={manga.title} 
              onError={handleImageError}
              style={{ display: 'block' }} 
            />
          ) : (
            <div className="manga-cover-placeholder">Sin Portada</div>
          )}
          <div className="manga-info">
            <div className="manga-header">
              <strong>{manga.title}</strong>
              <mark>{manga.status}</mark>
            </div>
            <small>{manga.author}</small>
            <p>{manga.genre}</p>
            <span>{manga.volumes} volúmenes</span>
            
            <div className="manga-actions">
              <button type="button" className="btn-edit" onClick={() => handleEdit(manga)}>Editar</button>
              <button type="button" className="btn-delete" onClick={() => handleDelete(manga.id)}>Borrar</button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default MangaList;
