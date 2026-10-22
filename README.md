# TheMealDB Explorer

## Descripción del proyecto

TheMealDB Explorer es una aplicación web desarrollada con React y Vite que permite consultar recetas de diferentes partes del mundo mediante la API pública de TheMealDB.

Los usuarios pueden buscar recetas por nombre, filtrar por categoría, consultar los detalles de cada preparación, guardar sus recetas favoritas y administrar registros de usuarios.

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- CSS
- React Router DOM
- TheMealDB API
- LocalStorage

## API utilizada

**Nombre:** TheMealDB API

**URL base:** https://www.themealdb.com/api/json/v1/1

**Documentación oficial:** https://www.themealdb.com/api.php

### Endpoints utilizados

| Funcionalidad                      | Endpoint                   |
| ---------------------------------- | -------------------------- |
| Buscar recetas por nombre          | `search.php?s={nombre}`    |
| Consultar recetas por categoría    | `filter.php?c={categoria}` |
| Consultar detalles de una receta   | `lookup.php?i={id}`        |
| Obtener las categorías disponibles | `list.php?c=list`          |

## Funcionalidades principales

- Página de inicio con acceso al catálogo.
- Búsqueda de recetas por nombre.
- Filtro de recetas por categoría.
- Visualización de imágenes y detalles de cada receta.
- Consulta de ingredientes e instrucciones de preparación.
- Sistema para agregar y quitar recetas favoritas.
- Persistencia de favoritos mediante LocalStorage.
- Registro, consulta, edición y eliminación de usuarios.
- Validación de campos, identificación numérica, correos electrónicos e IDs duplicados.
- Mensajes de carga, errores y resultados vacíos.
- Navegación mediante React Router DOM.
- Página para rutas inexistentes.
- Diseño adaptable a diferentes tamaños de pantalla.

## Instalación y ejecución

Para ejecutar el proyecto localmente, es necesario tener Node.js y npm instalados.

1. Descargar o clonar el repositorio.
2. Abrir una terminal en la carpeta del proyecto.
3. Instalar las dependencias:

   ```bash
   npm install
   ```

4. Iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. Abrir en el navegador la dirección local que indique Vite en la terminal.

## Estructura del proyecto

```text
src/
├── components/
│   └── Header.jsx
├── App.jsx
├── App.css
├── DetalleReceta.jsx
├── Favoritos.jsx
├── FavoritosContext.jsx
├── Recetas.jsx
├── Registro.jsx
├── UsuariosContext.jsx
├── index.css
└── main.jsx
```

## Almacenamiento de datos

La aplicación utiliza LocalStorage del navegador para conservar las recetas favoritas y los usuarios registrados entre recargas de la página.

Los datos se guardan localmente en el navegador y no corresponden a una base de datos remota.

## Integrante

**Esteban Oñate**  
**Universidad:** Universidad Simón Bolívar  
**Programa:** Ingeniería de Sistemas

## Capturas de pantalla

Agregar capturas de pantalla de las siguientes secciones:

- Página de inicio.
- Catálogo de recetas.
- Detalle de una receta.
- Página de favoritos.
- Registro y administración de usuarios.
- Diseño adaptable a diferentes tamaños de pantalla.

## Créditos

Los datos de las recetas son proporcionados por [TheMealDB](https://www.themealdb.com/).
