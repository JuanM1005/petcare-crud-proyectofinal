import { Pool } from 'pg';
import dotenv from 'dotenv';

// Se cargan las variables de entorno del archivo .env
dotenv.config();

/**
 * Pool de conexiones a PostgreSQL
 * Utilizar un 'Pool' en lugar de un 'Client' es la mejor práctica para aplicaciones web,
 * ya que mantiene múltiples conexiones abiertas a la base de datos y las reutiliza
 * para cada petición entrante, reduciendo significativamente la latencia.
 */
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

/**
 * Función utilitaria para verificar la conexión inicial a la BD.
 * Ejecuta un simple SELECT NOW() para comprobar que las credenciales
 * y la conectividad son correctas al arrancar el servidor.
 */
const checkConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Conectado a PostgreSQL exitosamente en:', res.rows[0].now);
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error crítico al conectar a PostgreSQL:', err.message);
      // Opcional: cerrar el proceso si la base de datos es vital
      // process.exit(1);
    }
  }
};

checkConnection();

export default pool;
