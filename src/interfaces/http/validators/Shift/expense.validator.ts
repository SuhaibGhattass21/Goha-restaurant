import { body, param } from "express-validator";

export class ExpenseValidator {
    static create() {
        return [
            body("title").isString().withMessage("Title is required and must be a string"),
            body("amount").isNumeric().withMessage("Amount must be a valid number"),
            body("created_by").isUUID().withMessage("created_by must be a valid UUID"),
            body("shift_id").isUUID().withMessage("shift_id must be a valid UUID"),
        ];
    }

    static update() {
        return [
            param("id").isUUID().withMessage("Invalid expense ID"),
            body("title").optional().isString().withMessage("Title must be a string"),
            body("amount").optional().isNumeric().withMessage("Amount must be a valid number"),
        ];
    }

    static getById() {
        return [param("id").isUUID().withMessage("Invalid expense ID")];
    }

    static delete() {
        return [param("id").isUUID().withMessage("Invalid expense ID")];
    }
}
