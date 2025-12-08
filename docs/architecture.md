# TruEstate Retail Sales Management System – Architecture

## 1. Overview
The TruEstate Retail Sales Management System is a full-stack MERN application designed to handle large-scale retail sales data with fast search, multi-criteria filtering, sorting, and pagination.  
The project demonstrates production-style backend engineering and a dashboard-oriented frontend UI.

---

## 2. System Architecture

Frontend (React + Tailwind)
↓ REST API (Axios)
Backend (Node.js + Express)
↓
Database (MongoDB Atlas — "sales" collection)



The backend acts as a middleware layer that processes search parameters, filters, sorting, and pagination logic before returning results to the UI.

---

## 3. Backend Architecture

### Responsibilities
- Expose REST API to serve sales data
- Apply search, filtering, sorting, and pagination within a single request
- Convert raw CSV fields from MongoDB into camelCase format for UI
- Handle invalid and conflicting filter cases safely

### Folder Structure
backend/
├─ src/
│ ├─ controllers/ → API request handlers
│ ├─ services/ → Business logic for search, filters, sorting
│ ├─ utils/ → Query builder and helper functions
│ ├─ routes/ → API route definitions
│ ├─ models/ → MongoDB schema (strict:false to accept CSV fields)
│ └─ index.js → Entry point and DB connection
├─ package.json
├─ .env
└─ README.md

### Backend Data Flow
Controller → Service → Query Builder (utils) → MongoDB
↓
Sorting + Pagination
↓
Response fields mapped to camelCase


### API
GET /api/sales


Supported features:
- Search (Customer Name, Phone Number)
- Multi-select filters
- Age and Date range
- Sorting (Date, Quantity, Customer Name)
- Pagination (10 items per page)

---

## 4. Frontend Architecture

### Responsibilities
- Provide dashboard UI for sales exploration
- Communicate with backend through REST API
- Manage filters, sorting, search, and pagination in component state

### Technology
| Layer | Technology |
|-------|------------|
| Framework | React (Vite) |
| Styling | TailwindCSS |
| Icons | lucide-react |
| API requests | Axios |

### Folder Structure
frontend/
├─ src/
│ ├─ components/ → UI modules (Sidebar, Topbar, Filters, Table, Pagination)
│ ├─ hooks/ → Custom hook for API state & request logic
│ ├─ services/ → Axios API configuration
│ ├─ utils/ → Helpers (optional)
│ ├─ App.jsx → Dashboard layout
│ └─ main.jsx
├─ public/
├─ package.json
└─ README.md



### Frontend Data Flow
UI Interaction (search / filters / sort / page)
↓
Component State
↓
Custom hook (useSalesData)
↓
Axios → Backend API
↓
Response mapped to UI
↓
Rendered in dashboard components



---

## 5. Database Design
The dataset is imported directly as a CSV into MongoDB Atlas.  
Field names are preserved **exactly** as provided.

Example fields:
- Customer Name
- Phone Number
- Customer Region
- Gender
- Age
- Product Category
- Tags
- Payment Method
- Date
- Quantity
- Amounts & Status fields
- Store and Employee information

Database:
Name: Truestate
Collection: sales
Records: ~769,000


The backend uses `strict: false` schema to avoid mismatch issues and support CSV field names.

---

## 6. Performance Considerations

| Requirement | Implementation |
|-------------|----------------|
| Large dataset | `limit + skip` pagination |
| Fast search | Case-insensitive regex |
| Multi-filter | Combined `$in` operators |
| Tags | Regex pattern join instead of multiple OR conditions |
| Date range | End-of-day timestamp normalization |
| Sorting | Single-field index-friendly sort |

The backend ensures that **search + filters + sorting + pagination work together in one request**.

---

## 7. Future Improvements
If the project is expanded for production, the following enhancements can be added:

| Improvement | Purpose |
|-------------|----------|
| Metadata API for dropdowns | Replace hardcoded filter lists |
| Indexing strategy | Faster search on 7+ lakh rows |
| Authentication & Roles | Different access for admin & sales staff |
| Server-side caching | Faster repeated queries |
| Analytics dashboards | Charts for category, region, revenue, payment method |

---

## 8. Summary
This architecture provides:

- Clear separation between frontend, backend, and database
- Clean modular backend logic via controllers, services, and utils
- A scalable UI that interacts with the backend through a single API
- A structure consistent with real-world SDE internship / production systems

The system meets the TruEstate Retail Sales Assignment requirements with
professional engineering practices, optimized performance, and a clean UI experience.