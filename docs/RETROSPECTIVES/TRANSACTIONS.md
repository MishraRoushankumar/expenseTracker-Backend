# Transactions Module Retrospective

## Overview

Implemented complete CRUD functionality for transactions with ownership validation and partial updates.

---

## Features

- Create
- Read
- Update
- Delete

---

## Design Decisions

- Layered architecture
- Repository pattern
- Service-based business logic
- Thin controllers
- Validation middleware
- PATCH for partial updates

---

## Challenges

- Partial updates
- Nullable category handling
- Ownership validation
- Request validation refactor

---

## Lessons Learned

- Importance of separating business logic.
- Benefits of reusable validation.
- Clear Git history improves maintainability.
- Explicit SQL is easier to maintain than `SELECT *`.

---

## Future Improvements

- Pagination
- Filtering
- Sorting
- Soft deletes (optional)
- Bulk operations
