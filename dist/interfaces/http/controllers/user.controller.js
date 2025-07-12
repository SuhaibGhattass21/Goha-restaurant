"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_validator_1 = require("express-validator");
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(req, res) {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //   res.status(400).json({ success: false, errors: errors.array() });
        //   return;
        // }
        try {
            const result = await this.userService.createUser(req.body);
            res.status(201).json({ success: true, data: result });
        }
        catch (err) {
            res.status(409).json({ success: false, message: err.message });
        }
    }
    async getUserById(req, res) {
        const result = await this.userService.getUserById(req.params.id);
        if (!result) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }
        res.json({ success: true, data: result });
    }
    async getAllUsers(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const users = await this.userService.getAllUsers(page, limit);
        res.json({ success: true, data: users });
    }
    async updateUser(req, res) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ success: false, errors: errors.array() });
            return;
        }
        try {
            const result = await this.userService.updateUser(req.params.id, req.body);
            if (!result) {
                res.status(404).json({ success: false, message: 'User not found' });
                return;
            }
            res.json({ success: true, data: result });
        }
        catch (err) {
            res.status(409).json({ success: false, message: err.message });
        }
    }
    async deleteUser(req, res) {
        const deleted = await this.userService.deleteUser(req.params.id);
        if (!deleted) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }
        res.json({ success: true, message: 'User deleted' });
    }
    async assignPermissions(req, res) {
        const { userId, permissions } = req.body;
        try {
            const result = await this.userService.assignPermissions(userId, permissions);
            res.json({ success: true, data: result });
        }
        catch (err) {
            res.status(404).json({ success: false, message: err.message });
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map