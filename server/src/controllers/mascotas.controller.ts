import type { Request, Response } from "express";
import pool from "../db/connection";

export const getMascotas = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT m.*, p.nombre AS propietario_nombre,
             p.apellidos AS propietario_apellidos, p.telefono
      FROM mascotas m
      INNER JOIN propietarios p ON m.propietario_id = p.id
      ORDER BY m.id ASC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener mascotas:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getMascotaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT m.*, p.nombre AS propietario_nombre,
              p.apellidos AS propietario_apellidos
       FROM mascotas m
       INNER JOIN propietarios p ON m.propietario_id = p.id
       WHERE m.id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Mascota no encontrada" });
      return;
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al obtener mascota:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createMascota = async (req: Request, res: Response) => {
  try {
    const {
      propietario_id,
      nombre,
      especie,
      raza,
      sexo,
      fecha_nacimiento,
      peso_kg,
    } = req.body;
    const result = await pool.query(
      `INSERT INTO mascotas (propietario_id, nombre, especie, raza, sexo, fecha_nacimiento, peso_kg)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [propietario_id, nombre, especie, raza, sexo, fecha_nacimiento, peso_kg],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al crear mascota:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updateMascota = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      propietario_id,
      nombre,
      especie,
      raza,
      sexo,
      fecha_nacimiento,
      peso_kg,
    } = req.body;
    const result = await pool.query(
      `UPDATE mascotas
       SET propietario_id = $1, nombre = $2, especie = $3, raza = $4,
           sexo = $5, fecha_nacimiento = $6, peso_kg = $7
       WHERE id = $8
       RETURNING *`,
      [
        propietario_id,
        nombre,
        especie,
        raza,
        sexo,
        fecha_nacimiento,
        peso_kg,
        id,
      ],
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Mascota no encontrada" });
      return;
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al actualizar mascota:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteMascota = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "DELETE FROM mascotas WHERE id = $1 RETURNING *",
      [req.params.id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Mascota no encontrada" });
      return;
    }

    res.json({ mensaje: "Mascota eliminada", dato: result.rows[0] });
  } catch (err) {
    console.error("Error al eliminar mascota:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
