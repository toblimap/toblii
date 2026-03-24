import { Hono } from 'hono';
import { handle } from 'hono/cloudflare-pages';

const app = new Hono().basePath('/api');

// --- AUTH ---
app.post('/auth/signin', async (c) => {
  const { email, password } = await c.req.json();
  const db = c.env.DB;
  
  const user = await db.prepare('SELECT * FROM businesses WHERE email = ?').bind(email).first();
  
  if (!user) return c.json({ error: 'User not found' }, 401);
  // MOCK: In real life, verify password hash here
  
  return c.json({ 
    user: { id: user.id }, 
    business: user,
    isAdmin: !!user.is_admin 
  });
});

app.post('/auth/signup', async (c) => {
  const data = await c.req.json();
  const db = c.env.DB;
  const id = crypto.randomUUID();
  
  await db.prepare(`
    INSERT INTO businesses (id, name, owner_name, email, phone, sector)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(id, data.name, data.owner_name, data.email, data.phone, data.sector).run();
  
  const user = await db.prepare('SELECT * FROM businesses WHERE id = ?').bind(id).first();
  return c.json({ user: { id }, business: user });
});

// --- SEARCH & MAP ---
app.get('/search', async (c) => {
  const q = c.req.query('q') || '';
  const db = c.env.DB;
  
  const results = await db.prepare(`
    SELECT b.id as business_id, b.name as business_name, b.lat, b.lng, b.whatsapp, b.phone, b.is_open,
           l.id as item_id, l.name as item_name, l.price, l.type
    FROM businesses b
    JOIN listings l ON b.id = l.business_id
    WHERE (b.name LIKE ? OR l.name LIKE ?) AND b.subscription_status = 'active'
  `).bind(`%${q}%`, `%${q}%`).all();
  
  return c.json(results.results);
});

// --- BUSINESS LISTINGS ---
app.get('/listings/:bizId', async (c) => {
  const bizId = c.req.param('bizId');
  const db = c.env.DB;
  const result = await db.prepare('SELECT * FROM listings WHERE business_id = ?').bind(bizId).all();
  return c.json(result.results);
});

app.post('/listings', async (c) => {
  const item = await c.req.json();
  const db = c.env.DB;
  const id = crypto.randomUUID();
  
  await db.prepare(`
    INSERT INTO listings (id, business_id, name, type, price, available)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(id, item.business_id, item.name, item.type, item.price, 1).run();
  
  return c.json({ success: true, id });
});

app.delete('/listings/:id', async (c) => {
  const id = c.req.param('id');
  const db = c.env.DB;
  await db.prepare('DELETE FROM listings WHERE id = ?').run(id);
  return c.json({ success: true });
});

// --- ADMIN ---
app.get('/admin/businesses', async (c) => {
  const db = c.env.DB;
  const result = await db.prepare('SELECT * FROM businesses').all();
  return c.json(result.results);
});

app.get('/admin/transactions', async (c) => {
  const db = c.env.DB;
  const result = await db.prepare(`
    SELECT t.*, b.name as business_name 
    FROM transactions t 
    JOIN businesses b ON t.business_id = b.id
  `).all();
  return c.json(result.results);
});

export const onRequest = handle(app);
