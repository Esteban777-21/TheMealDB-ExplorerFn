import { useState } from 'react';
import { useUsuarios } from './UsuariosContext';
function Registro() {
  const { usuarios, setUsuarios } = useUsuarios();
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState('');

  function guardarUsuario(evento) {
    evento.preventDefault();

    if (!id.trim() || !nombre.trim() || !correo.trim()) {
      setMensaje('Completa todos los campos.');
      return;
    }

    if (!/^\d+$/.test(id)) {
      setMensaje('El ID debe ser numérico.');
      return;
    }

    if (!correo.includes('@')) {
      setMensaje('Ingresa un correo válido que contenga @.');
      return;
    }

    const repetido = usuarios.some(
      (usuario) => usuario.id === id.trim() && usuario.id !== editando
    );

    if (repetido) {
      setMensaje('Ya existe un usuario con ese ID.');
      return;
    }

    const nuevoUsuario = {
      id: id.trim(),
      nombre: nombre.trim(),
      correo: correo.trim(),
    };

    if (editando !== null) {
      setUsuarios((actuales) =>
        actuales.map((usuario) =>
          usuario.id === editando ? nuevoUsuario : usuario
        )
      );
      setMensaje('Usuario actualizado correctamente.');
    } else {
      setUsuarios((actuales) => [...actuales, nuevoUsuario]);
      setMensaje('Usuario registrado correctamente.');
    }

    cancelarEdicion();
  }

  function editarUsuario(usuario) {
    setId(usuario.id);
    setNombre(usuario.nombre);
    setCorreo(usuario.correo);
    setEditando(usuario.id);
    setMensaje('');
  }

  function eliminarUsuario(idUsuario) {
    if (window.confirm('¿Seguro que deseas eliminar este usuario?')) {
      setUsuarios((actuales) =>
        actuales.filter((usuario) => usuario.id !== idUsuario)
      );
      setMensaje('Usuario eliminado.');
      if (editando === idUsuario) cancelarEdicion();
    }
  }

  function cancelarEdicion() {
    setId('');
    setNombre('');
    setCorreo('');
    setEditando(null);
  }

  return (
    <section className="catalogo">
      <h2>Registro de usuarios</h2>
      <p>Registra, consulta, edita y elimina usuarios.</p>

      <form onSubmit={guardarUsuario}>
        <label htmlFor="usuario-id">ID numérico</label>
        <input
          id="usuario-id"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Ejemplo: 101"
        />

        <label htmlFor="usuario-nombre">Nombre</label>
        <input
          id="usuario-nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre completo"
        />

        <label htmlFor="usuario-correo">Correo electrónico</label>
        <input
          id="usuario-correo"
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="usuario@correo.com"
        />

        <button className="boton" type="submit">
          {editando !== null ? 'Guardar cambios' : 'Registrar usuario'}
        </button>

        {editando !== null && (
          <button className="boton" type="button" onClick={cancelarEdicion}>
            Cancelar
          </button>
        )}
      </form>

      {mensaje && <p role="status">{mensaje}</p>}

      <h3>Usuarios registrados: {usuarios.length}</h3>

      {usuarios.length === 0 ? (
        <p>Aún no hay usuarios registrados.</p>
      ) : (
        <div className="rejilla-recetas">
          {usuarios.map((usuario) => (
            <article className="tarjeta-receta" key={usuario.id}>
              <div className="contenido-tarjeta">
                <h3>{usuario.nombre}</h3>
                <p>ID: {usuario.id}</p>
                <p>Correo: {usuario.correo}</p>

                <button
                  className="boton"
                  onClick={() => editarUsuario(usuario)}
                >
                  Editar
                </button>

                <button
                  className="boton"
                  onClick={() => eliminarUsuario(usuario.id)}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Registro;
