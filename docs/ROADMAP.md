# Project Roadmap

This roadmap outlines the planned evolution of the Expense Tracker Backend.

The project follows **Semantic Versioning (SemVer)**, where each minor release focuses on a specific engineering milestone.

> **Note**
>
> Roadmaps are subject to change as the project evolves.

---

# Current Release

## v1.5.0 (In Progress)

### Development Tooling

- [x] ESLint
- [x] Prettier
- [x] EditorConfig
- [x] VS Code workspace configuration
- [x] Vitest configuration

### Documentation

- [x] Refresh README
- [x] API Guide
- [x] Development Guide
- [x] Contributing Guide
- [x] Changelog
- [x] Roadmap

### Authentication

- [ ] Logout endpoint

### Testing

- [ ] Unit tests
- [ ] Integration tests
- [ ] Coverage reporting

---

# v1.6.0 — Containerization

## Docker

- [ ] Dockerfile
- [ ] Multi-stage builds
- [ ] Production image optimization

## Docker Compose

- [ ] PostgreSQL service
- [ ] Backend service
- [ ] Development configuration

## Production Configuration

- [ ] Environment configuration
- [ ] Health check endpoint
- [ ] Graceful shutdown

---

# v1.7.0 — Continuous Integration

## GitHub Actions

- [ ] Build workflow
- [ ] Lint workflow
- [ ] Type checking
- [ ] Test workflow

## Code Quality

- [ ] Coverage reports
- [ ] Automated quality checks
- [ ] Pull Request validation

## Dependency Management

- [ ] Dependabot
- [ ] Automated dependency updates

---

# v1.8.0 — Deployment

## Deployment

- [ ] Production deployment
- [ ] Environment configuration
- [ ] Release workflow

## Observability

- [ ] Request tracing
- [ ] Metrics
- [ ] Monitoring

## Reliability

- [ ] Health checks
- [ ] Readiness checks
- [ ] Logging improvements

---

# v1.9.0 — Scalability

## Authentication

- [ ] Refresh tokens
- [ ] Token rotation

## Performance

- [ ] Redis caching
- [ ] Query optimization

## Database

- [ ] Database migrations
- [ ] Seed scripts

## API

- [ ] API versioning improvements

---

# v2.0.0 — Production Ready

The goal of v2.0.0 is to provide a production-ready backend that follows modern backend engineering practices.

## Features

- [x] Layered architecture
- [x] JWT authentication
- [x] PostgreSQL integration
- [x] Structured logging
- [x] OpenAPI documentation
- [x] Request validation
- [x] Pagination
- [x] Filtering
- [x] Sorting

## Quality

- [ ] Comprehensive unit tests
- [ ] Integration tests
- [ ] High test coverage
- [ ] CI/CD pipeline

## Infrastructure

- [ ] Docker
- [ ] Production deployment
- [ ] Monitoring
- [ ] Health checks

---

# Long-Term Ideas

The following ideas are currently under evaluation and are not committed to any release.

## Authentication

- Refresh token support
- Email verification
- Password reset

## Performance

- Redis caching
- Background jobs
- Queue processing

## Architecture

- Evaluate Drizzle ORM
- Repository abstraction improvements

## Developer Experience

- API SDK generation
- Postman collection
- Example client application

---

# Release Strategy

The project follows this development cycle:

```text
Feature Branch
        │
        ▼
Pull Request
        │
        ▼
Code Review
        │
        ▼
Merge into main
        │
        ▼
Version Tag
        │
        ▼
GitHub Release
```

---

# Version History

| Version | Status         |
| ------- | -------------- |
| v1.0.0  | ✅ Released    |
| v1.1.0  | ✅ Released    |
| v1.2.0  | ✅ Released    |
| v1.3.0  | ✅ Released    |
| v1.4.0  | ✅ Released    |
| v1.5.0  | 🚧 In Progress |
| v1.6.0  | 📋 Planned     |
| v1.7.0  | 📋 Planned     |
| v1.8.0  | 📋 Planned     |
| v1.9.0  | 📋 Planned     |
| v2.0.0  | 🎯 Target      |
