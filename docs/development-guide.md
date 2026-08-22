# Development Guide

## Code Quality

Both `client` and `server` use ESLint and Prettier.

Before pushing:

```bash
npm run lint
npm run format:check
```

To format:

```bash
npm run format
```

## Architecture Rules

1. Use TypeScript.
2. Keep feature-specific code inside its feature/module.
3. Use the shared `ApiResponse<T>` response shape.
4. Backend authorization is the real security boundary.
5. Frontend ProtectedRoute is for route protection and user experience.
6. Do not commit `.env` or `node_modules`.
7. Avoid unnecessary changes to shared application/configuration files.

## Git Workflow

```text
main
  |
develop
  |
feature/<your-feature>
```

Flow:

```text
feature branch -> Pull Request -> develop -> testing -> main
```
