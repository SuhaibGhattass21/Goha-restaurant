-- Initialize database with UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Ensure the database is ready for TypeORM migrations
SELECT 1;
