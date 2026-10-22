import { Link } from 'react-router-dom';

function TarjetaReceta({ receta, categoria }) {
  return (
    <article className="tarjeta-receta">
      <Link to={`/detalle/${receta.idMeal}`} className="enlace-receta">
        <img src={receta.strMealThumb} alt={receta.strMeal} />

        <div className="contenido-tarjeta">
          <h3>{receta.strMeal}</h3>
          <p>{receta.strCategory || categoria || 'Receta'}</p>
          <span className="boton">Ver receta</span>
        </div>
      </Link>
    </article>
  );
}

export default TarjetaReceta;
