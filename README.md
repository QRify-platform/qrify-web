# QRify Web

**QRify Web** is the frontend application of **QRify** — a sleek, modern interface that allows users to generate and preview QR codes from any URL

This frontend is built with **Next.js** and styled to reflect a polished SaaS experience. It connects to a FastAPI-based backend to handle QR code generation and stores images in the cloud.

<img width="1512" height="945" alt="Screenshot 2026-07-23 at 8 56 53 PM" src="https://github.com/user-attachments/assets/ebd8c4e4-dbeb-4c22-a4f8-e629c72dc5b8" />
---
## 🚀 Features

- 🧠 Clean and intuitive interface  
- 🔗 URL input with live QR code generation  
- 📸 QR code preview and download  
- ⚡ Built with modern, performant frontend tech  
- 📱 Fully responsive design  

---

## 🛠 Tech Stack

| Tech              | Description                                          |
|-------------------|------------------------------------------------------|
| **Next.js**       | React framework for building SSR/SPAs               |
| **Axios**         | Handles HTTP requests to the FastAPI backend        |
| **Cloud Storage** | Fetches QR code images from presigned S3 URLs       |
| **Prometheus**    | Collects frontend performance & custom metrics       |


---

## 📁 Project structure

A component lives next to the route that uses it, and only moves to
`components/` once a second route needs it.

```
src/
  app/                    Routes, plus the components each route owns
    (home)/               Route group — organizes files without touching the URL
      page.tsx
      _components/        Hero, TypesBento, HowItWorks, UseCases, HomeCta
    generate/
      page.tsx
      _components/        Generator, GeneratorForm, QrTypePicker
        fields/           One file per QR type (LinkFields, WifiFields…)
        preview/          Preview states (empty, loading, result)
    my-codes/  login/  signup/  auth/callback/
      page.tsx + _components/
    api/                  Route handlers (config, health, metrics)

  components/             Only what more than one route uses
    ui/                   Design-system primitives (Button, TextField, Alert…)
    layout/               Navbar, Footer, and the chrome around every page
    auth/                 Shared by login and signup (AuthShell, GoogleButton…)
    icons/

  hooks/                  All client state and side effects (use* files)
  lib/                    Framework-free logic
    api/                  HTTP calls to the FastAPI backend
    auth/                 Cognito password auth, Google OAuth, session storage
    qr/                   Payload building and field validation
    utils/                Small standalone helpers
  types/                  Shared domain types — no runtime code
  constants/              Static data (routes, QR catalog, nav links) — no logic
```

### Conventions

- **Colocate first.** Page-specific UI goes in that route's `_components/`.
  The `_` prefix tells Next.js the folder is not a route. Promote a component
  to `components/` only when a second route imports it.
- **One component per file.** If a file exports two components, split it.
- **Components render, hooks decide.** Anything with `useState` or `useEffect`
  belongs in `hooks/`, so components stay readable top to bottom.
- **Types shared across files live in `types/`.** A component's own `Props`
  type stays in that component's file.
- **`lib/api`, `lib/auth`, and `lib/qr` are modules with a public API.**
  Import them from the folder (`@/lib/auth`), not from a file inside it.
  `lib/utils` holds unrelated helpers, so import those by exact path.
- **Dependencies flow one way:** `app` → `components` → `hooks` → `lib` →
  `constants`/`types`. Nothing lower ever imports from something higher.

---

## 🔄 CI/CD (GitHub Actions)

Every push to `main` triggers the following actions:

1. **Builds the Docker image** for the frontend using the current commit SHA.
2. **Pushes the image** to AWS Elastic Container Registry (ECR).
3. **Updates the image tag** in the `cluster-state` repo’s `values.dev.yaml` file.
4. **Commits the updated tag** and pushes the change back to the `cluster-state` repository to trigger downstream Kubernetes deployments.

> All of this is automated through reusable composite actions maintained in the [`github-actions`](https://github.com/QRify-platform/github-actions) repo.

---

## 📦 Getting Started

### Installation

```bash
npm install
npm run dev
