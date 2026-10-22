import { useEffect, useState } from 'react';
import TarjetaReceta from './components/TarjetaReceta';
import Buscador from './components/Buscador';
import FiltroCategoria from './components/FiltroCategoria';
import MensajeEstado from './components/MensajeEstado';

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

        if (!respuesta.ok) {
          throw new Error('Error al cargar categorías');
        }

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
          : categoria
          ? 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' +
            encodeURIComponent(categoria)
          : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
          throw new Error('Error al cargar recetas');
        }

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

      <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />

      <FiltroCategoria
        categorias={categorias}
        categoria={categoria}
        setCategoria={setCategoria}
      />

      <MensajeEstado
        mensaje={cargando ? 'Cargando recetas...' : ''}
        tipo="carga"
      />

      <MensajeEstado mensaje={error} tipo="error" />

      {!cargando && !error && recetas.length === 0 && (
        <MensajeEstado
          mensaje="No encontramos recetas con esos criterios."
          tipo="info"
        />
      )}

      <div className="rejilla-recetas">
        {!cargando &&
          !error &&
          recetas
            .slice(0, cantidad)
            .map((receta) => (
              <TarjetaReceta
                key={receta.idMeal}
                receta={receta}
                categoria={categoria}
              />
            ))}
      </div>

      {!cargando && !error && recetas.length > cantidad && (
        <button
          className="boton cargar-mas"
          onClick={() => setCantidad((actual) => actual + 12)}
        >
          Cargar más recetas
        </button>
      )}

      {!cargando && !error && recetas.length > 0 && (
        <p className="contador-recetas">
          Mostrando {Math.min(cantidad, recetas.length)} de {recetas.length}{' '}
          recetas
        </p>
      )}
    </section>
  );
}

export default Recetas;
