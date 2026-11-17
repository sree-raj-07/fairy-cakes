/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
import IntroSplash from './components/IntroSplash';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DualWorldsSection from './components/DualWorldsSection';
import MenuShowcase from './components/MenuShowcase';
import CakeConfigurator from './components/CakeConfigurator';
import SocialTickerAndFooter from './components/SocialTickerAndFooter';
import { SplatterProvider } from './components/SplatterBurst';
import ItemSplatterModal from './components/ItemSplatterModal';
import OrderTrayDrawer, { type TrayEntry } from './components/OrderTrayDrawer';
import type { MenuCategory, MenuItem } from './data/menuData';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('All Treats');
  const [selectedFlavorId, setSelectedFlavorId] = useState<string>('spanish-delight');
  const [hasCustomPhoto, setHasCustomPhoto] = useState<boolean>(false);
  const [popupItem, setPopupItem] = useState<MenuItem | null>(null);
  const [trayEntries, setTrayEntries] = useState<TrayEntry[]>([]);
  const [isTrayOpen, setIsTrayOpen] = useState<boolean>(false);

  const handleSelectFlavorFromMenu = (flavorId: string, isCustomTheme = false) => {
    setSelectedFlavorId(flavorId);
    if (isCustomTheme) {
      setHasCustomPhoto(true);
    }
  };

  const handleAddToTray = (item: MenuItem, quantity = 1) => {
    setTrayEntries((prev) => {
      const existing = prev.find((e) => e.item.id === item.id);
      if (existing) {
        return prev.map((e) =>
          e.item.id === item.id ? { ...e, quantity: e.quantity + quantity } : e
        );
      }
      return [...prev, { item, quantity }];
    });
  };

  const handleUpdateTrayQty = (itemId: string, delta: number) => {
    setTrayEntries((prev) =>
      prev
        .map((e) => (e.item.id === itemId ? { ...e, quantity: e.quantity + delta } : e))
        .filter((e) => e.quantity > 0)
    );
  };

  const trayCount = trayEntries.reduce((sum, entry) => sum + entry.quantity, 0);

  return (
    <SplatterProvider>
      <IntroSplash />
      <div className="min-h-screen flex flex-col bg-[#FFF8EE] text-[#1A0A10]">
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <DualWorldsSection onJumpToCategory={setActiveCategory} />
          <MenuShowcase
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            selectedFlavorId={selectedFlavorId}
            onSelectFlavor={handleSelectFlavorFromMenu}
            onOpenPopup={(item) => setPopupItem(item)}
            onQuickAddTray={(item) => handleAddToTray(item, 1)}
            trayCount={trayCount}
            onOpenTray={() => setIsTrayOpen(true)}
          />
          <CakeConfigurator
            selectedFlavorId={selectedFlavorId}
            onFlavorChange={setSelectedFlavorId}
            hasCustomPhoto={hasCustomPhoto}
            onToggleCustomPhoto={setHasCustomPhoto}
          />
        </main>
        <SocialTickerAndFooter />

        {/* Splatter Quick-View Popup Modal */}
        <ItemSplatterModal
          item={popupItem}
          onClose={() => setPopupItem(null)}
          onCustomizeCake={handleSelectFlavorFromMenu}
          onAddToTray={handleAddToTray}
        />

        {/* Slide-Over Café & Bakery Order Tray */}
        <OrderTrayDrawer
          isOpen={isTrayOpen}
          onClose={() => setIsTrayOpen(false)}
          entries={trayEntries}
          onUpdateQty={handleUpdateTrayQty}
          onClearTray={() => setTrayEntries([])}
        />

        {/* Compact Floating Café Tray Pill when items > 0 */}
        <AnimatePresence>
          {trayCount > 0 && !isTrayOpen && (
            <motion.button
              type="button"
              initial={{ scale: 0.7, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 20 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsTrayOpen(true)}
              className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 bg-[#FFD166] text-[#1A0A10] font-extrabold text-sm px-5 py-3 rounded-full border-2 border-[#1A0A10] pop-shadow cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Café Tray ({trayCount})</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </SplatterProvider>
  );
}
