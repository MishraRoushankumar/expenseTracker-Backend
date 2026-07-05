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
