import { Router } from 'express';
import {
  getMascotas,
  getMascotaById,
  createMascota,
  updateMascota,
  deleteMascota,
} from '../controllers/mascotas.controller';

const router = Router();

/**
 * Rutas RESTful para la entidad Mascotas.
 * Todas estas rutas se montan bajo el prefijo '/api/mascotas' definido en index.ts.
 */

// GET / - Obtiene la lista completa de mascotas
router.get('/', getMascotas);

// GET /:id - Obtiene una mascota específica por su ID
router.get('/:id', getMascotaById);

// POST / - Crea un nuevo registro de mascota
router.post('/', createMascota);

// PUT /:id - Actualiza de forma completa un registro existente por su ID
router.put('/:id', updateMascota);

// DELETE /:id - Elimina un registro existente por su ID
router.delete('/:id', deleteMascota);

export default router;
