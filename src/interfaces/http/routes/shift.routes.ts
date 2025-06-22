import { Router } from 'express';
import type { ShiftController } from '../controllers/shift.controller';
import { ShiftValidator } from '../validators/shift.validator';

export class ShiftRoutes {
    /**
 * @swagger
 * tags:
 *   name: Shifts
 *   description: Manage restaurant shifts
 */

    /**
     * @swagger
     * /shifts:
     *   post:
     *     summary: Open a shift
     *     tags: [Shifts]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/OpenShiftDTO'
     *     responses:
     *       201:
     *         description: Shift opened
     */

    /**
     * @swagger
     * /shifts/{id}/type:
     *   patch:
     *     summary: Admin updates shift type
     *     tags: [Shifts]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateShiftTypeDTO'
     *     responses:
     *       200:
     *         description: Shift type updated
     */

    /**
     * @swagger
     * /shifts/{id}/request-close:
     *   patch:
     *     summary: Cashier requests shift close
     *     tags: [Shifts]
     *     parameters:
     *       - name: id
     *         in: path
     *         schema:
     *           type: string
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/RequestCloseShiftDTO'
     *     responses:
     *       200:
     *         description: Request recorded
     */

    /**
     * @swagger
     * /shifts/{id}/approve-close:
     *   patch:
     *     summary: Admin approves shift close
     *     tags: [Shifts]
     *     parameters:
     *       - name: id
     *         in: path
     *         schema:
     *           type: string
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ApproveCloseShiftDTO'
     *     responses:
     *       200:
     *         description: Shift closed
     */

    /**
     * @swagger
     * /shifts/summary:
     *   get:
     *     summary: Get all shift summaries
     *     tags: [Shifts]
     *     responses:
     *       200:
     *         description: Summaries list
     */

    /**
     * @swagger
     * /shifts/summary/{id}:
     *   get:
     *     summary: Get shift summary by ID
     *     tags: [Shifts]
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Summary found
     */

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
