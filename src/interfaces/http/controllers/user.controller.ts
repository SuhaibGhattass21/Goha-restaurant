import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import type { UserService } from '@domain/services/user.service';

export class UserController {
  constructor(private userService: UserService) { }

  async createUser(req: Request, res: Response): Promise<void> {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   res.status(400).json({ success: false, errors: errors.array() });
    //   return;
    // }

    try {
      const result = await this.userService.createUser(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (err: any) {
      res.status(409).json({ success: false, message: err.message });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const result = await this.userService.getUserById(req.params.id);
    if (!result) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.json({ success: true, data: result });
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const users = await this.userService.getAllUsers(page, limit);
    res.json({ success: true, data: users });
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
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
    } catch (err: any) {
      res.status(409).json({ success: false, message: err.message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const deleted = await this.userService.deleteUser(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.json({ success: true, message: 'User deleted' });
  }

  async assignPermissions(req: Request, res: Response): Promise<void> {
    const { userId, permissions } = req.body;

    try {
      const result = await this.userService.assignPermissions(userId, permissions);
      res.json({ success: true, data: result });
    } catch (err: any) {
      res.status(404).json({ success: false, message: err.message });
    }
  }
}
