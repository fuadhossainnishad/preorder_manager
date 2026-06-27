# 🚀 Preorder Manager – Enterprise-Grade Full-Stack Application

## Overview

Preorder Manager is a production-ready, full-stack application designed to manage product preorders with precision and scalability. Built with modern architectural patterns, it demonstrates clean separation of concerns, type safety, and maintainable code structures suitable for enterprise environments.

### Key Highlights

- **Monorepo Architecture** using Yarn Workspaces
- **Backend**: NestJS with Prisma ORM and SQLite (easily swappable with PostgreSQL/MySQL)
- **Frontend**: Next.js 16 with React Query for state management
- **Type Safety**: End-to-end TypeScript with shared types
- **Performance**: Server-side pagination, filtering, and sorting
- **Developer Experience**: Hot reloading, type checking, and clean DX

---

## Architecture Decision Record (ADR)

### Why Monorepo?
We chose a monorepo approach to:
- **Maintain Single Source of Truth** for shared types and utilities
- **Simplify Dependency Management** with Yarn Workspaces
- **Enable Atomic Commits** across frontend and backend
- **Facilitate Code Reuse** and consistency

### Why NestJS + Prisma?
- **NestJS** provides opinionated, modular architecture with built-in dependency injection
- **Prisma** offers type-safe database access with excellent developer experience
- The combination ensures maintainable, testable, and scalable backend services

### Why Next.js + React Query?
- **Next.js** delivers server-side rendering capabilities and optimal performance
- **React Query** manages server state with caching, automatic refetching, and optimistic updates
- Both work in harmony for a responsive, data-driven UI

---

## Technology Stack

### Backend (NestJS)
```
✓ NestJS 10+ (Modular Architecture)
✓ Prisma 7+ (Type-safe ORM)
✓ SQLite (Development) / PostgreSQL (Production-ready)
✓ Class-validator + Class-transformer (DTO Validation)
✓ Prisma Adapter (Better-SQLite3 for production-grade performance)
```

### Frontend (Next.js)
```
✓ Next.js 16 (App Router)
✓ React Query 5+ (Server State Management)
✓ React Hook Form + Zod (Form Validation)
✓ Tailwind CSS (Utility-first Styling)
✓ TypeScript 5+ (Strict Mode)
```

### Infrastructure
```
✓ Yarn Workspaces (Monorepo Management)
✓ Concurrently (Parallel Development Servers)
✓ Git (Version Control)
```

---

## Project Structure

```
preorder-manager/
├── backend/                          # NestJS Backend Service
│   ├── src/
│   │   ├── main.ts                   # Application Entry Point
│   │   ├── app.module.ts             # Root Module
│   │   ├── prisma/                   # Database Layer
│   │   │   ├── prisma.module.ts      # Prisma Module
│   │   │   └── prisma.service.ts     # Prisma Client Service
│   │   └── preorder/                 # Domain Module
│   │       ├── dto/                  # Data Transfer Objects
│   │       ├── preorder.controller.ts # REST Endpoints
│   │       ├── preorder.service.ts   # Business Logic
│   │       └── preorder.module.ts    # Domain Module
│   ├── prisma/
│   │   ├── schema.prisma             # Database Schema
│   │   ├── seed.ts                   # Seed Script
│   │   └── migrations/               # Migration Files
│   ├── prisma.config.ts              # Prisma 7 Configuration
│   ├── package.json
│   ├── tsconfig.json
│   └── nest-cli.json
│
├── frontend/                         # Next.js Frontend Application
│   ├── app/
│   │   ├── (routes)/                 # App Router Pages
│   │   │   ├── page.tsx              # Preorder List
│   │   │   ├── create/               # Create Preorder
│   │   │   └── preorders/[id]/edit/  # Update Preorder
│   │   ├── components/               # Reusable Components
│   │   │   ├── PreorderTable/        # Table Components
│   │   │   ├── PreorderForm/         # Form Components
│   │   │   └── FilterSortBar.tsx     # Filter/Sort Controls
│   │   ├── hooks/                    # Custom Hooks
│   │   │   ├── usePreorders.ts       # Query Hook
│   │   │   └── mutations.ts          # Mutation Hooks
│   │   └── lib/                      # Utilities
│   │       ├── api.ts                # API Client
│   │       ├── queryClient.ts        # React Query Client
│   │       └── types.ts              # Shared Types
│   ├── package.json
│   └── tailwind.config.js
│
├── package.json                      # Root Package (Workspaces)
├── .gitignore                        # Git Ignore Rules
├── README.md                         # This File
└── LICENSE                           # MIT License
```

---

## Implementation Details

### Backend API Design

The backend exposes a RESTful API with the following endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/preorders` | List preorders with filtering, sorting, pagination |
| POST | `/preorders` | Create new preorder |
| GET | `/preorders/:id` | Get specific preorder |
| PUT | `/preorders/:id` | Update preorder |
| DELETE | `/preorders/:id` | Delete preorder |
| PATCH | `/preorders/:id/toggle-status` | Toggle active/inactive |

#### Query Parameters
```
?filter=all|active|inactive
&sortBy=name|createdAt|startsAt|endsAt
&sortOrder=asc|desc
&page=1
&limit=8
```

### Frontend State Management

- **Server State**: React Query handles all API calls with caching, background refetching, and optimistic updates
- **Client State**: React Hook Form manages form state with Zod validation
- **Global State**: Minimal – React Context only for theming and provider setup

### Database Schema

```prisma
model Preorder {
  id           String       @id @default(cuid())
  name         String
  products     Int          @default(0)
  preorderWhen PreorderWhen
  startsAt     DateTime
  endsAt       DateTime?
  status       Boolean      @default(true)
  createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt
}

enum PreorderWhen {
  out_of_stock
  regardless_of_stock
}
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn 1.22+
- SQLite (bundled with Prisma)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/preorder-manager.git
cd preorder-manager

# Install dependencies
yarn install
```

### Environment Configuration

Create the following environment files:

**`backend/.env`**
```env
DATABASE_URL="file:./dev.db"
```

**`frontend/.env.local`**
```env
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

### Database Setup

```bash
# Generate Prisma client
cd backend
yarn prisma generate

# Run migrations
yarn prisma migrate dev --name init

# Seed database with sample data (optional)
yarn prisma db seed

# Return to root
cd ..
```

### Development

Start both services concurrently:

```bash
# From root directory
yarn dev
```

Or individually:

```bash
# Terminal 1 - Backend
yarn workspace backend start:dev

# Terminal 2 - Frontend
yarn workspace frontend dev
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:4000`

### Production Build

```bash
# Build backend
yarn workspace backend build

# Build frontend
yarn workspace frontend build

# Start production servers
yarn workspace backend start
cd frontend && yarn start
```

---

## Testing Strategy

### Unit Tests
- **Backend**: Jest + NestJS Testing Utilities
- **Frontend**: Jest + React Testing Library

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch
```

### Integration Tests
- **API Tests**: Supertest for endpoint validation
- **E2E Tests**: Playwright for full application flows

### Test Coverage
We aim for **80%+ coverage** on critical paths:
- Business logic (PreorderService)
- API validation (DTOs)
- Frontend components (forms, tables)

---

## Performance Optimizations

### Backend
- **Pagination**: Server-side to reduce payload size
- **Indexing**: Prisma indexes on `startsAt`, `status`, and `createdAt`
- **Connection Pooling**: Prisma's built-in connection pooling

### Frontend
- **React Query Caching**: Server state caching reduces API calls
- **Code Splitting**: Next.js automatic code splitting
- **Image Optimization**: Next.js Image component for optimized images

---

## Security Considerations

- **Input Validation**: Class-validator on backend, Zod on frontend
- **Environment Variables**: Sensitive data stored in `.env` (never committed)
- **CORS**: Properly configured for development (adjust for production)
- **SQL Injection**: Prevented by Prisma's parameterized queries

---

## Deployment Guide

### Option 1: Vercel (Frontend) + Render (Backend)

1. **Backend (Render)**:
   - Create `render.yaml` configuration
   - Set `DATABASE_URL` environment variable
   - Use PostgreSQL for production

2. **Frontend (Vercel)**:
   - Set `NEXT_PUBLIC_API_URL` to your Render backend URL
   - Deploy directly from GitHub

### Option 2: Single Server Deployment

```bash
# Build both applications
yarn build

# Use PM2 for process management
pm2 start "yarn workspace backend start" --name preorder-backend
pm2 start "yarn workspace frontend start" --name preorder-frontend
```

---

## Monitoring & Observability

### Recommended Tools
- **Logging**: Winston or Pino for structured logging
- **Metrics**: Prometheus + Grafana for performance monitoring
- **Errors**: Sentry for error tracking
- **APM**: New Relic or Datadog for application performance

### Basic Logging Setup

```typescript
// backend/src/main.ts
import { Logger } from '@nestjs/common';

const logger = new Logger('Bootstrap');
logger.log(`Application running on port ${port}`);
```

---

## Contributing Guidelines

### Code Standards
- **Linting**: ESLint with Prettier
- **Commit Messages**: Conventional Commits
- **Branch Strategy**: Git Flow (feature/ → develop → main)
- **PR Reviews**: At least one approval before merge

### Quality Gates
- ✅ TypeScript type checking passes
- ✅ ESLint rules pass
- ✅ Unit tests pass
- ✅ Integration tests pass
- ✅ Code coverage > 80%

---

## Troubleshooting Common Issues

### Issue: `Cannot find module '@prisma/client'`
```bash
cd backend
yarn prisma generate
```

### Issue: `DATABASE_URL not set`
```bash
# Check backend/.env exists
echo 'DATABASE_URL="file:./dev.db"' > backend/.env
```

### Issue: Port conflicts
```bash
# Change port in backend/src/main.ts
await app.listen(4001);

# Change port in frontend/package.json
"dev": "next dev -p 3001"
```

---

## Future Roadmap

### Phase 1 (Current)
- ✅ Basic CRUD operations
- ✅ Filtering, sorting, pagination
- ✅ Status toggle
- ✅ Batch selection

### Phase 2 (Planned)
- 🔲 User authentication and authorization
- 🔲 Activity logs and audit trails
- 🔲 Email notifications for status changes
- 🔲 Export to CSV/PDF

### Phase 3 (Future)
- 🔲 Multi-tenant support
- 🔲 Real-time updates with WebSockets
- 🔲 Mobile-responsive improvements
- 🔲 Internationalization (i18n)

---

## License

MIT License – feel free to use, modify, and distribute.

---

## Support

- **Documentation**: [https://pris.ly/d](https://pris.ly/d)
- **NestJS**: [https://docs.nestjs.com](https://docs.nestjs.com)
- **Next.js**: [https://nextjs.org/docs](https://nextjs.org/docs)

---

**Built with ❤️ by the Software Engineer Fuad Hossain** | *Version 1.0.0*