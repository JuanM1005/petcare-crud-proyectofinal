import { Router } from 'express';
import {
  getPropietarios,
  getPropietarioById,
  createPropietario,
  updatePropietario,
  deletePropietario,
} from '../controllers/propietarios.controller';

const router = Router();

router.get('/', getPropietarios);
router.get('/:id', getPropietarioById);
router.post('/', createPropietario);
router.put('/:id', updatePropietario);
router.delete('/:id', deletePropietario);

export default router;
