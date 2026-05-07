import { Router } from 'express';
import { getStats, getProximasCitas } from '../controllers/dashboard.controller';

const router = Router();

router.get('/stats', getStats);
router.get('/proximas-citas', getProximasCitas);

export default router;
