import jwt from 'jsonwebtoken';


export class JwtUtils {
    static verifyToken(token: string): any {
        try {
            return jwt.verify(token, process.env.JWT_SECRET || 'c7btrc685v42c45v86c2');
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
}

