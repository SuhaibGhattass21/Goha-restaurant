import type { Request, Response, NextFunction } from "express"

export interface AppError extends Error {
  statusCode?: number
  isOperational?: boolean
}

export const errorHandler = (error: AppError, req: Request, res: Response, next: NextFunction): void => {
  const statusCode = error.statusCode || 500
  const message = error.message || "Internal Server Error"

  const isDev = process.env.NODE_ENV === "development"

  if (isDev) {
    console.error(`Error ${statusCode}: ${message}`)
    if (error.stack) console.error(error.stack)
  } else {
    console.error(`Error ${statusCode}: ${message}`)
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(isDev && { stack: error.stack }),
  })
}

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  })
}
