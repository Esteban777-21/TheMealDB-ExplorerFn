import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function Recetas() {
  const [recetas, setRecetas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [cantidad, setCantidad] = useState(12);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function cargarCategorias() {
      try {
        const respuesta = await fetch(
          'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
        );
        if (!respuesta.ok) throw new Error('Error al cargar categorías');

        const datos = await respuesta.json();
        setCategorias(datos.meals || []);
      } catch {
        setError('No se pudieron cargar las categorías.');
      }
    }

    cargarCategorias();
  }, []);

  useEffect(() => {
    async function cargarRecetas() {
      setCargando(true);
      setError('');

      try {
        const url = busqueda.trim()
          ? 'https://www.themealdb.com/api/json/v1/1/search.php?s=' +
            encodeURIComponent(busqueda.trim())
          : 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' +
            encodeURIComponent(categoria);

        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error('Error al cargar recetas');

        const datos = await respuesta.json();
        let resultados = datos.meals || [];

        if (busqueda.trim() && categoria) {
          resultados = resultados.filter(
            (receta) => receta.strCategory === categoria
          );
        }

        setRecetas(resultados);
        setCantidad(12);
      } catch {
        setError('No se pudieron cargar las recetas. Intenta nuevamente.');
        setRecetas([]);
      } finally {
        setCargando(false);
      }
    }

    cargarRecetas();
  }, [busqueda, categoria]);

  return (
    <section id="lista" className="catalogo">
      <h2>Explora nuestras recetas</h2>
      <p>Descubre platos de diferentes partes del mundo.</p>

      <input
        className="buscador"
        type="search"
        placeholder="Buscar receta por nombre..."
        value={busqueda}
        onChange={(evento) => setBusqueda(evento.target.value)}
      />

      <label className="etiqueta-filtro" htmlFor="categoria">
        Filtrar por categoría
      </label>

      <select
        id="categoria"
        className="filtro"
        value={categoria}
        onChange={(evento) => setCategoria(evento.target.value)}
      >
        {categorias.map((item) => (
          <option key={item.strCategory} value={item.strCategory}>
            {item.strCategory}
          </option>
        ))}
      </select>

      {cargando && <p>Cargando recetas...</p>}

      {error && <p role="alert">{error}</p>}

      {!cargando && !error && recetas.length === 0 && (
        <p>No encontramos recetas con esos criterios.</p>
      )}

      <div className="rejilla-recetas">
        {!cargando &&
          recetas.slice(0, cantidad).map((receta) => (
            <article className="tarjeta-receta" key={receta.idMeal}>
              <Link to={`/detalle/${receta.idMeal}`} className="enlace-receta">
                <img src={receta.strMealThumb} alt={receta.strMeal} />
                <div className="contenido-tarjeta">
                  <h3>{receta.strMeal}</h3>
                  <p>{receta.strCategory || categoria || 'Receta'}</p>
                  <span className="boton">Ver receta</span>
                </div>
              </Link>
            </article>
          ))}
      </div>

      {!cargando && recetas.length > cantidad && (
        <button
          className="boton cargar-mas"
          onClick={() => setCantidad((actual) => actual + 12)}
        >
          Cargar más recetas
        </button>
      )}

      {!cargando && recetas.length > 0 && (
        <p className="contador-recetas">
          Mostrando {Math.min(cantidad, recetas.length)} de {recetas.length}{' '}
          recetas
        </p>
      )}
    </section>
  );
}

export default Recetas;
