# 🏡 VELMORA - Real Estate Full-Stack Application
## Complete Project Documentation

---

## 📋 TABLE OF CONTENTS
1. Project Overview
2. Tech Stack
3. Project Structure
4. Frontend Architecture
5. Backend Architecture
6. Database Schema
7. API Endpoints
8. Authentication Flow
9. Redux State Management
10. Key Features
11. Setup Instructions

---

## 1️⃣ PROJECT OVERVIEW

**Project Name:** VELMORA Real Estate  
**Version:** 0.1.0  
**Description:** A full-stack real estate platform built with React, Next.js, TypeScript, and Node.js Express backend.

### Core Purpose:
- Allow users to browse, list, and manage properties
- User authentication and profile management
- Admin dashboard for managing listings
- Buy/Sell property listings
- Fully responsive design

---

## 2️⃣ TECH STACK

### 🌐 FRONTEND
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | ^18 | UI library and component framework |
| Next.js | 14.0.4 | React framework with SSR, routing, and optimization |
| TypeScript | ^5 | Static typing and better development experience |
| Redux Toolkit | ^2.0.1 | State management |
| Tailwind CSS + SCSS | 1.69.5 | Styling and preprocessing |
| Bootstrap | ^5.3.2 | Responsive layout framework |
| Axios | ^1.8.4 | HTTP client for API calls |
| React Hook Form | ^7.49.2 | Form handling and validation |
| Yup | ^1.3.3 | Schema validation |
| React Slick | ^0.29.0 | Carousel/slider component |
| React Paginate | ^8.2.0 | Pagination component |
| React Toastify | ^9.1.3 | Toast notifications |
| Chart.js & react-chartjs-2 | ^5.2.0 | Data visualization |
| WOW.js | ^1.1.3 | Scroll animations |
| Fancybox/Lightbox | ^5.0.33 | Image gallery |
| Email.js | ^4.1.0 | Email sending from frontend |

### 🖥️ BACKEND
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | Latest | Runtime environment |
| Express.js | ^4.21.2 | Web framework and API routing |
| TypeScript | ^5.8.2 | Type-safe backend code |
| Sequelize | ^6.37.6 | ORM for database operations |
| sequelize-typescript | ^2.1.6 | TypeScript decorators for Sequelize |
| PostgreSQL/SQLite | ^8.14.1 | Database (configurable) |
| JWT | ^9.0.2 | JSON Web Token for authentication |
| bcrypt.js | ^3.0.2 | Password hashing and verification |
| CORS | ^2.8.5 | Cross-Origin Resource Sharing |
| dotenv | ^16.4.7 | Environment variable management |
| reflect-metadata | ^0.2.2 | Metadata reflection for TypeScript |

---

## 3️⃣ PROJECT STRUCTURE

```
Hozn-RealEstate-Fullstack/
│
├── 📄 package.json              # Frontend dependencies
├── 📄 tsconfig.json             # TypeScript configuration
├── 📄 next.config.js            # Next.js configuration
├── 📄 README.md                 # Project README
├── 📄 LICENSE                   # License file
│
├── 🌐 public/
│   └── assets/
│       ├── css/
│       │   ├── bootstrap.min.css
│       │   ├── style.css
│       │   ├── responsive.css
│       │   └── bootstrap-icons.css
│       ├── fonts/
│       │   ├── bootstrap-icons-1.11.1/
│       │   ├── font-awesome-6.4.2/
│       │   └── gordita/
│       └── images/
│           ├── agent/
│           ├── assets/
│           ├── blog/
│           ├── dashboard/
│           └── ...
│
├── 📦 real-estate-backend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── database.sqlite          # SQLite database file
│   │
│   ├── 🔧 config/
│   │   ├── config.json          # Database configuration
│   │   └── database.ts          # Sequelize setup
│   │
│   ├── 🗄️ migrations/           # Database migrations
│   │   ├── 20250326232712-create-users-table.js
│   │   └── 20250327125525-add-profile-fields-to-users.js
│   │
│   ├── 📊 models/
│   │   ├── index.js             # Model loader
│   │   └── user.js              # User model (legacy)
│   │
│   ├── 📁 src/
│   │   ├── app.ts               # Express app setup
│   │   ├── server.ts            # Server startup
│   │   ├── custom.d.ts          # Custom type definitions
│   │   │
│   │   ├── 🔐 config/
│   │   │   └── database.ts      # Database configuration
│   │   │
│   │   ├── 🎮 controllers/
│   │   │   └── AuthController.ts
│   │   │       └── signup()      # User registration
│   │   │       └── login()       # User login
│   │   │
│   │   ├── 🛡️ middleware/
│   │   │   └── authMiddleware.ts
│   │   │       └── authenticateUser()  # JWT verification
│   │   │
│   │   ├── 📋 models/
│   │   │   └── User.ts          # TypeScript User model
│   │   │
│   │   └── 🚀 routes/
│   │       ├── authRoutes.ts     # POST /signup, /login
│   │       └── protectedRoutes.ts # GET/PUT /profile
│   │
│   └── 📜 seeders/              # Database seeders
│
└── 💻 src/ (Frontend)
    │
    ├── 🏠 app/
    │   ├── layout.tsx            # Root layout with Redux Provider
    │   ├── page.tsx              # Home page
    │   └── [...not-found]/       # 404 page
    │   └── Routes:
    │       ├── about_us_01/
    │       ├── about_us_02/
    │       ├── account-settings/ # User profile settings
    │       ├── agency/           # Agency listing
    │       ├── agent/            # Agent listing
    │       ├── agent_details/    # Agent details
    │       ├── blog_01/
    │       ├── blog_02/
    │       ├── blog_03/
    │       ├── blog_details/
    │       ├── compare/          # Property comparison
    │       ├── contact/          # Contact page
    │       ├── dashboard/        # User dashboard
    │       ├── faq/              # FAQ page
    │       ├── home-two/         # Alternative home
    │       ├── listing_01 to 17/ # Property listing pages
    │       ├── listing_details_01 to 06/  # Property details
    │       ├── pricing_01/
    │       ├── pricing_02/
    │       ├── profile/          # User profile
    │       ├── project_01 to 04/ # Project listings
    │       ├── project_details_01 to /    # Project details
    │       ├── service_01/
    │       ├── service_02/
    │       └── service_details/
    │
    ├── 🧩 components/
    │   ├── blogs/                # Blog-related components
    │   ├── common/               # Reusable components
    │   ├── dashboard/            # Dashboard components
    │   ├── forms/                # Form components
    │   ├── homes/                # Home page sections
    │   ├── inner-listing/        # Listing page components
    │   ├── inner-pages/          # Inner page components
    │   ├── ListingDetails/       # Property detail components
    │   └── search-dropdown/      # Search components
    │
    ├── 📊 data/
    │   ├── home-data/            # Home page data
    │   └── inner-data/           # Property listing data
    │       └── ListingData.ts     # Static property data
    │
    ├── 🎣 hooks/
    │   ├── UseProperty.ts        # Property data hook
    │   ├── useShortedProperty.ts # Filtered property hook
    │   └── UseSticky.ts          # Sticky element hook
    │
    ├── 🎨 layouts/
    │   ├── Wrapper.tsx           # Main wrapper component
    │   ├── headers/              # Header components
    │   └── footers/              # Footer components
    │
    ├── 🪟 modals/
    │   ├── DeleteModal.tsx       # Delete confirmation modal
    │   ├── ImagePopup.tsx        # Image popup/modal
    │   ├── ListingDropdownModal.tsx  # Listing dropdown
    │   ├── LoginModal.tsx        # Login modal
    │   └── VideoPopup.tsx        # Video player modal
    │
    ├── 📦 redux/
    │   ├── store.ts              # Redux store configuration
    │   └── features/
    │       ├── propertySlice.ts  # Property state management
    │       └── shortedSlice.ts   # Shortlisted properties
    │
    ├── 🎨 styles/
    │   └── index.scss            # Global SCSS styles
    │
    ├── 📝 types/
    │   └── wowjs.d.ts            # Type definitions for WOW.js
    │
    ├── 🎛️ ui/
    │   ├── NiceSelect.tsx        # Custom select component
    │   └── NumberNiceSelect.tsx  # Number select component
    │
    └── 🛠️ utils/
        ├── api.ts                # Axios instance configuration
        ├── localstorage.ts       # LocalStorage utility
        └── utils.ts              # Animation utilities

```

---

## 4️⃣ FRONTEND ARCHITECTURE

### 🏗️ App Structure (Next.js)

**Root Layout: `src/app/layout.tsx`**
```typescript
- Configures Redux Provider
- Sets up global styles (SCSS)
- Configures metadata and SEO
- Wraps all pages with Wrapper component
```

**Home Page: `src/app/page.tsx`**
```typescript
- Imports HomeTwo component
- Wraps with Wrapper layout
- Entry point for homepage
```

### 📦 Redux State Management

**Store Configuration:**
```typescript
// src/redux/store.ts
- configureStore with propertySlice reducer
- Disables serializable check for objects
- Available globally via Provider in layout
```

**Property Slice:**
```typescript
// src/redux/features/propertySlice.ts
State:
  - properties: Array of all property objects
  - property: Current selected property

Actions:
  - single_property(id): Finds and sets single property

Selectors:
  - selectProperties: Returns all properties
  - selectProperty: Returns current property
```

### 🎨 Styling System

**Files:**
- `src/styles/index.scss` - Global SCSS
- `public/assets/css/` - Bootstrap, responsive CSS
- **CSS Framework:** Bootstrap 5.3.2
- **Pre-processor:** SCSS/Sass
- **Tailwind Support:** Available (in dependencies)

### 🔌 API Integration

**Axios Instance: `src/utils/api.ts`**
```typescript
const API_BASE_URL = "http://localhost:5000/api/auth"

API Configuration:
- Base URL points to backend auth endpoints
- Content-Type: application/json
- Ready for request/response interceptors
```

### 🪝 Custom Hooks

**useProperty.ts**
- Manages property data from Redux

**useShortedProperty.ts**
- Handles shortlisted/filtered properties

**UseSticky.ts**
- Manages sticky element behaviors

### 🛠️ Utility Functions

**localstorage.ts:**
```typescript
- setLocalStorage<T>(name, items) - Save typed data
- getLocalStorage<T>(name) - Retrieve typed data
```

**utils.ts:**
```typescript
- animationCreate() - Initializes WOW.js animations
- Dynamically imports WOW module
- Handles SSR compatibility
```

---

## 5️⃣ BACKEND ARCHITECTURE

### 🚀 Server Setup

**Main Entry Point: `real-estate-backend/src/server.ts`**
```typescript
Environment:
- PORT: process.env.PORT || 5000
- Database: SQLite (configurable to PostgreSQL)
- CORS: Enabled for frontend communication

Routes:
- /api/auth → authRoutes (signup, login)
- /api → protectedRoutes (authenticated endpoints)

Startup:
- Syncs database schema
- Initializes server listener
```

### 🗄️ Database Configuration

**Database: `real-estate-backend/src/config/database.ts`**
```typescript
Database Type: SQLite (with TypeScript support)
Storage Path: database.sqlite (root directory)
Models: [User]
ORM: Sequelize-TypeScript
Logging: Disabled for clean output

Connection Flow:
1. Reads .env configuration
2. Initializes Sequelize instance
3. Loads User model with decorators
4. Syncs schema on server startup
```

### 📊 Database Schema

#### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  termsAccepted BOOLEAN NOT NULL,
  
  -- Profile fields (added via migration 2)
  firstName VARCHAR,
  lastName VARCHAR,
  phoneNumber VARCHAR,
  about TEXT,
  
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL
);
```

**Indexes:**
- `id`: Primary Key (Auto-increment)
- `email`: Unique Index (for user lookup)

### 🎮 Controllers

**AuthController: `real-estate-backend/src/controllers/AuthController.ts`**

**1. signup()**
```
Endpoint: POST /api/auth/signup
Body: { name, email, password, termsAccepted }

Logic:
1. Validate terms acceptance (required)
2. Check if user already exists
3. Hash password with bcrypt (salt rounds: 10)
4. Create user in database
5. Return success message and user object

Errors:
- 400: Terms not accepted
- 400: User already exists
- 500: Database error
```

**2. login()**
```
Endpoint: POST /api/auth/login
Body: { email, password }

Logic:
1. Find user by email in database
2. Compare provided password with hashed password
3. If valid, generate JWT token
4. Return token with 1-hour expiration
5. Token can be used for protected routes

Errors:
- 401: Invalid email/password
- 500: Server error

JWT Payload: { id: user.id }
Secret Key: process.env.JWT_SECRET || "your_secret_key"
Expiration: "1h"
```

### 🛡️ Middleware

**Authentication Middleware: `real-estate-backend/src/middleware/authMiddleware.ts`**

```typescript
authenticateUser(req, res, next):
1. Extracts token from Authorization header
   Format: "Bearer <token>"
2. Verifies token using JWT_SECRET
3. If valid:
   - Attaches decoded data (user.id) to req.user
   - Calls next() to proceed
4. If invalid:
   - Returns 401 error

Protected Route Pattern:
router.get("/profile", authenticateUser, handler)
```

### 🚀 Routes

**Auth Routes: `real-estate-backend/src/routes/authRoutes.ts`**
```typescript
POST /api/auth/signup  → signup controller
POST /api/auth/login   → login controller
```

**Protected Routes: `real-estate-backend/src/routes/protectedRoutes.ts`**

**1. GET /api/profile** (Protected)
```
Requirements: Valid JWT token

Logic:
1. Authenticate user via middleware
2. Find user by ID from token
3. Select only specific fields:
   - name, email, firstName, lastName, phoneNumber, about
4. Return user profile data

Response: { name, email, firstName, ... }
Errors:
- 401: No token or invalid token
- 404: User not found
- 500: Server error
```

**2. PUT /api/profile** (Protected)
```
Requirements: Valid JWT token
Body: { firstName, lastName, phoneNumber, about }

Logic:
1. Authenticate user via middleware
2. Validate all fields are provided (required)
3. Update user record in database
4. Return success message

Errors:
- 400: Missing required fields
- 401: No token or invalid token
- 500: Server error
```

### 🗄️ Database Migrations

**Migration 1: `20250326232712-create-users-table.js`**
- Creates users table with initial schema
- Adds timestamps (createdAt, updatedAt)

**Migration 2: `20250327125525-add-profile-fields-to-users.js`**
- Adds profile fields to existing users table:
  - firstName
  - lastName
  - phoneNumber
  - about

### 📋 Models

**User Model: `real-estate-backend/src/models/User.ts`**
```typescript
@Table({ tableName: "users" })
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  termsAccepted!: boolean;

  @Column({ type: DataType.STRING, allowNull: true })
  firstName?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  lastName?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  phoneNumber?: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  about?: string;
}
```

---

## 6️⃣ API ENDPOINTS

### Authentication Endpoints

| Method | Endpoint | Auth | Body | Response |
|--------|----------|------|------|----------|
| POST | `/api/auth/signup` | ❌ | `{name, email, password, termsAccepted}` | `{message, user}` |
| POST | `/api/auth/login` | ❌ | `{email, password}` | `{message, token}` |
| GET | `/api/profile` | ✅ | - | `{name, email, firstName, ...}` |
| PUT | `/api/profile` | ✅ | `{firstName, lastName, phoneNumber, about}` | `{message}` |

### Request Examples

**Signup:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "termsAccepted": true
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get Profile:**
```bash
curl -X GET http://localhost:5000/api/profile \
  -H "Authorization: Bearer <token>"
```

**Update Profile:**
```bash
curl -X PUT http://localhost:5000/api/profile \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "1234567890",
    "about": "Real estate agent"
  }'
```

---

## 7️⃣ AUTHENTICATION FLOW

### User Registration Flow
```
Frontend (Signup Form)
    ↓
Validate input with React Hook Form + Yup
    ↓
POST /api/auth/signup (email, password, name, termsAccepted)
    ↓
Backend (AuthController.signup)
    ├─ Check terms accepted
    ├─ Check if user exists
    ├─ Hash password with bcrypt
    └─ Save to database
    ↓
Response: { message, user }
    ↓
Frontend: Store user info, redirect to login
```

### User Login Flow
```
Frontend (Login Form)
    ↓
Validate input with React Hook Form + Yup
    ↓
POST /api/auth/login (email, password)
    ↓
Backend (AuthController.login)
    ├─ Find user by email
    ├─ Compare password with bcrypt.compare()
    └─ Generate JWT token (1 hour expiration)
    ↓
Response: { message, token }
    ↓
Frontend: Store token in localStorage
    ↓
Subsequent API calls include: Header: Authorization: Bearer <token>
```

### Protected Route Access Flow
```
Frontend Request
    ↓
Include token in Authorization header
    ↓
Backend (authMiddleware.authenticateUser)
    ├─ Extract token from header
    ├─ Verify token with JWT_SECRET
    ├─ Decode payload (get user.id)
    └─ Attach user object to req.user
    ↓
Route Handler (controller)
    ├─ Access req.user.id
    ├─ Query database for user
    └─ Return user-specific data
    ↓
Response: User data or error
```

---

## 8️⃣ REDUX STATE MANAGEMENT

### Redux Store Tree
```
store
  └─ properties (propertySlice reducer)
      ├─ properties: Property[]        // All properties
      └─ property: Property | {}       // Single selected property
```

### Property Slice Actions

**single_property(id)**
```typescript
Payload: number (property ID)
Logic: 
  1. Search for property with matching ID
  2. Set as current property state
  3. Used when viewing property details

Usage:
dispatch(single_property(5))  // Select property with ID 5
```

### Selectors

```typescript
selectProperties(state) → state.properties.properties
  Returns: Array of all properties

selectProperty(state) → state.properties.property
  Returns: Currently selected property object
```

### Data Flow Example
```
Component (PropertyDetails)
    ↓
useSelector(selectProperty)
    ↓
Returns Redux state property
    ↓
Render property details with data
    ↓
User clicks property
    ↓
dispatch(single_property(propertyId))
    ↓
Updates Redux state
    ↓
Component re-renders with new data
```

---

## 9️⃣ KEY FEATURES

### 🔐 Authentication System
- **Signup**: Register new users with email/password
- **Login**: Secure JWT-based login
- **Profile**: View and update user profile
- **Password Security**: Bcrypt hashing with salt rounds

### 🏠 Property Management
- Browse property listings (17 different listing pages)
- View detailed property information (6 detail page variants)
- Compare properties side by side
- Property filtering and search
- Static property data in Redux store

### 👥 User Dashboard
- View user profile
- Edit profile information
- See user-specific content
- Account settings

### 🎨 UI/UX Features
- Responsive design (mobile, tablet, desktop)
- Smooth scroll animations (WOW.js)
- Image galleries and lightboxes
- Video popups
- Toast notifications
- Form validation with Yup
- Loading states and error handling

### 📊 Dashboard Features
- Admin dashboard for management
- Property listing management
- User management
- Analytics with Chart.js

### 🔗 Integration Features
- Email notifications (Email.js)
- Contact form submission
- Search functionality
- Pagination for listings
- Blog section
- Agent/Agency profiles

---

## 🔟 SETUP & RUNNING

### Frontend Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Access frontend
http://localhost:3000
```

### Backend Setup

```bash
# Navigate to backend
cd real-estate-backend

# Install dependencies
npm install

# Run migrations (if using PostgreSQL)
npx sequelize-cli db:migrate

# Run database seeders (if available)
npx sequelize-cli db:seed:all

# Start backend server
npx ts-node src/server.ts

# Access backend
http://localhost:5000
```

### Environment Variables

**Frontend (.env.local):**
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

**Backend (.env):**
```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key_here
DATABASE_URL=sqlite://database.sqlite

# Or for PostgreSQL:
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hozn_realestate
DB_USER=postgres
DB_PASSWORD=your_password
```

---

## 📝 IMPORTANT NOTES

### Current State
- **Authentication**: Implemented (signup, login, profile management)
- **Database**: SQLite (can be configured to PostgreSQL)
- **Frontend**: Multiple pages and components structure ready
- **Backend**: API endpoints for auth and profile management
- **State Management**: Redux setup with property data management

### Security Considerations
- ✅ Passwords hashed with bcrypt
- ✅ JWT token-based authentication
- ✅ CORS enabled for frontend-backend communication
- ✅ Protected routes with middleware authentication
- ⚠️ JWT Secret should be stored in .env (not hardcoded in production)
- ⚠️ Token expiration: 1 hour (configurable)

### Data Flow
```
Frontend (React/Next.js)
    ↕️ Axios API calls
Backend (Express.js)
    ↕️ Sequelize ORM
Database (SQLite/PostgreSQL)
```

### File Size & Complexity
- Frontend: ~17 listing pages, 8 components folders
- Backend: Lean structure (auth, profile routes)
- Database: User model with profile extensions
- Redux: Single slice for property management

---

## 🚀 NEXT STEPS FOR DEVELOPMENT

### Backend Enhancements Needed:
- [ ] Create Property model and migrations
- [ ] Create Agency model
- [ ] Create Agent model
- [ ] Add property listing endpoints (CRUD)
- [ ] Add filtering/search functionality
- [ ] Add image upload functionality (Multer)
- [ ] Add pagination for listings
- [ ] Add admin role/authorization

### Frontend Enhancements Needed:
- [ ] Connect all listing pages to real API data
- [ ] Implement property search form
- [ ] Add authentication flow (login/signup modals)
- [ ] Connect profile page to backend
- [ ] Add cart/comparison logic
- [ ] Implement image upload in forms
- [ ] Add error boundaries
- [ ] Add loading skeletons

### DevOps:
- [ ] Set up .env configuration files
- [ ] Configure PostgreSQL for production
- [ ] Add database seeders
- [ ] Set up email service
- [ ] Add logging system
- [ ] Set up deployment pipeline

---

## 📚 TECHNOLOGY DOCUMENTATION LINKS

- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev
- **Redux Toolkit**: https://redux-toolkit.js.org
- **Express.js**: https://expressjs.com
- **Sequelize**: https://sequelize.org
- **TypeScript**: https://www.typescriptlang.org
- **JWT**: https://jwt.io
- **Bcrypt**: https://www.npmjs.com/package/bcryptjs

---

**Last Updated:** 2026-08-18  
**Project Status:** Under Development  
**Version:** 0.1.0 (Beta)
