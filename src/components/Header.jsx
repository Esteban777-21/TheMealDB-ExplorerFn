import { Link, NavLink } from 'react-router-dom';

export default function Encabezado({ cantidadFavoritos, cantidadUsuarios }) {
  return (
    <header className="encabezado">
      <Link to="/" className="logo">
        TheMealDB Explorer
      </Link>

      <nav className="navegacion">
        <NavLink to="/" end>
          Inicio
        </NavLink>

        <NavLink to="/lista">Lista</NavLink>

        <NavLink to="/favoritos">Favoritos ({cantidadFavoritos})</NavLink>

        <NavLink to="/registro">Registro ({cantidadUsuarios})</NavLink>
      </nav>
    </header>
  );
}
