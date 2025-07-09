"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalReceiptRoutes = void 0;
const express_1 = require("express");
const external_receipt_validator_1 = require("../../validators/Orders/external-receipt.validator");
class ExternalReceiptRoutes {
    constructor(controller) {
        this.controller = controller;
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/", external_receipt_validator_1.ExternalReceiptValidator.create(), this.controller.create.bind(this.controller));
        this.router.get("/", this.controller.getAll.bind(this.controller));
        this.router.get("/:id", external_receipt_validator_1.ExternalReceiptValidator.getById(), this.controller.getById.bind(this.controller));
    }
    getRouter() {
        return this.router;
    }
}
exports.ExternalReceiptRoutes = ExternalReceiptRoutes;
//# sourceMappingURL=external-receipt.routes.js.map