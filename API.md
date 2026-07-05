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

Creates a category.

Authentication required.

---

Future

GET /categories

PATCH /categories/:id

DELETE /categories/:id
