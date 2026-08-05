import fs from 'fs';
import path from 'path';
import { Product, Order, ConciergeMessage } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from '../data/mockData';

export interface DatabaseSchema {
  products: Product[];
  orders: Order[];
  conciergeMessages: ConciergeMessage[];
  settings: {
    whatsappNumber: string;
  };
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

const DEFAULT_CONCIERGE_MESSAGES: ConciergeMessage[] = [
  {
    id: 'MSG-001',
    timestamp: '2026-08-04 10:30',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@mendozalaw.co',
    phone: '+57 300 987 6543',
    subject: 'Asesoría de Perfumes de Nicho',
    message: 'Solicito asesoría exclusiva para un extracto de perfume de Oud de edición limitada y grabado VIP.',
    read: false,
    status: 'Nuevo'
  }
];

const DEFAULT_DB: DatabaseSchema = {
  products: INITIAL_PRODUCTS,
  orders: INITIAL_ORDERS,
  conciergeMessages: DEFAULT_CONCIERGE_MESSAGES,
  settings: {
    whatsappNumber: '573118444853'
  }
};

function ensureDbFileExists(): void {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_DB, null, 2), 'utf-8');
  }
}

export function readDb(): DatabaseSchema {
  ensureDbFileExists();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const data = JSON.parse(raw);
    return {
      products: Array.isArray(data.products) ? data.products : DEFAULT_DB.products,
      orders: Array.isArray(data.orders) ? data.orders : DEFAULT_DB.orders,
      conciergeMessages: Array.isArray(data.conciergeMessages) ? data.conciergeMessages : DEFAULT_DB.conciergeMessages,
      settings: {
        whatsappNumber: data?.settings?.whatsappNumber || DEFAULT_DB.settings.whatsappNumber
      }
    };
  } catch (error) {
    console.error('Error reading DB file, returning defaults:', error);
    return DEFAULT_DB;
  }
}

export function writeDb(data: DatabaseSchema): void {
  ensureDbFileExists();
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing DB file:', error);
  }
}
