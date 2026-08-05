import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  writeBatch
} from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { Product, Order, ConciergeMessage, CustomerVIP, User } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_CUSTOMERS, MOCK_USERS } from '../data/mockData';

const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
let firebaseConfig: any = {};
if (fs.existsSync(configPath)) {
  try {
    firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  } catch (e) {
    console.error('Error reading firebase-applet-config.json:', e);
  }
}

const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(
  firebaseApp,
  firebaseConfig.firestoreDatabaseId || '(default)'
);

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

// --- PRODUCTS ---
export async function getProductsFromFirebase(): Promise<Product[]> {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'products'));
    if (querySnapshot.empty) {
      // Seed default products if database collection is completely new/uninitialized
      console.log('🌱 Firestore products collection empty. Seeding initial products...');
      await seedProductsInFirebase();
      return INITIAL_PRODUCTS;
    }
    const products: Product[] = [];
    querySnapshot.forEach((docSnap) => {
      products.push(docSnap.data() as Product);
    });
    return products;
  } catch (error) {
    console.error('Error fetching products from Firestore:', error);
    return [];
  }
}

export async function saveProductInFirebase(product: Product): Promise<void> {
  try {
    await setDoc(doc(firestore, 'products', product.id), product);
  } catch (error) {
    console.error('Error saving product in Firestore:', error);
  }
}

export async function deleteProductFromFirebase(id: string): Promise<void> {
  try {
    await deleteDoc(doc(firestore, 'products', id));
  } catch (error) {
    console.error('Error deleting product from Firestore:', error);
  }
}

export async function clearAllProductsInFirebase(): Promise<void> {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'products'));
    const batch = writeBatch(firestore);
    querySnapshot.forEach((docSnap) => {
      batch.delete(docSnap.ref);
    });
    await batch.commit();
  } catch (error) {
    console.error('Error clearing products in Firestore:', error);
  }
}

export async function seedProductsInFirebase(): Promise<Product[]> {
  try {
    await clearAllProductsInFirebase();
    for (const prod of INITIAL_PRODUCTS) {
      await setDoc(doc(firestore, 'products', prod.id), prod);
    }
    return INITIAL_PRODUCTS;
  } catch (error) {
    console.error('Error seeding products in Firestore:', error);
    return INITIAL_PRODUCTS;
  }
}

// --- ORDERS ---
export async function getOrdersFromFirebase(): Promise<Order[]> {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'orders'));
    const orders: Order[] = [];
    querySnapshot.forEach((docSnap) => {
      orders.push(docSnap.data() as Order);
    });
    return orders;
  } catch (error) {
    console.error('Error fetching orders from Firestore:', error);
    return [];
  }
}

export async function saveOrderInFirebase(order: Order): Promise<void> {
  try {
    await setDoc(doc(firestore, 'orders', order.id), order);
    // Update stock for purchased products in Firestore
    if (Array.isArray(order.items)) {
      for (const item of order.items) {
        const prodRef = doc(firestore, 'products', item.productId);
        const prodSnap = await getDoc(prodRef);
        if (prodSnap.exists()) {
          const prodData = prodSnap.data() as Product;
          const newQty = Math.max(0, prodData.stockQuantity - item.quantity);
          await setDoc(
            prodRef,
            { stockQuantity: newQty, inStock: newQty > 0 },
            { merge: true }
          );
        }
      }
    }
  } catch (error) {
    console.error('Error saving order in Firestore:', error);
  }
}

export async function updateOrderStatusInFirebase(id: string, status: Order['status']): Promise<void> {
  try {
    await setDoc(doc(firestore, 'orders', id), { status }, { merge: true });
  } catch (error) {
    console.error('Error updating order status in Firestore:', error);
  }
}

export async function clearOrdersInFirebase(): Promise<void> {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'orders'));
    const batch = writeBatch(firestore);
    querySnapshot.forEach((docSnap) => {
      batch.delete(docSnap.ref);
    });
    await batch.commit();
  } catch (error) {
    console.error('Error clearing orders in Firestore:', error);
  }
}

export async function seedOrdersInFirebase(): Promise<Order[]> {
  try {
    await clearOrdersInFirebase();
    for (const order of INITIAL_ORDERS) {
      await setDoc(doc(firestore, 'orders', order.id), order);
    }
    return INITIAL_ORDERS;
  } catch (error) {
    console.error('Error seeding orders in Firestore:', error);
    return INITIAL_ORDERS;
  }
}

// --- CONCIERGE MESSAGES ---
export async function getConciergeFromFirebase(): Promise<ConciergeMessage[]> {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'conciergeMessages'));
    if (querySnapshot.empty) {
      for (const msg of DEFAULT_CONCIERGE_MESSAGES) {
        await setDoc(doc(firestore, 'conciergeMessages', msg.id), msg);
      }
      return DEFAULT_CONCIERGE_MESSAGES;
    }
    const msgs: ConciergeMessage[] = [];
    querySnapshot.forEach((docSnap) => {
      msgs.push(docSnap.data() as ConciergeMessage);
    });
    return msgs;
  } catch (error) {
    console.error('Error fetching concierge messages from Firestore:', error);
    return [];
  }
}

export async function saveConciergeInFirebase(msg: ConciergeMessage): Promise<void> {
  try {
    await setDoc(doc(firestore, 'conciergeMessages', msg.id), msg);
  } catch (error) {
    console.error('Error saving concierge message in Firestore:', error);
  }
}

export async function updateConciergeInFirebase(id: string, updateData: Partial<ConciergeMessage>): Promise<void> {
  try {
    await setDoc(doc(firestore, 'conciergeMessages', id), updateData, { merge: true });
  } catch (error) {
    console.error('Error updating concierge message in Firestore:', error);
  }
}

export async function clearConciergeInFirebase(): Promise<void> {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'conciergeMessages'));
    const batch = writeBatch(firestore);
    querySnapshot.forEach((docSnap) => {
      batch.delete(docSnap.ref);
    });
    await batch.commit();
  } catch (error) {
    console.error('Error clearing concierge in Firestore:', error);
  }
}

// --- SETTINGS ---
export async function getSettingsFromFirebase(): Promise<{ whatsappNumber: string }> {
  try {
    const docRef = doc(firestore, 'settings', 'global');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as { whatsappNumber: string };
    }
    const defaultSettings = { whatsappNumber: '573118444853' };
    await setDoc(docRef, defaultSettings);
    return defaultSettings;
  } catch (error) {
    console.error('Error fetching settings from Firestore:', error);
    return { whatsappNumber: '573118444853' };
  }
}

export async function saveSettingsInFirebase(settings: { whatsappNumber: string }): Promise<void> {
  try {
    await setDoc(doc(firestore, 'settings', 'global'), settings, { merge: true });
  } catch (error) {
    console.error('Error saving settings in Firestore:', error);
  }
}

// --- USERS (ADMIN & SUPERADMIN) ---
export async function getUsersFromFirebase(): Promise<User[]> {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'users'));
    if (querySnapshot.empty) {
      console.log('🌱 Firestore users collection empty. Seeding initial users...');
      return await seedUsersInFirebase();
    }
    const users: User[] = [];
    querySnapshot.forEach((docSnap) => {
      users.push(docSnap.data() as User);
    });
    return users;
  } catch (error) {
    console.error('Error fetching users from Firestore:', error);
    return [];
  }
}

export async function saveUserInFirebase(user: User): Promise<void> {
  try {
    await setDoc(doc(firestore, 'users', user.id), user);
  } catch (error) {
    console.error('Error saving user in Firestore:', error);
  }
}

export async function deleteUserFromFirebase(id: string): Promise<void> {
  try {
    await deleteDoc(doc(firestore, 'users', id));
  } catch (error) {
    console.error('Error deleting user from Firestore:', error);
  }
}

export async function seedUsersInFirebase(): Promise<User[]> {
  try {
    const usersList: User[] = Object.values(MOCK_USERS).map((item) => item.user);
    for (const u of usersList) {
      await setDoc(doc(firestore, 'users', u.id), u);
    }
    return usersList;
  } catch (error) {
    console.error('Error seeding users in Firestore:', error);
    return Object.values(MOCK_USERS).map((item) => item.user);
  }
}

// --- CUSTOMERS (VIP CLIENTS) ---
export async function getCustomersFromFirebase(): Promise<CustomerVIP[]> {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'customers'));
    if (querySnapshot.empty) {
      console.log('🌱 Firestore customers collection empty. Seeding initial VIP customers...');
      return await seedCustomersInFirebase();
    }
    const customers: CustomerVIP[] = [];
    querySnapshot.forEach((docSnap) => {
      customers.push(docSnap.data() as CustomerVIP);
    });
    return customers;
  } catch (error) {
    console.error('Error fetching customers from Firestore:', error);
    return [];
  }
}

export async function saveCustomerInFirebase(customer: CustomerVIP): Promise<void> {
  try {
    await setDoc(doc(firestore, 'customers', customer.id), customer);
  } catch (error) {
    console.error('Error saving customer in Firestore:', error);
  }
}

export async function deleteCustomerFromFirebase(id: string): Promise<void> {
  try {
    await deleteDoc(doc(firestore, 'customers', id));
  } catch (error) {
    console.error('Error deleting customer from Firestore:', error);
  }
}

export async function seedCustomersInFirebase(): Promise<CustomerVIP[]> {
  try {
    for (const cust of INITIAL_CUSTOMERS) {
      await setDoc(doc(firestore, 'customers', cust.id), cust);
    }
    return INITIAL_CUSTOMERS;
  } catch (error) {
    console.error('Error seeding customers in Firestore:', error);
    return INITIAL_CUSTOMERS;
  }
}
