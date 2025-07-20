import { body, param } from "express-validator";

export class ShiftWorkerValidator {
    static create() {
        return [
            body("shift_id").isUUID().withMessage("Shift ID must be a valid UUID"),
            body("worker_id").isUUID().withMessage("Worker ID must be a valid UUID"),
            body("hourly_rate").isFloat({ gt: 0 }),
            body("start_time").isISO8601().withMessage("Start time must be a valid ISO date")
        ];
    }

    static update() {
        return [param("id").isUUID().withMessage("Invalid ID")];
    }

    static setEndTime() {
        return [
            body("shift_worker_id")
                .isUUID().withMessage("shift_worker_id must be a valid UUID"),
            body("end_time")
                .isISO8601().withMessage("end_time must be a valid ISO8601 date")
        ];
    }

    static getById() {
        return [param("id").isUUID().withMessage("Invalid ID")];
    }

    static getByShiftId() {
        return [param("shiftId").isUUID().withMessage("Invalid Shift ID")];
    }

    static delete() {
        return [param("id").isUUID().withMessage("Invalid ID")];
    }
}
