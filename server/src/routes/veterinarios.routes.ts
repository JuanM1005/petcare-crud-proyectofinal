import { Router } from 'express';
import {
  getVeterinarios,
  getVeterinarioById,
  createVeterinario,
  updateVeterinario,
  deleteVeterinario,
} from '../controllers/veterinarios.controller';

const router = Router();

router.get('/', getVeterinarios);
router.get('/:id', getVeterinarioById);
router.post('/', createVeterinario);
router.put('/:id', updateVeterinario);
router.delete('/:id', deleteVeterinario);

export default router;