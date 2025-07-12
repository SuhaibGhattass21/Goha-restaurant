"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_validator_1 = require("../validators/user.validator");
class UserRoutes {
    constructor(controller) {
        this.controller = controller;
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/', this.controller.createUser.bind(this.controller));
        this.router.get('/', this.controller.getAllUsers.bind(this.controller));
        this.router.get('/:id', user_validator_1.UserValidator.getUserById(), this.controller.getUserById.bind(this.controller));
        this.router.put('/:id', user_validator_1.UserValidator.updateUser(), this.controller.updateUser.bind(this.controller));
        this.router.delete('/:id', user_validator_1.UserValidator.getUserById(), this.controller.deleteUser.bind(this.controller));
        this.router.post('/assign-permissions', user_validator_1.UserValidator.assignPermissions(), this.controller.assignPermissions.bind(this.controller));
    }
    getRouter() {
        return this.router;
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=user.routes.js.map