-- D1 Production-Ready Schema for Tobli
-- Implements H3 Spatial Indexing & Bcrypt Auth

-- Businesses (Owners/Users)
CREATE TABLE IF NOT EXISTS businesses (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  password_hash TEXT NOT NULL,
  sector TEXT CHECK(sector IN ('Goods', 'Services', 'Both')),
  lat REAL,
  lng REAL,
  h3_index TEXT, -- H3 Index at resolution 7-9 for spatial search
  is_open INTEGER DEFAULT 0,
  is_admin INTEGER DEFAULT 0,
  is_suspended INTEGER DEFAULT 0,
  subscription_status TEXT DEFAULT 'inactive',
  paid_at DATETIME,
  expires_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Listings (Products/Services)
CREATE TABLE IF NOT EXISTS listings (
  id TEXT PRIMARY KEY,
  business_id TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT CHECK(type IN ('product', 'service')),
  price REAL DEFAULT 0,
  available INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE
);

-- Payment Ledger
CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY,
  business_id TEXT NOT NULL,
  amount REAL NOT NULL,
  method TEXT,
  reference TEXT UNIQUE,
  status TEXT DEFAULT 'pending', -- pending, completed, failed
  paid_at DATETIME,
  FOREIGN KEY (business_id) REFERENCES businesses(id)
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_biz_email ON businesses(email);
CREATE INDEX IF NOT EXISTS idx_biz_h3 ON businesses(h3_index);
CREATE INDEX IF NOT EXISTS idx_listings_name ON listings(name);
CREATE INDEX IF NOT EXISTS idx_listings_biz ON listings(business_id);
