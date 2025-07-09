/**
 * @swagger
 * tags:
 *   name: Workers
 *   description: Manage restaurant workers
 */
/**
 * @swagger
 * /workers:
 *   post:
 *     summary: Create a new worker
 *     tags: [Workers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateWorkerDto'
 *     responses:
 *       201:
 *         description: Worker created successfully
 *       400:
 *         description: Bad request
 */
/**
 * @swagger
 * /workers:
 *   get:
 *     summary: Get all workers
 *     tags: [Workers]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number
 *         required: false
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         description: Number of items per page
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of workers
 */
/**
 * @swagger
 * /workers/{id}:
 *   get:
 *     summary: Get worker by ID
 *     tags: [Workers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Worker found
 *       404:
 *         description: Worker not found
 */
/**
 * @swagger
 * /workers/{id}:
 *   put:
 *     summary: Update a worker
 *     tags: [Workers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateWorkerDto'
 *     responses:
 *       200:
 *         description: Worker updated
 *       404:
 *         description: Worker not found
 */
/**
 * @swagger
 * /workers/{id}:
 *   delete:
 *     summary: Delete a worker
 *     tags: [Workers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Worker deleted
 *       404:
 *         description: Worker not found
 */
