import type { Request, Response } from "express"
import type { ProductUseCases } from "../../../../application/use-cases/Product/product.use-cases"

export class ProductController {
  constructor(private productUseCases: ProductUseCases) { }

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const productData = req.body
      const product = await this.productUseCases.createProduct(productData)

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
      })
    } catch (error: any) {
      if (error.message === "Category not found") {
        res.status(404).json({
          success: false,
          message: error.message,
        })
        return
      }

      if (error.message === "Product with this name already exists in this category") {
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

  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const product = await this.productUseCases.getProductById(id)

      if (!product) {
        res.status(404).json({
          success: false,
          message: "Product not found",
        })
        return
      }

      res.status(200).json({
        success: true,
        data: product,
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const page = Number.parseInt(req.query.page as string) || 1
      const limit = Number.parseInt(req.query.limit as string) || 10

      const result = await this.productUseCases.getAllProducts(page, limit)

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

  async getProductsByCategory(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId } = req.params
      const page = Number.parseInt(req.query.page as string) || 1
      const limit = Number.parseInt(req.query.limit as string) || 10

      const result = await this.productUseCases.getProductsByCategory(categoryId, page, limit)

      res.status(200).json({
        success: true,
        data: result,
      })
    } catch (error: any) {
      if (error.message === "Category not found") {
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

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const productData = req.body

      const product = await this.productUseCases.updateProduct(id, productData)

      if (!product) {
        res.status(404).json({
          success: false,
          message: "Product not found",
        })
        return
      }

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product,
      })
    } catch (error: any) {
      if (error.message === "Category not found") {
        res.status(404).json({
          success: false,
          message: error.message,
        })
        return
      }

      if (error.message === "Product with this name already exists in this category") {
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

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const deleted = await this.productUseCases.deleteProduct(id)

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: "Product not found",
        })
        return
      }

      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
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
