import { Request, Response, NextFunction, RequestHandler } from "express";
import { AuthUseCases } from "../../../application/use-cases/auth.use-case";
import { JwtUtils } from "../../../interfaces/utils/jwt.utils";
import { AppDataSource } from "../../../infrastructure/database/postgres/db";
import { User } from "../../../infrastructure/database/models";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    username: string;
    permissions: string[];
  };
  body: any;
  params: any;
}

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
