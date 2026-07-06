# API Documentation

## Authentication

### POST /auth/register

Register a new user.

---

### POST /auth/login

Authenticate user.

---

## Users

### GET /users/profile

Returns current user's profile.

---

### PATCH /users/profile

Updates current user's profile.

---

### PATCH /users/:id/role

Admin only.

Updates user role.

---

### DELETE /users/:id

Admin & Maintainer.

Hierarchical authorization enforced.

---

## Categories

### POST /categories

Creates a new category for the authenticated user.

Authentication required.

---

### GET /categories

Returns all categories belonging to the authenticated user.

Authentication required.

---

### PATCH /categories/:id

Updates a category owned by the authenticated user.

Business rules:

- Category must exist.
- Category must belong to the authenticated user.
- Duplicate names are not allowed.

Authentication required.

---

### DELETE /categories/:id

Deletes a category owned by the authenticated user.

Business rules:

- Category must belong to the authenticated user.
- Transactions remain preserved (`category_id` becomes `NULL`).

Authentication required.

---

## Transactions

### POST /transactions

Creates a new transaction for the authenticated user.

**Authentication required.**

#### Request Body

```json
{
  "type": "expense",
  "amount": 450,
  "categoryId": 1,
  "description": "Pizza",
  "transactionDate": "2026-07-05"
}
```

#### Business Rules

- User must be authenticated.
- `amount` must be greater than zero.
- `type` must be either `income` or `expense`.
- `transactionDate` must be a valid ISO date (`YYYY-MM-DD`).
- If `categoryId` is provided, it must belong to the authenticated user.
- Description is optional.
- `categoryId` is optional.

#### Success Response

**201 Created**

---

### GET /transactions

Returns all transactions belonging to the authenticated user.

**Authentication required.**

#### Sorting

- Transaction Date (Descending)
- Created At (Descending)

#### Success Response

**200 OK**

---

### GET /transactions/:id

Returns a single transaction owned by the authenticated user.

**Authentication required.**

#### Business Rules

- Transaction must exist.
- Transaction must belong to the authenticated user.

#### Success Response

**200 OK**

---

### PATCH /transactions/:id

Updates an existing transaction.

**Authentication required.**

#### Request Body

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

#### Business Rules

- Transaction must belong to the authenticated user.
- If `categoryId` is provided, it must belong to the authenticated user.
- `categoryId: null` removes the category association.
- Only supplied fields are updated.

#### Success Response

**200 OK**

---

### DELETE /transactions/:id

Deletes a transaction owned by the authenticated user.

**Authentication required.**

#### Business Rules

- Transaction must exist.
- Transaction must belong to the authenticated user.

#### Success Response

**200 OK**

```json
{
  "success": true,
  "message": "Transaction deleted successfully"
}
```
