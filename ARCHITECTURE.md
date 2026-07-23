# Architecture

This project follows Layered Architecture.

```
Client
    │
    ▼
Express Router
    │
    ▼
Controller
    │
    ▼
Service
    │
    ▼
Repository
    │
    ▼
PostgreSQL
```

---

## Responsibilities

### Controller

- Handle HTTP Request
- Call Service
- Return Response

---

### Service

Contains business logic.

Examples

- Authentication
- Ownership checks
- Duplicate validation
- Role hierarchy

---

### Repository

Contains SQL queries only.

No business logic.

---

### Middleware

Cross-cutting concerns.

- Authentication
- Authorization
- Validation
- Error Handling

---

### Schema

Validates incoming requests using Zod.

```
Client

↓

Schema

↓

Controller
```

## Request Lifecycle

```mermaid
sequenceDiagram

Client->>API: HTTP Request

API->>Controller: Route Handler

Controller->>Service: Business Logic

Service->>Repository: Database Query

Repository->>Database: SQL

Database-->>Repository: Result

Repository-->>Service: Entity

Service-->>Controller: Response

Controller-->>Client: JSON Response
```
