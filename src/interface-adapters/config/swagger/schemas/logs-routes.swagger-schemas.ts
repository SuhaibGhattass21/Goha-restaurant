/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: System logs management and analysis endpoints
 */

/**
 * @swagger
 * /api/v1/logs:
 *   get:
 *     summary: Retrieve system logs with filtering and pagination
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 500
 *         description: Number of logs per page
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *           enum: [error, warn, info, http, verbose, debug]
 *         description: Filter by log level
 *       - in: query
 *         name: component
 *         schema:
 *           type: string
 *         description: Filter by component name
 *       - in: query
 *         name: operation
 *         schema:
 *           type: string
 *         description: Filter by operation type
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID
 *       - in: query
 *         name: traceId
 *         schema:
 *           type: string
 *         description: Filter by trace ID
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start date for log filtering
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End date for log filtering
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for log messages
 *     responses:
 *       200:
 *         description: Successfully retrieved logs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     logs:
 *                       type: array
 *                       items:
 *                         type: object
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Insufficient permissions
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/logs/stats:
 *   get:
 *     summary: Get log statistics and metrics
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start date for statistics
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End date for statistics
 *       - in: query
 *         name: component
 *         schema:
 *           type: string
 *         description: Filter statistics by component
 *     responses:
 *       200:
 *         description: Successfully retrieved log statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalLogs:
 *                       type: integer
 *                     logsByLevel:
 *                       type: object
 *                     logsByComponent:
 *                       type: object
 *                     logsByHour:
 *                       type: array
 *                     averageLogsPerHour:
 *                       type: number
 *                     errorRate:
 *                       type: number
 */

/**
 * @swagger
 * /api/v1/logs/analysis:
 *   get:
 *     summary: Analyze log patterns and trends
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 30
 *         description: Number of days to analyze
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [errors, performance, security, all]
 *         description: Type of analysis to perform
 *     responses:
 *       200:
 *         description: Successfully completed log analysis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     summary:
 *                       type: object
 *                     patterns:
 *                       type: array
 *                     trends:
 *                       type: array
 *                     recommendations:
 *                       type: array
 */

/**
 * @swagger
 * /api/v1/logs/files:
 *   get:
 *     summary: Get information about log files
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved log file information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     files:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           path:
 *                             type: string
 *                           size:
 *                             type: integer
 *                           created:
 *                             type: string
 *                           modified:
 *                             type: string
 *                     totalFiles:
 *                       type: integer
 *                     totalSize:
 *                       type: integer
 */

/**
 * @swagger
 * /api/v1/logs/export:
 *   get:
 *     summary: Export logs as CSV
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *           enum: [error, warn, info, http, verbose, debug]
 *         description: Filter by log level
 *       - in: query
 *         name: component
 *         schema:
 *           type: string
 *         description: Filter by component name
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start date for export
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End date for export
 *     responses:
 *       200:
 *         description: Successfully exported logs as CSV
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *         headers:
 *           Content-Disposition:
 *             description: Attachment with filename
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /api/v1/logs/errors/recent:
 *   get:
 *     summary: Get recent error logs
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: hours
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 168
 *         description: Number of hours to look back for errors
 *     responses:
 *       200:
 *         description: Successfully retrieved recent errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     errors:
 *                       type: array
 *                     count:
 *                       type: integer
 *                     period:
 *                       type: string
 */

/**
 * @swagger
 * /api/v1/logs/health:
 *   get:
 *     summary: Get system health based on log analysis
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved system health status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       enum: [healthy, caution, warning, critical]
 *                     errorRate:
 *                       type: number
 *                     warningRate:
 *                       type: number
 *                     totalLogs:
 *                       type: integer
 *                     errors:
 *                       type: integer
 *                     warnings:
 *                       type: integer
 *                     period:
 *                       type: string
 *                     timestamp:
 *                       type: string
 */
