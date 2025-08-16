import { Router } from 'express';
import type { ShiftController } from '../../controllers/Shift/shift.controller';
import { ShiftValidator } from '../../validators/Shift/shift.validator';
import { AuthorizationMiddleware } from '../../../../interfaces/http/middlewares/authorization.middleware';

export class ShiftRoutes {
    private router = Router();

    constructor(private controller: ShiftController) {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/', AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:shift', 'access:cashier']), ShiftValidator.open(), this.controller.openShift.bind(this.controller));
        this.router.patch('/:id/type', AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:shift']), ShiftValidator.updateType(), this.controller.updateShiftType.bind(this.controller));
        this.router.patch('/:id/request-close', AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier']), ShiftValidator.requestClose(), this.controller.requestClose.bind(this.controller));
        this.router.patch('/:id/approve-close', AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:shift']), ShiftValidator.approveClose(), this.controller.approveClose.bind(this.controller));
        this.router.get('/:id', AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier', 'access:shift']), ShiftValidator.getById(), this.controller.getShiftById.bind(this.controller));
        this.router.get("/status/:status", AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier', 'access:shift']), ShiftValidator.getByStatus(), this.controller.getShiftsByStatus.bind(this.controller));
        this.router.get("/close-requested", AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:shift']), this.controller.getRequestedCloseShifts.bind(this.controller));
        this.router.get('/cashier/:cashierId', AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier', 'access:shift']), ShiftValidator.getByCashier(), this.controller.getShiftsByCashier.bind(this.controller));
        this.router.get("/type/:type", AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:shift']), this.controller.getShiftsByType.bind(this.controller));
        this.router.get("/by-date", AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:shift']), this.controller.getShiftsByDate.bind(this.controller));
        this.router.get('/summary/:shiftId', AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'shift:summary']), this.controller.getSummaryByShiftId.bind(this.controller));
        this.router.get("/summary/:shiftId/details", AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'shift:summary']), this.controller.getSummaryWithDetails.bind(this.controller));
        this.router.get('/summary/by-date', AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'shift:summary']), this.controller.getSummaryByShiftTypeAndDate.bind(this.controller));
        this.router.delete('/:id', ShiftValidator.getById(), this.controller.delete.bind(this.controller));
    }

    public getRouter() {
        return this.router;
    }
}
