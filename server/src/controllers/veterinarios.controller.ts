import type { Request, Response } from 'express';
import pool from '../db/connection';

export const getVeterinarios = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM veterinarios ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener veterinarios:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getVeterinarioById = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM veterinarios WHERE id = $1',
      [req.params.id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Veterinario no encontrado' });
      return;
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener veterinario:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const createVeterinario = async (req: Request, res: Response) => {
  try {
    const { nombre, apellidos, cedula_profesional, especialidad, email } = req.body;
    const result = await pool.query(
      `INSERT INTO veterinarios (nombre, apellidos, cedula_profesional, especialidad, email)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [nombre, apellidos, cedula_profesional, especialidad, email],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al crear veterinario:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const updateVeterinario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, apellidos, cedula_profesional, especialidad, email } = req.body;
    const result = await pool.query(
      `UPDATE veterinarios
       SET nombre = $1, apellidos = $2, cedula_profesional = $3,
           especialidad = $4, email = $5
       WHERE id = $6
       RETURNING *`,
      [nombre, apellidos, cedula_profesional, especialidad, email, id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Veterinario no encontrado' });
      return;
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al actualizar veterinario:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const deleteVeterinario = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'DELETE FROM veterinarios WHERE id = $1 RETURNING *',
      [req.params.id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Veterinario no encontrado' });
      return;
    }

    res.json({ mensaje: 'Veterinario eliminado', dato: result.rows[0] });
  } catch (err) {
    console.error('Error al eliminar veterinario:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};