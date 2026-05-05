# 🐶 PetCare

Sistema web de gestión para clínicas veterinarias. Permite administrar mascotas, dueños, veterinarios, citas y tratamientos.

## Tecnologías

| Capa | Tecnología |
|------|------------|
| Frontend | React + TypeScript + Vite |
| Backend | Node.js + Express + TypeScript |
| Base de datos | PostgreSQL |
| Runtime / Package manager | Bun |
| Estilos | CSS Modules |

## Requisitos previos

Antes de clonar el proyecto, asegúrate de tener instalado:

- **Bun** → [https://bun.sh](https://bun.sh)
  ```bash
  curl -fsSL https://bun.sh/install | bash
  ```
- **PostgreSQL** → [https://www.postgresql.org/download](https://www.postgresql.org/download)
- **Git** → [https://git-scm.com](https://git-scm.com)

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/petcare.git
cd petcare
```

### 2. Instalar dependencias del frontend

```bash
cd client
bun install
```

### 3. Instalar dependencias del backend

```bash
cd ../server
bun install
```

### 4. Configurar variables de entorno

Crea el archivo `server/.env` (este archivo NO se sube al repositorio):

```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña_aquí
DB_NAME=petcare
```

> ⚠️ Cambia `tu_contraseña_aquí` por la contraseña de tu PostgreSQL local.

### 5. Crear la base de datos

Abre una terminal de PostgreSQL (`psql`) y ejecuta:

```sql
CREATE DATABASE petcare;
```

Luego conecta a la base de datos y ejecuta los scripts SQL del proyecto para crear las tablas e insertar los datos de prueba (los scripts los proporciona el Especialista en Bases de Datos del equipo).

## Ejecución

Necesitas **dos terminales** abiertas al mismo tiempo:

### Terminal 1 — Backend (API)

```bash
cd server
bun run dev
```

Deberías ver: `Servidor corriendo en http://localhost:3000`

### Terminal 2 — Frontend (React)

```bash
cd client
bun run dev
```

Deberías ver: `Local: http://localhost:5173/`

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Estructura del proyecto

```
petcare/
├── client/                  ← Frontend (React)
│   ├── src/
│   │   ├── components/      ← Componentes reutilizables
│   │   │   ├── Button/
│   │   │   ├── DataTable/
│   │   │   ├── MascotaForm/
│   │   │   └── Sidebar/
│   │   ├── hooks/           ← Custom hooks
│   │   ├── pages/           ← Páginas (una por entidad)
│   │   │   ├── inicio/
│   │   │   └── mascotas/
│   │   ├── router/          ← Configuración de rutas
│   │   ├── types/           ← Interfaces TypeScript
│   │   ├── App.tsx
│   │   ├── global.css
│   │   └── main.tsx
│   └── package.json
│
├── server/                  ← Backend (API)
│   ├── src/
│   │   ├── controllers/     ← Lógica de cada endpoint
│   │   ├── db/              ← Conexión a PostgreSQL
│   │   ├── routes/          ← Definición de rutas HTTP
│   │   └── index.ts         ← Punto de entrada
│   ├── .env                 ← Variables de entorno (NO se sube)
│   └── package.json
│
└── README.md
```

## Comandos útiles

| Comando | Ubicación | Descripción |
|---------|-----------|-------------|
| `bun run dev` | `client/` | Arranca el frontend en modo desarrollo |
| `bun run dev` | `server/` | Arranca el backend en modo desarrollo |
| `bun run build` | `client/` | Compila el frontend para producción |
| `bun run format` | `client/` | Formatea el código con Prettier |
| `bun run lint` | `client/` | Revisa errores con ESLint |

## Roles del equipo

| Rol | Responsabilidad |
|-----|-----------------|
| Líder de Desarrollo e Interfaz | Diseño y programación del CRUD web, conexión con PostgreSQL, documentación de tecnología |
| Especialista en Bases de Datos | Implementación de tablas en PostgreSQL, scripts SQL, respaldo |
| Arquitecto y Documentador | Modelos E-R y Relacional, diccionario de datos, compilación del PDF |

## Solución de problemas

### El frontend no carga
- Verifica que ejecutaste `bun install` en la carpeta `client/`.
- Asegúrate de que el puerto 5173 no esté ocupado.

### Error de conexión a la base de datos
- Verifica que PostgreSQL esté corriendo.
- Revisa que los datos en `server/.env` sean correctos.
- Asegúrate de que la base de datos `petcare` exista.

### Los datos no aparecen en la tabla
- Verifica que el backend esté corriendo (`bun run dev` en `server/`).
- Revisa la consola del navegador (F12) para ver errores.
- Asegúrate de que las tablas tengan datos insertados.