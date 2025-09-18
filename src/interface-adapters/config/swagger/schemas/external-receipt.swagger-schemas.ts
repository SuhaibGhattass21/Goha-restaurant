/**
         * @swagger
         * tags:
         *   name: ExternalReceipts
         *   description: Manage external receipts printed by cashier
         */

/**
 * @swagger
 * /external-receipts:
 *   post:
 *     summary: Create a new external receipt
 *     tags: [ExternalReceipts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateExternalReceiptDto'
 *     responses:
 *       201:
 *         description: External receipt created successfully
 *       400:
 *         description: Validation error or bad input
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /external-receipts:
 *   get:
 *     summary: Get all external receipts
 *     tags: [ExternalReceipts]
 *     responses:
 *       200:
 *         description: List of all external receipts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ExternalReceiptResponseDto'
 *       500:
 *         description: Internal server error
 *//**
* @swagger
* /external-receipts/{id}:
*   get:
*     summary: Get a single external receipt by ID
*     tags: [ExternalReceipts]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*           format: uuid
*         required: true
*         description: External receipt ID
*     responses:
*       200:
*         description: External receipt found
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/ExternalReceiptResponseDto'
*       404:
*         description: External receipt not found
*       500:
*         description: Internal server error
*/