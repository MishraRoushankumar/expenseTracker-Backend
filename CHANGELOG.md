# Changelog

All notable changes to this project will be documented in this file.

The format is based on **Keep a Changelog** and the project follows **Semantic Versioning (SemVer)**.

---

## [1.8.1] - 2026-07-20

### Added

- Render deployment configuration
- `.env.example`
- JSON 404 middleware

### Changed

- Standardized deployment using `DATABASE_URL`
- Updated Docker Compose configuration
- Improved production environment configuration

### Fixed

- Render TypeScript build configuration
- Production deployment issues

### Deployment

- Successfully deployed to Render
- Verified production health endpoint

---

## [1.8.0] - 2026-07-20

### Added

- Introduced Drizzle ORM as the project's database ORM.
- Added Drizzle schema definitions for all application tables.
- Added migration support using Drizzle Kit.
- Added Neon PostgreSQL integration.
- Added database query utilities for Drizzle.
- Added integration tests for the Drizzle-based repositories.

### Changed

- Migrated Users module from raw SQL (`pg`) to Drizzle ORM.
- Migrated Categories module from raw SQL (`pg`) to Drizzle ORM.
- Migrated Transactions module from raw SQL (`pg`) to Drizzle ORM.
- Replaced legacy repository implementations with Drizzle query builders.
- Standardized repository patterns across all modules.
- Simplified database configuration to use a single `DATABASE_URL`.
- Updated test infrastructure to support Drizzle and Neon.

### Refactored

- Removed legacy SQL query implementations.
- Removed obsolete database configuration variables.
- Simplified environment configuration.
- Improved repository separation by introducing dedicated query files.
- Improved database abstraction throughout the application.

### Documentation

- Added Drizzle ORM documentation.
- Added Neon PostgreSQL setup guide.
- Updated database architecture documentation.
- Updated deployment documentation for the new database workflow.

### Testing

- Updated unit and integration tests for Drizzle ORM.
- Verified migration compatibility.
- Verified CRUD operations across Users, Categories, and Transactions.

### Breaking Changes

- Repository implementations now use Drizzle ORM instead of raw PostgreSQL queries.
- Legacy database configuration variables have been removed in favor of `DATABASE_URL`.

---

## [1.7.0] - Released

### Added

#### Continuous Integration

- GitHub Actions workflows
- Automated linting
- Automated type checking
- Unit test execution
- Integration test execution
- Docker image validation

#### Testing

- PostgreSQL service for CI
- Automated database initialization
- Coverage reporting

### Changed

- Established CI pipeline for every push and pull request
- Improved development workflow through automated validation

---

## [1.6.0] - Released

### Added

#### Containerization

- Production-ready Dockerfile
- Docker Compose configuration
- PostgreSQL service
- Persistent Docker volumes
- Health checks
- Multi-stage Docker build

#### Documentation

- Docker guide
- Docker Compose usage
- Environment configuration
- Troubleshooting guide

### Changed

- Optimized production Docker image
- Improved local development workflow

---

## [1.5.0] - In Progress

### Added

#### Development Tooling

- ESLint using the modern Flat Config
- Prettier configuration
- EditorConfig
- VS Code workspace recommendations
- Vitest configuration
- Testing directory structure

#### Documentation

- Refreshed project README
- Updated API guide
- Updated development guide
- Updated contribution guide
- Updated roadmap

### Changed

- Replaced ambiguous `{}` generic types with explicit types
- Standardized `import type` usage
- Improved SQL query helper implementation
- Updated project documentation to match the current implementation

---

## [1.4.0] - Released

### Added

#### OpenAPI

- OpenAPI 3.1 specification
- Swagger UI integration
- Interactive API documentation

#### Authentication Documentation

- Register endpoint
- Login endpoint
- Profile endpoint
- Update profile endpoint

#### Category Documentation

- Create category
- Get categories
- Update category
- Delete category

#### Transaction Documentation

- Create transaction
- Get transactions
- Update transaction
- Delete transaction

#### Shared Components

- Reusable request schemas
- Reusable response schemas
- Common error schemas
- JWT Bearer authentication
- Shared pagination schemas

### Changed

- Modular OpenAPI documentation structure
- Improved API documentation consistency

---

## [1.3.0] - Released

### Added

#### Logging

- Structured logging using Pino
- HTTP request logging
- Environment-aware logging

#### Security

- Global rate limiting
- Improved error handling

#### Infrastructure

- Database connection improvements
- Logging abstraction

### Changed

- Removed remaining `console.log` statements
- Improved production logging

---

## [1.2.0] - Released

### Added

#### Transactions

- Transaction CRUD operations
- Pagination
- Filtering
- Sorting
- Query helper utilities

#### Categories

- Category CRUD operations
- Ownership validation

#### Shared Query Utilities

- Pagination helpers
- SQL filter builders
- Sorting helpers

---

## [1.1.0] - Released

### Added

#### Authentication

- User registration
- User login
- JWT authentication
- Password hashing using bcrypt
- Profile retrieval
- Profile update

#### Validation

- Zod validation
- Request validation middleware

#### Security

- Helmet
- CORS
- Environment validation

---

## [1.0.0] - Initial Release

### Added

#### Foundation

- Express.js server
- TypeScript configuration
- PostgreSQL integration
- Layered architecture

#### Project Structure

- Controllers
- Services
- Repositories
- Middleware
- Configuration

#### Utilities

- Centralized error handling
- API response helpers
- Environment management
