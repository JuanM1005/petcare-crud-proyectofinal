import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mascotasRoutes from "./routes/mascotas.routes";
import propietariosRoutes from "./routes/propietarios.routes";
import veterinariosRoutes from "./routes/veterinarios.routes";
import serviciosRoutes from "./routes/servicios.routes";
import citasRoutes from "./routes/citas.routes";
import citasServiciosRoutes from "./routes/citasServicios.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Cada línea registra todas las rutas de una entidad bajo su prefijo.
// Por ejemplo, propietariosRoutes tiene GET /, POST /, PUT /:id, DELETE /:id
// y al montarlo en /api/propietarios, las URLs completas son:
// GET /api/propietarios, POST /api/propietarios, etc.
app.use("/api/mascotas", mascotasRoutes);
app.use("/api/propietarios", propietariosRoutes);
app.use("/api/veterinarios", veterinariosRoutes);
app.use("/api/servicios", serviciosRoutes);
app.use("/api/citas", citasRoutes);
app.use("/api/citas-servicios", citasServiciosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
