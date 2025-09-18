import { Router } from "express"
import { ExternalReceiptValidator } from "../../validators/Orders/external-receipt.validator"
import { ExternalReceiptController } from "../../controllers/Orders/external-receipt.controller"

export class ExternalReceiptRoutes {
    private router = Router();

    constructor(private controller: ExternalReceiptController) {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            "/",
            ExternalReceiptValidator.create(),
            this.controller.create.bind(this.controller)
        );

        this.router.get(
            "/",
            this.controller.getAll.bind(this.controller)
        );

        this.router.get(
            "/:id",
            ExternalReceiptValidator.getById(),
            this.controller.getById.bind(this.controller)
        );
    }

    public getRouter(): Router {
        return this.router;
    }
}
