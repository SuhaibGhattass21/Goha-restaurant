#!/bin/bash

# Docker management script for Goha Restaurant

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_usage() {
    echo "Usage: $0 {dev|prod|stop|logs|clean|reset}"
    echo ""
    echo "Commands:"
    echo "  dev     - Start development environment with hot reload"
    echo "  prod    - Start production environment"
    echo "  stop    - Stop all services"
    echo "  logs    - Follow application logs"
    echo "  clean   - Clean up containers and images"
    echo "  reset   - Reset database (removes all data)"
    echo ""
}

case "$1" in
    dev)
        echo -e "${GREEN}Starting development environment...${NC}"
        docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
        ;;
    prod)
        echo -e "${GREEN}Starting production environment...${NC}"
        if [ ! -f .env ]; then
            echo -e "${YELLOW}Creating .env file from template...${NC}"
            cp .env.example .env
            echo -e "${YELLOW}Please edit .env file with your configuration${NC}"
        fi
        docker-compose up --build -d
        echo -e "${GREEN}Application started successfully!${NC}"
        echo ""
        echo "Access your application at:"
        echo "  - API: http://localhost:3000/api/v1"
        echo "  - Swagger: http://localhost:3000/api-docs"
        echo "  - Health: http://localhost:3000/health"
        echo ""
        echo "To view logs: $0 logs"
        ;;
    stop)
        echo -e "${YELLOW}Stopping all services...${NC}"
        docker-compose down
        ;;
    logs)
        echo -e "${GREEN}Following application logs...${NC}"
        docker-compose logs -f app
        ;;
    clean)
        echo -e "${YELLOW}Cleaning up Docker resources...${NC}"
        docker-compose down --rmi all --volumes --remove-orphans
        docker system prune -f
        ;;
    reset)
        echo -e "${RED}This will delete all database data. Are you sure? (y/N)${NC}"
        read -r response
        if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
            echo -e "${YELLOW}Resetting database...${NC}"
            docker-compose down -v
            docker-compose up --build -d
        else
            echo "Cancelled."
        fi
        ;;
    *)
        print_usage
        exit 1
        ;;
esac
