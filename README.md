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

2. **Add TLS certificates for the proxy**
   Put your certificate and key in [deploy/nginx/certs/README.md](/Users/abdo/projects/Goha-restaurant/deploy/nginx/certs/README.md:1) as `fullchain.pem` and `privkey.pem`, or update `TLS_CERT_PATH` and `TLS_KEY_PATH` in `.env`.

3. **Start the application**
   ```bash
   docker-compose up --build -d
   ```

4. **Check health status**
   ```bash
   curl -k https://localhost/health
   ```

5. **Access the application**
   - API: `https://your-domain/api/v1`
   - Swagger Docs: `https://your-domain/api-docs`
   - Health Check: `https://your-domain/health`

The production Compose stack now expects a reverse proxy in front of the app. Nginx listens on port `80` and `443`, redirects HTTP to HTTPS, and forwards traffic to the backend on internal port `3000`. If you want the Node app itself to terminate TLS instead, set `HTTPS_ENABLED=true` and provide `HTTPS_KEY_PATH` and `HTTPS_CERT_PATH`, but that is no longer the default deployment path.

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

The intended production topology is:

- `proxy` container on host ports `80` and `443`
- `app` container on internal port `3000`
- `db` container on internal port `5432`

This keeps TLS and public traffic handling at the proxy layer while the Node service stays private on the Docker network.

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

# Check health status through the proxy
curl -vk https://localhost/health

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
| JWT_EXPIRES_IN | Yes | Access token lifetime, for example `7d` or `1h` | `7d` |
| ALLOWED_ORIGINS | No | CORS allowed origins | * |
| SERVER_NAME | Yes | Public hostname used by nginx | - |
| TLS_CERT_PATH | Yes | TLS certificate path inside the proxy container | `/etc/nginx/certs/fullchain.pem` |
| TLS_KEY_PATH | Yes | TLS private key path inside the proxy container | `/etc/nginx/certs/privkey.pem` |
| HTTPS_ENABLED | No | Enable the built-in HTTPS server when `true` | false |
| HTTPS_KEY_PATH | No | Path to the TLS private key file | - |
| HTTPS_CERT_PATH | No | Path to the TLS certificate file | - |
| HTTPS_PASSPHRASE | No | Passphrase for the private key, if needed | - |

## Default Credentials

After seeding the database, you can log in with:
- **Username**: admin  
- **Password**: admin123

⚠️ **Important**: Change the default password immediately after first login!

## Support

For deployment issues:
1. Confirm the proxy container can read your certificate files
2. Review application logs and health check endpoint
3. Verify database connectivity and migrations
4. Ensure all environment variables are properly set

## License

This project is licensed under the ISC License.
