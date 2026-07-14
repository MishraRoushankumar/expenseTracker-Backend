# Changelog

All notable changes to this project will be documented in this file.

The format is based on **Keep a Changelog** and the project follows **Semantic Versioning (SemVer)**.

---

## [Unreleased]

### Planned

#### Authentication

- Logout endpoint
- Refresh token support

#### Testing

- Unit tests
- Integration tests
- Test coverage reporting

#### Infrastructure

- Docker
- Docker Compose
- GitHub Actions
- CI/CD pipeline

#### Deployment

- Production deployment
- Health checks
- Monitoring

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
