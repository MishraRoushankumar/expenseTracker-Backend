# Security Policy

## Supported Versions

The following versions are currently supported with security updates.

| Version | Supported |
| ------- | :-------: |
| 1.8.x   |    ✅     |
| < 1.8   |    ❌     |

---

## Reporting a Vulnerability

If you discover a security vulnerability, please **do not open a public GitHub Issue**.

Instead, report it privately by contacting the project maintainer.

Include the following information:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested mitigation (if known)

---

## Response Timeline

The project aims to:

- Acknowledge reports within **72 hours**
- Investigate confirmed vulnerabilities promptly
- Release a fix as soon as practical depending on severity

Please note that response times may vary as this is currently a maintained personal project.

---

## Scope

This policy applies to:

- REST API
- Authentication
- Authorization
- Database interactions
- Docker configuration
- CI/CD workflows
- Third-party dependency vulnerabilities

---

## Security Best Practices

When deploying this project:

- Never commit secrets or credentials.
- Use strong JWT secrets.
- Configure HTTPS in production.
- Keep dependencies up to date.
- Restrict database access.
- Store environment variables securely.

---

## Responsible Disclosure

Please allow time for the vulnerability to be investigated and resolved before publicly disclosing any details.

Responsible disclosure helps protect users of the project while a fix is being developed.

Thank you for helping improve the security of this project.
