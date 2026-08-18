# 🏡 HOZN Real Estate - Quick Summary for ChatGPT

## 📌 PROJECT AT A GLANCE

**Name:** HOZN - Real Estate Full-Stack Platform  
**Type:** Full-Stack Web Application  
**Status:** Under Development (v0.1.0)  

---

## 🏗️ ARCHITECTURE

### Frontend (React + Next.js 14)
- **Location:** `/src`
- **Language:** TypeScript
- **Framework:** Next.js 14 with React 18
- **Styling:** SCSS + Bootstrap 5.3.2
- **State Management:** Redux Toolkit
- **HTTP Client:** Axios

### Backend (Node.js + Express)
- **Location:** `/real-estate-backend/src`
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** Sequelize ORM (SQLite/PostgreSQL)
- **Authentication:** JWT + bcrypt

---

## 📦 TECH STACK SUMMARY

| Layer | Technologies |
|-------|--------------|
| **Frontend** | Next.js 14, React 18, TypeScript, Redux Toolkit, SCSS, Bootstrap |
| **Backend** | Express.js, Sequelize, TypeScript, JWT, bcrypt |
| **Database** | SQLite (configurable to PostgreSQL) |
| **HTTP** | Axios (frontend), REST API (backend) |
| **UI Components** | React Hook Form, Yup validation, React Slick, React Paginate |
| **Extras** | Email.js, WOW.js animations, Chart.js, Lightbox |

---

## 🗂️ PROJECT STRUCTURE

```
hozn-realestate/
├── Frontend (Next.js + React)
│   ├── /src/app/ - Pages (17+ listing pages, dashboards, profiles)
│   ├── /src/components/ - Reusable components (blogs, forms, dashboards)
│   ├── /src/redux/ - State management (properties, shortlisted items)
│   ├── /src/hooks/ - Custom React hooks
│   ├── /src/utils/ - API client, localStorage, animations
│   └── /src/styles/ - Global SCSS styling
│
└── Backend (Node.js + Express)
    ├── /src/routes/ - API endpoints (auth, profile)
    ├── /src/controllers/ - Business logic (signup, login)
    ├── /src/middleware/ - JWT authentication
    ├── /src/models/ - Sequelize models (User)
    ├── /src/config/ - Database configuration
    └── /migrations/ - Database schema migrations
```

---

## 🔐 AUTHENTICATION FLOW

### Signup → Login → Protected Routes

**Signup (POST /api/auth/signup)**
```
Input: { name, email, password, termsAccepted }
Process: Hash password with bcrypt → Save to DB
Output: { message, user }
```

**Login (POST /api/auth/login)**
```
Input: { email, password }
Process: Find user → Compare password → Generate JWT token
Output: { message, token }
Token: Valid for 1 hour, stored in localStorage
```

**Protected Routes (GET/PUT /api/profile)**
```
Requirement: Authorization: Bearer <token>
Process: Verify token → Extract user ID → Query database
Output: User profile data or error
```

---

## 🗄️ DATABASE SCHEMA

### Users Table
```sql
- id (PRIMARY KEY, auto-increment)
- name (VARCHAR, required)
- email (VARCHAR, unique, required)
- password (VARCHAR hashed, required)
- termsAccepted (BOOLEAN, required)
- firstName (VARCHAR, optional)
- lastName (VARCHAR, optional)
- phoneNumber (VARCHAR, optional)
- about (TEXT, optional)
- createdAt, updatedAt (TIMESTAMPS)
```

### Migrations
1. **20250326232712** - Create users table
2. **20250327125525** - Add profile fields (firstName, lastName, phoneNumber, about)

---

## 🚀 API ENDPOINTS

| Method | URL | Auth | Purpose |
|--------|-----|------|---------|
| POST | `/api/auth/signup` | ❌ | User registration |
| POST | `/api/auth/login` | ❌ | User login (returns token) |
| GET | `/api/profile` | ✅ | Fetch user profile |
| PUT | `/api/profile` | ✅ | Update user profile |

---

## 📊 REDUX STATE STRUCTURE

```typescript
// Store
{
  properties: {
    properties: [Property[], ...],  // All properties data
    property: Property || {}         // Selected property details
  }
}

// Actions
- single_property(id)  // Select single property by ID

// Selectors
- selectProperties     // Get all properties
- selectProperty       // Get current property
```

---

## 🎯 KEY FEATURES IMPLEMENTED

✅ User authentication (signup/login)  
✅ JWT-based authorization  
✅ Profile management (view/edit)  
✅ Password hashing with bcrypt  
✅ CORS enabled  
✅ Redux state management  
✅ Responsive design  
✅ Property listing pages (17+ variants)  
✅ Property details pages  
✅ User dashboard  
✅ Admin dashboard structure  
✅ Form validation  

---

## ⚠️ STILL TODO

- [ ] Property model and CRUD operations
- [ ] Agency/Agent models
- [ ] Search and filtering
- [ ] Image upload functionality
- [ ] Payment integration
- [ ] Email notifications
- [ ] Advanced authorization (roles)
- [ ] Testing suite

---

## 🔧 RUNNING THE PROJECT

### Frontend
```bash
cd project-root
npm install
npm run dev
# Open http://localhost:3000
```

### Backend
```bash
cd real-estate-backend
npm install
npx ts-node src/server.ts
# Server runs on http://localhost:5000
```

### Environment Setup
```
FRONTEND:
- NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api

BACKEND:
- PORT=5000
- JWT_SECRET=your_secret_key
- NODE_ENV=development
- DATABASE_URL=sqlite://database.sqlite
```

---

## 💾 FILES TO SHARE

**For Full Documentation:**
- `PROJECT_DOCUMENTATION.md` (This file)

**Key Backend Files:**
- `real-estate-backend/src/server.ts` - Server setup
- `real-estate-backend/src/controllers/AuthController.ts` - Auth logic
- `real-estate-backend/src/routes/authRoutes.ts` - Auth routes
- `real-estate-backend/src/routes/protectedRoutes.ts` - Protected routes
- `real-estate-backend/src/middleware/authMiddleware.ts` - JWT verification
- `real-estate-backend/src/models/User.ts` - User model

**Key Frontend Files:**
- `src/app/layout.tsx` - Root layout
- `src/redux/store.ts` - Redux config
- `src/redux/features/propertySlice.ts` - Property state
- `src/utils/api.ts` - API client

---

## 🔑 IMPORTANT SECURITY NOTES

- **Passwords:** Hashed with bcrypt (10 salt rounds)
- **Tokens:** JWT with 1-hour expiration
- **CORS:** Enabled for frontend-backend communication
- **Protected Routes:** Require valid JWT token
- **⚠️ TODO:** Store JWT_SECRET in .env (not hardcoded)

---

## 📞 QUICK REFERENCE

**API Base:** `http://localhost:5000/api`  
**Frontend Base:** `http://localhost:3000`  
**Database:** SQLite at `real-estate-backend/database.sqlite`  
**Default Port (Backend):** 5000  
**Default Port (Frontend):** 3000  

---

**Use this document to quickly brief anyone on the project architecture, tech stack, and current implementation status.**
