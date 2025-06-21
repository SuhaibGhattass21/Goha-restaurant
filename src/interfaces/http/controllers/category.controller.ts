import type { Request, Response } from "express"
import { validationResult } from "express-validator"
import type { CategoryUseCases } from "../../../application/use-cases/category.use-cases"

export class CategoryController {
  constructor(private categoryUseCases: CategoryUseCases) {}

  async createCategory(req: Request, res: Response): Promise<void> {
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

      const categoryData = req.body
      const category = await this.categoryUseCases.createCategory(categoryData)

      res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: category,
      })
    } catch (error: any) {
      if (error.message === "Category with this name already exists") {
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

  async getCategoryById(req: Request, res: Response): Promise<void> {
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
      const category = await this.categoryUseCases.getCategoryById(id)

      if (!category) {
        res.status(404).json({
          success: false,
          message: "Category not found",
        })
        return
      }

      res.status(200).json({
        success: true,
        data: category,
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  async getAllCategories(req: Request, res: Response): Promise<void> {
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

      const result = await this.categoryUseCases.getAllCategories(page, limit)

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

  async updateCategory(req: Request, res: Response): Promise<void> {
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
      const categoryData = req.body

      const category = await this.categoryUseCases.updateCategory(id, categoryData)

      if (!category) {
        res.status(404).json({
          success: false,
          message: "Category not found",
        })
        return
      }

      res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: category,
      })
    } catch (error: any) {
      if (error.message === "Category with this name already exists") {
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

  async deleteCategory(req: Request, res: Response): Promise<void> {
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
      const deleted = await this.categoryUseCases.deleteCategory(id)

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: "Category not found",
        })
        return
      }

      res.status(200).json({
        success: true,
        message: "Category deleted successfully",
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
