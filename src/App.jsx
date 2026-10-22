import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Recetas from './Recetas';
import DetalleReceta from './DetalleReceta';
import Favoritos from './Favoritos';
import Registro from './Registro';
import Header from './components/Header';
import './App.css';
import { FavoritosProvider, useFavoritos } from './FavoritosContext';
import { UsuariosProvider, useUsuarios } from './UsuariosContext';

function Inicio() {
  return (
    <main className="inicio">
      <section className="hero">
        <div className="hero-contenido">
          <p className="etiqueta">COCINA • DESCUBRE • DISFRUTA</p>

          <h1>Descubre tu próxima receta favorita</h1>

          <p>
            Explora recetas de todo el mundo, conoce nuevos sabores y encuentra
            inspiración para tu próxima comida.
          </p>

          <Link to="/lista" className="boton">
            Explorar recetas
          </Link>
        </div>
      </section>
    </main>
  );
}

function NoEncontrado() {
  return (
    <main className="detalle-receta">
      <h2>Página no encontrada</h2>
      <p>La dirección que buscas no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </main>
  );
}

function AppContenido() {
  const { favoritos } = useFavoritos();
  const { usuarios } = useUsuarios();

  return (
    <div className="aplicacion">
      <Header
        cantidadFavoritos={favoritos.length}
        cantidadUsuarios={usuarios.length}
      />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/lista" element={<Recetas />} />
        <Route path="/detalle/:id" element={<DetalleReceta />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="*" element={<NoEncontrado />} />
      </Routes>

      <footer className="pie">
        <p>Proyecto académico: TheMealDB Explorer</p>
        <p>Integrante: Esteban Oñate</p>
        <p>
          Datos proporcionados por{' '}
          <a href="https://www.themealdb.com/" target="_blank" rel="noreferrer">
            TheMealDB
          </a>
        </p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <UsuariosProvider>
      <FavoritosProvider>
        <BrowserRouter>
          <AppContenido />
        </BrowserRouter>
      </FavoritosProvider>
    </UsuariosProvider>
  );
}

export default App;
