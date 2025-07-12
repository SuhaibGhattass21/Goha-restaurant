"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionController = void 0;
const express_validator_1 = require("express-validator");
class PermissionController {
    constructor(service) {
        this.service = service;
    }
    async create(req, res) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        try {
            const result = await this.service.create(req.body);
            res.status(201).json({ success: true, data: result });
        }
        catch (err) {
            res.status(409).json({ success: false, message: err.message });
        }
    }
    async update(req, res) {
        const result = await this.service.update(req.params.id, req.body);
        if (!result) {
            res.status(404).json({ message: 'Permission not found' });
            return;
        }
        res.json({ success: true, data: result });
    }
    async getById(req, res) {
        const result = await this.service.findById(req.params.id);
        if (!result) {
            res.status(404).json({ message: 'Permission not found' });
            return;
        }
        res.json({ success: true, data: result });
    }
    async getAll(req, res) {
        const result = await this.service.findAll();
        res.json({ success: true, data: result });
    }
    async delete(req, res) {
        const success = await this.service.delete(req.params.id);
        if (!success) {
            res.status(404).json({ message: 'Permission not found' });
            return;
        }
        res.json({ success: true, message: 'Permission deleted' });
    }
    async assignPermissionsToUser(req, res) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
            return;
        }
        try {
            const { userId, permissionIds, grantedBy: granted_by } = req.body;
            await this.service.assignPermissionsToUser(userId, permissionIds, granted_by);
            res.status(200).json({
                success: true,
                message: 'Permissions assigned successfully'
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
    async revokePermissionsFromUser(req, res) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
            return;
        }
        try {
            const { userId, permissionIds } = req.body;
            await this.service.revokePermissionsFromUser(userId, permissionIds);
            res.status(200).json({
                success: true,
                message: 'Permissions revoked successfully'
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
    async getUserPermissions(req, res) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
            return;
        }
        try {
            const userId = req.params.userId;
            const permissions = await this.service.getUserPermissions(userId);
            res.status(200).json({
                success: true,
                data: { permissions }
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
    async checkUserHasPermission(req, res) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
            return;
        }
        try {
            const userId = req.params.userId;
            const permissionName = req.params.permissionName;
            const hasPermission = await this.service.checkUserHasPermission(userId, permissionName);
            res.status(200).json({
                success: true,
                data: { hasPermission }
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
    async getAllPermissionsForUser(req, res) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
            return;
        }
        try {
            const userId = req.params.userId;
            const permissions = await this.service.getAllPermissionsForUser(userId);
            res.status(200).json({
                success: true,
                data: permissions
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
    async getAllUsersWithPermission(req, res) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
            return;
        }
        try {
            const permissionId = req.params.permissionId;
            const users = await this.service.getAllUsersWithPermission(permissionId);
            res.status(200).json({
                success: true,
                data: users
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
    async checkMultiplePermissions(req, res) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
            return;
        }
        try {
            const userId = req.params.userId;
            const { permissionNames } = req.body;
            const result = await this.service.checkMultiplePermissions(userId, permissionNames);
            res.status(200).json({
                success: true,
                data: result
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
    async batchAssignPermission(req, res) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
            return;
        }
        try {
            const { permissionId, userIds, granted_by } = req.body;
            await this.service.batchAssignPermission(permissionId, userIds, granted_by);
            res.status(200).json({
                success: true,
                message: 'Permission assigned to users successfully'
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}
exports.PermissionController = PermissionController;
//# sourceMappingURL=permission.controller.js.map