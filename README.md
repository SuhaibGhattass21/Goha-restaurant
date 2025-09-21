# Goha Restaurant Cafe System

A comprehensive restaurant management system built with TypeScript, Node.js, Express, and PostgreSQL using Clean Architecture principles.

## Features

- **User Management**: User authentication and authorization with JWT
- **Menu Management**: Categories, products, sizes, and extras
- **Order Management**: Order processing, cancellation, and external receipts  
- **Inventory Management**: Stock items, transactions, and reporting
- **Shift Management**: Worker shifts, expenses tracking
- **Permission System**: Role-based access control
- **API Documentation**: Swagger/OpenAPI integration
- **Health Monitoring**: Health check endpoints

## Architecture

This project follows Clean Architecture principles:

```
src/
├── application/          # Use cases and DTOs
├── domain/              # Business logic and interfaces
├── infrastructure/      # External concerns (database, etc.)
└── interfaces/          # HTTP controllers, routes, middleware
```

## Quick Start (Production)

### Using Docker Compose (Recommended)

1. **Clone and setup**
   ```bash
   git clone <repository-url>
   cd Goha-restaurant
   cp .env.example .env
   # Edit .env with your production values
   ```

2. **Start the application**
   ```bash
   docker-compose up --build -d
   ```

3. **Check health status**
   ```bash
   curl http://localhost:3000/health
   ```

4. **Access the application**
   - API: http://localhost:3000/api/v1
   - Swagger Docs: http://localhost:3000/api-docs
   - Health Check: http://localhost:3000/health

## Development Setup

1. **Prerequisites**
   - Node.js 18+
   - PostgreSQL 15+
   - npm or yarn

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup database**
   ```bash
   # Create database and run migrations
   npm run migration:run
   
   # Seed initial data
   npm run seed
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed production deployment instructions.

## Common Issues and Solutions

### "relation users doesn't exist" Error

This error occurs when database migrations haven't been run:

**Solution:**
```bash
# For development
npm run migration:run

# For production  
npm run migration:run:prod

# Or using Docker
docker-compose exec app npm run migration:run:prod
```

### Container Health Check Failures

**Diagnosis:**
```bash
# Check container logs
docker logs goha-restaurant-app-1

# Check health status
curl -v http://localhost:3000/health

# Check database connectivity
docker-compose exec db pg_isready -U postgres
```

**Common causes:**
- Database not ready yet (wait for db health check)
- Migrations not completed
- Environment variables not set correctly

### Database Connection Issues

**Check connection string format:**
```
DATABASE_URL=postgresql://username:password@host:port/database_name
```

**For Docker Compose:**
```
DATABASE_URL=postgresql://postgres:postgres@db:5432/postgres
```

### Application Won't Start

**Steps to debug:**
1. Check environment variables are set
2. Verify database connectivity: `pg_isready -h host -p port`
3. Run migrations manually: `npm run migration:run:prod`  
4. Check application logs for specific errors

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh token

### Categories
- `GET /api/v1/categories` - List categories
- `POST /api/v1/categories` - Create category
- `PUT /api/v1/categories/:id` - Update category
- `DELETE /api/v1/categories/:id` - Delete category

### Products
- `GET /api/v1/products` - List products
- `POST /api/v1/products` - Create product
- `PUT /api/v1/products/:id` - Update product

### Orders  
- `GET /api/v1/orders` - List orders
- `POST /api/v1/orders` - Create order
- `PUT /api/v1/orders/:id` - Update order

### Logs
- `GET /api/v1/logs` - Retrieve application logs with filtering and pagination
- `GET /api/v1/logs/export` - Export logs to file
- `GET /api/v1/logs/stats` - Get log statistics and analytics
- `GET /api/v1/logs/analysis` - Get log analysis and insights
- `GET /api/v1/logs/health` - Get logging system health status
- `POST /api/v1/orders` - Create order
- `PUT /api/v1/orders/:id` - Update order

[See Swagger documentation for complete API reference]

## Database Schemas

The application uses TypeORM with PostgreSQL. Key entities:

- **Users**: User accounts and authentication
- **Permissions**: Role-based access control
- **Categories**: Menu categories 
- **Products**: Menu items
- **Orders**: Customer orders
- **StockItems**: Inventory management
- **Shifts**: Worker shift tracking

## Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production  
npm run lint            # Run ESLint

# Database
npm run migration:generate  # Generate migration
npm run migration:run      # Run migrations (dev)
npm run migration:run:prod # Run migrations (prod)
npm run seed              # Seed database (dev)
npm run seed:prod        # Seed database (prod)

# Testing
npm test                # Run tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage
```

## Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| DATABASE_URL | Yes | PostgreSQL connection string | - |
| NODE_ENV | Yes | Environment (development/production) | development |
| PORT | No | Application port | 3000 |
| JWT_SECRET | Yes | JWT signing secret | - |
| JWT_REFRESH_SECRET | Yes | JWT refresh token secret | - |
| ALLOWED_ORIGINS | No | CORS allowed origins | * |

## Default Credentials

After seeding the database, you can log in with:
- **Username**: admin  
- **Password**: admin123

⚠️ **Important**: Change the default password immediately after first login!

## Support

For deployment issues:
1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guidance
2. Review application logs and health check endpoint
3. Verify database connectivity and migrations
4. Ensure all environment variables are properly set

## License

This project is licensed under the ISC License.
