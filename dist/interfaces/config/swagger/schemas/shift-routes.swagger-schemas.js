"use strict";
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
 * /shifts/status/{status}:
 *   get:
 *     summary: Get shifts by status
 *     tags: [Shifts]
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [opened, closed]
 *         description: Status of the shift to filter
 *     responses:
 *       200:
 *         description: List of shifts by status
 */
/**
 * @swagger
 * /shifts/close-requested:
 *   get:
 *     summary: Get all shifts that have a close request
 *     tags: [Shifts]
 *     responses:
 *       200:
 *         description: List of close-requested shifts
 */
/**
 * @swagger
 * /shifts/type/{type}:
 *   get:
 *     summary: Get shifts by type
 *     tags: [Shifts]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [morning, night]
 *     responses:
 *       200:
 *         description: Shifts by type returned
 */
/**
 * @swagger
 * /shifts/by-date:
 *   get:
 *     summary: Get shifts by date
 *     tags: [Shifts]
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Shifts for the specified date
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
/**
 * @swagger
 * tags:
 *   name: ShiftWorkers
 *   description: Manage workers assigned to shifts
 */
/**
 * @swagger
 * /shift-workers:
 *   post:
 *     summary: Assign a worker to a shift
 *     tags: [ShiftWorkers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddShiftWorkerDto'
 *     responses:
 *       201:
 *         description: Shift worker created successfully
 */
/**
 * @swagger
 * /shift-workers:
 *   get:
 *     summary: Get all shift worker assignments
 *     tags: [ShiftWorkers]
 *     responses:
 *       200:
 *         description: List of all shift workers
 */
/**
 * @swagger
 * /shift-workers/{id}:
 *   get:
 *     summary: Get shift worker details by ID
 *     tags: [ShiftWorkers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ShiftWorker ID
 *     responses:
 *       200:
 *         description: Shift worker details retrieved
 */
/**
 * @swagger
 * /shift-workers/{id}:
 *   put:
 *     summary: Update a shift worker assignment
 *     tags: [ShiftWorkers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ShiftWorker ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateShiftWorkerDto'
 *     responses:
 *       200:
 *         description: Shift worker updated
 */
/**
 * @swagger
 * /shift-workers/{id}:
 *   delete:
 *     summary: Delete a shift worker by ID
 *     tags: [ShiftWorkers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ShiftWorker ID to delete
 *     responses:
 *       200:
 *         description: Shift worker deleted successfully
 */
//# sourceMappingURL=shift-routes.swagger-schemas.js.map