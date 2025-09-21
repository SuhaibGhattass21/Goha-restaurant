import { Request, Response, NextFunction, RequestHandler } from "express";
import { JwtUtils } from "../../utils/jwt.utils";
import { AppDataSource } from "../../../infrastructure/database/postgres/db";
import { User } from "../../../infrastructure/database/models";
import { AuthenticatedRequest } from "../../interfaces/auth.interfaces";

export class AuthMiddleware {
  constructor() {}

  static authenticate() {
    return async (
      req: AuthenticatedRequest,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          res.status(401).json({
            success: false,
            message: "Access token required",
          });
          return;
        }

        const token = authHeader.substring(7);
        const decoded: any = JwtUtils.verifyToken(token);

        // token version check
        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOne({ where: { id: decoded.userId } });
        if (!user || (decoded.tokenVersion ?? 0) !== (user.tokenVersion ?? 0)) {
          res.status(401).json({ success: false, message: "Invalid or expired token" });
          return;
        }

        req.user = {
          userId: decoded.userId,
          username: decoded.username,
          permissions: decoded.permissions || [],
        };

        next();
      } catch (error: any) {
        res.status(401).json({
          success: false,
          message: "Invalid or expired token",
        });
        return;
      }
    };
  }
  optionalAuth = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authHeader = req.headers.authorization;

      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7);
        const decoded: any = JwtUtils.verifyToken(token);

        // token version check
        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOne({ where: { id: decoded.userId } });
        if (user && (decoded.tokenVersion ?? 0) === (user.tokenVersion ?? 0)) {
          req.user = {
            userId: decoded.userId,
            username: decoded.username,
            permissions: decoded.permissions || [],
          };
        }
      }

      next();
    } catch (error) {
      next();
    }
  };
}
