function FiltroCategoria({ categorias, categoria, setCategoria }) {
  return (
    <div>
      <label className="etiqueta-filtro" htmlFor="categoria">
        Filtrar por categoría
      </label>

      <select
        id="categoria"
        className="filtro"
        value={categoria}
        onChange={(evento) => setCategoria(evento.target.value)}
      >
        <option value="">Todas las categorías</option>

        {categorias.map((item) => (
          <option key={item.strCategory} value={item.strCategory}>
            {item.strCategory}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FiltroCategoria;
