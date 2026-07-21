# Security Policy

Thank you for taking the time to help improve the security of **Expense Tracker Backend**.

The security of this project is taken seriously. If you discover a potential vulnerability, please report it responsibly so it can be investigated and resolved before public disclosure.

---

# Supported Versions

The following versions currently receive security updates.

| Version | Supported |
| ------- | :-------: |
| 1.8.x   |    ✅     |
| < 1.8   |    ❌     |

---

# Reporting a Vulnerability

If you believe you have discovered a security vulnerability, **please do not create a public GitHub Issue**.

Instead, report the issue privately to the project maintainer.

Include the following information whenever possible:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Proof of concept (if available)
- Suggested mitigation (optional)

Providing complete information helps investigate and resolve the issue more efficiently.

---

# Response Process

The project aims to follow the process below:

1. Acknowledge the report.
2. Investigate and validate the vulnerability.
3. Develop and verify a fix.
4. Release a patched version if required.
5. Publicly disclose the issue after a fix becomes available.

Please note that response times may vary since this is currently maintained by a single developer.

---

# Security Best Practices

When deploying this project:

- Never commit secrets or credentials.
- Store environment variables securely.
- Use strong JWT secrets.
- Enable HTTPS in production.
- Restrict database access.
- Keep dependencies up to date.
- Regularly review application logs.
- Apply security updates promptly.

---

# Scope

This policy applies to:

- REST API
- Authentication
- Authorization
- Database interactions
- Docker configuration
- CI/CD workflows
- Third-party dependencies

---

# Responsible Disclosure

Please avoid publicly disclosing security vulnerabilities until they have been investigated and resolved.

Responsible disclosure helps protect users while a security update is being prepared.

---

# Thank You

Thank you for helping make **Expense Tracker Backend** more secure.
