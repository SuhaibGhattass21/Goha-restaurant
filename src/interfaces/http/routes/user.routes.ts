import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserValidator } from '../validators/user.validator';

export class UserRoutes {
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
