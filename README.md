# Expense Tracker Backend

<div align="center">

**Production-grade RESTful API for personal expense management**

Built with **Express.js**, **TypeScript**, **Drizzle ORM**, **PostgreSQL**, **Docker**, and **GitHub Actions**.

Designed with modern backend engineering practices, emphasizing maintainability, scalability, automated testing, continuous integration, and production-ready deployment.

<p align="center">

![Node.js](https://img.shields.io/badge/Node.js-24-5FA04E?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-5-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/ORM-Drizzle-C5F74F)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Version](https://img.shields.io/badge/Version-v1.9.0-blue)

</p>

</div>

---

## Overview

Expense Tracker Backend is a modern backend application that provides a secure and scalable RESTful API for managing personal financial data.

The project is built to demonstrate production-oriented backend engineering rather than simply implementing CRUD endpoints. It incorporates a layered architecture, strong typing with TypeScript, database abstraction using Drizzle ORM, automated testing, Docker-based development, continuous integration, and a structured release workflow.

Whether you're exploring backend architecture, learning modern Node.js development, or reviewing portfolio projects, this repository aims to reflect real-world engineering practices.

---

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Repository Highlights](#repository-highlights)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#-getting-started)
- [Docker](#-docker)
- [API Documentation](#-api-documentation)
- [Development Workflow](#-development-workflow)
- [Engineering Practices](#engineering-practices)
- [Roadmap](#roadmap)
- [Contributing](#-contributing)
- [Security](#security)
- [License](#license)

---

## Live Demo

| Resource          | URL                                                          |
| ----------------- | ------------------------------------------------------------ |
| Production API    | <https://expensetracker-api-w610.onrender.com>               |
| Health Endpoint   | <https://expensetracker-api-w610.onrender.com/api/v1/health> |
| API Documentation | <https://expensetracker-api-w610.onrender.com/api/docs>      |

---

## Repository Highlights

- Production deployment on Render
- Layered architecture (Controller → Service → Repository)
- Drizzle ORM with PostgreSQL
- JWT-based authentication
- OpenAPI 3.1 documentation
- Docker & Docker Compose support
- GitHub Actions CI pipeline
- Conventional Commits
- Semantic Versioning
- GitHub Projects & Milestones
- Issue & Pull Request templates
- Security policy
- Comprehensive project documentation

---

## Features

### Authentication

- User registration
- User login
- JWT authentication
- Password hashing using bcrypt
- Profile retrieval
- Profile update
- Role-ready authorization design

---

### Categories

- Create category
- Retrieve categories
- Update category
- Delete category
- Ownership validation

---

### Transactions

- Create transaction
- Retrieve transactions
- Update transaction
- Delete transaction

Supports:

- Pagination
- Filtering
- Sorting

---

### Dashboard Analytics

- Dashboard Summary
- Monthly Trends
- Dashboard Insights
- Category Analytics
- Recent Transactions

---

### Security

- JWT authentication
- Helmet
- CORS
- Rate limiting
- Zod validation
- Environment validation
- Centralized error handling
- Parameterized database queries via Drizzle ORM

---

### Engineering

- Docker support
- Docker Compose
- OpenAPI / Swagger
- GitHub Actions
- Layered architecture
- Structured logging
- Conventional Commits
- Semantic Versioning
- GitHub Flow
- Repository standards

---

## Technology Stack

| Category          | Technology               |
| ----------------- | ------------------------ |
| Runtime           | Node.js 24               |
| Framework         | Express.js               |
| Language          | TypeScript               |
| ORM               | Drizzle ORM              |
| Database          | PostgreSQL (Neon)        |
| Validation        | Zod                      |
| Authentication    | JWT + bcrypt             |
| Logging           | Pino                     |
| API Documentation | OpenAPI 3.1 + Swagger UI |
| Testing           | Vitest + Supertest       |
| Containerization  | Docker & Docker Compose  |
| CI/CD             | GitHub Actions           |
| Deployment        | Render                   |

---

## Architecture

The project follows a layered architecture that separates responsibilities into independent layers, making the codebase easier to maintain, test, and extend.

```mermaid
flowchart TD

A[Client]

A --> B[Express Router]

B --> C[Controller]

C --> D[Service]

D --> E[Repository]

E --> F[Drizzle ORM]

F --> G[(PostgreSQL)]
```

Each layer has a single responsibility:

| Layer        | Responsibility                     |
| ------------ | ---------------------------------- |
| Routes       | API routing                        |
| Controllers  | Handle HTTP requests and responses |
| Services     | Business logic                     |
| Repositories | Database operations                |
| Database     | Data persistence                   |

For a detailed explanation, see:

- `ARCHITECTURE.md`
- `docs/PROJECT_STRUCTURE.md`

---

## Project Structure

```text
root/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── workflows/
│   └── pull_request_template.md
│
├── docs/
│
├── src/
│   ├── config/
│   ├── constants/
│   ├── db/
│   ├── docs/
│   ├── logger/
│   ├── middleware/
│   ├── modules/
│   ├── shared/
│   ├── types/
│   └── utils/
│
├── tests/
│
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
├── PRD.md
├── README.md
└── SECURITY.md
```

Additional documentation is available in the `docs/` directory.

---

## 🚀 Getting Started

### Prerequisites

Ensure the following software is installed on your system:

| Software                    | Version     |
| --------------------------- | ----------- |
| Node.js                     | 22 or later |
| npm                         | 10 or later |
| PostgreSQL                  | 17 or later |
| Docker _(optional)_         | Latest      |
| Docker Compose _(optional)_ | Latest      |

---

### Clone the Repository

```bash
git clone https://github.com/MishraRoushankumar/expenseTracker-Backend.git
```

Move into the project directory:

```bash
cd expenseTracker-Backend
```

---

### Install Dependencies

```bash
npm install
```

---

## Environment Configuration

Create your local environment file:

```bash
cp .env.example .env
```

Configure the required environment variables.

Example:

```env
NODE_ENV=development

PORT=5000

DATABASE_URL=postgresql://username:password@localhost:5432/expense_tracker_db

JWT_SECRET=your_secure_secret
JWT_EXPIRES_IN=1d
```

Never commit:

- `.env`
- Database credentials
- API keys
- Secrets

---

## Database

Generate migrations:

```bash
npm run db:generate
```

Apply migrations:

```bash
npm run db:migrate
```

Open Drizzle Studio:

```bash
npm run db:studio
```

---

## Running the Application

Development mode:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

Run the production build:

```bash
npm start
```

---

## Available Scripts

| Command                | Description                   |
| ---------------------- | ----------------------------- |
| `npm run dev`          | Start development server      |
| `npm run build`        | Build the project             |
| `npm start`            | Start production server       |
| `npm run lint`         | Run ESLint                    |
| `npm run lint:fix`     | Automatically fix lint issues |
| `npm run format`       | Format source code            |
| `npm run format:check` | Verify formatting             |
| `npm run typecheck`    | Run TypeScript type checking  |
| `npm test`             | Run tests in watch mode       |
| `npm run test:run`     | Run tests once                |
| `npm run coverage`     | Generate test coverage report |
| `npm run db:generate`  | Generate Drizzle migrations   |
| `npm run db:migrate`   | Apply database migrations     |
| `npm run db:studio`    | Open Drizzle Studio           |

---

## 🐳 Docker

The project supports local development using Docker and Docker Compose.

Start all services:

```bash
docker compose up --build
```

Run in detached mode:

```bash
docker compose up -d
```

Stop all services:

```bash
docker compose down
```

For complete Docker documentation, see:

- `docs/DOCKER.md`

---

## 📖 API Documentation

Interactive API documentation is available through Swagger UI.

### Local

```
http://localhost:5000/api/docs
```

### Production

```
https://expensetracker-api-w610.onrender.com/api/docs
```

The OpenAPI specification includes:

- Authentication
- Categories
- Transactions
- Dashboard Analytics
- Request schemas
- Response schemas
- JWT Bearer Authentication

For complete API documentation, see:

- `docs/API.md`

---

## ⚙️ Continuous Integration

Every push and pull request is automatically validated using GitHub Actions.

The CI pipeline includes:

- ESLint
- TypeScript type checking
- Unit tests
- Integration tests
- Docker build validation

> Comprehensive integration tests
> ~89% statement coverage

This ensures all changes meet the project's quality standards before merging.

---

## 📚 Documentation

The repository contains dedicated documentation for each major area of the project.

| Document                       | Description               |
| ------------------------------ | ------------------------- |
| `ARCHITECTURE.md`              | System architecture       |
| `CHANGELOG.md`                 | Release history           |
| `CONTRIBUTING.md`              | Contribution guide        |
| `SECURITY.md`                  | Security policy           |
| `PRD.md`                       | Product requirements      |
| `docs/API.md`                  | API reference             |
| `docs/DATABASE.md`             | Database design           |
| `docs/DEPLOYMENT.md`           | Deployment guide          |
| `docs/DEVELOPMENT_GUIDE.md`    | Local development         |
| `docs/DOCKER.md`               | Docker guide              |
| `docs/ENGINEERING_WORKFLOW.md` | Engineering workflow      |
| `docs/GIT_WORKFLOW.md`         | Git branching strategy    |
| `docs/PROJECT_STRUCTURE.md`    | Repository structure      |
| `docs/RBAC.md`                 | Role-based access control |
| `docs/ROADMAP.md`              | Project roadmap           |

---

## 🛠 Development Workflow

The project follows a structured Git workflow designed to keep development organized and release-ready.

```mermaid
flowchart LR

Issue --> Branch

Branch --> Development

Development --> Testing

Testing --> PullRequest

PullRequest --> Develop

Develop --> Release

Release --> Main

Main --> Tag

Tag --> GitHubRelease
```

### Branch Strategy

| Branch       | Purpose                    |
| ------------ | -------------------------- |
| `main`       | Stable production releases |
| `develop`    | Active development         |
| `feature/*`  | New features               |
| `fix/*`      | Bug fixes                  |
| `refactor/*` | Code improvements          |
| `docs/*`     | Documentation              |
| `chore/*`    | Maintenance tasks          |

Every change starts with a GitHub Issue and is developed in its own branch before being merged into `develop`. Releases are created by merging `develop` into `main`.

---

## Engineering Practices

This repository follows engineering practices commonly used in professional backend projects.

- Semantic Versioning
- Conventional Commits
- GitHub Flow
- Layered Architecture
- Repository Pattern
- API-first Development
- OpenAPI Documentation
- Docker-based Development
- GitHub Actions CI
- Pull Request Reviews
- Issue & PR Templates
- Security Policy
- Branch Protection Rules

---

## Project Status

| Component              |   Status   |
| ---------------------- | :--------: |
| Authentication         |     ✅     |
| Categories             |     ✅     |
| Transactions           |     ✅     |
| PostgreSQL Integration |     ✅     |
| Drizzle ORM            |     ✅     |
| OpenAPI Documentation  |     ✅     |
| Docker Support         |     ✅     |
| GitHub Actions         |     ✅     |
| Production Deployment  |     ✅     |
| Repository Standards   |     ✅     |
| Dashboard Analytics    |     ✅     |
| Budget Management      | 🚧 Planned |
| Reports                | 📋 Planned |
| AI Insights            | 💡 Future  |

---

## Roadmap

### v2.0.0

Future enhancements include:

- Recurring transactions
- CSV import/export
- Notification system
- Multi-currency support
- AI-powered financial insights
- Frontend integration

---

## 🤝 Contributing

Contributions are welcome.

Please read the following documents before opening an issue or submitting a pull request:

- `CONTRIBUTING.md`
- `SECURITY.md`

Every contribution—whether it is code, documentation, testing, or bug fixes—helps improve the project.

---

## Security

Security is an important aspect of this project.

If you discover a vulnerability, please follow the responsible disclosure process described in:

- `SECURITY.md`

Please do **not** create a public GitHub issue for security-related reports.

---

## License

This project is licensed under the **MIT License**.

See the `LICENSE` file for complete details.

---

<div align="center">

Built with ❤️ using **Node.js**, **Express.js**, **TypeScript**, **Drizzle ORM**, and **PostgreSQL**.

If you found this project helpful, consider giving it a ⭐ on GitHub.

</div>
