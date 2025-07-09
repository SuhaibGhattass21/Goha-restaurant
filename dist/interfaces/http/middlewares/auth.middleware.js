"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
class AuthMiddleware {
    constructor(authUsecases) {
        this.authUsecases = authUsecases;
        this.authenticate = (req, res, next) => {
            try {
                const authHeader = req.headers.authorization;
                if (!authHeader || !authHeader.startsWith('Bearer ')) {
                    res.status(401).json({
                        success: false,
                        message: 'Access token required'
                    });
                    return;
                }
                const token = authHeader.substring(7);
                const decoded = this.authUsecases.verifyToken(token);
                req.user = {
                    userId: decoded.userId,
                    username: decoded.username,
                    permissions: decoded.permissions || []
                };
                next();
            }
            catch (error) {
                res.status(401).json({
                    success: false,
                    message: 'Invalid or expired token'
                });
                return;
            }
        };
        this.optionalAuth = async (req, res, next) => {
            try {
                const authHeader = req.headers.authorization;
                if (authHeader && authHeader.startsWith('Bearer ')) {
                    const token = authHeader.substring(7);
                    const decoded = this.authUsecases.verifyToken(token);
                    req.user = {
                        userId: decoded.userId,
                        username: decoded.username,
                        permissions: decoded.permissions || []
                    };
                }
                next();
            }
            catch (error) {
                next();
            }
        };
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map