import { body, param, query } from "express-validator";

export class WorkerValidator {
    static create() {
        return [
            body("full_name").isString().notEmpty(),
            body("status").isString().notEmpty(),
            body("base_hourly_rate").isNumeric().isFloat({ gt: 0 }),
            body("user_id").optional().isUUID()
        ];
    }

    static update() {
        return [
            param("id").isUUID(),
            body("full_name").optional().isString(),
            body("status").optional().isString(),
            body("base_hourly_rate").optional().isNumeric(),
            body("user_id").optional().isUUID(),
        ];
    }

    static getById() {
        return [param("id").isUUID()];
    }

    static getAll() {
        return [
            query("page").optional().isInt({ min: 1 }),
            query("limit").optional().isInt({ min: 1, max: 100 }),
        ];
    }

    static delete() {
        return [param("id").isUUID()];
    }
}
