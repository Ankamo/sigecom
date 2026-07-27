import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroBanner } from './components/storefront/HeroBanner';
import { ProductGrid } from './components/storefront/ProductGrid';
import { ProductDetailModal } from './components/storefront/ProductDetailModal';
import { FragranceQuizModal } from './components/storefront/FragranceQuizModal';
import { BrandStory } from './components/storefront/BrandStory';
import { CartDrawer } from './components/storefront/CartDrawer';
import { CheckoutModal } from './components/storefront/CheckoutModal';

import { SaasLayout } from './components/saas/SaasLayout';
import { SaasAnalytics } from './components/saas/SaasAnalytics';
import { SaasInventory } from './components/saas/SaasInventory';
import { SaasCRM } from './components/saas/SaasCRM';
import { SaasOrders } from './components/saas/SaasOrders';
import { SaasAiConcierge } from './components/saas/SaasAiConcierge';

const MainAppContent: React.FC = () => {
  const { viewMode, activeTab } = useApp();

  if (viewMode === 'saas_dashboard') {
    return (
      <SaasLayout>
        {activeTab === 'analytics' && <SaasAnalytics />}
        {activeTab === 'inventory' && <SaasInventory />}
        {activeTab === 'crm' && <SaasCRM />}
        {activeTab === 'orders' && <SaasOrders />}
        {activeTab === 'ai_concierge' && <SaasAiConcierge />}
      </SaasLayout>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-zinc-950 transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        {activeTab === 'explore' && (
          <>
            <HeroBanner />
            <ProductGrid />
            <BrandStory />
          </>
        )}

        {(activeTab === 'perfumes' || activeTab === 'watches') && (
          <>
            <ProductGrid />
            <BrandStory />
          </>
        )}

        {activeTab === 'story' && <BrandStory />}
      </main>

      <Footer />

      {/* Global Storefront Modals & Drawers */}
      <ProductDetailModal />
      <FragranceQuizModal />
      <CartDrawer />
      <CheckoutModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
