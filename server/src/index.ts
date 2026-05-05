import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mascotasRoutes from './routes/mascotas.routes';
import propietariosRoutes from './routes/propietarios.routes';
import veterinariosRoutes from './routes/veterinarios.routes';
import serviciosRoutes from './routes/servicios.routes';
import citasRoutes from './routes/citas.routes';
import citasServiciosRoutes from './routes/citasServicios.routes';

// Carga las variables de entorno del archivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares Globales
// cors(): Permite peticiones desde el frontend (Cross-Origin Resource Sharing)
app.use(cors());
// express.json(): Parsea el cuerpo de las peticiones entrantes a formato JSON automáticamente
app.use(express.json());

// Registro de Rutas
// Cada línea registra todas las rutas de una entidad bajo su prefijo RESTful.
// Por ejemplo, propietariosRoutes agrupa endpoints bajo /api/propietarios.
// Esto permite organizar la aplicación de forma modular y escalable.
app.use('/api/mascotas', mascotasRoutes);
app.use('/api/propietarios', propietariosRoutes);
app.use('/api/veterinarios', veterinariosRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/citas', citasRoutes);
app.use('/api/citas-servicios', citasServiciosRoutes);

// Inicia el servidor express en el puerto configurado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
