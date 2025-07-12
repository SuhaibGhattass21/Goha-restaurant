/**
* @swagger
* tags:
*   name: CategoryExtras
*   description: Manage extra options per category
*/
/**
 * @swagger
 * /category-extras:
 *   get:
 *     summary: Get all category extras
 *     tags: [CategoryExtras]
 *     responses:
 *       200:
 *         description: List of extras
 */
/**
 * @swagger
 * /category-extras:
 *   post:
 *     summary: Add a new extra to a category
 *     tags: [CategoryExtras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryExtraDTO'
 *     responses:
 *       201:
 *         description: Extra created
 */
/**
 * @swagger
 * /category-extras/{id}:
 *   get:
 *     summary: Get category extra by ID
 *     tags: [CategoryExtras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Extra found
 */
/**
 * @swagger
 * /category-extras/{id}:
 *   put:
 *     summary: Update a category extra
 *     tags: [CategoryExtras]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCategoryExtraDTO'
 *     responses:
 *       200:
 *         description: Extra updated
 */
/**
 * @swagger
 * /category-extras/{id}:
 *   delete:
 *     summary: Delete a category extra
 *     tags: [CategoryExtras]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Extra deleted
 */
/**
* @swagger
* tags:
*   name: CategorySizes
*   description: Manage size options per category
*/
/**
 * @swagger
 * /category-sizes:
 *   get:
 *     summary: Get all category sizes
 *     tags: [CategorySizes]
 *     responses:
 *       200:
 *         description: List of sizes
 */
/**
 * @swagger
 * /category-sizes:
 *   post:
 *     summary: Add a new size to a category
 *     tags: [CategorySizes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategorySizeDTO'
 *     responses:
 *       201:
 *         description: Size created
 */
/**
 * @swagger
 * /category-sizes/{id}:
 *   get:
 *     summary: Get category size by ID
 *     tags: [CategorySizes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Size found
 */
/**
 * @swagger
 * /category-sizes/{id}:
 *   put:
 *     summary: Update a category size
 *     tags: [CategorySizes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCategorySizeDTO'
 *     responses:
 *       200:
 *         description: Size updated
 */
/**
 * @swagger
 * /category-sizes/{id}:
 *   delete:
 *     summary: Delete a category size
 *     tags: [CategorySizes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Size deleted
 */
/**
* @swagger
* tags:
*   name: Categories
*   description: Category management for menu items
*/
/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 */
/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Category found
 *       404:
 *         description: Category not found
 */
/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryDTO'
 *     responses:
 *       201:
 *         description: Category created
 */
/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update category
 *     tags: [Categories]
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
 *             $ref: '#/components/schemas/UpdateCategoryDTO'
 *     responses:
 *       200:
 *         description: Category updated
 */
/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted
 */
