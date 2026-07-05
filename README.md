# Expense Tracker Backend

A scalable, production-inspired Expense Tracker Backend built with **Node.js**, **Express.js**, **TypeScript**, and **PostgreSQL**.

The project follows a layered architecture (Controller → Service → Repository) with a strong focus on clean code, security, maintainability, and real-world backend engineering practices.

---

## ✨ Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes

### User Management

- Get User Profile
- Update User Profile
- Update User Role (Admin Only)
- Secure User Response (Sensitive fields hidden)

### Role-Based Access Control (RBAC)

Three user roles:

- **Admin**
- **Maintainer**
- **User**

Permission hierarchy:

| Role       | Permissions          |
| ---------- | -------------------- |
| Admin      | Full access          |
| Maintainer | Manage normal users  |
| User       | Access own resources |

Implemented hierarchical authorization:

- Admin can manage everyone.
- Maintainer can manage only normal users.
- Users cannot manage other users.
- Self-deletion is prevented.

---

## Categories Module

### Implemented

- Create Category
- Get Categories
- Update Category
- Delete Category

Business Rules

- Categories belong to individual users.
- Duplicate category names are prevented per user.
- Category names are normalized before storing.
- Users can access only their own categories.
- Category ownership is verified before updates and deletion.
- Deleting a category preserves transactions (`category_id` becomes `NULL`).
- Authentication required for all endpoints.

---

## Security

- JWT Authentication
- Password Hashing (bcrypt)
- Request Validation (Zod)
- Centralized Error Handling
- Standardized API Responses
- Password Hash Sanitization
- Role-Based Authorization
- Environment Variable Validation

---

## Architecture

```
src/
│
├── config/
│
├── constants/
│
├── db/
│
├── errors/
│
├── middlewares/
│
├── modules/
│   ├── auth/
│   ├── categories/
    ├── healh/
│   └── users/
│
├── types/
│
└── utils/
```

Each module follows the same structure:

```
module/
│
├── controller
├── service
├── repository
├── schema
├── mapper
├── types
└── routes
```

---

## Tech Stack

### Runtime

- Node.js
- Express.js

### Language

- TypeScript

### Database

- PostgreSQL

### Authentication

- JWT
- bcrypt

### Validation

- Zod

### Development Tools

- ts-node-dev
- ESLint
- Prettier

---

## Design Principles

- Layered Architecture
- Separation of Concerns
- Repository Pattern
- DTO-based Validation
- Type Safety
- Secure Defaults
- Modular Codebase
- RESTful API Design

---

## Database Schema

### Users

- id
- email
- password_hash
- first_name
- last_name
- role
- created_at
- updated_at

---

### Categories

- id
- name
- user_id
- created_at
- updated_at

---

### Transactions _(In Progress)_

- id
- user_id
- category_id
- type
- amount
- description
- transaction_date
- created_at
- updated_at

---

## Current Project Status

### Completed

- Authentication System
- JWT Authentication
- PostgreSQL Integration
- User Module
- Role-Based Access Control
- Hierarchical Authorization
- Category Creation
- Standardized Error Handling
- API Response Utility
- Request Validation
- Secure Environment Configuration
- Categories CRUD

### In Progress

- Transactions Module
- Analytics
- Dashboard APIs

---

## API Modules

| Module         | Status     |
| -------------- | ---------- |
| Authentication | ✅         |
| Users          | ✅         |
| Categories     | ✅         |
| Transactions   | 🚧         |
| Analytics      | 📋 Planned |
| Dashboard      | 📋 Planned |

---

## Getting Started

### Clone Repository

```bash
git clone <repository-url>
cd backend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment

Create a `.env` file:

```env
PORT=5000

DATABASE_URL=

JWT_SECRET=

NODE_ENV=development
```

### Initialize Database

```bash
psql expense_tracker_db
```

```sql
\i src/db/init.sql
```

### Run Development Server

```bash
npm run dev
```

---

## Available Scripts

```bash
npm run dev
```

Start development server.

```bash
npm run build
```

Compile TypeScript.

```bash
npm run typecheck
```

Run TypeScript type checking.

---

## Future Roadmap

- Complete Categories CRUD
- Transactions CRUD
- Dashboard APIs
- Monthly Reports
- Budget Management
- Recurring Transactions
- File Attachments
- Swagger/OpenAPI Documentation
- Unit & Integration Testing
- Docker Support
- CI/CD Pipeline
- Redis Caching
- Rate Limiting
- Audit Logs

---

## Learning Goals

This project is built to practice production-level backend engineering concepts:

- REST API Design
- Clean Architecture
- Authentication & Authorization
- Repository Pattern
- PostgreSQL
- TypeScript
- Scalable Backend Design
- Secure Coding Practices

---

## License

This project is intended for educational and portfolio purposes.
