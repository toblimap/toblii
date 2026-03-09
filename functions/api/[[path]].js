import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt';
import bcrypt from 'bcryptjs';

const app = new Hono().basePath('/api');

// --- AUTH MIDDLEWARE ---
const authMiddleware = async (c, next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader) return c.json({ error: 'Unauthorized' }, 401);
  const token = authHeader.replace('Bearer ', '');
  try {
    const payload = await verify(token, c.env.JWT_SECRET || 'fallback_secret');
    c.set('userId', payload.id);
    await next();
  } catch (err) {
    return c.json({ error: 'Invalid token' }, 401);
  }
};

const adminMiddleware = async (c, next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader) return c.json({ error: 'Unauthorized' }, 401);
  const token = authHeader.replace('Bearer ', '');
  try {
    const payload = await verify(token, c.env.JWT_SECRET || 'fallback_secret');
    const db = c.env.DB;
    const user = await db.prepare('SELECT is_admin FROM businesses WHERE id = ?').bind(payload.id).first();
    if (!user || !user.is_admin) return c.json({ error: 'Forbidden' }, 403);
    c.set('userId', payload.id);
    await next();
  } catch (err) {
    return c.json({ error: 'Invalid token' }, 401);
  }
};

// --- AUTH ROUTES ---
app.post('/auth/signup', async (c) => {
  const { business_name, owner_name, sector, phone, email, password } = await c.req.json();
  const db = c.env.DB;
  if (!email || !password || !business_name) return c.json({ error: 'Missing fields' }, 400);
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const id = crypto.randomUUID();
  try {
    await db.prepare('INSERT INTO businesses (id, name, owner_name, sector, phone, email, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?)')
      .bind(id, business_name, owner_name, sector, phone, email, hash).run();
    const token = await sign({ id, email }, c.env.JWT_SECRET || 'fallback_secret');
    return c.json({ token, business: { id, name: business_name, email } });
  } catch (err) {
    return c.json({ error: 'User exists or DB error' }, 400);
  }
});

app.post('/auth/login', async (c) => {
  const { identifier, password } = await c.req.json();
  const db = c.env.DB;
  const business = await db.prepare('SELECT * FROM businesses WHERE email = ? OR phone = ?').bind(identifier, identifier).first();
  if (!business || !(await bcrypt.compare(password, business.password_hash))) {
    return c.json({ error: 'Invalid credentials' }, 401);
  }
  const token = await sign({ id: business.id, email: business.email }, c.env.JWT_SECRET || 'fallback_secret');
  delete business.password_hash;
  return c.json({ token, business });
});

app.get('/auth/me', authMiddleware, async (c) => {
  const id = c.get('userId');
  const business = await c.env.DB.prepare('SELECT * FROM businesses WHERE id = ?').bind(id).first();
  if (!business) return c.json({ error: 'Not found' }, 404);
  delete business.password_hash;
  return c.json({ business });
});

// --- SEARCH ROUTES ---
app.post('/search', async (c) => {
  const { query, lat, lng, radius_km = 5 } = await c.req.json();
  const db = c.env.DB;
  const cleanQ = (query || '').replace(/[^\w\s]/g, '').trim();
  if (!cleanQ) return c.json({ results: [] });
  
  const searchSql = `
    SELECT i.name as item_name, i.price, b.name as business_name, b.id as business_id, b.lat, b.lng, b.whatsapp, b.phone, b.instagram, b.x_handle, b.sector,
    (6371 * acos(cos(radians(?)) * cos(radians(b.lat)) * cos(radians(b.lng) - radians(?)) + sin(radians(?)) * sin(radians(b.lat)))) AS distance
    FROM items i JOIN items_fts f ON i.rowid = f.rowid JOIN businesses b ON i.business_id = b.id
    WHERE f.name MATCH ? AND i.available = 1 AND b.is_open = 1 AND b.subscription_status = 'active' AND distance <= ?
    ORDER BY distance ASC LIMIT 50
  `;
  try {
    const { results } = await db.prepare(searchSql).bind(lat, lng, lat, cleanQ, radius_km).all();
    return c.json({ results });
  } catch(e) {
    return c.json({ results: [], error: e.message });
  }
});

// --- LISTINGS ROUTES ---
app.get('/listings', authMiddleware, async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM items WHERE business_id = ?').bind(c.get('userId')).all();
  return c.json({ results });
});

app.post('/listings', authMiddleware, async (c) => {
  const { name, type, price, available } = await c.req.json();
  await c.env.DB.prepare('INSERT INTO items (id, business_id, name, type, price, available) VALUES (?, ?, ?, ?, ?, ?)')
    .bind(crypto.randomUUID(), c.get('userId'), name, type, parseFloat(price), available ? 1 : 0).run();
  return c.json({ message: 'Created' });
});

app.patch('/listings/:id/toggle', authMiddleware, async (c) => {
  const { field } = await c.req.json();
  await c.env.DB.prepare(`UPDATE items SET ${field} = NOT ${field} WHERE id = ? AND business_id = ?`).bind(c.req.param('id'), c.get('userId')).run();
  return c.json({ message: 'Toggled' });
});

// --- BUSINESS STATUS ---
app.post('/business/toggle-open', authMiddleware, async (c) => {
  await c.env.DB.prepare('UPDATE businesses SET is_open = NOT is_open WHERE id = ?').bind(c.get('userId')).run();
  return c.json({ message: 'Toggled' });
});

// --- ADMIN ROUTES ---
app.get('/admin/stats', adminMiddleware, async (c) => {
  const db = c.env.DB;
  const total = await db.prepare('SELECT COUNT(*) as c FROM businesses').first();
  const active = await db.prepare("SELECT COUNT(*) as c FROM businesses WHERE subscription_status = 'active'").first();
  return c.json({ stats: [{ label: 'Total Businesses', value: total.c }, { label: 'Active Subscriptions', value: active.c, color: 'text-green-500' }] });
});

export const onRequest = (context) => {
  return app.fetch(context.request, context.env, context.ctx);
};
