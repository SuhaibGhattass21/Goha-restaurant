import type { Request, Response } from "express"
import { validationResult } from "express-validator"
import type { ProductSizePriceUseCases } from "../../../../application/use-cases/Product/product-size-price.use-cases"

export class ProductSizePriceController {
  constructor(private productSizePriceUseCases: ProductSizePriceUseCases) { }

  async createProductSizePrice(req: Request, res: Response): Promise<void> {
    try {
      // Check for validation errors
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        })
        return
      }

      const productSizePriceData = req.body
      const productSizePrice = await this.productSizePriceUseCases.createProductSizePrice(productSizePriceData)

      res.status(201).json({
        success: true,
        message: "Product size price created successfully",
        data: productSizePrice,
      })
    } catch (error: any) {
      if (error.message === "Product not found" || error.message === "Category size not found") {
        res.status(404).json({
          success: false,
          message: error.message,
        })
        return
      }

      if (error.message === "Price for this product and size combination already exists") {
        res.status(409).json({
          success: false,
          message: error.message,
        })
        return
      }

      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async getProductSizePriceById(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        })
        return
      }

      const { id } = req.params
      const productSizePrice = await this.productSizePriceUseCases.getProductSizePriceById(id)

      if (!productSizePrice) {
        res.status(404).json({
          success: false,
          message: "Product size price not found",
        })
        return
      }

      res.status(200).json({
        success: true,
        data: productSizePrice,
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async getAllProductSizePrices(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        })
        return
      }

      const page = Number.parseInt(req.query.page as string) || 1
      const limit = Number.parseInt(req.query.limit as string) || 10

      const result = await this.productSizePriceUseCases.getAllProductSizePrices(page, limit)

      res.status(200).json({
        success: true,
        data: result,
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async getProductSizePricesByProduct(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        })
        return
      }

      const { productId } = req.params
      const page = Number.parseInt(req.query.page as string) || 1
      const limit = Number.parseInt(req.query.limit as string) || 10

      const result = await this.productSizePriceUseCases.getProductSizePricesByProduct(productId, page, limit)

      res.status(200).json({
        success: true,
        data: result,
      })
    } catch (error: any) {
      if (error.message === "Product not found") {
        res.status(404).json({
          success: false,
          message: error.message,
        })
        return
      }

      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async updateProductSizePrice(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        })
        return
      }

      const { id } = req.params
      const productSizePriceData = req.body

      const productSizePrice = await this.productSizePriceUseCases.updateProductSizePrice(id, productSizePriceData)

      if (!productSizePrice) {
        res.status(404).json({
          success: false,
          message: "Product size price not found",
        })
        return
      }

      res.status(200).json({
        success: true,
        message: "Product size price updated successfully",
        data: productSizePrice,
      })
    } catch (error: any) {
      if (error.message === "Product not found" || error.message === "Category size not found") {
        res.status(404).json({
          success: false,
          message: error.message,
        })
        return
      }

      if (error.message === "Price for this product and size combination already exists") {
        res.status(409).json({
          success: false,
          message: error.message,
        })
        return
      }

      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async deleteProductSizePrice(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        })
        return
      }

      const { id } = req.params
      const deleted = await this.productSizePriceUseCases.deleteProductSizePrice(id)

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: "Product size price not found",
        })
        return
      }

      res.status(200).json({
        success: true,
        message: "Product size price deleted successfully",
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }
}
