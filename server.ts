import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import {
  getProductsFromFirebase,
  saveProductInFirebase,
  deleteProductFromFirebase,
  clearAllProductsInFirebase,
  seedProductsInFirebase,
  getOrdersFromFirebase,
  saveOrderInFirebase,
  updateOrderStatusInFirebase,
  clearOrdersInFirebase,
  seedOrdersInFirebase,
  getConciergeFromFirebase,
  saveConciergeInFirebase,
  updateConciergeInFirebase,
  clearConciergeInFirebase,
  getSettingsFromFirebase,
  saveSettingsInFirebase,
  getUsersFromFirebase,
  saveUserInFirebase,
  deleteUserFromFirebase,
  seedUsersInFirebase,
  getCustomersFromFirebase,
  saveCustomerInFirebase,
  deleteCustomerFromFirebase,
  seedCustomersInFirebase
} from './src/server/firebaseStore.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.static(path.join(process.cwd(), 'public')));

  // API Routes
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', brand: 'AURA & CHRONOS', database: 'Firebase Firestore' });
  });

  // ==========================================
  // SERVER FIREBASE FIRESTORE ENDPOINTS
  // ==========================================

  // Full Database Sync
  app.get('/api/db/sync', async (_req, res) => {
    try {
      const [products, orders, conciergeMessages, settings, users, customers] = await Promise.all([
        getProductsFromFirebase(),
        getOrdersFromFirebase(),
        getConciergeFromFirebase(),
        getSettingsFromFirebase(),
        getUsersFromFirebase(),
        getCustomersFromFirebase()
      ]);
      res.json({ products, orders, conciergeMessages, settings, users, customers });
    } catch (error) {
      console.error('Error in /api/db/sync:', error);
      res.status(500).json({ error: 'Error syncing Firebase Firestore' });
    }
  });

  // --- PRODUCTS API ---
  app.get('/api/db/products', async (_req, res) => {
    const products = await getProductsFromFirebase();
    res.json(products);
  });

  app.post('/api/db/products', async (req, res) => {
    const newProduct = req.body;
    if (!newProduct || !newProduct.id) {
      return res.status(400).json({ error: 'ID de producto requerido' });
    }
    await saveProductInFirebase(newProduct);
    const updatedProducts = await getProductsFromFirebase();
    res.json({ success: true, products: updatedProducts });
  });

  app.put('/api/db/products/:id', async (req, res) => {
    const { id } = req.params;
    const updated = { ...req.body, id };
    await saveProductInFirebase(updated);
    const products = await getProductsFromFirebase();
    res.json({ success: true, products });
  });

  app.delete('/api/db/products/:id', async (req, res) => {
    const { id } = req.params;
    await deleteProductFromFirebase(id);
    const products = await getProductsFromFirebase();
    res.json({ success: true, products });
  });

  app.post('/api/db/products/stock', async (req, res) => {
    const { id, newStock } = req.body;
    const products = await getProductsFromFirebase();
    const prod = products.find((p) => p.id === id);
    if (prod) {
      prod.stockQuantity = Math.max(0, newStock);
      prod.inStock = prod.stockQuantity > 0;
      await saveProductInFirebase(prod);
    }
    const updatedProducts = await getProductsFromFirebase();
    res.json({ success: true, products: updatedProducts });
  });

  app.post('/api/db/products/clear', async (_req, res) => {
    await clearAllProductsInFirebase();
    res.json({ success: true, products: [] });
  });

  app.post('/api/db/products/seed', async (_req, res) => {
    const seeded = await seedProductsInFirebase();
    res.json({ success: true, products: seeded });
  });

  // --- ORDERS API ---
  app.get('/api/db/orders', async (_req, res) => {
    const orders = await getOrdersFromFirebase();
    res.json(orders);
  });

  app.post('/api/db/orders', async (req, res) => {
    const newOrder = req.body;
    if (!newOrder || !newOrder.id) {
      return res.status(400).json({ error: 'Datos de orden inválidos' });
    }
    await saveOrderInFirebase(newOrder);
    const [orders, products] = await Promise.all([
      getOrdersFromFirebase(),
      getProductsFromFirebase()
    ]);
    res.json({ success: true, orders, products });
  });

  app.put('/api/db/orders/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    await updateOrderStatusInFirebase(id, status);
    const orders = await getOrdersFromFirebase();
    res.json({ success: true, orders });
  });

  app.post('/api/db/orders/clear', async (_req, res) => {
    await clearOrdersInFirebase();
    res.json({ success: true, orders: [] });
  });

  app.post('/api/db/orders/seed', async (_req, res) => {
    const orders = await seedOrdersInFirebase();
    res.json({ success: true, orders });
  });

  // --- CONCIERGE MESSAGES API ---
  app.get('/api/db/concierge', async (_req, res) => {
    const messages = await getConciergeFromFirebase();
    res.json(messages);
  });

  app.post('/api/db/concierge', async (req, res) => {
    const newMsg = req.body;
    if (!newMsg || !newMsg.id) {
      return res.status(400).json({ error: 'Mensaje inválido' });
    }
    await saveConciergeInFirebase(newMsg);
    const conciergeMessages = await getConciergeFromFirebase();
    res.json({ success: true, conciergeMessages });
  });

  app.put('/api/db/concierge/:id', async (req, res) => {
    const { id } = req.params;
    await updateConciergeInFirebase(id, req.body);
    const conciergeMessages = await getConciergeFromFirebase();
    res.json({ success: true, conciergeMessages });
  });

  app.post('/api/db/concierge/clear', async (_req, res) => {
    await clearConciergeInFirebase();
    res.json({ success: true, conciergeMessages: [] });
  });

  // --- SETTINGS API ---
  app.get('/api/db/settings', async (_req, res) => {
    const settings = await getSettingsFromFirebase();
    res.json(settings);
  });

  app.post('/api/db/settings', async (req, res) => {
    if (req.body.whatsappNumber) {
      const cleanNum = req.body.whatsappNumber.replace(/\D/g, '');
      await saveSettingsInFirebase({ whatsappNumber: cleanNum });
    }
    const settings = await getSettingsFromFirebase();
    res.json({ success: true, settings });
  });

  // --- USERS API ---
  app.get('/api/db/users', async (_req, res) => {
    const users = await getUsersFromFirebase();
    res.json(users);
  });

  app.post('/api/db/users', async (req, res) => {
    const user = req.body;
    if (!user || !user.id) {
      return res.status(400).json({ error: 'ID de usuario requerido' });
    }
    await saveUserInFirebase(user);
    const users = await getUsersFromFirebase();
    res.json({ success: true, users });
  });

  app.delete('/api/db/users/:id', async (req, res) => {
    const { id } = req.params;
    await deleteUserFromFirebase(id);
    const users = await getUsersFromFirebase();
    res.json({ success: true, users });
  });

  app.post('/api/db/users/seed', async (_req, res) => {
    const users = await seedUsersInFirebase();
    res.json({ success: true, users });
  });

  // --- CUSTOMERS API ---
  app.get('/api/db/customers', async (_req, res) => {
    const customers = await getCustomersFromFirebase();
    res.json(customers);
  });

  app.post('/api/db/customers', async (req, res) => {
    const customer = req.body;
    if (!customer || !customer.id) {
      return res.status(400).json({ error: 'ID de cliente requerido' });
    }
    await saveCustomerInFirebase(customer);
    const customers = await getCustomersFromFirebase();
    res.json({ success: true, customers });
  });

  app.delete('/api/db/customers/:id', async (req, res) => {
    const { id } = req.params;
    await deleteCustomerFromFirebase(id);
    const customers = await getCustomersFromFirebase();
    res.json({ success: true, customers });
  });

  app.post('/api/db/customers/seed', async (_req, res) => {
    const customers = await seedCustomersInFirebase();
    res.json({ success: true, customers });
  });

  // AI Luxury Concierge Endpoint (Server-Side Gemini API)
  app.post('/api/ai/concierge', async (req, res) => {
    try {
      const { prompt, contextType, customerInfo } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Fallback response if API key is not configured in environment
        return res.json({
          reply: `[Modo Asistente de Lujo] AURA & CHRONOS Asistente Especializado: "${prompt}". Recomendamos explorar nuestra línea Oud Impérial Extrait con notas de azafrán de Cachemira y rosa de Taif, o el reloj Chronos Tourbillon Volant Royale con movimiento suizo.`
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      let systemInstruction = `Eres el Sommelier de Fragancias y Maestro Horólogo en jefe de AURA & CHRONOS, una boutique de ultra-lujo especializada en perfumes de nicho (Oud, Iris, Rosa de Taif, Ámbar) y alta relojería suiza (Tourbillons, Fases Lunares, Esqueletos).
Tu tono es sumamente elegante, sofisticado, cálido, poético y servicial. Responde siempre en español de alta sociedad y lujo.
Proporciona recomendaciones personalizadas, pirámides olfativas, especificaciones de complicaciones horológicas y redacción para mercadotecnia.`;

      if (contextType === 'crm_gift') {
        systemInstruction += `\nGenera una sugerencia de regalo personalizado para el cliente VIP: ${JSON.stringify(customerInfo || {})}. Incluye nota de regalo y maridaje entre perfume y reloj.`;
      } else if (contextType === 'product_description') {
        systemInstruction += `\nRedacta una descripción poética y persuasiva para un nuevo producto de perfume o alta relojería de lujo.`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `${systemInstruction}\n\nConsulta del usuario: ${prompt}`
      });

      const replyText = response.text || 'No se pudo obtener respuesta.';
      res.json({ reply: replyText });
    } catch (error: any) {
      console.error('Error in AI Concierge:', error);
      res.status(500).json({
        error: 'Error al consultar el asistente de lujo',
        details: error?.message || 'Error interno'
      });
    }
  });

  // Vite middleware in dev mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AURA & CHRONOS Luxury Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
