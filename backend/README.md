# WalletRep Backend (MVP)

WalletRep is a **wallet reputation and risk-scoring backend** designed to provide **simple, explainable, deterministic** wallet scores based on on-chain heuristics. This MVP focuses on correctness, clarity, and reproducibility — **no AI, no black boxes**.

---

## ✨ Features (MVP)

- 🔢 **0–100 wallet risk score**
- 🏷️ Human-readable risk labels
- 🧠 Deterministic & explainable heuristics
- ⚡ Fastify API
- 🗄️ PostgreSQL + Prisma ORM
- 🧪 Ready for batch scoring & CSV uploads

---

## 🧱 Tech Stack

| Layer        | Tool                  |
|--------------|-----------------------|
| Runtime      | Node.js (20+ recommended) |
| API          | Fastify               |
| Database     | PostgreSQL            |
| ORM          | Prisma (v6)           |
| Language     | TypeScript            |
| Package Mgr  | pnpm                  |

---

## 🚀 Quick Start (Local)

### 1️⃣ Clone the Repository
```bash
git clone git@github.com:<your-username>/walletrep-backend.git
cd walletrep-backend
```

### 2️⃣ Install Dependencies
```bash
pnpm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the project root:
```env
DATABASE_URL="postgresql://walletrep_user:walletrep_pass@localhost:5432/walletrep"
PORT=3000
```
> ⚠️ `.env` is intentionally git-ignored.

### 4️⃣ Set Up PostgreSQL
Install and start PostgreSQL:
```bash
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

Create the database and user:
```bash
sudo -i -u postgres
psql
```
Within `psql`:
```sql
CREATE DATABASE walletrep;
CREATE USER walletrep_user WITH PASSWORD 'walletrep_pass';
ALTER DATABASE walletrep OWNER TO walletrep_user;
ALTER USER walletrep_user CREATEDB;
```
Exit:
```sql
\q
exit
```

### 5️⃣ Run Prisma Migrations
```bash
pnpm exec prisma migrate dev --name init
```
**Optional database UI:**
```bash
pnpm exec prisma studio
```

### 6️⃣ Start the API Server
```bash
pnpm exec tsx src/server.ts
```
Server runs at: [http://localhost:3000](http://localhost:3000)

---

## 🔍 Health Check
Verify API + database connectivity:
```bash
curl http://localhost:3000/health
```
**Expected response:**
```json
{
  "status": "ok",
  "db": "ok"
}
```

---

## 📁 Project Structure
```
src/
  app.ts            # Fastify app configuration
  server.ts         # Server bootstrap
  routes/
    health.ts       # Health check endpoint
    score.ts        # Wallet scoring endpoint
  core/
    scoringRules.ts # Scoring heuristics
    riskEngine.ts   # Score calculation logic
    tags.ts         # Risk tags
  providers/        # On-chain / indexer providers
  utils/
    prisma.ts       # Prisma singleton
    env.ts
tests/
prisma/
  schema.prisma
```

---

## 🧠 Scoring Philosophy (MVP)
- **Deterministic** — same wallet always yields the same score
- **Explainable** — every score has clear reasons
- **No AI / ML**
- Built on transparent heuristics such as:
  - Wallet age
  - Transaction activity
  - Interaction patterns
  - Known risk signals

---

## 🗺️ Roadmap
- `/score` endpoint (single address)
- CSV batch scoring
- Address tagging & explanations
- Project / dashboard views
- API keys & rate limiting

---