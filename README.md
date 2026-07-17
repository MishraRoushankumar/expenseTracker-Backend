# Expense Tracker Backend

> A production-inspired RESTful API for personal expense management built with **Node.js**, **Express.js**, **TypeScript**, and **PostgreSQL**.

The project demonstrates modern backend engineering practices including layered architecture, JWT authentication, OpenAPI documentation, structured logging, validation, pagination, filtering, sorting, and a professional development workflow.

---

## 🚀 Project Highlights

- 🏗️ Layered Architecture (Controller → Service → Repository)
- 🔒 JWT Authentication with role-based access ready design
- 🛡️ Request validation using Zod
- 🗄️ PostgreSQL with parameterized SQL queries
- 📖 OpenAPI 3.1 documentation with Swagger UI
- 📝 Structured logging using Pino
- ⚡ Pagination, filtering and sorting support
- 🚦 Rate limiting and security middleware
- 🧹 ESLint + Prettier configured
- 🧪 Vitest configured for testing
- 📦 Production-oriented project structure

---

# ✨ Features

## Authentication

- User registration
- User login
- Get authenticated profile
- Update profile
- Password hashing using bcrypt
- JWT authentication
- Role-based access ready design

> **Note:** Logout functionality is planned for a future release.

---

## Categories

- Create category
- Get categories
- Update category
- Delete category
- User ownership validation

---

## Transactions

- Create transaction
- Get transactions
- Update transaction
- Delete transaction

Supports:

- Pagination
- Filtering
- Sorting

---

## Security

- JWT Authentication
- Password hashing
- Helmet
- CORS
- Rate limiting
- Environment validation
- Centralized error handling
- SQL injection protection using parameterized queries

---

## Developer Experience

- OpenAPI 3.1
- Swagger UI
- ESLint
- Prettier
- EditorConfig
- Vitest
- TypeScript
- Modular folder structure

---

# 🛠 Tech Stack

| Category          | Technology               |
| ----------------- | ------------------------ |
| Runtime           | Node.js                  |
| Framework         | Express.js               |
| Language          | TypeScript               |
| Database          | PostgreSQL               |
| Validation        | Zod                      |
| Authentication    | JWT + bcrypt             |
| Logging           | Pino                     |
| API Documentation | OpenAPI 3.1 + Swagger UI |
| Testing           | Vitest                   |
| Linting           | ESLint                   |
| Formatting        | Prettier                 |

---

# 🏛 Architecture

The project follows a layered architecture to separate responsibilities and keep the codebase maintainable.

```text
                Client
                   │
                   ▼
             Express Routes
                   │
                   ▼
             Route Handlers
                   │
                   ▼
             Controllers
                   │
                   ▼
               Services
                   │
                   ▼
            Repositories
                   │
                   ▼
             PostgreSQL
```

For detailed architecture documentation see:

- **ARCHITECTURE.md**
- **docs/PROJECT_STRUCTURE.md**

---

# 📁 Project Structure

```text
backend/
│
├── docs/
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
├── ARCHITECTURE.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── PRD.md
├── TECH_DEBT.md
└── README.md
```

See **docs/PROJECT_STRUCTURE.md** for a detailed explanation.

---

# 🚀 Getting Started

## Prerequisites

- Node.js 22+
- PostgreSQL
- npm

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Move into the project

```bash
cd backend
```

Install dependencies

```bash
npm install
```

---

## Environment Variables

Copy the example environment file

```bash
cp .env.example .env
```

Update the database credentials and JWT configuration.

---

## Database

Create the PostgreSQL database.

Run the initialization SQL:

```text
src/db/init.sql
```

---

## Run Development Server

```bash
npm run dev
```

The server will start on the configured port.

---

# 📖 API Documentation

Interactive API documentation is available through Swagger UI.

Development URL

```text
http://localhost:5000/api/docs
```

The OpenAPI specification includes:

- Authentication
- Categories
- Transactions
- Request schemas
- Response schemas
- JWT Bearer authentication

For API usage see:

```
docs/API.md
```

---

# 🐳 Docker

The Expense Tracker API can be run entirely using Docker and Docker Compose. This starts both the backend API and a PostgreSQL database with a single command.

---

## Prerequisites

Ensure the following are installed:

- Docker Engine 28+
- Docker Compose V2

Verify your installation:

```bash
docker --version
docker compose version
```

---

## Project Architecture

```
                 Docker Compose
                       │
        ┌──────────────┴──────────────┐
        │                             │
        ▼                             ▼
 ┌──────────────────┐         ┌────────────────────┐
 │   Backend API    │         │    PostgreSQL      │
 │                  │         │                    │
 │ Node.js          │◄──────► │ PostgreSQL 17      │
 │ Express          │         │ Persistent Volume  │
 │ Port: 5000       │         │ Port: 5432         │
 └──────────────────┘         └────────────────────┘
```

---

## Environment Variables

Create a Docker environment file.

```bash
cp .env.docker.example .env.docker
```

Update the values according to your environment.

Example:

```env
NODE_ENV=production

PORT=5000

DB_HOST=postgres
DB_PORT=5432
DB_NAME=expense_tracker_db
DB_USER=expense_app
DB_PASSWORD=your_password

JWT_SECRET=your_secure_secret
```

> **Note**
>
> `DB_HOST` must remain `postgres` because Docker Compose uses the service name as the hostname.

---

## Build & Start

Build images and start all containers.

```bash
docker compose up --build
```

Run in detached mode:

```bash
docker compose up -d --build
```

---

## Verify

Backend API

```
http://localhost:5000
```

Swagger Documentation

```
http://localhost:5000/api-docs
```

Health Check

```
http://localhost:5000/api/v1/health
```

---

## View Running Containers

```bash
docker compose ps
```

---

## View Logs

Backend

```bash
docker compose logs -f backend
```

PostgreSQL

```bash
docker compose logs -f postgres
```

All Services

```bash
docker compose logs -f
```

---

## Stop Containers

```bash
docker compose down
```

This stops all containers while preserving the PostgreSQL data volume.

---

## Restart

```bash
docker compose up
```

Since the volume is preserved, the database contents remain intact.

---

## Rebuild Images

Rebuild after modifying the Dockerfile or dependencies.

```bash
docker compose up --build
```

Force a clean rebuild:

```bash
docker compose build --no-cache
```

---

## Reset Database

To completely remove the PostgreSQL database volume:

```bash
docker compose down -v
```

Then start again:

```bash
docker compose up --build
```

This recreates the database and executes:

```
src/db/schema/init.sql
```

---

## Docker Volumes

The project uses a named Docker volume:

```
postgres-data
```

This volume persists PostgreSQL data across container restarts.

---

## Docker Network

Docker Compose automatically creates an isolated bridge network.

The backend communicates with PostgreSQL using:

```
DB_HOST=postgres
```

No manual network configuration is required.

---

## Common Commands

Build

```bash
docker compose build
```

Start

```bash
docker compose up
```

Detached Mode

```bash
docker compose up -d
```

Stop

```bash
docker compose down
```

Stop & Remove Volumes

```bash
docker compose down -v
```

Restart

```bash
docker compose restart
```

View Containers

```bash
docker compose ps
```

View Logs

```bash
docker compose logs -f
```

---

## Troubleshooting

### PostgreSQL Port Already in Use

If PostgreSQL is already installed locally, update the host port mapping:

```yaml
ports:
  - "5433:5432"
```

The backend container continues communicating internally on port **5432**.

---

### Backend Cannot Connect to PostgreSQL

Verify:

```bash
docker compose ps
```

Then inspect the backend logs:

```bash
docker compose logs backend
```

Ensure PostgreSQL is healthy before the backend starts.

---

### Reinitialize Database

If the schema changes and you want a clean database:

```bash
docker compose down -v
docker compose up --build
```

---

## Security Notes

- Do not commit `.env.docker`.
- Commit only `.env.docker.example`.
- Use strong secrets in production.
- Replace the example JWT secret before deployment.

---

## Included Services

| Service    | Description            | Port             |
| ---------- | ---------------------- | ---------------- |
| Backend    | Express.js API         | 5000             |
| PostgreSQL | PostgreSQL 17 Database | 5432 (Container) |

---

## Production Notes

The Docker image uses:

- Multi-stage builds
- Production-only dependencies
- Non-root runtime user
- Layer caching
- Docker Compose health checks
- Persistent PostgreSQL volumes

These optimizations reduce image size, improve security, and provide a production-ready development environment.

---

# 📜 Available Scripts

| Command                | Description                   |
| ---------------------- | ----------------------------- |
| `npm run dev`          | Start development server      |
| `npm run build`        | Build the project             |
| `npm run start`        | Start production server       |
| `npm run lint`         | Run ESLint                    |
| `npm run lint:fix`     | Automatically fix lint issues |
| `npm run format`       | Format code using Prettier    |
| `npm run format:check` | Verify formatting             |
| `npm run typecheck`    | Run TypeScript type checking  |
| `npm run test`         | Run tests in watch mode       |
| `npm run test:run`     | Run tests once                |

---

# 📚 Documentation

| Document                    | Description                |
| --------------------------- | -------------------------- |
| `ARCHITECTURE.md`           | System architecture        |
| `CHANGELOG.md`              | Release history            |
| `CONTRIBUTING.md`           | Contribution guidelines    |
| `PRD.md`                    | Product requirements       |
| `TECH_DEBT.md`              | Technical debt tracking    |
| `docs/API.md`               | API usage guide            |
| `docs/CODING_STANDARDS.md`  | Coding conventions         |
| `docs/DATABASE.md`          | Database design            |
| `docs/DEVELOPMENT_GUIDE.md` | Local development workflow |
| `docs/DEPLOYMENT.md`        | Deployment guide           |
| `docs/GIT_WORKFLOW.md`      | Git workflow               |
| `docs/PROJECT_STRUCTURE.md` | Project organization       |
| `docs/RBAC.md`              | Authorization design       |
| `docs/ROADMAP.md`           | Future roadmap             |

---

# 📊 Current Project Status

| Feature                | Status                                      |
| ---------------------- | ------------------------------------------- |
| Authentication         | 🟡 Register, Login, Profile, Update Profile |
| Categories             | ✅ Complete                                 |
| Transactions           | ✅ Complete                                 |
| PostgreSQL Integration | ✅ Complete                                 |
| OpenAPI Documentation  | ✅ Complete                                 |
| Structured Logging     | ✅ Complete                                 |
| Pagination             | ✅ Complete                                 |
| Filtering              | ✅ Complete                                 |
| Sorting                | ✅ Complete                                 |
| Rate Limiting          | ✅ Complete                                 |
| ESLint                 | ✅ Complete                                 |
| Prettier               | ✅ Complete                                 |
| Vitest Configuration   | ✅ Complete                                 |
| Logout                 | 📋 Planned                                  |
| Unit Testing           | 🚧 In Progress                              |
| Integration Testing    | 📋 Planned                                  |
| Docker                 | 📋 Planned                                  |
| GitHub Actions         | 📋 Planned                                  |
| Deployment             | 📋 Planned                                  |

---

# 🛣 Roadmap

## v1.5.0

- Documentation refresh
- Unit testing
- Integration testing
- Logout endpoint

## v1.6.0

- Docker
- Docker Compose
- Production configuration

## v1.7.0

- GitHub Actions
- Continuous Integration
- Test coverage reporting

## v1.8.0

- Deployment
- Health checks
- Monitoring

## v2.0.0

Production-ready backend with complete testing, CI/CD pipeline, containerization, deployment, and operational tooling.

---

# 🤝 Contributing

Contributions are welcome.

Please read **CONTRIBUTING.md** before opening an issue or submitting a pull request.

---

# 📄 License

This project is licensed under the MIT License.

See the **LICENSE** file for details.
