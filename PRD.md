# Expense Tracker Backend — Product Requirements Document (PRD)

Version: 2.0
Architecture Style: Entity-Centric Repository Pattern
Status: In Development

---

# 1. Project Overview

The Expense Tracker Backend is a production-grade REST API system designed for personal finance management.

The system enables authenticated users to:

- Register and login securely
- Manage personal profile information
- Track expenses and income
- Categorize transactions
- Set monthly budgets
- Configure recurring transactions
- Manage sessions securely
- Analyze financial activity

This project is being built as an engineering-focused backend system emphasizing architecture, scalability, maintainability, and production-grade design principles.

It is **not** intended to be a tutorial CRUD project.

---

# 2. Core Engineering Goals

Primary goals:

- Learn production backend architecture
- Master TypeScript backend development
- Understand layered backend design
- Learn authentication system design deeply
- Build scalable modular architecture
- Practice clean code and separation of concerns

Secondary goals:

- SQL mastery before ORM abstraction
- Database migration understanding
- Cloud deployment readiness
- Real-world backend engineering practices

---

# 3. Technology Stack

## Runtime

- Node.js

## Language

- TypeScript

## Framework

- Express.js

## Validation

- Zod

## Authentication

- JWT (JSON Web Tokens)

## Password Security

- bcrypt

## Database (Development)

PostgreSQL (local)

## Database (Production/Future)

Neon PostgreSQL

## ORM (Future)

Drizzle ORM

## Tooling

- ESLint
- Prettier
- tsx
- Git
- Postman / Bruno

---

# 4. Core Architecture Philosophy

The backend follows **strict layered architecture**.

Request lifecycle:

```text
Route
↓
Controller
↓
Service
↓
Repository
↓
Database
```

Every layer has a single responsibility.

---

# 5. Architecture Decision (IMPORTANT)

The project uses:

```text
ENTITY-CENTRIC REPOSITORY PATTERN
```

Repositories map to:

```text
Database entities/tables
```

NOT:

```text
Feature modules
```

---

## Correct Rule

```text
One database table → One repository
```

Examples:

```text
users table → users.repository.ts

sessions table → sessions.repository.ts

transactions table → transactions.repository.ts
```

---

## Wrong Pattern (Rejected)

```text
auth.repository.ts ❌
```

Reason:

```text
Auth is behavior/process, not a database entity.
```

There is no:

```sql
auth table
```

So auth module should NOT own persistence logic.

---

# 6. Layer Responsibilities

---

## Routes Layer

Responsible for:

- Endpoint definition
- Middleware chaining
- Request pipeline configuration

Must NOT contain:

- Business logic
- Database logic
- Response logic

---

## Controller Layer

Responsible for:

- Receiving request
- Calling service layer
- Sending standardized response

Must NOT contain:

- Business logic
- Validation logic
- Database logic

---

## Service Layer

Responsible for:

- Business rules
- Authentication logic
- Authorization decisions
- Domain behavior
- Calling repositories

Must NOT contain:

- Database queries
- Storage logic
- Response formatting

---

## Repository Layer

Responsible for:

- Data access
- Query execution
- Storage abstraction
- Database communication

Must NOT contain:

- Business logic
- JWT logic
- bcrypt logic
- HTTP logic

---

# 7. Folder Structure

```text
src/

  config/

  constants/

  middlewares/

  errors/

  utils/

  types/

  modules/

      auth/

          auth.routes.ts
          auth.controller.ts
          auth.service.ts
          auth.schema.ts
          auth.types.ts

      users/

          users.routes.ts
          users.controller.ts
          users.service.ts
          users.repository.ts
          users.schema.ts
          users.types.ts

      sessions/

          sessions.repository.ts     (future)

      transactions/

          transactions.routes.ts
          transactions.controller.ts
          transactions.service.ts
          transactions.repository.ts

      categories/

          categories.routes.ts
          categories.controller.ts
          categories.service.ts
          categories.repository.ts

      budgets/

          budgets.routes.ts
          budgets.controller.ts
          budgets.service.ts
          budgets.repository.ts

  app.ts

  server.ts
```

---

# 8. Current Completed Infrastructure

Implemented:

- Express initialization
- TypeScript configuration
- Error middleware
- AppError abstraction
- Async handler utility
- API response utility
- Validation middleware
- JWT utility
- Auth middleware
- Standard HTTP constants

---

# 9. API Response Standard

All responses follow strict formatting.

Success:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

---

# 10. Authentication Architecture

Authentication is a behavior/domain module.

Auth does NOT own data persistence.

Instead:

```text
Auth Service
        ↓
Uses Users Repository
        ↓
Uses Sessions Repository (future)
        ↓
Database
```

---

## Authentication Features

Current:

- Register
- Login
- Password hashing
- JWT generation
- Protected routes
- JWT verification

Future:

- Refresh tokens
- Session persistence
- Logout
- Session revocation
- Device management

---

# 11. Database Design

The project uses relational database design.

Current development:

```text
In-memory storage
```

Future:

```text
PostgreSQL local installation
```

Later:

```text
Neon PostgreSQL cloud database
```

---

# 12. Database Entities

---

## USERS TABLE

Purpose:

Stores user account information.

Fields:

```sql
id

email

password_hash

first_name

last_name

created_at

updated_at
```

Repository owner:

```text
users.repository.ts
```

Used by:

```text
users.service.ts

auth.service.ts
```

---

## SESSIONS TABLE

Purpose:

Stores refresh token sessions.

Fields:

```sql
id

user_id

refresh_token

expires_at

is_revoked
```

Repository owner:

```text
sessions.repository.ts
```

Used by:

```text
auth.service.ts
```

Future functionality:

- Logout
- Refresh token rotation
- Session revocation

---

## TRANSACTIONS TABLE

Purpose:

Stores income/expense records.

Fields:

```sql
id

user_id

category_id

amount

type

description

currency

transaction_date

created_at

updated_at

deleted_at
```

Repository owner:

```text
transactions.repository.ts
```

Features:

- Create transaction
- Update transaction
- Delete transaction
- Soft delete support

---

## CATEGORIES TABLE

Purpose:

Stores user-defined transaction categories.

Fields:

```sql
id

user_id

name
```

Constraint:

```sql
UNIQUE(user_id, name)
```

Repository owner:

```text
categories.repository.ts
```

---

## BUDGETS TABLE

Purpose:

Stores monthly spending limits.

Fields:

```sql
id

user_id

category_id

amount_limit

month

year
```

Constraint:

```sql
UNIQUE(user_id, category_id, month, year)
```

Repository owner:

```text
budgets.repository.ts
```

---

## RECURRING_TRANSACTIONS TABLE

Purpose:

Stores recurring scheduled transactions.

Examples:

- Rent
- SIP
- Netflix Subscription
- Monthly bills

Fields:

```sql
id

user_id

category_id

amount

frequency

start_date

next_run_date

is_active
```

Frequency:

```text
daily

weekly

monthly

yearly
```

Repository owner:

```text
recurring-transactions.repository.ts
```

---

# 13. Security Standards

Current:

- bcrypt password hashing
- JWT access tokens
- Protected routes
- Validation middleware

Future:

- Refresh token rotation
- HTTP-only cookies
- Rate limiting
- Helmet security headers
- Secure CORS policy
- Email verification
- Account recovery

---

# 14. Development Principles

---

## Principle 1

Never place database logic inside service.

Wrong:

```ts
service.ts → db.query(...)
```

Correct:

```ts
service.ts → repository.ts → database
```

---

## Principle 2

Validation only belongs in schema layer.

Wrong:

```ts
service.ts → if(password.length < 8)
```

Correct:

```ts
schema.ts → zod validation
```

---

## Principle 3

Controllers remain thin.

Controller only:

- Read request
- Call service
- Send response

---

## Principle 4

Repositories represent database entities.

Wrong:

```text
auth.repository.ts
```

Correct:

```text
users.repository.ts
sessions.repository.ts
transactions.repository.ts
```

---

## Principle 5

Business logic belongs only in service layer.

Allowed:

- bcrypt
- JWT generation
- Authorization logic
- Domain rules

Forbidden:

- SQL queries
- Database logic

---

## Principle 6

Architecture consistency is mandatory.

Every module follows same structure.

---

# 15. Development Roadmap

---

## Phase 1 (Completed)

Core infrastructure.

Completed:

- Express setup
- Middleware architecture
- Error handling
- Async handler
- API response utility

---

## Phase 2 (Completed)

Users module architecture refactor.

Completed:

- Routes layer
- Controller layer
- Service layer
- Repository layer
- Schema layer
- Types layer

---

## Phase 3 (In Progress)

Auth module refactor.

Tasks:

- Remove auth.repository.ts
- Move user persistence into users.repository.ts
- Auth service uses users repository

---

## Phase 4

Project-wide architecture cleanup.

Tasks:

- config/env.ts
- constants folder
- Shared types cleanup

---

## Phase 5

Database integration.

Tasks:

- PostgreSQL setup
- Connection pool
- db.ts configuration
- Replace memory storage

---

## Phase 6

Transactions module

Features:

- Add transaction
- Update transaction
- Delete transaction
- Transaction history

---

## Phase 7

Categories module

Features:

- Create category
- Update category
- Delete category

---

## Phase 8

Budgets module

Features:

- Monthly spending limits
- Budget alerts

---

## Phase 9

Recurring transactions

Features:

- Scheduled recurring transactions

---

## Phase 10

Session management

Features:

- Refresh tokens
- Logout
- Session revocation

---

## Phase 11

ORM integration

Tasks:

- Drizzle schema
- Migration system

---

## Phase 12

Cloud migration

Tasks:

- Neon PostgreSQL
- Production environment setup

---

## Phase 13

Deployment

Possible targets:

- Railway
- Render
- VPS
- Docker

---

# 16. Final Engineering Goal

This project exists to deeply understand backend engineering.

By completion developer should understand:

- Express architecture
- TypeScript backend patterns
- Authentication systems
- SQL fundamentals
- Repository pattern
- Database design
- ORM abstraction
- Cloud migration
- API security
- Production backend design

---

# 17. Final Engineering Rule

Before writing code ask:

```text
Am I defining endpoint?
→ Route

Am I receiving request?
→ Controller

Am I writing business logic?
→ Service

Am I reading/writing persistent data?
→ Repository

Am I validating request?
→ Schema

Am I configuring infrastructure?
→ Config
```

Violation of this architecture should be avoided.

---

# Final Project Philosophy

This project is NOT:

```text
CRUD tutorial backend
```

This project IS:

```text
Production-grade backend engineering practice.
```
