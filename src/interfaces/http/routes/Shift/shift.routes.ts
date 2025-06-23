import { Router } from 'express';
import type { ShiftController } from '../../controllers/Shift/shift.controller';
import { ShiftValidator } from '../../validators/Shift/shift.validator';

export class ShiftRoutes {
    /**
     * @swagger
     * tags:
     *   name: Shifts
     *   description: Operations related to restaurant shifts
     */

    /**
     * @swagger
     * /shifts:
     *   post:
     *     summary: Open a new shift
     *     tags: [Shifts]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/OpenShiftDTO'
     *     responses:
     *       201:
     *         description: Shift opened successfully
     */

    /**
     * @swagger
     * /shifts/{id}/type:
     *   patch:
     *     summary: Admin updates the type of a shift
     *     tags: [Shifts]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID of the shift
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateShiftTypeDTO'
     *     responses:
     *       200:
     *         description: Shift type updated successfully
     */

    /**
     * @swagger
     * /shifts/{id}/request-close:
     *   patch:
     *     summary: Cashier requests to close the shift
     *     tags: [Shifts]
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: Shift ID
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/RequestCloseShiftDTO'
     *     responses:
     *       200:
     *         description: Shift close request submitted
     */

    /**
     * @swagger
     * /shifts/{id}/approve-close:
     *   patch:
     *     summary: Admin approves the shift close request
     *     tags: [Shifts]
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: Shift ID
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ApproveCloseShiftDTO'
     *     responses:
     *       200:
     *         description: Shift successfully closed
     */

    /**
     * @swagger
     * /shifts/{id}:
     *   get:
     *     summary: Get shift details by ID
     *     tags: [Shifts]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: Shift ID
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Shift data retrieved
     */

    /**
     * @swagger
     * /shifts/cashier/{cashierId}:
     *   get:
     *     summary: Get all shifts created by a specific cashier
     *     tags: [Shifts]
     *     parameters:
     *       - in: path
     *         name: cashierId
     *         required: true
     *         description: Cashier User ID
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: List of shifts by cashier
     */

    /**
     * @swagger
     * /shifts/{id}/summary:
     *   get:
     *     summary: Get summary for a specific shift
     *     tags: [Shifts]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: Shift ID
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Shift summary retrieved
     */

    /**
     * @swagger
     * /shifts/summaries/all:
     *   get:
     *     summary: Get all shift summaries
     *     tags: [Shifts]
     *     responses:
     *       200:
     *         description: All shift summaries retrieved
     */

    /**
     * @swagger
     * /shifts/{id}:
     *   delete:
     *     summary: Delete a shift by ID
     *     tags: [Shifts]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: Shift ID to delete
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Shift deleted successfully
     */

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
        this.router.get('/cashier/:cashierId', ShiftValidator.getByCashier(), this.controller.getShiftsByCashier.bind(this.controller));
        this.router.get('/:id/summary', this.controller.getShiftSummary.bind(this.controller));
        this.router.get('/summaries/all', this.controller.getAllSummaries.bind(this.controller));
        this.router.delete('/:id', ShiftValidator.getById(), this.controller.delete.bind(this.controller));
    }

    public getRouter() {
        return this.router;
    }
}
