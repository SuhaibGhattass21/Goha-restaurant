"use strict";
/**
* @swagger
* tags:
*   name: ProductSizePrices
*   description: Manage size-specific prices per product
*/
/**
 * @swagger
 * /product-size-prices:
 *   get:
 *     summary: Get all product size prices
 *     tags: [ProductSizePrices]
 *     responses:
 *       200:
 *         description: List of size prices
 */
/**
 * @swagger
 * /product-size-prices:
 *   post:
 *     summary: Create new size-price for a product
 *     tags: [ProductSizePrices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductSizePriceDTO'
 *     responses:
 *       201:
 *         description: Size-price created
 */
/**
 * @swagger
 * /product-size-prices/{id}:
 *   get:
 *     summary: Get product size-price by ID
 *     tags: [ProductSizePrices]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Found
 */
/**
 * @swagger
 * /product-size-prices/{id}:
 *   put:
 *     summary: Update a product size-price
 *     tags: [ProductSizePrices]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProductSizePriceDTO'
 *     responses:
 *       200:
 *         description: Updated
 */
/**
 * @swagger
 * /product-size-prices/{id}:
 *   delete:
 *     summary: Delete a product size-price
 *     tags: [ProductSizePrices]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 */
/**
* @swagger
* tags:
*   name: Products
*   description: Manage restaurant products
*/
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Product list
 */
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductDTO'
 *     responses:
 *       201:
 *         description: Product created
 */
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 */
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update product
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProductDTO'
 *     responses:
 *       200:
 *         description: Product updated
 */
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted
 */
//# sourceMappingURL=product-routes.swagger.schema.js.map