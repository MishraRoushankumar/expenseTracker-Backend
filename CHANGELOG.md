# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Added

-

### Changed

-

### Fixed

-

---

## [1.9.0] - 2026-07-24

### Added

- Dashboard Summary endpoint
- Monthly Trends endpoint
- Dashboard Insights endpoint
- Category Analytics endpoint
- Recent Transactions endpoint
- Dashboard integration test suite
- Dashboard OpenAPI documentation

### Changed

- Improved OpenAPI schemas
- Expanded API documentation
- Increased automated test coverage

### Quality

- ~89% statement coverage
- ~89% line coverage

---

## [1.8.3] - 2026-07-22

### Added

- Added standardized GitHub Issue Templates.
- Added a repository-wide Pull Request template.
- Added a SECURITY policy for responsible vulnerability disclosure.
- Added branch protection rules for the `main` branch.
- Added standardized repository labels for issue management.
- Added automatic deletion of merged head branches.

### Changed

- Refreshed repository documentation.
- Updated `README.md` with improved project overview, architecture, workflow, and documentation index.
- Updated `CONTRIBUTING.md` to reflect the Git workflow and engineering practices.
- Updated community standards documentation.
- Improved repository governance and development workflow.

### Security

- Documented the security reporting process.
- Defined supported versions.
- Added deployment security recommendations.

---

## [1.8.2] - 2026-07-21

### Added

- Added application root endpoint.
- Enhanced health endpoint with application metadata.
- Added engineering workflow documentation.
- Improved production configuration.

### Changed

- Updated runtime configuration.
- Improved deployment configuration.
- Refined release documentation.

---

## [1.8.1] - 2026-07-21

### Added

- Production deployment on Render.
- Docker support.
- GitHub Actions CI.
- Health check endpoint.
- Production environment configuration.

### Changed

- Improved deployment workflow.
- Updated build configuration.

---

## [1.8.0] - 2026-07-20

### Added

- Initial authentication module.
- Categories module.
- Transactions module.
- JWT authentication.
- Drizzle ORM integration.
- PostgreSQL support.
- OpenAPI documentation.
- Docker Compose configuration.
- Structured logging.
- Rate limiting.
- Input validation.
- Layered architecture.

### Changed

- Established project architecture.
- Introduced semantic versioning.
- Adopted Conventional Commits.

---

## [1.7.0] - 2026-07-17

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

## [1.6.0] - 2026-07-17

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

## [1.5.0] - 2026-07-17

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

## [1.4.0] - 2026-07-13

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
