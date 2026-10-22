import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFavoritos } from './FavoritosContext';

function DetalleReceta() {
  const { id } = useParams();
  const { alternarFavorito, esFavorito } = useFavoritos();
  const [receta, setReceta] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function cargarDetalle() {
      setCargando(true);
      setError('');

      try {
        const respuesta = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );

        if (!respuesta.ok) {
          throw new Error('No se pudo consultar la receta');
        }

        const datos = await respuesta.json();
        setReceta(datos.meals?.[0] || null);
      } catch {
        setError('Ocurrió un error al cargar la receta.');
      } finally {
        setCargando(false);
      }
    }

    cargarDetalle();
  }, [id]);

  if (cargando) {
    return <p className="mensaje-detalle">Cargando receta...</p>;
  }

  if (error) {
    return (
      <p className="mensaje-detalle" role="alert">
        {error}
      </p>
    );
  }

  if (!receta) {
    return (
      <section className="detalle-receta">
        <h2>Receta no encontrada</h2>
        <Link to="/lista">Volver al catálogo</Link>
      </section>
    );
  }

  const ingredientes = [];

  for (let i = 1; i <= 20; i++) {
    const ingrediente = receta[`strIngredient${i}`]?.trim();
    const medida = receta[`strMeasure${i}`]?.trim();

    if (ingrediente) {
      ingredientes.push(`${ingrediente} - ${medida || 'Cantidad al gusto'}`);
    }
  }

  return (
    <section className="detalle-receta">
      <Link className="volver" to="/lista">
        ← Volver al catálogo
      </Link>

      <h2>{receta.strMeal}</h2>
      <button className="boton" onClick={() => alternarFavorito(receta)}>
        {esFavorito(receta.idMeal)
          ? '❤️ Quitar de favoritos'
          : '🤍 Agregar a favoritos'}
      </button>

      <img
        className="imagen-detalle"
        src={receta.strMealThumb}
        alt={receta.strMeal}
      />

      <div className="informacion-detalle">
        <p>
          <strong>Categoría:</strong> {receta.strCategory || 'No disponible'}
        </p>
        <p>
          <strong>Origen:</strong> {receta.strArea || 'No disponible'}
        </p>
        <p>
          <strong>ID:</strong> {receta.idMeal}
        </p>
        <p>
          <strong>Etiquetas:</strong> {receta.strTags || 'Sin etiquetas'}
        </p>
        <p>
          <strong>Video:</strong>{' '}
          {receta.strYoutube ? (
            <a href={receta.strYoutube} target="_blank" rel="noreferrer">
              Ver preparación
            </a>
          ) : (
            'No disponible'
          )}
        </p>
      </div>

      <h3>Ingredientes</h3>
      <ul>
        {ingredientes.map((ingrediente, indice) => (
          <li key={indice}>{ingrediente}</li>
        ))}
      </ul>

      <h3>Instrucciones</h3>
      <p className="instrucciones">{receta.strInstructions}</p>
    </section>
  );
}

export default DetalleReceta;
