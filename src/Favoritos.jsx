import { Link } from 'react-router-dom';
import { useFavoritos } from './FavoritosContext';

function Favoritos() {
  const { favoritos, alternarFavorito } = useFavoritos();

  return (
    <section className="catalogo">
      <h2>❤️ Mis recetas favoritas</h2>
      <p>Aquí encontrarás las recetas que hayas guardado.</p>

      {favoritos.length === 0 ? (
        <p>
          Todavía no tienes recetas favoritas. Ve al catálogo y guarda alguna
          receta.
        </p>
      ) : (
        <div className="rejilla-recetas">
          {favoritos.map((receta) => (
            <article className="tarjeta-receta" key={receta.idMeal}>
              <Link to={`/detalle/${receta.idMeal}`}>
                <img src={receta.strMealThumb} alt={receta.strMeal} />
                <div className="contenido-tarjeta">
                  <h3>{receta.strMeal}</h3>
                  <p>{receta.strCategory || 'Receta guardada'}</p>
                </div>
              </Link>

              <button
                className="boton"
                onClick={() => alternarFavorito(receta)}
              >
                Quitar de favoritos
              </button>
            </article>
          ))}
        </div>
      )}

      <Link className="volver" to="/lista">
        ← Volver al catálogo
      </Link>
    </section>
  );
}

export default Favoritos;
