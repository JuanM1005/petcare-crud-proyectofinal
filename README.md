# 🐾 PetCare — Sistema de Gestión Veterinaria

CRUD web para la gestión de una clínica veterinaria: mascotas, propietarios, veterinarios, citas y servicios.

Proyecto final de la materia **Bases de Datos V0718**.

## Tecnologías

| Capa | Tecnología |
|------|-----------|
| Frontend | React 19 + TypeScript + Vite |
| Backend | Express 5 + Node.js |
| Base de datos | PostgreSQL |
| Runtime | Bun |
| Estilos | CSS Modules |
| Control de versiones | Git + GitHub |

## Requisitos previos

- [Bun](https://bun.sh/) (v1.1+)
- [PostgreSQL](https://www.postgresql.org/) (v15+)
- Git

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/petcare-crud-proyectofinal.git
cd petcare-crud-proyectofinal
```

### 2. Crear la base de datos

Abre una terminal de PostgreSQL (`psql`) y ejecuta:

```sql
CREATE DATABASE petcare;
```

Luego importa el schema y los datos:

```bash
psql -U tu_usuario -d petcare -f sql/schema.sql
psql -U tu_usuario -d petcare -f sql/inserts.sql
```

> Si tienes el respaldo completo en texto plano, también puedes restaurarlo con:
> ```bash
> psql -U tu_usuario -d petcare -f respaldo.sql
> ```

### 3. Configurar variables de entorno

Crea el archivo `server/.env`:

```env
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
DB_NAME=petcare
PORT=3000
```

### 4. Instalar dependencias

```bash
# Backend
cd server
bun install

# Frontend
cd ../client
bun install
```

## Ejecución

Necesitas **dos terminales** abiertas al mismo tiempo:

```bash
# Terminal 1 — Backend (API)
cd server
bun run dev
# → Servidor corriendo en http://localhost:3000

# Terminal 2 — Frontend (React)
cd client
bun run dev
# → App disponible en http://localhost:5173
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Estructura del proyecto

```
petcare/
├── client/                  ← Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/      ← Componentes reutilizables (Button, DataTable, Sidebar, etc.)
│   │   ├── hooks/           ← Custom hooks (lógica de CRUD por entidad)
│   │   ├── pages/           ← Páginas (una por entidad)
│   │   ├── services/        ← Llamadas HTTP a la API
│   │   ├── router/          ← Configuración de rutas
│   │   ├── types/           ← Interfaces TypeScript
│   │   ├── App.tsx
│   │   ├── global.css
│   │   └── main.tsx
│   └── package.json
│
├── server/                  ← Backend (API REST)
│   ├── src/
│   │   ├── controllers/     ← Lógica de cada endpoint (queries SQL)
│   │   ├── db/              ← Pool de conexión a PostgreSQL
│   │   ├── routes/          ← Definición de rutas HTTP
│   │   └── index.ts         ← Punto de entrada del servidor
│   ├── .env                 ← Variables de entorno (NO se sube a Git)
│   └── package.json
│
├── sql/                     ← Scripts SQL
│   ├── schema.sql           ← Creación de tablas con constraints
│   └── inserts.sql          ← Datos de prueba (10-20 registros por tabla)
│
└── README.md
```

## Base de datos

La base de datos cuenta con **6 tablas** normalizadas e interrelacionadas:

- **propietarios** — Datos personales de los dueños de mascotas.
- **mascotas** — Información de cada mascota, vinculada a su propietario.
- **veterinarios** — Profesionales que atienden las citas.
- **servicios** — Catálogo de servicios que ofrece la clínica (consulta, vacunación, cirugía, etc.).
- **citas** — Registro de cada visita, relacionando mascota y veterinario.
- **citas_servicios** — Tabla intermedia que implementa la relación **muchos a muchos** entre citas y servicios, almacenando el precio aplicado en cada caso.

### Constraints utilizados

`PRIMARY KEY` · `FOREIGN KEY` (con `ON DELETE RESTRICT`) · `CHECK` · `UNIQUE` · `NOT NULL` · `DEFAULT`

### Tipos de datos

`SERIAL` · `VARCHAR` · `INT` · `NUMERIC` · `DATE` · `TIMESTAMP` · `BOOLEAN` · `TEXT` · `CHAR`

## API REST — Endpoints

Todas las entidades siguen el mismo patrón CRUD:

| Método | Ruta | Acción |
|--------|------|--------|
| `GET` | `/api/{entidad}` | Listar todos los registros |
| `GET` | `/api/{entidad}/:id` | Obtener un registro por ID |
| `POST` | `/api/{entidad}` | Crear un nuevo registro |
| `PUT` | `/api/{entidad}/:id` | Actualizar un registro |
| `DELETE` | `/api/{entidad}/:id` | Eliminar un registro |

Entidades disponibles: `mascotas`, `propietarios`, `veterinarios`, `citas`, `servicios`, `citas-servicios`.

Las consultas `SELECT` utilizan `INNER JOIN` para traer datos relacionados (ej. nombre del propietario al listar mascotas). Se usan consultas parametrizadas (`$1`, `$2`) para prevenir inyección SQL.

## Comandos útiles

| Comando | Ubicación | Descripción |
|---------|-----------|-------------|
| `bun run dev` | `server/` | Arranca el backend en modo desarrollo |
| `bun run dev` | `client/` | Arranca el frontend en modo desarrollo |
| `bun run build` | `client/` | Compila el frontend para producción |
| `bun run lint` | `client/` | Revisa errores con ESLint |
| `bun run format` | `client/` | Formatea el código con Prettier |

## Solución de problemas

**El frontend no carga** — Verifica que ejecutaste `bun install` en `client/` y que el puerto 5173 no esté ocupado.

**Error de conexión a la base de datos** — Revisa que PostgreSQL esté corriendo y que los datos en `server/.env` sean correctos. Asegúrate de que la base de datos `petcare` exista.

**Los datos no aparecen en las tablas** — Verifica que el backend esté corriendo en otra terminal. Revisa la consola del navegador (F12) para ver errores de red.

## Equipo

| Rol | Integrante | Responsabilidades |
|-----|-----------|-------------------|
| Líder de Desarrollo e Interfaz | Juan | Diseño y programación del CRUD web, conexión con PostgreSQL, descripción de la tecnología |
| Especialista en Bases de Datos | Eriberto | Implementación de tablas, scripts SQL, inserción de registros, respaldo |
| Arquitecto y Documentador | Renata | Modelos E-R y Relacional, diccionario de datos, compilación del PDF |
