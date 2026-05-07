import type { Request, Response } from 'express';
import pool from '../db/connection';

export const getStats = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM mascotas)::int AS total_mascotas,
        (SELECT COUNT(*) FROM propietarios)::int AS total_propietarios,
        (SELECT COUNT(*) FROM veterinarios)::int AS total_veterinarios,
        (SELECT COUNT(*) FROM citas
          WHERE estado = 'programada'
          AND fecha_hora::date = CURRENT_DATE)::int AS citas_hoy,
        (SELECT COUNT(*) FROM citas
          WHERE DATE_TRUNC('month', fecha_hora) = DATE_TRUNC('month', CURRENT_DATE))::int AS citas_mes
    `);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error en getStats:', error);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
};

export const getProximasCitas = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT
        c.id,
        m.nombre AS mascota_nombre,
        v.nombre || ' ' || v.apellidos AS veterinario_nombre,
        c.fecha_hora,
        c.motivo,
        c.estado
      FROM citas c
      JOIN mascotas m ON c.mascota_id = m.id
      JOIN veterinarios v ON c.veterinario_id = v.id
      WHERE c.estado = 'programada'
        AND c.fecha_hora >= NOW()
      ORDER BY c.fecha_hora ASC
      LIMIT 5
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error en getProximasCitas:', error);
    res.status(500).json({ error: 'Error al obtener próximas citas' });
  }
};
