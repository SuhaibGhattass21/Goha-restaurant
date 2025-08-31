import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { validate, IsUUID } from 'class-validator';

class ParamDto {
  @IsUUID()
  id!: string;
}

export function validateParams(paramNames: string[]): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    for (const name of paramNames) {
      const dto = new ParamDto();
      (dto as any).id = (req.params as any)[name];
      const errors = await validate(dto);
      if (errors.length > 0) {
        res.status(400).json({ success: false, message: `Invalid parameter '${name}'`, errors });
        return;
      }
    }
    next();
  };
} 