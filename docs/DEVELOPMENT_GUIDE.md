# Development Guide

This guide explains how to set up the Expense Tracker Backend for local development.

---

# Prerequisites

Before starting, ensure you have the following installed:

- Node.js 22+
- npm
- PostgreSQL

Verify your installation:

```bash
node --version
npm --version
psql --version
```

---

# Clone the Repository

```bash
git clone <repository-url>

cd backend
```

---

# Install Dependencies

```bash
npm install
```

---

# Environment Variables

Copy the example environment file.

```bash
cp .env.example .env
```

Update the values according to your local environment.

Example:

```env
NODE_ENV=development

PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=expense_tracker_db
DB_USER=postgres
DB_PASSWORD=password

JWT_SECRET=your-secret
JWT_EXPIRES_IN=7d
```

---

# Database Setup

Create the PostgreSQL database.

Execute the initialization script:

```text
src/db/init.sql
```

This creates all required tables and indexes.

---

# Start Development Server

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:5000
```

---

# API Documentation

Swagger UI is available at:

```text
http://localhost:5000/api/docs
```

The OpenAPI documentation includes:

- Endpoints
- Request schemas
- Response schemas
- Authentication
- Interactive testing

---

# Development Workflow

Recommended workflow:

```text
Create Feature Branch

↓

Implement Feature

↓

Format Code

↓

Lint

↓

Type Check

↓

Run Tests

↓

Commit

↓

Open Pull Request
```

---

# Code Quality

## Format Code

```bash
npm run format
```

Verify formatting

```bash
npm run format:check
```

---

## Lint

Run ESLint

```bash
npm run lint
```

Automatically fix issues

```bash
npm run lint:fix
```

---

## Type Checking

```bash
npm run typecheck
```

---

# Testing

Run Vitest in watch mode.

```bash
npm run test
```

Run tests once.

```bash
npm run test:run
```

---

# Build

Compile the project.

```bash
npm run build
```

Run the compiled application.

```bash
npm run start
```

---

# Project Documentation

Additional documentation is available in:

- `README.md`
- `ARCHITECTURE.md`
- `docs/API.md`
- `docs/DATABASE.md`
- `docs/PROJECT_STRUCTURE.md`
- `docs/ROADMAP.md`

---

# Troubleshooting

## Database Connection Issues

- Verify PostgreSQL is running.
- Verify database credentials.
- Verify the database exists.

---

## TypeScript Errors

Run:

```bash
npm run typecheck
```

Resolve all errors before committing.

---

## Lint Errors

Run:

```bash
npm run lint
```

For automatically fixable issues:

```bash
npm run lint:fix
```

---

## Formatting Issues

Run:

```bash
npm run format
```

---

# Need Help?

If you encounter issues during development:

1. Review the project documentation.
2. Check existing issues.
3. Open a new issue if necessary.
