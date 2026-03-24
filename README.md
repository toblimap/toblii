# TOBLI — Location-Based Business Discovery

A premium location-based business discovery platform built with **React 19**, **Cloudflare Pages**, and **D1 Database**. Tobli lets users find nearby businesses on a live map, view product/service listings with real-time pricing, and contact businesses directly — all served via a lightning-fast edge infrastructure.

## 🛠️ Tech Stack

| Layer              | Technology                                      |
|--------------------|--------------------------------------------------|
| **Frontend**       | React 19 + Vite 7 + Tailwind CSS + Framer Motion |
| **Backend API**    | Cloudflare Pages Functions (Hono + D1)           |
| **Database**       | Cloudflare D1 (Edge SQL)                         |
| **State**          | Zustand                                          |
| **Maps**           | Leaflet with custom dark-mode tiles              |
| **Routing**        | React Router v6 + OSRM Road Routing              |
| **Excel I/O**      | SheetJS (`xlsx`)                                 |
| **Icons**          | Lucide React                                     |
| **Deployment**     | Cloudflare Pages                                 |

---

## 🚀 Key Features

### User Experience (Map View)
- **Fluid Typewriter Search**: High-impact landing animation with dynamic product discovery.
- **Road-Based Routing**: Real-time dashed polyline connecting you to businesses via actual street paths.
- **Nearest-First Logic**: Results are automatically ranked and cycle-able via the "Next Alternative" system.
- **Glassmorphic Popups**: Premium, dark-themed business cards showing full contact details (WhatsApp, Call, Socials).

### Business Dashboard (`/dashboard`)
- **Real-Time Inventory**: Manage products/services with instant D1 database synchronization.
- **Excel Bulk Actions**: Upload inventories via `.xlsx` or export templates for offline editing.
- **Strategic Controls**: Toggle business visibility (Open/Closed) and manage subscription status.
- **GPS Pinning**: Precisely set your business coordinates directly from your device.

### Admin Dashboard (`/admin`)
- **Platform Analytics**: Track total businesses, active subscriptions, and monthly revenue.
- **Business Management**: Activate or suspend businesses with a single click.
- **Transaction Logs**: Export full payment history to CSV for accounting.

---

## 💻 Getting Started (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Initialize Local Database
Tobli uses Cloudflare D1 for data persistence. You must initialize your local emulation environment with the schema:
```bash
npm run db:init
```

### 3. Run Development Server
Start the integrated environment (Vite frontend + Wrangler backend functions):
```bash
npm run dev
```
The app will be available at **http://localhost:8788** (Wrangler Proxy port).

### 4. Deploy to Production
```bash
npm run pages:deploy
```

---

## 📦 Project Structure

```
toblii/
├── functions/api/      # Cloudflare Pages Functions (Backend API)
├── src/
│   ├── components/     # UI Components (Map, Search, Popups)
│   ├── pages/          # Full-page views (Home, Dashboards, Auth)
│   ├── store/          # Zustand State (Auth & App State)
│   └── App.jsx         # Routes & Layout
├── schema.sql          # D1 Database definition
├── wrangler.toml       # Cloudflare configuration
└── package.json        # Integrated dev scripts
```

---

## 🔑 Admin Access
For local development, any email containing the word **"admin"** (e.g., `admin@tobli.ug`) is granted administrative privileges automatically via the `authStore`.

---

Built with ❤️ by the Tobli team.
