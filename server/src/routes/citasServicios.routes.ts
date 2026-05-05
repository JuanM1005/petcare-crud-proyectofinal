import { Router } from 'express';
import {
  getCitasServicios,
  createCitaServicio,
  deleteCitaServicio,
} from '../controllers/citasServicios.controller';

const router = Router();

router.get('/', getCitasServicios);
router.post('/', createCitaServicio);
router.delete('/:cita_id/:servicio_id', deleteCitaServicio);

export default router;