function MensajeEstado({ mensaje, tipo = 'info' }) {
  if (!mensaje) {
    return null;
  }

  return (
    <p className={`mensaje-estado mensaje-${tipo}`} role="status">
      {mensaje}
    </p>
  );
}

export default MensajeEstado;
