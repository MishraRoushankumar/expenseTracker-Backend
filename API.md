# API Documentation

## Overview

Base URL

```
http://localhost:5000/api/v1
```

Authentication

All endpoints, unless otherwise specified, require a valid JWT Bearer Token.

```
Authorization: Bearer <access_token>
```

---

# Authentication

## POST /auth/register

Registers a new user.

### Authentication

Not Required

### Success Response

**201 Created**

---

## POST /auth/login

Authenticates a user and returns an access token.

### Authentication

Not Required

### Success Response

**200 OK**

---

# Users

## GET /users/profile

Returns the authenticated user's profile.

### Authentication

Required

### Success Response

**200 OK**

---

## PATCH /users/profile

Updates the authenticated user's profile.

### Authentication

Required

### Business Rules

- User must exist.
- Email must remain unique.

### Success Response

**200 OK**

---

## PATCH /users/:id/role

Updates another user's role.

### Authentication

Required

### Authorization

Admin Only

### Business Rules

- Target user must exist.
- Users cannot promote beyond their own role.

### Success Response

**200 OK**

---

## DELETE /users/:id

Deletes a user.

### Authentication

Required

### Authorization

Admin & Maintainer

### Business Rules

- Hierarchical RBAC enforced.
- Users cannot delete higher privileged users.

### Success Response

**200 OK**

---

# Categories

## POST /categories

Creates a category.

### Authentication

Required

### Request Body

```json
{
  "name": "Food"
}
```

### Business Rules

- Name is required.
- Duplicate category names are not allowed per user.

### Success Response

**201 Created**

---

## GET /categories

Returns all categories owned by the authenticated user.

### Authentication

Required

### Success Response

**200 OK**

---

## PATCH /categories/:id

Updates a category.

### Authentication

Required

### Business Rules

- Category must exist.
- Category must belong to the authenticated user.
- Duplicate names are not allowed.

### Success Response

**200 OK**

---

## DELETE /categories/:id

Deletes a category.

### Authentication

Required

### Business Rules

- Category must exist.
- Category must belong to the authenticated user.
- Existing transactions are preserved.
- `category_id` becomes `NULL`.

### Success Response

**200 OK**

---

# Transactions

## POST /transactions

Creates a transaction.

### Authentication

Required

### Request Body

```json
{
  "type": "expense",
  "amount": 450,
  "categoryId": 1,
  "description": "Pizza",
  "transactionDate": "2026-07-05"
}
```

### Business Rules

- Amount must be greater than zero.
- Type must be `income` or `expense`.
- Transaction date must be a valid ISO date.
- Category must belong to the authenticated user.
- Description is optional.
- Category is optional.

### Success Response

**201 Created**

---

## GET /transactions

Returns paginated transactions belonging to the authenticated user.

### Authentication

Required

### Query Parameters

| Parameter  | Type                                   | Default         | Description                                |
| ---------- | -------------------------------------- | --------------- | ------------------------------------------ |
| page       | number                                 | 1               | Page number                                |
| limit      | number                                 | 10              | Items per page                             |
| type       | income \| expense                      | -               | Filter by transaction type                 |
| categoryId | number                                 | -               | Filter by category                         |
| startDate  | YYYY-MM-DD                             | -               | Filter transactions on or after this date  |
| endDate    | YYYY-MM-DD                             | -               | Filter transactions on or before this date |
| sortBy     | amount \| transactionDate \| createdAt | transactionDate | Field used for sorting                     |
| sortOrder  | asc \| desc                            | desc            | Sort direction                             |

### Example Request

```http
GET /transactions?page=2&limit=10&type=expense&categoryId=3&startDate=2026-07-01&endDate=2026-07-31&sortBy=amount&sortOrder=asc
```

### Default Sorting

- Transaction Date (Descending)
- Created At (Descending)

### Success Response

**200 OK**

```json
{
  "success": true,
  "message": "Transactions fetched successfully",
  "data": [
    {
      "id": 14,
      "type": "expense",
      "amount": 450,
      "categoryId": 3,
      "description": "Pizza",
      "transactionDate": "2026-07-10"
    }
  ],
  "pagination": {
    "page": 2,
    "limit": 10,
    "totalItems": 37,
    "totalPages": 4,
    "currentItemCount": 10,
    "hasNextPage": true,
    "hasPreviousPage": true
  }
}
```

### Business Rules

- Users can only view their own transactions.
- Pagination is applied after filtering.
- Sorting is applied before pagination.
- Multiple filters can be combined.
- All query parameters are optional.

---

## GET /transactions/:id

Returns a single transaction.

### Authentication

Required

### Business Rules

- Transaction must exist.
- Transaction must belong to the authenticated user.

### Success Response

**200 OK**

---

## PATCH /transactions/:id

Partially updates a transaction.

### Authentication

Required

### Request Body

All fields are optional.

```json
{
  "amount": 500,
  "description": "Lunch",
  "categoryId": 2,
  "type": "expense",
  "transactionDate": "2026-07-10"
}
```

### Business Rules

- Transaction must belong to the authenticated user.
- Category must belong to the authenticated user.
- `categoryId: null` removes the category.
- Only supplied fields are updated.

### Success Response

**200 OK**

---

## DELETE /transactions/:id

Deletes a transaction.

### Authentication

Required

### Business Rules

- Transaction must exist.
- Transaction must belong to the authenticated user.

### Success Response

**200 OK**

```json
{
  "success": true,
  "message": "Transaction deleted successfully"
}
```

---

# Common Response Format

## Success

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

---

## Validation Error

```json
{
  "success": false,
  "message": "Validation failed"
}
```

---

## Unauthorized

```json
{
  "success": false,
  "message": "Authentication required"
}
```

---

## Forbidden

```json
{
  "success": false,
  "message": "Forbidden"
}
```

---

## Not Found

```json
{
  "success": false,
  "message": "Resource not found"
}
```
