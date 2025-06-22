import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserValidator } from '../validators/user.validator';

export class UserRoutes {
  /**
   * @swagger
   * tags:
   *   name: Users
   *   description: User management and permissions
   */

  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Get all users
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: List of users
   */

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Get user by ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *           format: uuid
   *         required: true
   *         description: User ID
   *     responses:
   *       200:
   *         description: User found
   *       404:
   *         description: User not found
   */

  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Create a new user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateUserDto'
   *     responses:
   *       201:
   *         description: User created
   */

  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     summary: Update user
   *     tags: [Users]
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
   *             $ref: '#/components/schemas/UpdateUserDto'
   *     responses:
   *       200:
   *         description: User updated
   *       404:
   *         description: User not found
   */

  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: Delete user
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *           format: uuid
   *         required: true
   *     responses:
   *       200:
   *         description: User deleted
   *       404:
   *         description: User not found
   */

  /**
   * @swagger
   * /users/assign-permissions:
   *   post:
   *     summary: Assign permissions to user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [userId, permissions]
   *             properties:
   *               userId:
   *                 type: string
   *                 format: uuid
   *               permissions:
   *                 type: array
   *                 items:
   *                   type: string
   *                   format: uuid
   *     responses:
   *       200:
   *         description: Permissions assigned
   */

  private router: Router;

  constructor(private controller: UserController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', this.controller.createUser.bind(this.controller));
    this.router.get('/', this.controller.getAllUsers.bind(this.controller));
    this.router.get('/:id', UserValidator.getUserById(), this.controller.getUserById.bind(this.controller));
    this.router.put('/:id', UserValidator.updateUser(), this.controller.updateUser.bind(this.controller));
    this.router.delete('/:id', UserValidator.getUserById(), this.controller.deleteUser.bind(this.controller));
    this.router.post('/assign-permissions', UserValidator.assignPermissions(), this.controller.assignPermissions.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}
