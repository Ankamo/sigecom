import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.static(path.join(process.cwd(), 'public')));

  // API Routes
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', brand: 'AURA & CHRONOS' });
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
