# Role Based Access Control

Roles

```
Admin
Maintainer
User
```

---

Hierarchy

```
Admin

↓

Maintainer

↓

User
```

---

Permissions

| Action       | Admin | Maintainer | User |
| ------------ | ----- | ---------- | ---- |
| Update Roles | ✓     | ✗          | ✗    |
| Delete User  | ✓     | ✓\*        | ✗    |

Maintainer may delete only normal users.

---

Role Priority

```
admin = 3

maintainer = 2

user = 1
```

Authorization rule

```
requesterPriority > targetPriority
```
