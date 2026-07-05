# Contributing

Thank you for your interest in contributing!

## Development Workflow

1. Create a feature branch

```bash
git checkout develop
git checkout -b feature/feature-name
```

2. Make your changes.

3. Run checks.

```bash
npm run typecheck
```

4. Commit using Conventional Commits.

Examples:

```
feat: add transaction creation endpoint

fix: resolve JWT validation bug

refactor: simplify repository queries
```

5. Push your branch.

```bash
git push origin feature/feature-name
```

6. Open a Pull Request targeting `develop`.

---

## Coding Standards

- Use TypeScript strict mode.
- Follow Controller → Service → Repository architecture.
- Validate all request bodies with Zod.
- Never expose sensitive information.
- Keep business logic inside services.
- Keep repositories responsible only for database operations.

---

## Branches

- main
- develop
- feature/\*
