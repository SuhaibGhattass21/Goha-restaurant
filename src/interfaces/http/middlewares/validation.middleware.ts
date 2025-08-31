import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

function formatErrors(errors: ValidationError[]): any[] {
    return errors.map(err => ({
        property: err.property,
        constraints: err.constraints,
        children: err.children && err.children.length ? formatErrors(err.children) : undefined,
    }));
}

export function validateBody<T>(dtoClass: new () => T): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const instance = plainToInstance(dtoClass, req.body);
        const errors = await validate(instance as object, { whitelist: true, forbidNonWhitelisted: true });
        if (errors.length > 0) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: formatErrors(errors)
            });
            return;
        }
        (req as any).body = instance;
        next();
    };
}

export function validateQuery<T>(dtoClass: new () => T): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const instance = plainToInstance(dtoClass, req.query, { enableImplicitConversion: true });
        const errors = await validate(instance as object, { whitelist: true, forbidNonWhitelisted: true });
        if (errors.length > 0) {
            res.status(400).json({ success: false, message: 'Invalid query parameters', errors: formatErrors(errors) });
            return;
        }
        (req as any).query = instance as any;
        next();
    };
}

export function validateParamsDto<T>(dtoClass: new () => T): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const instance = plainToInstance(dtoClass, req.params);
        const errors = await validate(instance as object, { whitelist: true, forbidNonWhitelisted: true });
        if (errors.length > 0) {
            res.status(400).json({ success: false, message: 'Invalid route parameters', errors: formatErrors(errors) });
            return;
        }
        (req as any).params = instance as any;
        next();
    };
} 