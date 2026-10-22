function Buscador({ busqueda, setBusqueda }) {
  return (
    <input
      className="buscador"
      type="search"
      placeholder="Buscar receta por nombre..."
      value={busqueda}
      onChange={(evento) => setBusqueda(evento.target.value)}
    />
  );
}

export default Buscador;
