# 🐳 Docker Guide

This project provides a complete Docker-based development environment using Docker Compose.

The Docker setup includes:

- Express.js Backend
- PostgreSQL 17 Database
- Persistent Docker Volume
- Health Checks
- Automatic Database Initialization

---

# Architecture

```
                 Docker Compose
                       │
        ┌──────────────┴──────────────┐
        │                             │
        ▼                             ▼
 ┌──────────────────┐         ┌────────────────────┐
 │   Backend API    │◄──────► │ PostgreSQL 17      │
 │                  │         │                    │
 │ Express.js       │         │ Persistent Volume  │
 │ Node.js          │         │                    │
 │ Port 5000        │         │ Port 5432          │
 └──────────────────┘         └────────────────────┘
```

---

# Prerequisites

- Docker 28+
- Docker Compose V2

Verify installation:

```bash
docker --version
docker compose version
```

---

# Environment Variables

Copy the example environment file.

```bash
cp .env.docker.example .env.docker
```

Example:

```env
NODE_ENV=production

PORT=5000

DB_HOST=postgres
DB_PORT=5432
DB_NAME=expense_tracker_db
DB_USER=expense_app
DB_PASSWORD=your_password

JWT_SECRET=your_secret
```

> **Important**
>
> `DB_HOST` must be `postgres` because Docker Compose resolves service names automatically.

---

# Build & Run

Build images and start containers.

```bash
docker compose up --build
```

Detached mode:

```bash
docker compose up -d --build
```

---

# Verify

Backend

```
http://localhost:5000
```

Swagger

```
http://localhost:5000/api-docs
```

Health

```
http://localhost:5000/api/v1/health
```

---

# Logs

Backend

```bash
docker compose logs -f backend
```

Database

```bash
docker compose logs -f postgres
```

All Services

```bash
docker compose logs -f
```

---

# Running Containers

```bash
docker compose ps
```

---

# Stop

```bash
docker compose down
```

The PostgreSQL data volume will be preserved.

---

# Restart

```bash
docker compose up
```

---

# Rebuild

```bash
docker compose up --build
```

Force rebuild

```bash
docker compose build --no-cache
```

---

# Reset Database

Delete all containers and volumes.

```bash
docker compose down -v
```

Start again

```bash
docker compose up --build
```

The database schema will be recreated using:

```
src/db/schema/init.sql
```

---

# Docker Volume

Named volume:

```
postgres-data
```

This volume stores PostgreSQL data between container restarts.

---

# Docker Network

Docker Compose automatically creates an isolated bridge network.

Backend communicates with PostgreSQL using:

```
DB_HOST=postgres
```

---

# Common Commands

Build

```bash
docker compose build
```

Start

```bash
docker compose up
```

Detached

```bash
docker compose up -d
```

Stop

```bash
docker compose down
```

Restart

```bash
docker compose restart
```

Logs

```bash
docker compose logs -f
```

Remove Volumes

```bash
docker compose down -v
```

---

# Troubleshooting

## Port Already In Use

Backend

```bash
sudo lsof -i :5000
```

Database

```bash
sudo lsof -i :5432
```

---

## Database Connection Refused

Verify PostgreSQL container.

```bash
docker compose ps
```

View logs.

```bash
docker compose logs postgres
```

---

## Docker Build Failure

Rebuild without cache.

```bash
docker compose build --no-cache
```

---

## Reset Everything

```bash
docker compose down -v

docker system prune
```

---

# Production Notes

The Docker image includes:

- Multi-stage builds
- Production dependencies only
- Non-root runtime user
- Layer caching
- Health checks
- Persistent PostgreSQL storage

This setup mirrors the production deployment environment.
