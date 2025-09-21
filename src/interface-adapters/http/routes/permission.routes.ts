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

        this.router.post('/assign',
            PermissionValidator.assignPermissions(),
            this.controller.assignPermissionsToUser.bind(this.controller)
        );

        this.router.post('/revoke',
            PermissionValidator.revokePermissions(),
            this.controller.revokePermissionsFromUser.bind(this.controller)
        );

        this.router.post('/batch-assign',
            PermissionValidator.batchAssignPermission(),
            this.controller.batchAssignPermission.bind(this.controller)
        );

        // User permission queries
        this.router.get('/user/:userId/permissions',
            this.controller.getUserPermissions.bind(this.controller)
        );

        this.router.get('/user/:userId/has-permission/:permissionName',
            this.controller.checkUserHasPermission.bind(this.controller)
        );

        this.router.post('/user/:userId/check-permissions',
            PermissionValidator.checkMultiplePermissions(),
            this.controller.checkMultiplePermissions.bind(this.controller)
        );

        this.router.get('/user/:userId/all-permissions',
            this.controller.getAllPermissionsForUser.bind(this.controller)
        );

        this.router.get('/users-with-permission/:permissionId',
            this.controller.getAllUsersWithPermission.bind(this.controller)
        );

    }

    public getRouter(): Router {
        return this.router;
    }
}
