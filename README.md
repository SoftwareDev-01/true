# TruEstate Retail Sales Management System

A **full-stack MERN application** designed to manage and explore large-scale retail sales data efficiently. The system supports fast search, multi-criteria filtering, sorting, and pagination, demonstrating production-style backend engineering and a dashboard-oriented frontend UI.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Backend Architecture](#backend-architecture)
- [Frontend Architecture](#frontend-architecture)
- [Database Design](#database-design)
- [Performance Considerations](#performance-considerations)
- [Future Improvements](#future-improvements)
- [Getting Started](#getting-started)
- [License](#license)

---

## Overview
TruEstate Retail Sales Management System is built to handle **~769,000 sales records** from a CSV-imported MongoDB dataset. Users can explore sales data through a clean dashboard with:

- Search by customer name or phone number
- Multi-select filters
- Age and date range filtering
- Sorting by date, quantity, or customer name
- Pagination

---

## Features
- Full-stack MERN (MongoDB, Express, React, Node.js)
- Responsive dashboard UI with **TailwindCSS**
- REST API with search, filters, sorting, and pagination
- Backend modular architecture: Controllers → Services → Utils → MongoDB
- Efficient handling of large datasets (~769k records)

---

## System Architecture

Frontend (React + Tailwind)
↓ REST API (Axios)
Backend (Node.js + Express)
↓
Database (MongoDB Atlas — "sales" collection)

markdown
Copy code

- Backend acts as middleware to process search, filters, sorting, and pagination.
- Frontend interacts with backend via Axios for dynamic dashboard updates.

---

## Backend Architecture

**Responsibilities:**
- Serve sales data via REST API
- Handle search, filtering, sorting, and pagination
- Convert raw CSV fields to `camelCase` for UI
- Safely handle invalid or conflicting filters

**Folder Structure:**
backend/
├─ src/
│ ├─ controllers/ # API request handlers
│ ├─ services/ # Business logic
│ ├─ utils/ # Query builder & helpers
│ ├─ routes/ # API route definitions
│ ├─ models/ # MongoDB schema (strict:false)
│ └─ index.js # Entry point & DB connection
├─ package.json
├─ .env
└─ README.md

markdown
Copy code

**API Endpoint:**  
`GET /api/sales`  

Supports:
- Search (Customer Name, Phone Number)  
- Multi-select filters  
- Age & date range  
- Sorting (Date, Quantity, Customer Name)  
- Pagination (10 items per page)

**Data Flow:**
Controller → Service → Query Builder → MongoDB
↓
Sorting + Pagination
↓
Response mapped to camelCase

yaml
Copy code

---

## Frontend Architecture

**Responsibilities:**
- Dashboard UI for sales exploration
- State management for filters, search, sorting, pagination
- Communicate with backend via REST API

**Technology Stack:**
| Layer | Technology |
|-------|------------|
| Framework | React (Vite) |
| Styling   | TailwindCSS |
| Icons     | lucide-react |
| API       | Axios |

**Folder Structure:**
frontend/
├─ src/
│ ├─ components/ # UI modules (Sidebar, Topbar, Table, Pagination)
│ ├─ hooks/ # Custom hook for API requests & state
│ ├─ services/ # Axios configuration
│ ├─ utils/ # Helper functions
│ ├─ App.jsx # Dashboard layout
│ └─ main.jsx
├─ public/
├─ package.json
└─ README.md

css
Copy code

**Data Flow:**
UI Interaction → Component State → useSalesData Hook
→ Axios → Backend API → Response mapped → Rendered in UI

yaml
Copy code

---

## Database Design
- MongoDB Atlas collection: `sales`  
- Records: ~769,000  
- Imported directly from CSV  
- Schema: `strict: false` to preserve CSV field names  

**Sample Fields:**
- Customer Name, Phone Number, Customer Region, Gender, Age
- Product Category, Tags, Payment Method
- Date, Quantity, Amounts & Status
- Store and Employee info

---

## Performance Considerations

| Requirement | Implementation |
|-------------|----------------|
| Large dataset | `limit + skip` pagination |
| Fast search | Case-insensitive regex |
| Multi-filter | Combined `$in` operators |
| Tags | Regex pattern join instead of multiple ORs |
| Date range | End-of-day timestamp normalization |
| Sorting | Single-field index-friendly sort |

All features work together in a **single backend request** for optimal performance.

---

## Future Improvements

| Improvement | Purpose |
|-------------|---------|
| Metadata API | Dynamic dropdowns for filters |
| Indexing | Faster search on millions of rows |
| Authentication & Roles | Admin vs. staff access |
| Server-side caching | Reduce repeated query load |
| Analytics dashboards | Visual charts for category, region, revenue, etc. |

---

## Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB Atlas account
- Yarn or npm

### Setup Backend
```bash
cd backend
npm install
# configure .env with MongoDB URI
npm run dev
Setup Frontend
bash
Copy code
cd frontend
npm install
npm run dev
Access the dashboard at http://localhost:5173 (or the Vite dev server URL).

