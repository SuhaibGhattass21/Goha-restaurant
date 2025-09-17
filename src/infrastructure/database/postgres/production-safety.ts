/**
 * Production Database Safety Configuration
 * 
 * This module provides safety checks to prevent accidental data loss in production
 */

export class ProductionSafetyChecker {
  /**
   * Check if dangerous database operations are allowed
   */
  public static checkDangerousOperation(operation: string): void {
    if (process.env.NODE_ENV === 'production') {
      const allowedOperations = [
        'migration:run',
        'seed',
        'backup',
        'health-check'
      ];
      
      if (!allowedOperations.includes(operation)) {
        throw new Error(
          `PRODUCTION SAFETY: Operation '${operation}' is not allowed in production. ` +
          `This operation could cause data loss. ` +
          `If you need to perform this operation, please:\n` +
          `1. Create a backup first\n` +
          `2. Use the emergency recovery script with proper flags\n` +
          `3. Contact system administrator`
        );
      }
    }
  }

  /**
   * Verify production environment safety settings
   */
  public static verifyProductionSafety(): void {
    if (process.env.NODE_ENV === 'production') {
      // Check critical environment variables
      const requiredVars = ['DATABASE_URL'];
      for (const varName of requiredVars) {
        if (!process.env[varName]) {
          throw new Error(`Missing required environment variable: ${varName}`);
        }
      }

      // Warn about dangerous settings
      if (process.env.TYPEORM_SYNCHRONIZE === 'true') {
        throw new Error(
          `PRODUCTION SAFETY: TYPEORM_SYNCHRONIZE=true is dangerous in production. ` +
          `This can cause automatic schema changes and data loss.`
        );
      }

      if (process.env.TYPEORM_DROP_SCHEMA === 'true') {
        throw new Error(
          `PRODUCTION SAFETY: TYPEORM_DROP_SCHEMA=true is dangerous in production. ` +
          `This will drop all database tables.`
        );
      }

      console.log('Production safety checks passed');
    }
  }

  /**
   * Get safe database configuration for production
   */
  public static getSafeProductionConfig() {
    return {
      synchronize: false,
      dropSchema: false,
      migrationsRun: false,
      logging: ['error'],
      extra: {
        // Add connection pooling and timeout settings for production
        connectionTimeoutMillis: 30000,
        idleTimeoutMillis: 30000,
        max: 20
      }
    };
  }
}
