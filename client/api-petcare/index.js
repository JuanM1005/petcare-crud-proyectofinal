const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de PostgreSQL
require('dotenv').config();
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'petcare_db',
  password: process.env.DB_PASSWORD, 
  port: 5432,
});

// =====================================================================
// 1. MASCOTAS
// =====================================================================
app.get('/api/mascotas', async (req, res) => {
  try {
    const query = `
      SELECT m.id AS folio_mascota, m.nombre AS nombre_mascota, m.especie, m.raza, m.fecha_nacimiento,
             p.nombre AS nombre_propietario, p.apellidos AS apellidos_propietario, p.telefono, m.propietario_id
      FROM mascotas m INNER JOIN propietarios p ON m.propietario_id = p.id ORDER BY m.id ASC;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/mascotas', async (req, res) => {
  try {
    const { propietario_id, nombre, especie, raza, sexo, fecha_nacimiento, peso_kg } = req.body;
    const query = 'INSERT INTO mascotas (propietario_id, nombre, especie, raza, sexo, fecha_nacimiento, peso_kg) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;';
    const result = await pool.query(query, [propietario_id, nombre, especie, raza, sexo, fecha_nacimiento, peso_kg]);
    res.status(201).json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/mascotas/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM mascotas WHERE id = $1 RETURNING *;', [req.params.id]);
    res.json({ mensaje: 'Eliminado', dato: result.rows[0] });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// =====================================================================
// 2. PROPIETARIOS
// =====================================================================
app.get('/api/propietarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM propietarios ORDER BY id ASC;');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/propietarios', async (req, res) => {
  try {
    const { nombre, apellidos, email, telefono, direccion } = req.body;
    const query = 'INSERT INTO propietarios (nombre, apellidos, email, telefono, direccion) VALUES ($1, $2, $3, $4, $5) RETURNING *;';
    const result = await pool.query(query, [nombre, apellidos, email, telefono, direccion]);
    res.status(201).json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/propietarios/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM propietarios WHERE id = $1 RETURNING *;', [req.params.id]);
    res.json({ mensaje: 'Eliminado', dato: result.rows[0] });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// =====================================================================
// 3. VETERINARIOS
// =====================================================================
app.get('/api/veterinarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM veterinarios ORDER BY id ASC;');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/veterinarios', async (req, res) => {
  try {
    const { nombre, apellidos, cedula_profesional, especialidad, email } = req.body;
    const query = 'INSERT INTO veterinarios (nombre, apellidos, cedula_profesional, especialidad, email) VALUES ($1, $2, $3, $4, $5) RETURNING *;';
    const result = await pool.query(query, [nombre, apellidos, cedula_profesional, especialidad, email]);
    res.status(201).json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/veterinarios/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM veterinarios WHERE id = $1 RETURNING *;', [req.params.id]);
    res.json({ mensaje: 'Eliminado', dato: result.rows[0] });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// =====================================================================
// 4. SERVICIOS
// =====================================================================
app.get('/api/servicios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM servicios ORDER BY id ASC;');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/servicios', async (req, res) => {
  try {
    const { nombre, descripcion, precio_base, duracion_minutos } = req.body;
    const query = 'INSERT INTO servicios (nombre, descripcion, precio_base, duracion_minutos) VALUES ($1, $2, $3, $4) RETURNING *;';
    const result = await pool.query(query, [nombre, descripcion, precio_base, duracion_minutos]);
    res.status(201).json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// =====================================================================
// 5. CITAS (Con JOIN completo como en tu script)
// =====================================================================
app.get('/api/citas', async (req, res) => {
  try {
    const query = `
      SELECT c.id AS folio_cita, c.fecha_hora, c.motivo, c.estado,
             m.nombre AS paciente_mascota, v.nombre AS veterinario_asignado, v.especialidad
      FROM citas c
      INNER JOIN mascotas m ON c.mascota_id = m.id
      INNER JOIN veterinarios v ON c.veterinario_id = v.id
      ORDER BY c.fecha_hora ASC;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/citas', async (req, res) => {
  try {
    const { mascota_id, veterinario_id, fecha_hora, motivo, notas } = req.body;
    const query = 'INSERT INTO citas (mascota_id, veterinario_id, fecha_hora, motivo, notas) VALUES ($1, $2, $3, $4, $5) RETURNING *;';
    const result = await pool.query(query, [mascota_id, veterinario_id, fecha_hora, motivo, notas]);
    res.status(201).json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/citas/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM citas WHERE id = $1 RETURNING *;', [req.params.id]);
    res.json({ mensaje: 'Eliminado', dato: result.rows[0] });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// =====================================================================
// 6. CITAS_SERVICIOS (Detalle de la cita / Muchos a Muchos)
// =====================================================================
// LECTURA: Ver los servicios aplicados en las citas con su total
app.get('/api/citas_servicios', async (req, res) => {
  try {
    const query = `
      SELECT 
          c.id AS folio_cita,
          m.nombre AS mascota,
          s.nombre AS servicio_aplicado,
          cs.cantidad,
          cs.precio_acordado,
          (cs.cantidad * cs.precio_acordado) AS total_por_servicio
      FROM citas_servicios cs
      INNER JOIN citas c ON cs.cita_id = c.id
      INNER JOIN servicios s ON cs.servicio_id = s.id
      INNER JOIN mascotas m ON c.mascota_id = m.id;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// CREACIÓN: Agregar un servicio a una cita existente
app.post('/api/citas_servicios', async (req, res) => {
  try {
    const { cita_id, servicio_id, precio_acordado, cantidad } = req.body;
    const query = `
      INSERT INTO citas_servicios (cita_id, servicio_id, precio_acordado, cantidad) 
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const result = await pool.query(query, [cita_id, servicio_id, precio_acordado, cantidad]);
    res.status(201).json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// BORRADO: Quitar un servicio de una cita (Usa llave primaria compuesta)
app.delete('/api/citas_servicios/:cita_id/:servicio_id', async (req, res) => {
  try {
    const { cita_id, servicio_id } = req.params;
    const query = `
      DELETE FROM citas_servicios 
      WHERE cita_id = $1 AND servicio_id = $2 RETURNING *;
    `;
    const result = await pool.query(query, [cita_id, servicio_id]);
    res.json({ mensaje: 'Servicio removido de la cita', dato: result.rows[0] });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Arrancar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ API MAESTRA DE PETCARE LISTA. Escuchando en el puerto ${PORT}`);
});