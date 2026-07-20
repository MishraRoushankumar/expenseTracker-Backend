# Drizzle ORM Guide

## Why Drizzle

- Type-safe SQL
- PostgreSQL-first
- Lightweight
- Great TypeScript support
- Zero runtime reflection

---

## Folder Structure

src/db/

connection.ts

schema/

migrations/

index.ts

---

## Commands

npm run db:generate

npm run db:migrate

npm run db:push

npm run db:studio

---

## Query Example

```ts
const user = await db.select().from(users).where(eq(users.id, id));
```

---

## Migrations

Generate:

```bash
npm run db:generate
```

Apply:

```bash
npm run db:migrate
```

Push schema:

```bash
npm run db:push
```

Studio:

```bash
npm run db:studio
```
