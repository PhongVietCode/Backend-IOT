import { Router } from 'express';
import { asyncWrapper } from '../../../middlewares/asyncWrapper';
import { coreIOTController } from './coreiot.controller';

const router = Router();

// Example route
router.post('/rpc', asyncWrapper(coreIOTController.callRPC));
router.get('/telemetry', asyncWrapper(coreIOTController.getTelemetry))
router.get('/shared-attribute', asyncWrapper(coreIOTController.getAttribute))
router.post('/shared-attribute', asyncWrapper(coreIOTController.setAttribute))
export default router;