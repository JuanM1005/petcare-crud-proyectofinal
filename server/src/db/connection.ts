import { Pool } from "pg";
import dotenv from "dotenv";

// Se cargan las variables del archivo .env
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Verifica la conexión al arrancar el servidor.
const checkConnection = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Conectado a PostgreSQL exitosamente en:", res.rows[0].now);
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error crítico al conectar a PostgreSQL:", err.message);
      // Opcional: cerrar el proceso si la base de datos es vital
      // process.exit(1);
    }
  }
};

checkConnection();

export default pool;
