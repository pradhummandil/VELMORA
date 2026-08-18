# 🏡 HOZN Real Estate - Visual Architecture & Data Flow Guide

---

## 🏛️ SYSTEM ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                    CLIENT SIDE (BROWSER)                           │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    NEXT.JS FRONTEND                          │  │
│  │                                                              │  │
│  │  ┌─────────┬──────────┬──────────┬──────────┬────────────┐ │  │
│  │  │ Pages   │Components│ Hooks    │  Redux   │   Utils   │ │  │
│  │  │  (17+)  │  (8 cat) │ (3 types)│ (2 slice)│ (API,LSto)│ │  │
│  │  └─────────┴──────────┴──────────┴──────────┴────────────┘ │  │
│  │                                                              │  │
│  │  ├─ React 18 + TypeScript                                  │  │
│  │  ├─ Redux Toolkit (state management)                       │  │
│  │  ├─ SCSS + Bootstrap (styling)                             │  │
│  │  └─ Axios (HTTP client)                                    │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
└──────────────┬──────────────────────────────────────────────────────┘
               │
               │ HTTP/REST API
               │ (JSON over HTTPS)
               │
┌──────────────▼──────────────────────────────────────────────────────┐
│                                                                     │
│                    SERVER SIDE (PORT 5000)                         │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │              EXPRESS.JS BACKEND                             │  │
│  │                                                              │  │
│  │  ┌──────────┬────────────┬──────────┬──────────────────┐   │  │
│  │  │ Routes   │ Controllers│Middleware│    Config        │   │  │
│  │  │(2 files) │(Auth logic)│(Auth JWT)│(Database setup) │   │  │
│  │  └──────────┴────────────┴──────────┴──────────────────┘   │  │
│  │                                                              │  │
│  │  ├─ Node.js + Express.js                                   │  │
│  │  ├─ TypeScript                                             │  │
│  │  ├─ JWT Authentication                                     │  │
│  │  ├─ Bcrypt Password Hashing                                │  │
│  │  └─ Sequelize ORM                                          │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
└──────────────┬──────────────────────────────────────────────────────┘
               │
               │ SQL Queries
               │
┌──────────────▼──────────────────────────────────────────────────────┐
│                                                                     │
│                    DATABASE LAYER                                  │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │          SEQUELIZE ORM                                       │  │
│  │  (Translates to SQL)                                         │  │
│  └──────────────┬───────────────────────────────────────────────┘  │
│                 │                                                   │
│  ┌──────────────▼───────────────────────────────────────────────┐  │
│  │     SQLite / PostgreSQL                                      │  │
│  │                                                              │  │
│  │   ┌──────────────────────────────────────┐                 │  │
│  │   │  USERS TABLE                         │                 │  │
│  │   ├──────────────────────────────────────┤                 │  │
│  │   │ ID  │ Name  │ Email │ Password  │ ... │                 │  │
│  │   ├──────────────────────────────────────┤                 │  │
│  │   │ 1   │ John  │ j@... │ bcrypted  │ ... │                 │  │
│  │   │ 2   │ Jane  │ j@... │ bcrypted  │ ... │                 │  │
│  │   │ ... │ ...   │ ...   │ ...       │ ... │                 │  │
│  │   └──────────────────────────────────────┘                 │  │
│  │                                                              │  │
│  │   [Future Tables: Properties, Agents, Agencies]             │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔐 AUTHENTICATION SEQUENCE DIAGRAM

```
┌──────────────┐                    ┌──────────────┐                ┌──────────────┐
│  Frontend    │                    │   Backend    │                │   Database   │
│  (React App) │                    │ (Express.js) │                │  (SQLite)    │
└──────┬───────┘                    └──────┬───────┘                └──────┬───────┘
       │                                   │                               │
       │  1️⃣  [USER SIGNUP]                │                               │
       │                                   │                               │
       ├─ POST /api/auth/signup ──────────>│                               │
       │  Body: {                          │                               │
       │    name, email, password,         │                               │
       │    termsAccepted                  │ 2️⃣ Validate input           │
       │  }                                │                               │
       │                                   ├─ Check if user exists ──────>│
       │                                   │<─ User not found ────────────┤
       │                                   │                               │
       │                                   ├─ Hash password (bcrypt)      │
       │                                   │                               │
       │                                   ├─ Save user ──────────────────>│
       │                                   │<─ User saved ─────────────────┤
       │                                   │                               │
       │<──── Response: {message, user} ───┤                               │
       │                                   │                               │
       │  3️⃣  [USER LOGIN]                 │                               │
       │                                   │                               │
       ├─ POST /api/auth/login ───────────>│                               │
       │  Body: {email, password}          │                               │
       │                                   ├─ Find user ──────────────────>│
       │                                   │<─ User found ─────────────────┤
       │                                   │                               │
       │                                   ├─ Compare password (bcrypt)   │
       │                                   │  (password match: true)       │
       │                                   │                               │
       │                                   ├─ Generate JWT Token          │
       │                                   │  Payload: {id: 1}            │
       │                                   │  Secret: JWT_SECRET           │
       │                                   │  Expires: 1 hour              │
       │                                   │                               │
       │<─ Response: {token} ──────────────┤                               │
       │                                   │                               │
       │  4️⃣  [PROTECTED ROUTE]             │                               │
       │                                   │                               │
       ├─ GET /api/profile ───────────────>│                               │
       │  Header: Authorization:           │                               │
       │          Bearer eyJhbGc... (JWT)  │ 5️⃣ Verify JWT token          │
       │                                   │  ├─ Extract token            │
       │                                   │  ├─ Decode with SECRET       │
       │                                   │  └─ Get user ID              │
       │                                   │                               │
       │                                   ├─ Fetch user by ID ──────────>│
       │                                   │<─ User data ──────────────────┤
       │                                   │                               │
       │<─── Response: {user_profile} ────┤                               │
       │                                   │                               │
```

---

## 📊 DATA FLOW DIAGRAM - Property Listing

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│              1️⃣  STATIC DATA INITIALIZATION                    │
│                                                                 │
│  ListingData.ts (JSON array with 50+ properties)               │
│         │                                                       │
│         ├─ id, title, location, price, type, agent, images    │
│         └─ Reviews, rating, description, amenities            │
│                                                                 │
└──────────────────┬──────────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│         2️⃣  REDUX INITIALIZATION (Store Setup)                │
│                                                                 │
│  propertySlice.ts                                              │
│  ├─ Initial State:                                             │
│  │   properties: [ListingData array]                           │
│  │   property: {}                                              │
│  │                                                              │
│  └─ Actions:                                                    │
│     └─ single_property(id): Finds and sets specific property  │
│                                                                 │
└──────────────────┬──────────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│         3️⃣  COMPONENT RENDER (Listing Page)                   │
│                                                                 │
│  Page Component                                                 │
│  └─ useSelector(selectProperties)                             │
│     └─ Returns: [property1, property2, ...property50]         │
│                                                                 │
│  Mapping in JSX:                                               │
│  properties.map((prop) => <PropertyCard {...prop} />)         │
│                                                                 │
└──────────────────┬──────────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│         4️⃣  USER INTERACTION (Select Property)                │
│                                                                 │
│  Click on PropertyCard                                          │
│         │                                                       │
│         └─> dispatch(single_property(propertyId))             │
│                                                                 │
└──────────────────┬──────────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│         5️⃣  STATE UPDATE                                       │
│                                                                 │
│  Redux Reducer                                                  │
│  ├─ Finds property with matching ID                           │
│  └─ Updates state.property = {id, title, ...}                │
│                                                                 │
└──────────────────┬──────────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│         6️⃣  DETAIL PAGE RENDER                                │
│                                                                 │
│  PropertyDetails Component                                      │
│  └─ useSelector(selectProperty)                               │
│     └─ Renders: Full property details with images, reviews   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 API REQUEST/RESPONSE FLOW

### Signup Flow
```
1. User fills form → React Hook Form validates
2. Frontend sends:
   POST /api/auth/signup
   Content-Type: application/json
   Body: {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "mypassword123",
     "termsAccepted": true
   }

3. Backend processes:
   ├─ Check: termsAccepted === true ✓
   ├─ Check: User doesn't exist (DB lookup) ✓
   ├─ Hash: "mypassword123" → bcrypt → "$2b$10$..."
   └─ Save: User { name, email, hashedPassword, termsAccepted }

4. Response sent to frontend:
   Status: 201 Created
   Body: {
     "message": "User created successfully!",
     "user": {
       "id": 1,
       "name": "John Doe",
       "email": "john@example.com",
       "termsAccepted": true
     }
   }

5. Frontend:
   ├─ Store response message
   ├─ Show success notification
   └─ Redirect to login
```

### Login Flow
```
1. User fills form → React Hook Form validates
2. Frontend sends:
   POST /api/auth/login
   Content-Type: application/json
   Body: {
     "email": "john@example.com",
     "password": "mypassword123"
   }

3. Backend processes:
   ├─ DB Lookup: Find user by email
   ├─ Get: user.password = "$2b$10$..." (hashed)
   ├─ Compare: bcrypt.compare("mypassword123", "$2b$10$...") → true
   └─ Generate: JWT Token
      {
        header: {alg: "HS256", typ: "JWT"},
        payload: {id: 1},
        secret: "JWT_SECRET"
      }
      = "eyJhbGc..." (encoded)

4. Response sent:
   Status: 200 OK
   Body: {
     "message": "Login successful!",
     "token": "eyJhbGc.eyJpZCI6MX0.ABCd..."
   }

5. Frontend:
   ├─ Save token in localStorage
   ├─ Set axios default header:
   │  Authorization: "Bearer eyJhbGc.eyJpZCI6MX0.ABCd..."
   └─ Redirect to dashboard
```

### Protected Route Flow (Get Profile)
```
1. Frontend sends:
   GET /api/profile
   Headers: {
     "Authorization": "Bearer eyJhbGc.eyJpZCI6MX0.ABCd..."
   }

2. Backend Middleware (authMiddleware):
   ├─ Extract token from header
   ├─ Verify token with JWT_SECRET
   ├─ If valid:
   │  └─ Decode payload: {id: 1}
   │     Attach to req.user = {id: 1}
   │     Call next() → proceed to route
   └─ If invalid:
      └─ Return 401 Unauthorized

3. Route Handler processes:
   ├─ Access req.user.id = 1
   ├─ Query: User.findByPk(1)
   │  Result: {
   │    id: 1,
   │    name: "John Doe",
   │    email: "john@example.com",
   │    firstName: "John",
   │    lastName: "Doe",
   │    phoneNumber: "1234567890",
   │    about: "Real estate agent"
   │  }
   └─ Send response

4. Frontend receives:
   Status: 200 OK
   Body: User profile data
```

---

## 📁 COMPONENT STRUCTURE

### Frontend Pages Hierarchy
```
/src/app/ (App Router - Next.js 13+)
│
├─ layout.tsx                    [Root layout with Redux Provider]
│  │
│  └─ page.tsx                   [Home page]
│
├─ /about_us_01                  [About page variant 1]
├─ /about_us_02                  [About page variant 2]
├─ /agency                        [Agency listing page]
├─ /agency_details               [Agency details page]
├─ /agent                         [Agent listing page]
├─ /agent_details                [Agent details page]
│
├─ /listing_01 to /listing_17    [Property listing pages (17 variants)]
├─ /listing_details_01 to _06    [Property detail pages (6 variants)]
│
├─ /blog_01, /blog_02, /blog_03  [Blog pages]
├─ /blog_details                 [Blog detail page]
│
├─ /project_01 to /project_04    [Project pages]
├─ /project_details_01           [Project detail pages]
│
├─ /pricing_01, /pricing_02      [Pricing pages]
├─ /compare                       [Property comparison page]
├─ /contact                       [Contact page]
├─ /dashboard                     [User dashboard]
├─ /faq                           [FAQ page]
├─ /home-two                      [Alternative home]
├─ /account-settings             [User account settings]
├─ /profile                       [User profile]
├─ /service_01, /service_02      [Service pages]
├─ /service_details              [Service detail page]
└─ /[...not-found]               [404 page]
```

### Component Organization
```
/src/components/
├─ /blogs/                       [Blog-related components]
├─ /common/                      [Reusable/common components]
│  └─ Header, Footer, Navigation
├─ /dashboard/                   [Dashboard components]
│  └─ Charts, Tables, Widgets
├─ /forms/                       [Form components]
│  └─ LoginForm, SignupForm, ProfileForm
├─ /homes/                       [Home page sections]
│  └─ Hero, Features, Testimonials
├─ /inner-listing/               [Listing page components]
│  └─ PropertyCard, FilterBar, Pagination
├─ /inner-pages/                 [Inner page components]
├─ /ListingDetails/              [Property detail components]
│  └─ ImageGallery, Description, Reviews
└─ /search-dropdown/             [Search components]
```

---

## 🗄️ DATABASE SCHEMA RELATIONSHIPS

```
┌────────────────────────────────────────────┐
│         USERS TABLE (Current)               │
├────────────────────────────────────────────┤
│ PK │ id              INTEGER AUTO_INCREMENT │
├────┼─────────────────────────────────────────┤
│    │ name            VARCHAR NOT NULL       │
│    │ email           VARCHAR UNIQUE         │
│    │ password        VARCHAR HASHED         │
│    │ termsAccepted   BOOLEAN                │
│    │ firstName       VARCHAR OPTIONAL       │
│    │ lastName        VARCHAR OPTIONAL       │
│    │ phoneNumber     VARCHAR OPTIONAL       │
│    │ about           TEXT OPTIONAL          │
│    │ createdAt       TIMESTAMP              │
│    │ updatedAt       TIMESTAMP              │
└────────────────────────────────────────────┘
         │
         │ Has Many
         ▼
┌────────────────────────────────────────┐
│    PROPERTIES TABLE (Future)            │
├────────────────────────────────────────┤
│ id, title, description, price, ...     │
│ FK: ownerId → users.id                 │
│ FK: agencyId → agencies.id             │
└────────────────────────────────────────┘

        Similar Relations:
        ├─ AGENCIES (has many properties)
        ├─ AGENTS (associated with agency)
        ├─ LISTINGS (has many reviews)
        └─ REVIEWS (belongs to property)
```

---

## 🎯 REQUEST LIFECYCLE

```
FRONTEND REQUEST
│
├─ 1️⃣  USER INTERACTION
│  └─ Click button, submit form, navigate page
│
├─ 2️⃣  FORM VALIDATION (React Hook Form + Yup)
│  └─ Validates input format and requirements
│
├─ 3️⃣  API CALL (Axios)
│  └─ Creates HTTP request with URL, method, headers, body
│
├─ 4️⃣  NETWORK REQUEST
│  └─ Sent to backend server (http://localhost:5000/api/...)
│
├─ 5️⃣  BACKEND ROUTING
│  └─ Express matches URL to route handler
│
├─ 6️⃣  MIDDLEWARE PROCESSING
│  └─ CORS, JSON parsing, authentication (if protected route)
│
├─ 7️⃣  CONTROLLER LOGIC
│  └─ Business logic: validation, hashing, database operations
│
├─ 8️⃣  DATABASE OPERATION
│  └─ Sequelize ORM translates to SQL query
│
├─ 9️⃣  RESPONSE GENERATION
│  └─ Backend creates JSON response
│
├─ 🔟  FRONTEND HANDLING
│  ├─ Parse response
│  ├─ Update state (Redux/useState)
│  ├─ Store data (localStorage if needed)
│  └─ Re-render component
│
└─ 1️⃣1️⃣  USER SEES UPDATE
   └─ UI changes, notifications, redirects
```

---

## 🔐 Security Flow

```
PASSWORD SECURITY:
Plain Text Password
    ↓
User Input: "password123"
    ↓
Bcrypt Hash (10 salt rounds)
    ↓
Stored in DB: "$2b$10$N9qo8uLOickgx2ZMRZoM..."
    ↓
Login: User enters "password123"
    ↓
bcrypt.compare("password123", "$2b$10$...")
    ↓
Match? True ✓ → Generate JWT
Match? False ✗ → Return 401 Error

JWT TOKEN SECURITY:
Token Generated
    ├─ Header: {alg: "HS256", typ: "JWT"}
    ├─ Payload: {id: userId}
    └─ Signature: HMAC-SHA256(header.payload, JWT_SECRET)
            ↓
    Encoded: eyJhbGc...eyJpZCI6MX0...ABCd...
            ↓
    Sent to Frontend (localStorage)
            ↓
    Included in subsequent requests:
    Authorization: Bearer eyJhbGc...eyJpZCI6MX0...ABCd...
            ↓
    Backend Verifies:
    ├─ Check signature with JWT_SECRET
    ├─ Check expiration (1 hour)
    └─ Extract payload if valid
            ↓
    Request proceeds with req.user = {id: userId}
```

---

## 📊 STATE MANAGEMENT FLOW

```
Redux Store Initialization (layout.tsx)
    ↓
propertySlice reducer initialized with ListingData
    ↓
Store contains:
{
  properties: {
    properties: [50+ property objects],
    property: {}
  }
}
    ↓
Component needs data
    ↓
useSelector(selectProperties) → Returns all properties
useSelector(selectProperty) → Returns current property
    ↓
Component renders with data
    ↓
User interaction (click property)
    ↓
dispatch(single_property(id))
    ↓
Reducer finds matching property and updates state
    ↓
Components with selectProperty selector re-render
    ↓
New property details displayed
```

---

## 🚀 Deployment Architecture (Future)

```
┌─────────────────────────────────────────────────┐
│              DEPLOYMENT LAYERS                  │
├─────────────────────────────────────────────────┤
│                                                 │
│  🌐 CDN (Content Delivery Network)              │
│     ├─ Static assets (CSS, JS, images)         │
│     └─ Caching: 1 year for versioned files     │
│                                                 │
│  🖥️  Frontend Server (Vercel/Netlify)          │
│     ├─ Next.js optimized build                │
│     ├─ Automatic deployment on push           │
│     └─ SSR/SSG pages                          │
│                                                 │
│  ⚙️  Backend Server (Node.js)                   │
│     ├─ Express.js application                 │
│     ├─ Docker container (recommended)         │
│     └─ Load balancer in front                 │
│                                                 │
│  🗄️  Database Server                           │
│     ├─ PostgreSQL (production)                │
│     ├─ Backup strategy                        │
│     └─ Connection pooling                     │
│                                                 │
│  🔐 Security Layer                             │
│     ├─ SSL/TLS certificates                   │
│     ├─ Environment variables                  │
│     └─ API rate limiting                      │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 📋 QUICK FILE REFERENCE

### Most Important Files to Understand:

1. **Backend Authentication Logic**
   - `real-estate-backend/src/controllers/AuthController.ts`
   - `real-estate-backend/src/middleware/authMiddleware.ts`

2. **Backend Routes**
   - `real-estate-backend/src/routes/authRoutes.ts`
   - `real-estate-backend/src/routes/protectedRoutes.ts`

3. **Frontend Redux Setup**
   - `src/redux/store.ts`
   - `src/redux/features/propertySlice.ts`

4. **API Communication**
   - `src/utils/api.ts`

5. **Root Layout (Provider setup)**
   - `src/app/layout.tsx`

---

**This visual guide helps understand the complete data flow, component hierarchy, and system architecture of the HOZN Real Estate platform.**
