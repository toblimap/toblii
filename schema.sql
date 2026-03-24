-- D1 Database Schema for Tobli Platform

-- Businesses
CREATE TABLE IF NOT EXISTS businesses (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  owner_name TEXT,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  sector TEXT, -- Goods, Services, or Both
  lat REAL,
  lng REAL,
  is_open INTEGER DEFAULT 0, -- 0 for false, 1 for true
  is_admin INTEGER DEFAULT 0,
  subscription_status TEXT DEFAULT 'inactive', -- active, inactive
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
  type TEXT NOT NULL, -- product, service
  price REAL DEFAULT 0,
  available INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE
);

-- Transactions (Subscription Payments)
CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY,
  business_id TEXT NOT NULL,
  amount REAL NOT NULL,
  method TEXT,
  reference TEXT UNIQUE,
  paid_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (business_id) REFERENCES businesses(id)
);

-- Mock Data: Admin Account
INSERT OR IGNORE INTO businesses (id, name, owner_name, email, is_admin, subscription_status) 
VALUES ('admin-uuid-001', 'Tobli Admin', 'System Administrator', 'admin@tobli.ug', 1, 'active');

-- Mock Data: A Business
INSERT OR IGNORE INTO businesses (id, name, owner_name, email, phone, sector, lat, lng, is_open, subscription_status)
VALUES ('biz-uuid-001', 'Café Javas', 'John Doe', 'john@cafejavas.ug', '0700000001', 'Both', 0.3476, 32.5825, 1, 'active');

-- Mock Data: Listings for Café Javas
INSERT OR IGNORE INTO listings (id, business_id, name, type, price, available)
VALUES ('item-001', 'biz-uuid-001', 'Premium Coffee Beans', 'product', 25000, 1),
       ('item-002', 'biz-uuid-001', 'House Blend Cappuccino', 'product', 15000, 1);
