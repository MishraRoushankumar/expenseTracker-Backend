# Changelog

All notable changes to this project will be documented here.

---

## v1.4.0

### Added

- Structured logging using Pino.
- HTTP request logging.
- Startup logging.

### Changed

- Replaced console logging with centralized logger.

---

## v1.3.0

### Added

#### Query Infrastructure

- Shared query infrastructure.
- Pagination support for transaction listing.
- Transaction filtering support.
- Transaction sorting support.
- Reusable pagination metadata.

### Changed

- Enhanced transaction listing endpoint with pagination, filtering, and sorting.
- Introduced reusable transaction query options.
- Added transaction-specific query builder.
- Improved repository query architecture for dynamic SQL generation.
- Standardized pagination metadata across paginated endpoints.
- Updated API documentation for transaction query parameters.

---

## v1.2.0

### Added

- Create Transaction endpoints
- Transaction retrieval endpoints
- Transaction ownership validation
- Transaction update endpoint with partial update support.
- Transaction deletion endpoint.
- Completed Transaction CRUD operations.

### Changed

- Organized application constants by domain.
- Standardized response messages across modules.
- Removed hardcoded strings from services and controllers.
- Enhanced request validation middleware to support body, route parameter, and query validation.
- Improved project folder structure and naming consistency.
- Standardized module and constant naming conventions.
- Reorganized shared validation schemas.

---

## v1.1.0

### Added

- Complete Categories CRUD
- Category ownership validation
- Duplicate category prevention
- Category name normalization
- Category update timestamps

---

## v1.0.0

### Added

- PostgreSQL integration
- JWT Authentication
- User Management
- Role Based Access Control
- Hierarchical Authorization
- Category Creation
- Standardized API Responses
- Centralized Error Handling

---

## Upcoming

- Transactions
- Dashboard
- Budget Module
