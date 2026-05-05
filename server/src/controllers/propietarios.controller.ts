import type { Request, Response } from 'express';
import pool from '../db/connection';

export const getPropietarios = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM propietarios ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener propietarios:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getPropietarioById = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM propietarios WHERE id = $1',
      [req.params.id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Propietario no encontrado' });
      return;
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener propietario:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const createPropietario = async (req: Request, res: Response) => {
  try {
    const { nombre, apellidos, email, telefono, direccion } = req.body;
    const result = await pool.query(
      `INSERT INTO propietarios (nombre, apellidos, email, telefono, direccion)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [nombre, apellidos, email, telefono, direccion],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al crear propietario:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const updatePropietario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, apellidos, email, telefono, direccion } = req.body;
    const result = await pool.query(
      `UPDATE propietarios
       SET nombre = $1, apellidos = $2, email = $3, telefono = $4, direccion = $5
       WHERE id = $6
       RETURNING *`,
      [nombre, apellidos, email, telefono, direccion, id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Propietario no encontrado' });
      return;
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al actualizar propietario:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const deletePropietario = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'DELETE FROM propietarios WHERE id = $1 RETURNING *',
      [req.params.id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Propietario no encontrado' });
      return;
    }

    res.json({ mensaje: 'Propietario eliminado', dato: result.rows[0] });
  } catch (err) {
    console.error('Error al eliminar propietario:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};