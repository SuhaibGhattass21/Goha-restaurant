/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Manage customer orders (Goha & Cafe)
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderDto'
 *     responses:
 *       201:
 *         description: Order created successfully
 */

/**
 * @swagger
 * /orders/cafe:
 *   get:
 *     summary: Get all cafe orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Cafe orders retrieved
 */

/**
 * @swagger
 * /orders/except-cafe:
 *   get:
 *     summary: Get all non-cafe orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Non-cafe orders retrieved
 */

/**
 * @swagger
 * /orders/stats:
 *   get:
 *     summary: Get order statistics for non-cafe
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Statistics retrieved
 */

/**
 * @swagger
 * /orders/stats-cafe:
 *   get:
 *     summary: Get order statistics for cafe
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Cafe statistics retrieved
 */

/**
 * @swagger
 * /orders/shift-goha/{shiftId}:
 *   get:
 *     summary: Get Goha orders by shift ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: shiftId
 *         required: true
 *         schema:
 *           type: string
 *         description: Shift ID
 *     responses:
 *       200:
 *         description: Goha orders retrieved
 */

/**
 * @swagger
 * /orders/shift-cafe/{shiftId}:
 *   get:
 *     summary: Get Cafe orders by shift ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: shiftId
 *         required: true
 *         schema:
 *           type: string
 *         description: Shift ID
 *     responses:
 *       200:
 *         description: Cafe orders retrieved
 */

/**
 * @swagger
 * /orders/cashier/{cashierId}:
 *   get:
 *     summary: Get orders by cashier ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: cashierId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cashier user ID
 *     responses:
 *       200:
 *         description: Orders by cashier
 */

/**
 * @swagger
 * /orders/status/{status}:
 *   get:
 *     summary: Get orders by status
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [active, completed, cancelled]
 *         description: Order status
 *     responses:
 *       200:
 *         description: Orders by status
 */

/**
 * @swagger
 * /orders/type/{type}:
 *   get:
 *     summary: Get orders by type
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [dine-in, takeaway, delivery, cafe]
 *         description: Order type
 *     responses:
 *       200:
 *         description: Orders by type
 */

/**
 * @swagger
 * /orders/date-range:
 *   get:
 *     summary: Get orders by date range
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: start_date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: end_date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Orders in date range
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details retrieved
 */

/**
 * @swagger
 * /orders/shift-type/date:
 *   get:
 *     summary: Get orders by shift type and date
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: shift_type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [morning, night]
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Orders filtered by shift type and date
 */

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrderDto'
 *     responses:
 *       200:
 *         description: Order updated
 */

/**
 * @swagger
 * /orders/{id}/{status}:
 *   patch:
 *     summary: Update order status
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [active, completed, cancelled]
 *     responses:
 *       200:
 *         description: Status updated
 */

/**
 * @swagger
 * /orders/{id}/recalculate:
 *   post:
 *     summary: Recalculate order total
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order total recalculated
 */

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted
 */
