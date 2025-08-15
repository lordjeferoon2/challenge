# Project Name

Proyecto full-stack con **FastAPI** (backend), **MongoDB** (base de datos) y **Frontend** (React u otra tecnología).

Este repositorio contiene todo lo necesario para ejecutar el proyecto localmente usando **Docker Compose**, sin necesidad de configurar entornos locales manualmente.

---

## Requisitos

- [Docker](https://www.docker.com/get-started) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado
- Sistema operativo compatible con Docker

---

## Estructura del proyecto

```
project/
│
├── backend/        # Backend FastAPI
├── frontend/       # Next.js
├── docker-compose.yml
└── README.md
```

---

## Levantar el proyecto

1. Clona o descarga el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd project
```

2. Levanta todos los servicios con Docker Compose:

```bash
docker-compose up --build
```

Esto hará lo siguiente:

- Construirá y levantará el **backend** en `http://localhost:8000`
- Construirá y levantará el **frontend** en `http://localhost:3000`
- Levantará la base de datos **MongoDB** con el usuario y contraseña configurados en `docker-compose.yml`

> 🔹 Nota: La primera vez puede tardar unos minutos mientras Docker construye las imágenes.

3. Verifica que todos los contenedores estén corriendo:

```bash
docker ps
```

---

## Acceso a MongoDB

- Host: `localhost`
- Puerto: `27017`
- Usuario: `fs_user`
- Contraseña: `fs_user`
- Base de datos: `fs_users_db`

> Puedes conectarte con cualquier cliente MongoDB usando estas credenciales.

---

## Variables de entorno

Se definen en `docker-compose.yml`:

```env
MONGODB_URI=mongodb://fs_user:fs_user@mongodb:27017/fs_users_db?authSource=admin
MONGODB_DB=fs_users_db
JWT_SECRET=supersecreto123
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=60
FRONTEND_ORIGINS=http://frontend:3000
API_URL=http://backend:8000/api
```

> No necesitas crear `.env` adicionales, Docker Compose ya inyecta estas variables.

---

## Detalles importantes

- El **backend** se encuentra en `/backend` y corre con FastAPI.
- El **frontend** se encuentra en `/frontend`.
- Todas las rutas del backend se sirven bajo `/api`.
- CORS configurado para permitir al frontend acceder al backend desde `localhost:3000`.

---

## Detener el proyecto

Para detener los contenedores:

```bash
docker-compose down
```

> Esto cerrará todos los servicios, pero no borrará los datos persistidos en MongoDB.

---

## Notas finales

- Asegúrate de que ningún otro servicio esté usando los puertos `8000`, `3000` o `27017`.
- Si necesitas limpiar todo y empezar desde cero, elimina los volúmenes de Docker:

```bash
docker-compose down -v
```

---

¡Listo! Con esto cualquier persona puede clonar tu repositorio y levantar **todo el proyecto localmente** usando solo Docker Compose.

lo quiero en archivo

