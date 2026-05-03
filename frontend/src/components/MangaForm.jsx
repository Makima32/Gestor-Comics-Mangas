import React from 'react';

const MangaForm = ({ form, handleChange, handleSubmit, editingId, handleCancelEdit, setImageUrl }) => {
  
  const searchCover = async () => {
    if (!form.title) {
      alert('Por favor, ingresa un título para buscar la portada.');
      return;
    }
    try {
      const response = await fetch(`https://api.jikan.moe/v4/manga?q=${form.title}&limit=1`);
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        const url = data.data[0].images.jpg.large_image_url;
        setImageUrl(url);
      } else {
        alert('No se encontró ninguna portada para este título.');
      }
    } catch (error) {
      console.error('Error al buscar la portada:', error);
      alert('Error al conectar con la API de Jikan.');
    }
  };

  return (
    <section className="form-card">
      <div className="section-header">
        <div>
          <h2>{editingId ? 'Editar manga' : 'Agregar nuevo manga'}</h2>
          <p>{editingId ? 'Modifica los detalles de esta joya.' : 'Haz crecer tu colección con los títulos más épicos.'}</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="input-with-button">
          <label>
            Título
            <input name="title" value={form.title} onChange={handleChange} placeholder="Ej. Jujutsu Kaisen" />
          </label>
          <button type="button" className="btn-search" onClick={searchCover}>Buscar Portada</button>
        </div>

        <label>
          URL de la Imagen
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://ejemplo.com/imagen.jpg" />
        </label>

        {form.imageUrl && (
          <div className="image-preview">
            <img src={form.imageUrl} alt="Vista previa" />
          </div>
        )}

        <label>
          Autor
          <input name="author" value={form.author} onChange={handleChange} placeholder="Ej. Gege Akutami" />
        </label>
        <label>
          Género
          <input name="genre" value={form.genre} onChange={handleChange} placeholder="Ej. Shonen" />
        </label>
        <label>
          Volúmenes
          <input name="volumes" type="number" value={form.volumes} onChange={handleChange} placeholder="14" />
        </label>
        <label>
          Estado
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="">Seleccionar estado</option>
            <option value="Completado">Completado</option>
            <option value="En curso">En curso</option>
          </select>
        </label>
        
        <div className="form-actions">
          <button type="submit">{editingId ? 'Actualizar manga' : 'Añadir a la vitrina'}</button>
          {editingId && (
            <button type="button" className="btn-cancel" onClick={handleCancelEdit}>Cancelar</button>
          )}
        </div>
      </form>
    </section>
  );
};

export default MangaForm;
