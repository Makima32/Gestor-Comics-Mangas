# Documentación del Proyecto: Irish Manga

## 1. Idea del Proyecto
Irish Manga es un gestor de colecciones de manga. He elegido esta temática porque permite trabajar con muchos datos interesantes (títulos, autores, volúmenes, imágenes) y aplicar los conceptos de la asignatura de Acceso a Datos.

La idea es que el usuario pueda tener su "biblioteca" digital, pudiendo añadir series nuevas y buscar sus portadas directamente desde internet para que quede más visual.

## 2. Tecnologías y Librerías
Para este proyecto he usado:
- **Java con Spring Boot**: Para crear la API REST del backend.
- **GSON (de Google)**: Para convertir los objetos de Java a formato JSON y viceversa de forma sencilla. Es fundamental para la persistencia en archivos.
- **React**: Para la parte visual, usando Hooks para manejar el estado de los datos.
- **Jikan API**: Una API gratuita que me permite buscar información y portadas de MyAnimeList.

## 3. Manejo de Datos (JSON vs XML)
Aunque el proyecto usa JSON por ser más ligero y fácil de integrar con React, aquí dejo una comparativa de cómo se vería un manga en ambos formatos.

**Formato JSON:**
```json
{
  "id": 1,
  "title": "Jujutsu Kaisen",
  "author": "Gege Akutami",
  "imageUrl": "https://enlace-a-la-foto.jpg",
  "status": "En curso"
}
```

**Formato XML:**
```xml
<manga>
    <id>1</id>
    <title>Jujutsu Kaisen</title>
    <author>Gege Akutami</author>
    <status>En curso</status>
</manga>
```

## 4. Persistencia en Fichero
El backend no usa una base de datos SQL convencional. En su lugar, he implementado un sistema que guarda la información en un fichero llamado `mangas.json`. 

He creado un servicio llamado `JsonStorageService` que se encarga de:
1. Leer el archivo al arrancar el programa.
2. Escribir la lista completa cada vez que se hace un cambio (POST, PUT o DELETE).

Esto asegura que aunque apaguemos el ordenador, los mangas sigan ahí la próxima vez.

## 5. Manual para el usuario
1. Al entrar verás la lista de mangas vacía (si es la primera vez).
2. Usa el formulario para escribir el título de un manga.
3. Dale al botón **"Buscar Portada"** para que el sistema busque la foto por ti.
4. Rellena el resto de campos (Autor, Género, etc) y dale a **"Añadir"**.
5. Puedes editar cualquier manga pulsando en su tarjeta o borrarlo si ya no lo quieres.

## 6. Instalación rápida
- **Backend**: Ir a `backend` y hacer `mvn spring-boot:run`.
- **Frontend**: Ir a `frontend`, hacer `npm install` y luego `npm start`.
- Requisito: Tener Java 17 y Node instalado.
