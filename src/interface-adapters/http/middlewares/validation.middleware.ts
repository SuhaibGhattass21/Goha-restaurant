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
        try {
            if (!dtoClass || typeof dtoClass !== 'function') {
                console.error('Invalid DTO class provided to validateBody');
                res.status(500).json({
                    success: false,
                    message: 'Internal validation error'
                });
                return;
            }

            const instance = plainToInstance(dtoClass, req.body);
            
            if (!instance) {
                console.error('Failed to create DTO instance');
                res.status(400).json({
                    success: false,
                    message: 'Invalid request body'
                });
                return;
            }

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
        } catch (error: any) {
            console.error('Validation middleware error:', error);
            res.status(500).json({
                success: false,
                message: 'Validation error occurred'
            });
        }
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
        next();
    };
}

export function validateParamsDto<T>(dtoClass: new () => T): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (!dtoClass || typeof dtoClass !== 'function') {
                console.error('Invalid DTO class provided to validateParamsDto');
                res.status(500).json({
                    success: false,
                    message: 'Internal validation error'
                });
                return;
            }

            const instance = plainToInstance(dtoClass, req.params);
            const errors = await validate(instance as object, { whitelist: true, forbidNonWhitelisted: true });
            if (errors.length > 0) {
                res.status(400).json({ success: false, message: 'Invalid route parameters', errors: formatErrors(errors) });
                return;
            }
            next();
        } catch (error: any) {
            console.error('Parameter validation error:', error);
            res.status(500).json({
                success: false,
                message: 'Parameter validation error occurred'
            });
        }
    };
} 