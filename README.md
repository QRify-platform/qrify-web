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
