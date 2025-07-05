/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Manage customer orders
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
 * /orders:
 *   get:
 *     summary: Get all orders with pagination
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of orders
 */

/**
 * @swagger
 * /orders/stats:
 *   get:
 *     summary: Get order statistics
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Order statistics retrieved
 */

/**
 * @swagger
 * /orders/shift/{shiftId}:
 *   get:
 *     summary: Get orders by shift ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: shiftId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the shift
 *     responses:
 *       200:
 *         description: Orders for the shift retrieved
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
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the cashier
 *     responses:
 *       200:
 *         description: Orders by cashier retrieved
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
 *         schema:
 *           type: string
 *         required: true
 *         description: Status of the orders
 *     responses:
 *       200:
 *         description: Orders by status retrieved
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
 *         schema:
 *           type: string
 *         required: true
 *         description: Type of the orders
 *     responses:
 *       200:
 *         description: Orders by type retrieved
 */

/**
 * @swagger
 * /orders/date-range:
 *   get:
 *     summary: Get orders by date range
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Orders in date range retrieved
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
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order found
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
 * /orders/{id}/status:
 *   patch:
 *     summary: Update order status
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *     summary: Delete order by ID
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
/**
 * @swagger
 * tags:
 *   name: Order Items
 *   description: Manage order items
 */

/**
 * @swagger
 * /order-items:
 *   post:
 *     summary: Create a new order item
 *     tags: [Order Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderItemDto'
 *     responses:
 *       201:
 *         description: Order item created
 */

/**
 * @swagger
 * /order-items:
 *   get:
 *     summary: Get all order items
 *     tags: [Order Items]
 *     responses:
 *       200:
 *         description: Order items list
 */

/**
 * @swagger
 * /order-items/order/{orderId}:
 *   get:
 *     summary: Get items by order ID
 *     tags: [Order Items]
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Items found
 */

/**
 * @swagger
 * /order-items/{id}:
 *   get:
 *     summary: Get order item by ID
 *     tags: [Order Items]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order item found
 */

/**
 * @swagger
 * /order-items/{id}:
 *   put:
 *     summary: Update order item
 *     tags: [Order Items]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order item updated
 */

/**
 * @swagger
 * /order-items/{id}:
 *   delete:
 *     summary: Delete order item
 *     tags: [Order Items]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order item deleted
 */
/**
 * @swagger
 * tags:
 *   name: Cancelled Orders
 *   description: Track cancelled orders
 */

/**
 * @swagger
 * /cancelled-orders:
 *   post:
 *     summary: Record a cancelled order
 *     tags: [Cancelled Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCancelledOrderDto'
 *     responses:
 *       201:
 *         description: Cancelled order recorded
 */

/**
 * @swagger
 * /cancelled-orders:
 *   get:
 *     summary: Get all cancelled orders
 *     tags: [Cancelled Orders]
 *     responses:
 *       200:
 *         description: List of cancelled orders
 */

/**
 * @swagger
 * /cancelled-orders/{id}:
 *   get:
 *     summary: Get cancelled order by ID
 *     tags: [Cancelled Orders]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cancelled order found
 */

/**
 * @swagger
 * /cancelled-orders/order/{orderId}:
 *   get:
 *     summary: Get cancelled order by original order ID
 *     tags: [Cancelled Orders]
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cancelled order found
 */

/**
 * @swagger
 * /cancelled-orders/user/{userId}:
 *   get:
 *     summary: Get cancelled orders by user
 *     tags: [Cancelled Orders]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cancelled orders by user found
 */

/**
 * @swagger
 * /cancelled-orders/shift/{shiftId}:
 *   get:
 *     summary: Get cancelled orders by shift ID
 *     tags: [Cancelled Orders]
 *     parameters:
 *       - name: shiftId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cancelled orders for shift found
 */
