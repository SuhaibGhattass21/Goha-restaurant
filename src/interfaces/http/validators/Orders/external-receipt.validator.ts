import { body, param } from "express-validator"

export class ExternalReceiptValidator {
    static create() {
        return [
            body("order_id").isUUID(),
            body("shift_id").isUUID(),
            body("cashier_id").isUUID(),
            body("total_amount").isFloat({ min: 0 }),
            body("payment_method").isIn(["cash", "card", "wallet"]),
        ]
    }

    static getById() {
        return [param("id").isUUID()]
    }
}
