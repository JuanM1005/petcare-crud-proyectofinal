import type { Request, Response } from "express";
import pool from "../db/connection";

// GET /api/mascotas - obtener todas las mascotas
export const getMascotas = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT m.*, d.nombre AS dueno_nombre
      FROM mascotas m
      LEFT JOIN duenos d ON m.dueno_id = d.id
      ORDER BY m.id
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(`Error al obtener mascotas: ${error}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// GET /api/mascotas/:id — obtener una mascota por id
export const getMascotaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT m.*, d.nombre AS dueno_nombre
       FROM mascotas m
       LEFT JOIN duenos d ON m.dueno_id = d.id
       WHERE m.id = $1`,
      [id],
    );

    // $1 es un parámetro. pool.query reemplaza $1 por el valor de id.
    // NUNCA concatenes variables directo en el SQL (ej: WHERE id = ${id})
    // porque eso permite inyección SQL — un ataque donde alguien
    // mete código SQL malicioso en la URL.

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Mascota no encontrada" });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(`Error al obtener mascota: ${error}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// POST /api/mascotas — crear una mascota
export const createMascota = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        
    }
}
