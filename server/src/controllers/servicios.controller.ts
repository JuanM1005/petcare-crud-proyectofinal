import type { Request, Response } from 'express';
import pool from '../db/connection';

export const getServicios = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM servicios ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener servicios:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getServicioById = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM servicios WHERE id = $1', [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Servicio no encontrado' });
      return;
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener servicio:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const createServicio = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, precio_base, duracion_minutos } = req.body;
    const result = await pool.query(
      `INSERT INTO servicios (nombre, descripcion, precio_base, duracion_minutos)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nombre, descripcion, precio_base, duracion_minutos],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al crear servicio:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const updateServicio = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio_base, duracion_minutos } = req.body;
    const result = await pool.query(
      `UPDATE servicios
       SET nombre = $1, descripcion = $2, precio_base = $3, duracion_minutos = $4
       WHERE id = $5
       RETURNING *`,
      [nombre, descripcion, precio_base, duracion_minutos, id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Servicio no encontrado' });
      return;
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al actualizar servicio:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const deleteServicio = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'DELETE FROM servicios WHERE id = $1 RETURNING *',
      [req.params.id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Servicio no encontrado' });
      return;
    }

    res.json({ mensaje: 'Servicio eliminado', dato: result.rows[0] });
  } catch (err) {
    console.error('Error al eliminar servicio:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
