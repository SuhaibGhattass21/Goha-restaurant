import { Router } from 'express';
import type { ShiftController } from '../../controllers/Shift/shift.controller';
import { AuthorizationMiddleware } from '../../../../interfaces/http/middlewares/authorization.middleware';
import { validateBody, validateParamsDto, validateQuery } from '../../middlewares/validation.middleware';
import { OpenShiftDTO, UpdateShiftTypeDTO, RequestCloseShiftDTO, ApproveCloseShiftDTO, ShiftIdParamDto, ShiftIdParamDto2, CashierIdParamDto, ShiftStatusParamDto, ShiftTypeParamDto, DateQueryDto, ShiftSummaryQueryDto } from '../../../../application/dtos/Shift/Shift.dto';

export class ShiftRoutes {
    private router = Router();

    constructor(private controller: ShiftController) {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/', AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:shift', 'access:cashier']), validateBody(OpenShiftDTO), this.controller.openShift.bind(this.controller));
        this.router.patch('/:id/type', AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:shift']), validateParamsDto(ShiftIdParamDto), validateBody(UpdateShiftTypeDTO), this.controller.updateShiftType.bind(this.controller));
        this.router.patch('/:id/request-close', AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier']), validateParamsDto(ShiftIdParamDto), validateBody(RequestCloseShiftDTO), this.controller.requestClose.bind(this.controller));
        this.router.patch('/:id/approve-close', AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:shift']), validateParamsDto(ShiftIdParamDto), validateBody(ApproveCloseShiftDTO), this.controller.approveClose.bind(this.controller));
        this.router.get('/:id', AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier', 'access:shift']), validateParamsDto(ShiftIdParamDto), this.controller.getShiftById.bind(this.controller));
        this.router.get("/status/:status", AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier', 'access:shift']), validateParamsDto(ShiftStatusParamDto), this.controller.getShiftsByStatus.bind(this.controller));
        this.router.get("/close/requested", AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:shift']), this.controller.getRequestedCloseShifts.bind(this.controller));
        this.router.get('/cashier/:cashierId', AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier', 'access:shift']), validateParamsDto(CashierIdParamDto), this.controller.getShiftsByCashier.bind(this.controller));
        this.router.get("/type/:type", AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:shift']), validateParamsDto(ShiftTypeParamDto), this.controller.getShiftsByType.bind(this.controller));
        this.router.get("/by-date", AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:shift']), validateQuery(DateQueryDto), this.controller.getShiftsByDate.bind(this.controller));
        this.router.get('/summary/:shiftId', AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'shift:summary']), validateParamsDto(ShiftIdParamDto2), this.controller.getSummaryByShiftId.bind(this.controller));
        this.router.get("/summary/:shiftId/details", AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'shift:summary']), validateParamsDto(ShiftIdParamDto2), this.controller.getSummaryWithDetails.bind(this.controller));
        this.router.get('/summary/by-date', AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'shift:summary']), validateQuery(ShiftSummaryQueryDto), this.controller.getSummaryByShiftTypeAndDate.bind(this.controller));
        this.router.delete('/:id', validateParamsDto(ShiftIdParamDto), this.controller.delete.bind(this.controller));
    }

    public getRouter() {
        return this.router;
    }
}
