# 🚀 Preorder Manager – Enterprise Full-Stack Application

## 📋 Submission Information

**Submitted to:** assessment@xubitar.com  
**Project:** Preorder Manager  
**Date:** June 2026  

### Contact Information
- **Name:** [Your Full Name]
- **Phone:** [Your Phone Number]
- **Email:** [Your Email Address]
- **GitHub:** [Your GitHub Repository URL]

---

## 📖 Table of Contents

1. [Project Overview](#-project-overview)
2. [Architecture & Technology Stack](#-architecture--technology-stack)
3. [Features Implemented](#-features-implemented)
4. [Project Structure](#-project-structure)
5. [Setup & Installation](#-setup--installation)
6. [Running the Application](#-running-the-application)
7. [Testing the Application](#-testing-the-application)
8. [API Documentation](#-api-documentation)
9. [Deployment](#-deployment)
10. [Troubleshooting](#-troubleshooting)
11. [Submission Checklist](#-submission-checklist)

---

## 🎯 Project Overview

**Preorder Manager** is a full-stack web application designed to manage product preorders efficiently. Built with modern architectural patterns, it demonstrates:

- Clean separation of concerns (frontend/backend separation)
- Type-safe development with TypeScript
- Server-side pagination, filtering, and sorting
- Responsive UI matching provided design specifications (UI-1, UI-2, UI-3)
- Enterprise-grade code structure and maintainability

---

## 🏗️ Architecture & Technology Stack

### Backend (NestJS + Prisma)
```yaml
Framework: NestJS 10+
ORM: Prisma 7 (with SQLite adapter)
Database: SQLite (development) / PostgreSQL (production-ready)
Validation: Class-validator + Class-transformer
API Style: RESTful
```

### Frontend (Next.js + React Query)
```yaml
Framework: Next.js 16 (App Router)
State Management: React Query 5+
Forms: React Hook Form + Zod
Styling: Tailwind CSS
Type Safety: TypeScript 5+
```

### Infrastructure
```yaml
Package Manager: Yarn Workspaces (Monorepo)
Version Control: Git
Development: Turbopack (Next.js) + Watch Mode (NestJS)
```

---

## ✨ Features Implemented

### ✅ Core Features (All Requirements Met)

| Feature | Status | Description |
|---------|--------|-------------|
| **Preorder List** | ✅ Complete | Displays all preorders with pagination |
| **Filtering** | ✅ Complete | All, Active, Inactive (server-side) |
| **Sorting** | ✅ Complete | Name, Created At, Starts At, Ends At (server-side) |
| **Pagination** | ✅ Complete | 8 items per page with navigation |
| **Status Toggle** | ✅ Complete | Active/Inactive toggle with visual feedback |
| **Delete Preorder** | ✅ Complete | Confirmation dialog + immediate UI update |
| **Create Preorder** | ✅ Complete | Full form with validation |
| **Update Preorder** | ✅ Complete | Pre-filled form with validation |
| **Row Selection** | ✅ Complete | Checkbox for individual selection |
| **Select All** | ✅ Complete | Header checkbox selects/deselects all rows |
| **Loading States** | ✅ Complete | Skeleton loading + spinner |
| **Error Handling** | ✅ Complete | Graceful error messages with retry |

---

## 📁 Project Structure

```
preorder-manager/
├── backend/                              # NestJS Backend
│   ├── src/
│   │   ├── main.ts                       # Application entry point
│   │   ├── app.module.ts                 # Root module
│   │   ├── prisma/
│   │   │   ├── prisma.module.ts          # Prisma module
│   │   │   └── prisma.service.ts         # Prisma client service
│   │   └── preorder/                     # Preorder domain module
│   │       ├── dto/                      # Data Transfer Objects
│   │       │   ├── create-preorder.dto.ts
│   │       │   ├── update-preorder.dto.ts
│   │       │   └── filter-preorder.dto.ts
│   │       ├── preorder.controller.ts    # REST endpoints
│   │       ├── preorder.service.ts       # Business logic
│   │       └── preorder.module.ts        # Domain module
│   ├── prisma/
│   │   ├── schema.prisma                 # Database schema
│   │   ├── seed.ts                       # Seed script
│   │   └── migrations/                   # Migration files
│   ├── prisma.config.ts                  # Prisma 7 configuration
│   ├── package.json
│   ├── tsconfig.json
│   └── nest-cli.json
│
├── frontend/                             # Next.js Frontend
│   ├── src/
│   │   ├── app/                          # App Router
│   │   │   ├── page.tsx                  # Preorder List page
│   │   │   ├── layout.tsx                # Root layout
│   │   │   ├── providers.tsx             # Global providers
│   │   │   ├── create/                   # Create page
│   │   │   │   └── page.tsx
│   │   │   └── preorders/
│   │   │       └── [id]/
│   │   │           └── edit/
│   │   │               └── page.tsx      # Update page
│   │   ├── features/                     # Feature-based modules
│   │   │   └── preorders/
│   │   │       ├── components/           # Feature components
│   │   │       ├── hooks/                # Custom hooks
│   │   │       ├── services/             # API services
│   │   │       ├── schemas/              # Validation schemas
│   │   │       ├── types/                # Type definitions
│   │   │       └── constants/            # Feature constants
│   │   └── shared/                       # Shared code
│   │       ├── components/               # Shared UI components
│   │       ├── hooks/                    # Shared hooks
│   │       ├── lib/                      # Utilities
│   │       ├── types/                    # Shared types
│   │       ├── constants/                # Shared constants
│   │       └── utils/                    # Helper functions
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   └── tailwind.config.js
│
├── package.json                          # Root (Yarn Workspaces)
├── .gitignore                            # Git ignore rules
└── README.md                             # This file
```

---

## 🛠️ Setup & Installation

### Prerequisites

```bash
Node.js: 18+ 
Yarn: 1.22+
Git: Latest version
```

### Step 1: Clone the Repository

```bash
git clone [your-repository-url]
cd preorder-manager
```

### Step 2: Install Dependencies

```bash
# Install all dependencies (root + workspaces)
yarn install
```

### Step 3: Configure Environment Variables

#### Backend Environment (`backend/.env`)

```env
# Database connection - SQLite
DATABASE_URL="file:./dev.db"
```

#### Frontend Environment (`frontend/.env.local`)

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Step 4: Set Up Database

```bash
# Navigate to backend
cd backend

# Generate Prisma client
yarn prisma generate

# Run migrations to create database schema
yarn prisma migrate dev --name init

# Seed the database with sample data
yarn prisma db seed

# Return to root
cd ..
```

### Step 5: Verify Database (Optional)

```bash
# Open Prisma Studio to view data
cd backend
npx prisma studio
# Opens at http://localhost:5555
```

---

## 🚀 Running the Application

### Development Mode (Both Services)

```bash
# From the root directory
yarn dev
```

This starts both services concurrently:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:4000
- **Prisma Studio:** http://localhost:5555 (if running)

### Individual Services

#### Backend Only
```bash
cd backend
yarn start:dev
# Runs on http://localhost:4000
```

#### Frontend Only
```bash
cd frontend
yarn dev
# Runs on http://localhost:3000
```

### Production Build

```bash
# Build backend
cd backend
yarn build
yarn start:prod

# Build frontend (in another terminal)
cd frontend
yarn build
yarn start
```

---

## 🧪 Testing the Application

### Test Backend API with cURL

```bash
# Get all preorders
curl http://localhost:4000/preorders

# Get preorders with filters
curl "http://localhost:4000/preorders?filter=active&sortBy=name&sortOrder=asc&page=1&limit=8"

# Create a preorder
curl -X POST http://localhost:4000/preorders \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Preorder",
    "products": 5,
    "preorderWhen": "regardless_of_stock",
    "startsAt": "2026-12-15T20:24:00.000Z",
    "endsAt": "2026-12-20T20:24:00.000Z",
    "status": true
  }'

# Toggle status
curl -X PATCH http://localhost:4000/preorders/[id]/toggle-status
```

### Test Frontend

1. Open http://localhost:3000
2. Verify preorders are displayed
3. Test filtering (All, Active, Inactive)
4. Test sorting (Name, Created At, Starts At, Ends At)
5. Test pagination (Previous, Next, Page numbers)
6. Create a new preorder
7. Edit an existing preorder
8. Toggle status
9. Delete a preorder

---

## 📚 API Documentation

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/preorders` | List preorders (with filters, sorting, pagination) |
| `POST` | `/preorders` | Create a new preorder |
| `GET` | `/preorders/:id` | Get a specific preorder |
| `PUT` | `/preorders/:id` | Update a preorder |
| `DELETE` | `/preorders/:id` | Delete a preorder |
| `PATCH` | `/preorders/:id/toggle-status` | Toggle active/inactive status |

### Query Parameters

| Parameter | Type | Options | Default |
|-----------|------|---------|---------|
| `filter` | string | `all`, `active`, `inactive` | `all` |
| `sortBy` | string | `name`, `createdAt`, `startsAt`, `endsAt` | `createdAt` |
| `sortOrder` | string | `asc`, `desc` | `desc` |
| `page` | number | 1+ | 1 |
| `limit` | number | 1-100 | 8 |

---

## 🌐 Deployment

### Option 1: Deploy to Vercel (Frontend) + Render (Backend)

#### Backend (Render)
```bash
# 1. Push code to GitHub
# 2. Go to render.com and create a new Web Service
# 3. Connect your GitHub repository
# 4. Set build command: yarn install && yarn build
# 5. Set start command: yarn start
# 6. Add environment variables
```

#### Frontend (Vercel)
```bash
# 1. Push code to GitHub
# 2. Go to vercel.com and import your repository
# 3. Set environment variable:
#    NEXT_PUBLIC_API_URL=https://your-backend-url.com
# 4. Deploy
```

### Option 2: Deploy with Docker

```dockerfile
# Backend Dockerfile (backend/Dockerfile)
FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
EXPOSE 4000
CMD ["yarn", "start"]
```

```dockerfile
# Frontend Dockerfile (frontend/Dockerfile)
FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]
```

---

## 🔧 Troubleshooting

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| **Port 3000 already in use** | Frontend will auto-select port 3001 |
| **Port 4000 already in use** | Change port in `backend/src/main.ts` |
| **Database connection error** | Check `DATABASE_URL` in `backend/.env` |
| **Prisma client not found** | Run `yarn prisma generate` in backend |
| **CORS error** | Ensure backend has CORS enabled in `main.ts` |
| **API not responding** | Check both services are running |
| **Sorting not working** | Check backend logs and console logs |
| **Date format error** | Use ISO-8601 format for dates |

### Debugging Commands

```bash
# Check backend logs
cd backend && yarn start:dev

# Check frontend logs
cd frontend && yarn dev

# Check database
cd backend && npx prisma studio

# Reset database
cd backend && npx prisma migrate reset
```

---

## ✅ Submission Checklist

Before submitting, please verify:

- [ ] Backend runs without errors (`yarn start:dev`)
- [ ] Frontend runs without errors (`yarn dev`)
- [ ] All preorders are displayed on the list page
- [ ] Filtering works (All, Active, Inactive)
- [ ] Sorting works (Name, Created At, Starts At, Ends At)
- [ ] Pagination works (8 items per page)
- [ ] Create preorder works
- [ ] Update preorder works (pencil icon)
- [ ] Status toggle works
- [ ] Delete works (with confirmation)
- [ ] Row selection checkboxes work
- [ ] "Select All" checkbox works
- [ ] UI matches the provided designs
- [ ] Code is clean and well-organized

---

## 📞 Support

For questions or clarifications:
- **Email:** assessment@xubitar.com
- **Subject:** Preorder Manager Assessment - [Your Name]

---

## 📄 License

MIT License - Feel free to use, modify, and distribute.

---

**Built with ❤️ by Fuad Hossain** | *Version 1.0.0*