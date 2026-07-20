# API Guide

This document provides an overview of how to use the Expense Tracker Backend API.

For complete endpoint documentation, request/response schemas, and interactive testing, use the OpenAPI documentation exposed through Swagger UI.

## Technology

The API is built with:

- Express
- TypeScript
- Drizzle ORM
- PostgreSQL
- Zod
- JWT

---

# API Documentation

Interactive API documentation is available at:

```text
http://localhost:5000/api/docs
```

The Swagger UI includes:

- Available endpoints
- Request schemas
- Response schemas
- Authentication
- Error responses
- Interactive request execution

Swagger is the **single source of truth** for the API.

---

# Base URL

Development

```text
http://localhost:5000/api/v1
```

---

# Authentication

The API uses JWT Bearer Authentication.

Include the access token in the Authorization header.

```http
Authorization: Bearer <access_token>
```

Protected endpoints require a valid JWT.

---

# API Modules

The API is organized into the following modules.

## Authentication

Responsible for:

- Register
- Login
- Profile
- Profile Update

---

## Categories

Responsible for:

- Create Category
- List Categories
- Update Category
- Delete Category

---

## Transactions

Responsible for:

- Create Transaction
- List Transactions
- Update Transaction
- Delete Transaction

### Transactions support

- Pagination
- Filtering
- Sorting

### Example

```http
GET /transactions?page=1&limit=20&type=expense&sortBy=transactionDate&sortOrder=desc
```

---

# Standard Response Format

Successful responses follow the same structure.

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {}
}
```

Paginated responses include:

```json
{
  "success": true,
  "message": "Transactions fetched successfully.",
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalItems": 35,
    "totalPages": 4
  }
}
```

---

# Error Response Format

Errors follow a consistent structure.

```json
{
  "success": false,
  "message": "Validation failed."
}
```

---

# Pagination

Collection endpoints support pagination.

Example:

```text
?page=1&limit=10
```

---

# Filtering

Transactions support filtering.

Examples:

```text
?type=expense

?categoryId=3

?startDate=2026-01-01

?endDate=2026-01-31
```

Filters can be combined.

---

# Sorting

Transactions support sorting.

Example:

```text
?sortBy=transactionDate&sortOrder=desc
```

Supported sort fields are documented in Swagger.

---

# Rate Limiting

The API uses request rate limiting to protect against abuse.

Clients exceeding the configured limit receive an HTTP **429 Too Many Requests** response.

---

# Validation

Incoming requests are validated using **Zod** before reaching the business logic.

Invalid requests return HTTP **400 Bad Request**.

---

# Versioning

Current API version

```text
v1
```

Future versions will follow URL-based versioning.

Example

```text
/api/v2
```

---

# Additional Documentation

- `ARCHITECTURE.md`
- `docs/DATABASE.md`
- `docs/PROJECT_STRUCTURE.md`
- `docs/DEVELOPMENT_GUIDE.md`
