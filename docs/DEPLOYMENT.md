# Deployment

## Requirements

- Node.js
- PostgreSQL

---

Install

```bash
npm install
```

---

Configure

```bash
cp .env.example .env
```

---

Database

```sql
\i src/db/init.sql
```

---

Run

```bash
npm run dev
```

---

Build

```bash
npm run build
```
