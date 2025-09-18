import { Router } from 'express';
import { LogsController } from '../controllers/logs.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { AuthorizationMiddleware } from '../middlewares/authorization.middleware';

const router = Router();
const logsController = new LogsController();

router.use(AuthMiddleware.authenticate());
router.use(AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:logs']));

router.get('/', logsController.getLogs.bind(logsController));
router.get('/stats', logsController.getLogStats.bind(logsController));
router.get('/analysis', logsController.analyzeLogPatterns.bind(logsController));
router.get('/files', logsController.getLogFileInfo.bind(logsController));
router.get('/export', logsController.exportLogs.bind(logsController));
router.get('/errors/recent', logsController.getRecentErrors.bind(logsController));
router.get('/health', logsController.getSystemHealth.bind(logsController));

export default router;
