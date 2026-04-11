# Node.js TypeScript REST API Template

Template backend REST API berbasis **Node.js + TypeScript** dengan **Hybrid Arsitecture Monolith** (controller–service–repository-database), siap untuk **development, testing, dan production** menggunakan **Docker**.

---

## Tech Stack

* **Language**: TypeScript
* **HTTP Framework**: Express
* **ORM**: Prisma
* **Database**: Postgres
* **Cache**: Redis
* **Validation**: Zod
* **Logging**: Winston
* **Testing**: Jest, Babel, Supertest

---

## Prerequisites

Pastikan tools berikut sudah terinstall:

* Node.js **v18+**
* Docker & Docker Compose
* Postgres / MySql
* Redis

---

## Setup & Run (LOCAL)

### 1. Clone Repository

```bash
git clone https://github.com/Tooomat/node-template-hybrid-arsitecture.git
cd node-template-hybrid-arsitecture
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup Environment Variables

Salin file environment contoh:

```bash
cp .env.example .env.development
cp .env.example .env.test
cp .env.example .env.production
```

Lalu sesuaikan isi `.env` terutama:

* `DATABASE_URL`
* `DB_*`
* `REDIS_*`
* `JWT_*`

---

### 4. Prisma Migration (LOCAL)
 
```bash
npm run prisma:migrate:dev
npm run prisma:generate:dev
```

### 5. Seeder (LOCAL)

```bash
npm run prisma:seed:dev
```
---

### 6. Run App (LOCAL)

#### DEVELOPMENT (Hot Reload)

```bash
npm run dev
```

### Testing

- migrate and generate
```bash
npm run prisma:migrate:test
npm run prisma:generate:test
```
- seed to test
```bash
npm run prisma:seed:test
```

- run 
```bash
npm run test
```

Test file tertentu:

```bash
npm run test -- test/auth.login.test.ts
```
---

## Running with DOCKER

- DEVELOPMENT

#### Build Services

```bash
docker compose --env-file .env.development -f docker-compose.dev.yml up -d --build 
```

atau simple:
```bash
docker compose -f docker-compose.dev.yml up -d --build 
```

Atau via npm:
```bash
npm run dev:docker:up
```

#### Prisma migrate (DEV Docker)

```bash
docker exec -it app-dev npx prisma migrate dev
```

#### Generate Prisma
```bash
docker exec -it app-dev npx prisma generate 
```

#### Prisma seeder Dev

```bash
docker exec app-dev npm run prisma:seed:dev
```

#### Restart & Remove Container

```bash
npm run dev:docker:down
```

⚠️ **Hapus data + volume**:

```bash
npm run dev:docker:down:volume
```

#### Run Services
```bash
npm run dev:docker:start
```

#### Stop container

```bash
npm run dev:docker:stop
```

---

- TESTING (Jest + Prisma + Docker)

```bash
docker compose --env-file .env.test -f docker-compose.test.yml up --abort-on-container-exit
```

Proses ini akan:

* Menjalankan Postgres & Redis test
* Menjalankan Prisma migration
* Menjalankan Jest test
* Otomatis stop container

Via npm:

```bash
npm run test:docker:up
```

#### remove container test
```bash
npm run test:docker:down:volume
```
---

- PRODUCTION (Docker)

1. Build Image

```bash
docker build -t serba-backend:latest .
```
atau build version:

```bash
docker build -t serba-backend:1.0.0 .
```

2. Run Container

```bash
docker run -d --name serba-backend --env-file .env.production -p 8080:8080 --restart unless-stopped serba-backend:latest
```
--restart unless-stopped untuk:

* server reboot → container auto hidup lagi

---

### Production (Docker Compose – Server)

1. Run Services
```bash
docker compose --env-file .env.production -f docker-compose.prod.yml up -d
```

2. check status
```bash
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f app
```
3. Prisma Migration (kalau tidak otomatis)
```bash
docker compose -f docker-compose.prod.yml exec app npx prisma migrate deploy
```
4. Prisma seeder prod

```bash
docker exec -it app-prod npm run prisma:seed:prod
```

5. Restart container (tanpa hapus data)
```bash
docker compose -f docker-compose.prod.yml restart app
```

6. Update Deployment Flow
```bash
git pull
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d
docker compose -f docker-compose.prod.yml exec app npx prisma migrate deploy
```
---
