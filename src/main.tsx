import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register Service Worker for PWA (iOS & Android)
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        console.log('AURA & CHRONOS ServiceWorker registrado exitosamente:', reg.scope);
      })
      .catch((err) => {
        console.log('Error registrando ServiceWorker:', err);
      });
  });
} else if ('serviceWorker' in navigator) {
  // Always register in dev preview mode for immediate testing
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        console.log('ServiceWorker dev activo:', reg.scope);
      })
      .catch((err) => {
        console.log('SW register note:', err);
      });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
