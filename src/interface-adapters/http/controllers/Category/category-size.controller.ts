import type { Request, Response } from "express"
import { validationResult } from "express-validator"
import type { CategorySizeUseCases } from "../../../../application/use-cases/Category/category-size.use-cases"

export class CategorySizeController {
  constructor(private categorySizeUseCases: CategorySizeUseCases) { }

  async createCategorySize(req: Request, res: Response): Promise<void> {
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

      const sizeData = req.body
      const size = await this.categorySizeUseCases.createCategorySize(sizeData)

      res.status(201).json({
        success: true,
        message: "Category size created successfully",
        data: size,
      })
    } catch (error: any) {
      if (error.message === "Category not found") {
        res.status(404).json({
          success: false,
          message: error.message,
        })
        return
      }

      if (error.message === "Size with this name already exists for this category") {
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

  async getCategorySizeById(req: Request, res: Response): Promise<void> {
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
      const size = await this.categorySizeUseCases.getCategorySizeById(id)

      if (!size) {
        res.status(404).json({
          success: false,
          message: "Category size not found",
        })
        return
      }

      res.status(200).json({
        success: true,
        data: size,
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async getCategorySizesByCategoryId(req: Request, res: Response): Promise<void> {
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

      const { categoryId } = req.params
      console.log("🔍 Controller: Looking for sizes with categoryId:", categoryId)

      const sizes = await this.categorySizeUseCases.getCategorySizesByCategoryId(categoryId)
      console.log("🔍 Controller: Found sizes:", sizes.length)

      res.status(200).json({
        success: true,
        data: sizes,
      })
    } catch (error: any) {
      console.error("❌ Error in getCategorySizesByCategoryId:", error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async getAllCategorySizes(req: Request, res: Response): Promise<void> {
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

      const result = await this.categorySizeUseCases.getAllCategorySizes(page, limit)

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

  async updateCategorySize(req: Request, res: Response): Promise<void> {
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
      const sizeData = req.body

      const size = await this.categorySizeUseCases.updateCategorySize(id, sizeData)

      if (!size) {
        res.status(404).json({
          success: false,
          message: "Category size not found",
        })
        return
      }

      res.status(200).json({
        success: true,
        message: "Category size updated successfully",
        data: size,
      })
    } catch (error: any) {
      if (error.message === "Category not found") {
        res.status(404).json({
          success: false,
          message: error.message,
        })
        return
      }

      if (error.message === "Size with this name already exists for this category") {
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

  async deleteCategorySize(req: Request, res: Response): Promise<void> {
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
      const deleted = await this.categorySizeUseCases.deleteCategorySize(id)

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: "Category size not found",
        })
        return
      }

      res.status(200).json({
        success: true,
        message: "Category size deleted successfully",
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