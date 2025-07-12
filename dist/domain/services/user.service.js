"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
    constructor(userUseCase) {
        this.userUseCase = userUseCase;
    }
    createUser(data) {
        return this.userUseCase.createUser(data);
    }
    getUserById(id) {
        return this.userUseCase.getUserById(id);
    }
    getAllUsers(page, limit) {
        return this.userUseCase.getAllUsers(page, limit);
    }
    updateUser(id, data) {
        return this.userUseCase.updateUser(id, data);
    }
    deleteUser(id) {
        return this.userUseCase.deleteUser(id);
    }
    assignPermissions(userId, permissions) {
        return this.userUseCase.assignPermissionsToUser(userId, permissions);
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map