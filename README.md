# 🧩 CMS Backend

This is the backend service for the CMS project — built with **Node.js**, **TypeScript**, and **PostgreSQL**.  
The app runs inside Docker for an easy and consistent setup across environments.

---

## 🚀 Prerequisites

Before running the project, make sure you have:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## ⚙️ Environment Variables

The project uses environment variables defined in the Docker setup.  
Default values are already configured inside the `Dockerfile` and `docker-compose.yml`.

You can also create a `.env` file at the root for local overrides if needed:
```env
DATABASE_URL=postgres://root:password@cms-database:5432/cmsdb
PORT=4000
JWT_SECRET=your_super_secret_jwt_key
BCRYPT_SALT_ROUNDS=10
NODE_ENV=development
```

---

## 🏗️ Build and Run with Docker Compose

### 1. Build the containers
```bash
docker compose build
```

### 2. Start the containers
```bash
docker compose up
```

This will:
- Build the Node.js app (TypeScript → JavaScript)
- Start the backend on **http://localhost:3000**
- Run a PostgreSQL database container (`cms-database`)

---

## 🧠 Useful Commands

### Stop all containers
```bash
docker compose down
```

### Rebuild without cache
```bash
docker compose build --no-cache
```

### View container logs
```bash
docker compose logs -f
```

---

## 🧪 API Access

After running:
```bash
docker compose up
```

You can access the API at:
```
http://localhost:3000/api
```

---

## 🧑‍💻 Author

**Nurul Islam**  
[GitHub Repository](https://github.com/nurulislam-ot/cms-backend)
