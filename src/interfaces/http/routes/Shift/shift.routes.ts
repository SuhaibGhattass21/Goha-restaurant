import { Router } from 'express';
import type { ShiftController } from '../../controllers/Shift/shift.controller';
import { ShiftValidator } from '../../validators/Shift/shift.validator';

export class ShiftRoutes {
    private router = Router();

    constructor(private controller: ShiftController) {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/', ShiftValidator.open(), this.controller.openShift.bind(this.controller));
        this.router.patch('/:id/type', ShiftValidator.updateType(), this.controller.updateShiftType.bind(this.controller));
        this.router.patch('/:id/request-close', ShiftValidator.requestClose(), this.controller.requestClose.bind(this.controller));
        this.router.patch('/:id/approve-close', ShiftValidator.approveClose(), this.controller.approveClose.bind(this.controller));
        this.router.get('/:id', ShiftValidator.getById(), this.controller.getShiftById.bind(this.controller));
        this.router.get("/status/:status", ShiftValidator.getByStatus(), this.controller.getShiftsByStatus.bind(this.controller));
        this.router.get('/cashier/:cashierId', ShiftValidator.getByCashier(), this.controller.getShiftsByCashier.bind(this.controller));
        this.router.get('/:id/summary', this.controller.getShiftSummary.bind(this.controller));
        this.router.get('/summaries/all', this.controller.getAllSummaries.bind(this.controller));
        this.router.delete('/:id', ShiftValidator.getById(), this.controller.delete.bind(this.controller));
    }

    public getRouter() {
        return this.router;
    }
}
