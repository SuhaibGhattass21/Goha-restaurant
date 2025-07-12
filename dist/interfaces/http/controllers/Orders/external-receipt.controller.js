"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalReceiptController = void 0;
class ExternalReceiptController {
    constructor(useCases) {
        this.useCases = useCases;
    }
    async create(req, res) {
        const data = req.body;
        const result = await this.useCases.create(data);
        res.status(201).json(result); // No return here
    }
    async getAll(req, res) {
        const receipts = await this.useCases.getAll();
        res.status(200).json(receipts);
    }
    async getById(req, res) {
        const { id } = req.params;
        const receipt = await this.useCases.getById(id);
        if (!receipt)
            res.status(404).json({ message: "Receipt not found" });
        res.json(receipt);
    }
}
exports.ExternalReceiptController = ExternalReceiptController;
//# sourceMappingURL=external-receipt.controller.js.map