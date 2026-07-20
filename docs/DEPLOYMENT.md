# 🚀 Deployment Guide

This document describes how to deploy the Expense Tracker API to production using Render.

---

# Overview

Production Architecture

```
GitHub
    │
    ▼
GitHub Actions
    │
    ▼
Render
    │
    ▼
Express API
    │
    ▼
Neon PostgreSQL
```

---

# Prerequisites

- GitHub Repository
- Render Account
- PostgreSQL Database
- Dockerfile
- GitHub Actions

---

# Create PostgreSQL

1. Login to Render.
2. New → PostgreSQL.
3. Create a database.

Save the following values:

- Host
- Port
- Database
- Username
- Password

---

## Database Migrations

When deploying a new version that changes the schema:

```bash
npm run db:migrate
```

or

```bash
npm run db:push
```

depending on the deployment workflow.

---

# Create Web Service

Render

↓

New

↓

Web Service

↓

Connect GitHub

↓

Select repository

---

# Build Configuration

Environment

```
Docker
```

Branch

```
main
```

Dockerfile

```
Dockerfile
```

---

# Environment Variables

Configure the following variables.

| Variable     | Required |
| ------------ | -------- |
| PORT         | Yes      |
| NODE_ENV     | Yes      |
| JWT_SECRET   | Yes      |
| DATABASE_URL | Yes      |
| CORS_ORIGIN  | Yes      |

Example

```env
NODE_ENV=production

PORT=5000

JWT_SECRET=your_secret

DATABASE_URL=postgresql://username:password@ep-xxxxx.neon.tech/expense_tracker_db?sslmode=require

CORS_ORIGIN=https://your-frontend.vercel.app
```

---

# Deploy

Render automatically builds the Docker image.

Deployment flow

```
Git Push

↓

GitHub

↓

Render Build

↓

Docker Build

↓

Container Starts

↓

Health Check

↓

Deployment Complete
```

---

# Verify Deployment

API

```
https://your-api.onrender.com
```

Swagger

```
https://your-api.onrender.com/api-docs
```

Health

```
https://your-api.onrender.com/api/v1/health
```

---

# Health Checks

Health endpoint

```
GET /api/v1/health
```

Expected response

```json
{
  "success": true,
  "message": "API is healthy"
}
```

---

# Logging

View logs directly from the Render dashboard.

Logs include:

- Server startup
- Database connection
- Incoming requests
- Errors
- Graceful shutdown

---

# Automatic Deployments

Every merge into **main** automatically triggers a new deployment.

Development workflow

```
feature/*
        │
        ▼
develop
        │
        ▼
main
        │
        ▼
Render
```

---

# Troubleshooting

## Application Failed to Start

Verify:

- Environment variables
- Dockerfile
- Database credentials

---

## Database Connection Failed

Verify:

- DB_HOST
- DB_PORT
- DB_USER
- DB_PASSWORD

---

## CORS Errors

Ensure

```
CORS_ORIGIN
```

matches the frontend domain exactly.

---

## Build Failed

Review:

- Docker build logs
- GitHub Actions
- Render build logs

---

## Health Check Failed

Verify

```
GET /api/v1/health
```

returns HTTP 200.

---

# Production Checklist

Before releasing:

- Docker builds successfully
- GitHub Actions passing
- PostgreSQL connected
- Swagger accessible
- Health endpoint healthy
- Environment variables configured
- Graceful shutdown implemented
- CORS configured
- Logging enabled

---

# Future Improvements

Future production enhancements:

- HTTPS Custom Domain
- Rate Limiting Improvements
- Security Headers
- Compression
- Request IDs
- Redis Cache
- Monitoring
- Metrics
- AWS Deployment
