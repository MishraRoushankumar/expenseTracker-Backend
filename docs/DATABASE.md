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

Relationships

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
