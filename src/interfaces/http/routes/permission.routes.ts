import { Router } from 'express';
import { PermissionController } from '../controllers/permission.controller';
import { PermissionValidator } from '../validators/permission.validator';

export class PermissionRoutes {
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
