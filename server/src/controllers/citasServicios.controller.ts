import type { Request, Response } from 'express';
import pool from '../db/connection';

export const getCitasServicios = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT cs.*, c.id AS folio_cita,
             m.nombre AS mascota,
             s.nombre AS servicio_nombre,
             (cs.cantidad * cs.precio_aplicado) AS total_por_servicio
      FROM citas_servicios cs
      INNER JOIN citas c ON cs.cita_id = c.id
      INNER JOIN servicios s ON cs.servicio_id = s.id
      INNER JOIN mascotas m ON c.mascota_id = m.id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener citas_servicios:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const createCitaServicio = async (req: Request, res: Response) => {
  try {
    const { cita_id, servicio_id, precio_aplicado, cantidad } = req.body;
    const result = await pool.query(
      `INSERT INTO citas_servicios (cita_id, servicio_id, precio_aplicado, cantidad)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [cita_id, servicio_id, precio_aplicado, cantidad],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al crear cita_servicio:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Esta tabla usa llave primaria compuesta (cita_id + servicio_id)
// por eso el DELETE necesita ambos parámetros en la URL.
export const deleteCitaServicio = async (req: Request, res: Response) => {
  try {
    const { cita_id, servicio_id } = req.params;
    const result = await pool.query(
      `DELETE FROM citas_servicios
       WHERE cita_id = $1 AND servicio_id = $2
       RETURNING *`,
      [cita_id, servicio_id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Registro no encontrado' });
      return;
    }

    res.json({ mensaje: 'Servicio removido de la cita', dato: result.rows[0] });
  } catch (err) {
    console.error('Error al eliminar cita_servicio:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};