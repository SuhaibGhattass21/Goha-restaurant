/**
* @swagger
* tags:
*   name: Permissions
*   description: Manage system-wide permissions
*/

/**
 * @swagger
 * /permissions:
 *   get:
 *     summary: Get all permissions
 *     tags: [Permissions]
 *     responses:
 *       200:
 *         description: List of permissions
 */

/**
 * @swagger
 * /permissions/{id}:
 *   get:
 *     summary: Get permission by ID
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *     responses:
 *       200:
 *         description: Permission found
 *       404:
 *         description: Permission not found
 */

/**
 * @swagger
 * /permissions:
 *   post:
 *     summary: Create a new permission
 *     tags: [Permissions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePermissionDto'
 *     responses:
 *       201:
 *         description: Permission created
 */

/**
 * @swagger
 * /permissions/{id}:
 *   put:
 *     summary: Update permission
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePermissionDto'
 *     responses:
 *       200:
 *         description: Permission updated
 */

/**
 * @swagger
 * /permissions/{id}:
 *   delete:
 *     summary: Delete permission
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Permission deleted
 */

/**
 * @swagger
 * /permissions/admin/{adminId}:
 *   get:
 *     summary: Get permissions by admin ID
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: adminId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: List of permissions for the admin
 */

/**
 * @swagger
 * /permissions/shift/{shiftId}:
 *   get:
 *     summary: Get permissions by shift ID
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: shiftId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: List of permissions for the shift
 */


/**
 * @swagger
 * /permissions/assign:
 *   post:
 *     summary: Assign permissions to a user
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssignPermissionsDto'
 *     responses:
 *       200:
 *         description: Permissions assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /permissions/revoke:
 *   post:
 *     summary: Revoke permissions from a user
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssignPermissionsDto'
 *     responses:
 *       200:
 *         description: Permissions revoked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /permissions/batch-assign:
 *   post:
 *     summary: Assign a permission to multiple users
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BatchAssignPermissionDto'
 *     responses:
 *       200:
 *         description: Permission assigned to users successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /permissions/user/{userId}/permissions:
 *   get:
 *     summary: Get user permissions
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of permission names
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       400:
 *         description: Invalid user ID
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /permissions/user/{userId}/has-permission/{permissionName}:
 *   get:
 *     summary: Check if user has a specific permission
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: path
 *         name: permissionName
 *         required: true
 *         schema:
 *           type: string
 *         description: Permission name
 *     responses:
 *       200:
 *         description: Result of permission check
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hasPermission:
 *                   type: boolean
 *       400:
 *         description: Invalid input
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /permissions/user/{userId}/check-permissions:
 *   post:
 *     summary: Check if user has multiple permissions
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CheckPermissionsDto'
 *     responses:
 *       200:
 *         description: Result of permissions check
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermissionCheckResult'
 *       400:
 *         description: Invalid input
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /permissions/user/{userId}/all-permissions:
 *   get:
 *     summary: Get all permissions for a user
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of detailed permission information
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   granted_at:
 *                     type: string
 *                     format: date-time
 *                   granted_by_name:
 *                     type: string
 *       400:
 *         description: Invalid user ID
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /permissions/users-with-permission/{permissionId}:
 *   get:
 *     summary: Get all users with a specific permission
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: permissionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Permission ID
 *     responses:
 *       200:
 *         description: List of users with the permission
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   granted_at:
 *                     type: string
 *                     format: date-time
 *                   granted_by_name:
 *                     type: string
 *       400:
 *         description: Invalid permission ID
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
