import type { Request, Response } from 'express';
import pool from '../db/connection';

export const getCitas = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT c.*, m.nombre AS mascota_nombre,
             v.nombre AS veterinario_nombre, v.especialidad
      FROM citas c
      INNER JOIN mascotas m ON c.mascota_id = m.id
      INNER JOIN veterinarios v ON c.veterinario_id = v.id
      ORDER BY c.fecha_hora ASC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener citas:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getCitaById = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT c.*, m.nombre AS mascota_nombre,
              v.nombre AS veterinario_nombre, v.especialidad
       FROM citas c
       INNER JOIN mascotas m ON c.mascota_id = m.id
       INNER JOIN veterinarios v ON c.veterinario_id = v.id
       WHERE c.id = $1`,
      [req.params.id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Cita no encontrada' });
      return;
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener cita:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const createCita = async (req: Request, res: Response) => {
  try {
    const { mascota_id, veterinario_id, fecha_hora, motivo, notas } = req.body;
    const result = await pool.query(
      `INSERT INTO citas (mascota_id, veterinario_id, fecha_hora, motivo, notas)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [mascota_id, veterinario_id, fecha_hora, motivo, notas],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al crear cita:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const updateCita = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { mascota_id, veterinario_id, fecha_hora, motivo, estado, notas } = req.body;
    const result = await pool.query(
      `UPDATE citas
       SET mascota_id = $1, veterinario_id = $2, fecha_hora = $3,
           motivo = $4, estado = $5, notas = $6
       WHERE id = $7
       RETURNING *`,
      [mascota_id, veterinario_id, fecha_hora, motivo, estado, notas, id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Cita no encontrada' });
      return;
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al actualizar cita:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const deleteCita = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'DELETE FROM citas WHERE id = $1 RETURNING *',
      [req.params.id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Cita no encontrada' });
      return;
    }

    res.json({ mensaje: 'Cita eliminada', dato: result.rows[0] });
  } catch (err) {
    console.error('Error al eliminar cita:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};