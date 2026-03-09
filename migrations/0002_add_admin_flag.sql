-- Migration: Add is_admin to businesses
ALTER TABLE businesses ADD COLUMN is_admin BOOLEAN DEFAULT 0;
