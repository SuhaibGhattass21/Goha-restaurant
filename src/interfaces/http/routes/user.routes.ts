import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateBody } from '../middlewares/validation.middleware';
import { CreateUserDto, UpdateUserDto } from '../../../application/dtos/user.dto';
import { validateParams } from '../../utils/validation-helpers';
import { AssignPermissionsDto } from '../../../application/dtos/Permission.dto';

export class UserRoutes {
  private router: Router;

  constructor(private controller: UserController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', validateBody(CreateUserDto), this.controller.createUser.bind(this.controller));
    this.router.get('/', this.controller.getAllUsers.bind(this.controller));
    this.router.get('/:id', validateParams(['id']), this.controller.getUserById.bind(this.controller));
    this.router.put('/:id', validateParams(['id']), validateBody(UpdateUserDto), this.controller.updateUser.bind(this.controller));
    this.router.delete('/:id', validateParams(['id']), this.controller.deleteUser.bind(this.controller));
    this.router.post('/assign-permissions', validateBody(AssignPermissionsDto), this.controller.assignPermissions.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}
