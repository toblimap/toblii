-- Migration: Initial Schema for TOBLI

-- Businesses Table
CREATE TABLE businesses (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    owner_name TEXT,
    sector TEXT,
    description TEXT,
    lat REAL,
    lng REAL,
    whatsapp TEXT,
    phone TEXT,
    email TEXT UNIQUE,
    instagram TEXT,
    x_handle TEXT,
    password_hash TEXT,
    subscription_status TEXT DEFAULT 'inactive',
    subscription_expires_at DATETIME,
    is_open BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Items Table (Products or Services)
CREATE TABLE items (
    id TEXT PRIMARY KEY,
    business_id TEXT NOT NULL,
    name TEXT NOT NULL,
    type TEXT CHECK(type IN ('product', 'service')),
    price REAL,
    available BOOLEAN DEFAULT 1,
    featured BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE
);

-- Subscriptions Table
CREATE TABLE subscriptions (
    id TEXT PRIMARY KEY,
    business_id TEXT NOT NULL,
    amount REAL NOT NULL,
    paid_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME,
    method TEXT,
    pesapal_reference TEXT UNIQUE,
    FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE
);

-- FTS5 Full Text Search Index on items.name
CREATE VIRTUAL TABLE items_fts USING fts5(
    name,
    content='items',
    content_rowid='rowid'
);

-- Triggers to keep FTS index in sync with items table
CREATE TRIGGER items_ai AFTER INSERT ON items BEGIN
  INSERT INTO items_fts(rowid, name) VALUES (new.rowid, new.name);
END;

CREATE TRIGGER items_ad AFTER DELETE ON items BEGIN
  INSERT INTO items_fts(items_fts, rowid, name) VALUES('delete', old.rowid, old.name);
END;

CREATE TRIGGER items_au AFTER UPDATE ON items BEGIN
  INSERT INTO items_fts(items_fts, rowid, name) VALUES('delete', old.rowid, old.name);
  INSERT INTO items_fts(rowid, name) VALUES (new.rowid, new.name);
END;
