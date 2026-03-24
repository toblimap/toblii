import { Hono } from 'hono';
import { handle } from 'hono/cloudflare-pages';
import bcrypt from 'bcryptjs';
import * as h3 from 'h3-js';

const app = new Hono().basePath('/api');

app.onError((err, c) => {
  console.error('SERVER_ERROR:', err);
  return c.json({ error: err.message, stack: err.stack }, 500);
});

// --- Spatial Utilities ---
const H3_RESOLUTION = 7; // Approx 5km cells

// --- AUTH ---
app.post('/auth/signin', async (c) => {
  const { email, password } = await c.req.json();
  const db = c.env.DB;

  const user = await db.prepare('SELECT * FROM businesses WHERE email = ?').bind(email.toLowerCase()).first();
  
  if (!user) return c.json({ error: 'User not found' }, 401);
  if (user.is_suspended === 1) return c.json({ error: 'Account suspended' }, 403);

  const isValid = bcrypt.compareSync(password, user.password_hash);
  if (!isValid) return c.json({ error: 'Invalid credentials' }, 401);

  return c.json({ 
    user: { id: user.id }, 
    business: user,
    isAdmin: !!user.is_admin 
  });
});

app.post('/auth/signup', async (c) => {
  console.log('API: Processing Signup...');
  const data = await c.req.json();
  const db = c.env.DB;
  const id = crypto.randomUUID();

  // Hash password (Sync is safer in some worker versions)
  const hash = bcrypt.hashSync(data.password, 10);

  // Compute Spatial Index
  let h3Index = null;
  if (data.lat && data.lng) {
    h3Index = h3.latLngToCell(data.lat, data.lng, H3_RESOLUTION);
  } else {
    // Default to Kampala center if not provided (safe choice for demo)
    h3Index = h3.latLngToCell(0.3476, 32.5825, H3_RESOLUTION);
  }

  try {
    await db.prepare(`
      INSERT INTO businesses (id, name, owner_name, email, phone, sector, password_hash, lat, lng, h3_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(id, data.name, data.owner_name, data.email.toLowerCase(), data.phone, data.sector, hash, data.lat || null, data.lng || null, h3Index).run();
    
    // Auto-login after signup
    const user = await db.prepare('SELECT * FROM businesses WHERE id = ?').bind(id).first();
    return c.json({ user: { id }, business: user });
  } catch (err) {
    if (err.message.includes('UNIQUE')) return c.json({ error: 'Email already exists' }, 400);
    throw err;
  }
});

// --- SEARCH & MAP (H3 Expandable Radius) ---
app.get('/search', async (c) => {
  const q = c.req.query('q') || '';
  const latStr = c.req.query('lat');
  const lngStr = c.req.query('lng');
  const db = c.env.DB;

  if (!latStr || !lngStr) {
    // Basic fallback: just textual search
    const results = await db.prepare(`
      SELECT b.id as business_id, b.name as business_name, b.lat, b.lng, b.whatsapp, b.phone, b.is_open,
             l.id as item_id, l.name as item_name, l.price, l.type
      FROM businesses b
      JOIN listings l ON b.id = l.business_id
      WHERE (b.name LIKE ? OR l.name LIKE ?) 
      AND b.subscription_status = 'active' AND b.is_suspended = 0
    `).bind(`%${q}%`, `%${q}%`).all();
    return c.json(results.results);
  }

  const lat = parseFloat(latStr);
  const lng = parseFloat(lngStr);
  const centerH3 = h3.latLngToCell(lat, lng, H3_RESOLUTION);

  // Radius loop (K rings in H3)
  // ring 0 = current cell, ring 1 = immediate neighbors, etc.
  let matchingH3s = [];
  let found = [];
  
  for (let ring = 0; ring <= 2; ring++) { // Expand up to 2 rings (~15km)
    matchingH3s = h3.gridDisk(centerH3, ring);
    
    // Query businesses in these H3 cells
    const placeholders = matchingH3s.map(() => '?').join(',');
    const results = await db.prepare(`
      SELECT b.id as business_id, b.name as business_name, b.lat, b.lng, b.whatsapp, b.phone, b.is_open,
             l.id as item_id, l.name as item_name, l.price, l.type
      FROM businesses b
      JOIN listings l ON b.id = l.business_id
      WHERE (b.name LIKE ? OR l.name LIKE ?) 
      AND b.h3_index IN (${placeholders})
      AND b.subscription_status = 'active' AND b.is_suspended = 0
    `).bind(`%${q}%`, `%${q}%`, ...matchingH3s).all();

    if (results.results.length > 0) {
      found = results.results;
      break; // Found results in this ring, stop expansion
    }
  }

  return c.json(found);
});

// --- BUSINESS LISTINGS (CRUD) ---
app.get('/listings/:bizId', async (c) => {
  const bizId = c.req.param('bizId');
  const result = await c.env.DB.prepare('SELECT * FROM listings WHERE business_id = ? ORDER BY created_at DESC').bind(bizId).all();
  return c.json(result.results);
});

app.post('/listings', async (c) => {
  const { business_id, name, type, price } = await c.req.json();
  const id = crypto.randomUUID();
  await c.env.DB.prepare(`
    INSERT INTO listings (id, business_id, name, type, price, available)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(id, business_id, name, type, parseFloat(price), 1).run();
  return c.json({ success: true, id });
});

app.delete('/listings/:id', async (c) => {
  const id = c.req.param('id');
  await c.env.DB.prepare('DELETE FROM listings WHERE id = ?').bind(id).run();
  return c.json({ success: true });
});

app.patch('/listings/:id/toggle', async (c) => {
  const id = c.req.param('id');
  await c.env.DB.prepare('UPDATE listings SET available = 1 - available WHERE id = ?').bind(id).run();
  return c.json({ success: true });
});

// --- ADMIN ---
app.get('/admin/businesses', async (c) => {
  const result = await c.env.DB.prepare('SELECT * FROM businesses ORDER BY created_at DESC').all();
  return c.json(result.results);
});

app.patch('/admin/businesses/:id/status', async (c) => {
  const id = c.req.param('id');
  const { is_suspended } = await c.req.json();
  await c.env.DB.prepare('UPDATE businesses SET is_suspended = ? WHERE id = ?').bind(is_suspended, id).run();
  return c.json({ success: true });
});

export const onRequest = handle(app);
