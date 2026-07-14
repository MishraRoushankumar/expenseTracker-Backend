# Contributing

Thank you for your interest in contributing to the Expense Tracker Backend.

This document describes the development workflow, coding standards, and pull request process.

---

# Development Process

1. Fork the repository.
2. Clone your fork.
3. Create a feature branch.
4. Make your changes.
5. Verify code quality.
6. Open a Pull Request.

---

# Branch Naming

Use descriptive branch names.

Examples:

```text
feature/authentication

feature/testing

feature/docker

fix/login-validation

refactor/logger

docs/readme-refresh
```

---

# Commit Convention

Follow Conventional Commits.

Examples:

```text
feat(auth): implement refresh tokens

fix(categories): validate category ownership

docs(readme): refresh project overview

refactor(logger): simplify logger configuration

test(auth): add login integration tests

chore(eslint): configure ESLint
```

---

# Development Checklist

Before committing, ensure the following commands succeed.

Format code

```bash
npm run format
```

Lint

```bash
npm run lint
```

Type check

```bash
npm run typecheck
```

Run tests

```bash
npm run test:run
```

---

# Coding Standards

Please follow the project coding standards.

General guidelines:

- Write readable code.
- Prefer small functions.
- Keep modules focused.
- Avoid duplication.
- Use TypeScript types instead of `any`.
- Use parameterized SQL queries.
- Validate input with Zod.
- Handle errors consistently.

See:

```text
docs/CODING_STANDARDS.md
```

---

# Pull Requests

Each Pull Request should:

- Have a clear title.
- Focus on a single concern.
- Include a concise description.
- Update documentation when required.
- Pass all quality checks.

---

# Pull Request Checklist

Before opening a Pull Request:

- [ ] Code is formatted.
- [ ] ESLint passes.
- [ ] TypeScript passes.
- [ ] Tests pass.
- [ ] Documentation updated (if applicable).
- [ ] Changelog updated (if applicable).

---

# Code Review

Reviews focus on:

- Correctness
- Readability
- Maintainability
- Performance
- Security
- Consistency

Feedback is expected to be constructive and respectful.

---

# Reporting Issues

When opening an issue, include:

- Description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details

---

# Documentation

Useful references:

- `README.md`
- `ARCHITECTURE.md`
- `docs/API.md`
- `docs/DEVELOPMENT_GUIDE.md`
- `docs/CODING_STANDARDS.md`

---

# Thank You

Thank you for taking the time to contribute.

Every improvement—whether it's code, documentation, tests, or bug fixes—helps make the project better.
