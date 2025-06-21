# Goha Restaurant & Café Management System

A full-stack, multi-role management system built for modern restaurants and cafés, enabling seamless operation across cashier stations, inventory management, shift scheduling, and owner-level insights. Architected using **Domain-Driven Design (DDD)** and **Clean Architecture** principles for scalability, modularity, and long-term maintainability.

---

## 🚀 Features

### 👤 Role-Based System
| Role       | Capabilities                                                                 |
|------------|-------------------------------------------------------------------------------|
| **Cashier** | - Create orders (dine-in / takeaway / delivery)  <br> - Generate receipts <br> - Shift summary reports |
| **Admin**   | - Manage shifts and staff <br> - Track inventory (stock in/out) <br> - Handle supplier invoices <br> - Cancel orders with logs |
| **Owner**   | - Full system overview <br> - Set admin permissions <br> - Access dashboards and analytics |

---

## 🧩 Architecture Overview

### Clean Architecture (Hexagonal / Onion)
- **Domain Layer**: Core business logic and entities
- **Application Layer**: Use-cases, DTOs, and mappers
- **Infrastructure Layer**: PostgreSQL database, TypeORM, and migrations
- **Interface Layer**: RESTful API, Express controllers, validators

---

## 🛠️ Tech Stack

| Layer         | Technology                        |
|---------------|-----------------------------------|
| Backend       | Node.js, Express, TypeScript      |
| ORM           | TypeORM (PostgreSQL)              |
| Desktop UI    | Electron.js (Cashier Interface)   |
| Mobile UI     | Flutter (Admin & Owner Interfaces)|
| Validation    | class-validator, express-validator|
| DevOps        | Docker, docker-compose            |

---

## 📦 Modules

- **Orders**: Add, update, cancel, and print receipts
- **Shifts**: Open/close shifts, assign workers, calculate salary
- **Inventory**: Track stock in/out and usage analytics
- **Products & Categories**: Manage sizes, extras, and pricing
- **Permissions**: Shift-based permission assignment for admins
- **Suppliers**: Invoice management and pending payments tracking
