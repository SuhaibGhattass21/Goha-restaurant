import { Router } from 'express';
import { PermissionController } from '../controllers/permission.controller';
import { PermissionValidator } from '../validators/permission.validator';

export class PermissionRoutes {
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

    private router: Router;

    constructor(private controller: PermissionController) {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', PermissionValidator.create(), this.controller.create.bind(this.controller));
        this.router.get('/', this.controller.getAll.bind(this.controller));
        this.router.get('/:id', PermissionValidator.getById(), this.controller.getById.bind(this.controller));
        this.router.put('/:id', PermissionValidator.update(), this.controller.update.bind(this.controller));
        this.router.delete('/:id', PermissionValidator.getById(), this.controller.delete.bind(this.controller));
        this.router.get('/admin/:adminId', PermissionValidator.getAdminId(), this.controller.getPermissionsForAdmin.bind(this.controller));
        this.router.get('/shift/:shiftId', PermissionValidator.getShiftId(), this.controller.getPermissionsForShift.bind(this.controller));
    }

    public getRouter(): Router {
        return this.router;
    }
}
