# Database Design

## Users

```
id
email
password_hash
first_name
last_name
role
created_at
updated_at
```

---

## Categories

```
id
name
user_id
created_at
updated_at
```

### Constraints

- `UNIQUE(name, user_id)`
- One category belongs to one user.
- Category names are unique per user.
- Deleting a category sets `transaction.category_id` to `NULL`.

---

## Transactions

```
id
user_id
category_id
type
amount
description
transaction_date
created_at
updated_at
```

---

## Relationships

```
Users
   │
   ├──── Categories
   │
   └──── Transactions

Categories
      │
      └──── Transactions
```

# Database Architecture

```
Express API
      │
Repositories
      │
Drizzle ORM
      │
node-postgres Pool
      │
Neon PostgreSQL
```

---

# Entity Relationship

```
Users (1)
 │
 ├──────────────┐
 │              │
 ▼              ▼
Categories (N) Transactions (N)
        │
        └─────────────► category_id (nullable)
```

---

# Indexes

## Users

- UNIQUE(email)

## Categories

- UNIQUE(name, user_id)
- INDEX(user_id)

## Transactions

- INDEX(user_id)
- INDEX(category_id)
- INDEX(transaction_date)
- INDEX(type)
- INDEX(user_id, transaction_date)

---

# ORM

The project uses **Drizzle ORM** as the single database abstraction layer.

Repositories must never execute raw SQL directly unless absolutely necessary.

All CRUD operations should be implemented using the Drizzle Query Builder.
