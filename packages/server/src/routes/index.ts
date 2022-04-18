import { Router } from 'express';
import webAppRoutes from '@/routes/web-app-routes';
import api from '@/api';

const router = Router();

// Api routing
router.use('/_api', api);

// Application routing
router.use(webAppRoutes);

export default router;
