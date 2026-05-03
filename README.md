# Irish Manga - Proyecto Acceso a Datos

Este proyecto es una aplicación completa para gestionar una colección de mangas. Tiene un frontend en React y un backend en Java con Spring Boot que guarda todo en un archivo JSON.

## Estructura del proyecto

- `backend/`: El servidor en Java (Spring Boot + Maven).
- `frontend/`: La interfaz web en React.
- `docs/`: Documentación y ejemplos.

## Requisitos

- Java 17 o superior.
- Maven (o usar el wrapper mvnw).
- Node.js y npm.

## Instalación y Ejecución

### 1. Levantar el Backend
Entra en la carpeta `backend` y ejecuta el servidor:

```bash
mvn spring-boot:run
```

El servidor se abrirá en `http://localhost:8080`. Se generará un archivo `mangas.json` automáticamente donde se guardan los datos.

### 2. Levantar el Frontend
En otra terminal, entra en la carpeta `frontend`, instala las librerías y arranca la web:

```bash
npm install
npm start
```

La web se abrirá en `http://localhost:3000`.

## Características principales

- **CRUD completo**: Puedes añadir, ver, editar y borrar mangas.
- **Persistencia real**: Los datos no se borran al cerrar el servidor porque se guardan en un archivo JSON usando la librería GSON.
- **Buscador de portadas**: Usa la API de Jikan para buscar la imagen del manga automáticamente por el título.
- **Diseño Premium**: Interfaz moderna con Flexbox y efectos visuales.
