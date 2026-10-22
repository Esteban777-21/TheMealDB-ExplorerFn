import { createContext, useContext, useEffect, useState } from 'react';

const UsuariosContext = createContext();

export function UsuariosProvider({ children }) {
  const [usuarios, setUsuarios] = useState(() => {
    try {
      const guardados = localStorage.getItem('usuariosRegistrados');
      return guardados ? JSON.parse(guardados) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios));
  }, [usuarios]);

  return (
    <UsuariosContext.Provider value={{ usuarios, setUsuarios }}>
      {children}
    </UsuariosContext.Provider>
  );
}

export function useUsuarios() {
  return useContext(UsuariosContext);
}
