import { createContext, useContext, useEffect, useState } from 'react';

const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState(() => {
    try {
      const guardados = localStorage.getItem('recetasFavoritas');
      return guardados ? JSON.parse(guardados) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('recetasFavoritas', JSON.stringify(favoritos));
  }, [favoritos]);

  function alternarFavorito(receta) {
    setFavoritos((actuales) => {
      const existe = actuales.some((item) => item.idMeal === receta.idMeal);

      if (existe) {
        return actuales.filter((item) => item.idMeal !== receta.idMeal);
      }

      return [...actuales, receta];
    });
  }

  function esFavorito(id) {
    return favoritos.some((item) => item.idMeal === id);
  }

  return (
    <FavoritosContext.Provider
      value={{ favoritos, alternarFavorito, esFavorito }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  return useContext(FavoritosContext);
}
