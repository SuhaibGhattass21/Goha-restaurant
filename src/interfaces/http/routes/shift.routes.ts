import { Router } from 'express';
import type { ShiftController } from '../controllers/shift.controller';
import { ShiftValidator } from '../validators/shift.validator';

export class ShiftRoutes {
    private router: Router;
    private shiftController: ShiftController;

    constructor(shiftController: ShiftController) {
        this.router = Router();
        this.shiftController = shiftController;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // POST /shifts - Open a new shift
        this.router.post(
            '/',
            ShiftValidator.openShift(),
            this.shiftController.openShift.bind(this.shiftController),
        );

        // PATCH /shifts/:id/type - Update shift type
        this.router.patch(
            '/:id/type',
            ShiftValidator.updateShiftType(),
            this.shiftController.updateShiftType.bind(this.shiftController),
        );

        // PATCH /shifts/:id/request-close - Cashier requests to close shift
        this.router.patch(
            '/:id/request-close',
            ShiftValidator.requestClose(),
            this.shiftController.requestClose.bind(this.shiftController),
        );

        // PATCH /shifts/:id/approve-close - Admin approves closing
        this.router.patch(
            '/:id/approve-close',
            ShiftValidator.approveClose(),
            this.shiftController.approveClose.bind(this.shiftController),
        );

        // GET /shifts/:id - Get shift by ID
        this.router.get(
            '/:id',
            this.shiftController.getShiftById.bind(this.shiftController),
        );

        // GET /shifts/cashier/:cashierId - Get shifts for a cashier
        this.router.get(
            '/cashier/:cashierId',
            this.shiftController.getShiftsByCashier.bind(this.shiftController),
        );

        // GET /shifts/:id/summary - Get summary for a single shift
        this.router.get(
            '/:id/summary',
            this.shiftController.getShiftSummary.bind(this.shiftController),
        );

        // GET /shifts/summaries - Get all shift summaries
        this.router.get(
            '/summaries',
            this.shiftController.getAllSummaries.bind(this.shiftController),
        );
    }

    public getRouter(): Router {
        return this.router;
    }
}
