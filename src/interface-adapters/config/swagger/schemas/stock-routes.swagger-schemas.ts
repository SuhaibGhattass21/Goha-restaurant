/**
 * @swagger
 * tags:
 *   name: Stock Items
 *   description: Stock item management for inventory
 */

/**
 * @swagger
 * /stock-items:
 *   get:
 *     summary: Get all stock items
 *     tags: [Stock Items]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of stock items
 */

/**
 * @swagger
 * /stock-items/{id}:
 *   get:
 *     summary: Get stock item by ID
 *     tags: [Stock Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Stock item found
 *       404:
 *         description: Stock item not found
 */

/**
 * @swagger
 * /stock-items:
 *   post:
 *     summary: Create a new stock item
 *     tags: [Stock Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateStockItemDto'
 *     responses:
 *       201:
 *         description: Stock item created
 */

/**
 * @swagger
 * /stock-items/{id}:
 *   put:
 *     summary: Update stock item
 *     tags: [Stock Items]
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
 *             $ref: '#/components/schemas/UpdateStockItemDto'
 *     responses:
 *       200:
 *         description: Stock item updated
 */

/**
 * @swagger
 * /stock-items/{id}:
 *   delete:
 *     summary: Delete stock item
 *     tags: [Stock Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stock item deleted
 */

/**
 * @swagger
 * /stock-items/low-stock:
 *   get:
 *     summary: Get low stock items
 *     tags: [Stock Items]
 *     responses:
 *       200:
 *         description: List of low stock items
 */

/**
 * @swagger
 * /stock-items/type/{type}:
 *   get:
 *     summary: Get stock items by type
 *     tags: [Stock Items]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stock items by type
 */

/**
 * @swagger
 * /stock-transactions:
 *   post:
 *     summary: Create a new stock transaction
 *     tags: [Stock Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateStockTransactionDto'
 *     responses:
 *       201:
 *         description: Stock transaction created successfully
 */

/**
 * @swagger
 * /stock-transactions:
 *   get:
 *     summary: Get all stock transactions with optional pagination
 *     tags: [Stock Transactions]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of stock transactions
 */

/**
 * @swagger
 * /stock-transactions/stock-item/{stockItemId}:
 *   get:
 *     summary: Get transactions for a specific stock item
 *     tags: [Stock Transactions]
 *     parameters:
 *       - in: path
 *         name: stockItemId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the stock item
 *     responses:
 *       200:
 *         description: Transactions for the specified stock item
 */

/**
 * @swagger
 * /stock-transactions/shift/{shiftId}:
 *   get:
 *     summary: Get transactions for a specific shift
 *     tags: [Stock Transactions]
 *     parameters:
 *       - in: path
 *         name: shiftId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the shift
 *     responses:
 *       200:
 *         description: Transactions for the specified shift
 */

/**
 * @swagger
 * /stock-transactions/user/{userId}:
 *   get:
 *     summary: Get transactions made by a specific user
 *     tags: [Stock Transactions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Transactions by the specified user
 */

/**
 * @swagger
 * /stock-transactions/stats/{stockItemId}:
 *   get:
 *     summary: Get statistics for a specific stock item
 *     tags: [Stock Transactions]
 *     parameters:
 *       - in: path
 *         name: stockItemId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the stock item
 *     responses:
 *       200:
 *         description: Stock statistics retrieved
 */

/**
 * @swagger
 * /stock-transactions/{id}:
 *   get:
 *     summary: Get a stock transaction by its ID
 *     tags: [Stock Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Stock transaction ID
 *     responses:
 *       200:
 *         description: Stock transaction found
 */

/**
 * @swagger
 * /stock-transactions/{id}:
 *   put:
 *     summary: Update a stock transaction by ID
 *     tags: [Stock Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the stock transaction to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateStockTransactionDto'
 *     responses:
 *       200:
 *         description: Stock transaction updated
 */

/**
 * @swagger
 * /stock-transactions/{id}:
 *   delete:
 *     summary: Delete a stock transaction by ID
 *     tags: [Stock Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the stock transaction to delete
 *     responses:
 *       200:
 *         description: Stock transaction deleted successfully
 */
/**
 * @swagger
 * /stock-reports/daily:
 *   get:
 *     summary: Get daily stock report
 *     tags: [Stock Reports]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Date for the report (YYYY-MM-DD)
 *       - in: query
 *         name: shift_id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: false
 *         description: Shift ID to filter
 *       - in: query
 *         name: include_low_stock_only
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Only include low stock items
 *       - in: query
 *         name: stock_item_type
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by stock item type
 *     responses:
 *       200:
 *         description: Daily stock report generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StockTransactionListResponseDto'
 */

/**
 * @swagger
 * /stock-reports/shift/{shiftId}:
 *   get:
 *     summary: Get shift stock report
 *     tags: [Stock Reports]
 *     parameters:
 *       - in: path
 *         name: shiftId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Shift ID
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Date for the report (YYYY-MM-DD)
 *       - in: query
 *         name: include_low_stock_only
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Only include low stock items
 *       - in: query
 *         name: stock_item_type
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by stock item type
 *     responses:
 *       200:
 *         description: Shift stock report generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShiftTransactionSummaryDto'
 */