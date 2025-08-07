import { Router } from 'express';
import type { ShiftController } from '../../controllers/Shift/shift.controller';
import { ShiftValidator } from '../../validators/Shift/shift.validator';
import { AuthorizationMiddleware } from '@interfaces/http/middlewares/authorization.middleware';

export class ShiftRoutes {
    private router = Router();

    constructor(private controller: ShiftController) {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/', ShiftValidator.open(), this.controller.openShift.bind(this.controller));
        this.router.patch('/:id/type', ShiftValidator.updateType(), this.controller.updateShiftType.bind(this.controller));
        this.router.patch('/:id/request-close', ShiftValidator.requestClose(), this.controller.requestClose.bind(this.controller));
        this.router.patch('/:id/approve-close', AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'shift:approve']), ShiftValidator.approveClose(), this.controller.approveClose.bind(this.controller));
        this.router.get('/:id', ShiftValidator.getById(), this.controller.getShiftById.bind(this.controller));
        this.router.get("/status/:status", ShiftValidator.getByStatus(), this.controller.getShiftsByStatus.bind(this.controller));
        this.router.get("/close-requested", this.controller.getRequestedCloseShifts.bind(this.controller));
        this.router.get('/cashier/:cashierId', ShiftValidator.getByCashier(), this.controller.getShiftsByCashier.bind(this.controller));
        this.router.get("/type/:type", this.controller.getShiftsByType.bind(this.controller));
        this.router.get("/by-date", this.controller.getShiftsByDate.bind(this.controller));
        this.router.get('/summary/:shiftId', this.controller.getSummaryByShiftId.bind(this.controller));
        this.router.get("/summary/:shiftId/details", this.controller.getSummaryWithDetails.bind(this.controller));
        this.router.get('/summary/by-date', this.controller.getSummaryByShiftTypeAndDate.bind(this.controller));
        this.router.delete('/:id', ShiftValidator.getById(), this.controller.delete.bind(this.controller));
    }

    public getRouter() {
        return this.router;
    }
}
