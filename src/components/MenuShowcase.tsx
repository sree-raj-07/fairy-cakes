import { AnimatePresence, motion } from 'motion/react';
import { Check, Eye, Plus, ShoppingBag, Sparkles } from 'lucide-react';
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  type MenuCategory,
  type MenuItem,
} from '../data/menuData';
import { useSplatter } from './SplatterBurst';

interface MenuShowcaseProps {
  activeCategory: MenuCategory;
  onCategoryChange: (category: MenuCategory) => void;
  selectedFlavorId: string;
  onSelectFlavor: (flavorId: string, isCustomTheme?: boolean) => void;
  onOpenPopup: (item: MenuItem) => void;
  onQuickAddTray: (item: MenuItem) => void;
  trayCount: number;
  onOpenTray: () => void;
}

export default function MenuShowcase({
  activeCategory,
  onCategoryChange,
  selectedFlavorId,
  onSelectFlavor,
  onOpenPopup,
  onQuickAddTray,
  trayCount,
  onOpenTray,
}: MenuShowcaseProps) {
  const { triggerSplatter } = useSplatter();

  const filteredItems =
    activeCategory === 'All Treats'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const handleSelectCake = (item: MenuItem, clientX: number, clientY: number) => {
    triggerSplatter(clientX, clientY, item.stripColor);
    onSelectFlavor(item.id, Boolean(item.isCustomQuote));
    const el = document.getElementById('custom-cake');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="menu"
      className="relative bg-white py-16 sm:py-24 border-t-[3px] border-[#1A0A10] overflow-hidden"
    >
      {/* Subtle Background Confetti */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <circle cx="80" cy="140" r="26" fill="#FFD166" />
        <circle cx="1370" cy="300" r="34" fill="#2EC4B6" />
        <rect x="1280" y="95" width="24" height="8" rx="4" fill="#C9185B" transform="rotate(24 1280 95)" />
        <rect x="110" y="720" width="24" height="8" rx="4" fill="#2EC4B6" transform="rotate(-20 110 720)" />
        <circle cx="1350" cy="780" r="20" fill="#FFD166" />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-extrabold tracking-widest text-[#007982] uppercase mb-2">
              Explore Every Craving
            </p>
            <h2
              className="font-display font-extrabold text-[#1A0A10] text-3xl sm:text-4xl lg:text-5xl tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Our Sweet &amp; Savory Menu
            </h2>
            <p className="mt-3 text-[#1A0A10]/80 text-base sm:text-lg">
              Click any item for a splatter quick-view, pre-fill the Cake Lab, or add café bites
              &amp; shakes straight to your Café Tray.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenTray}
            className="inline-flex items-center gap-2.5 bg-[#1A0A10] hover:bg-[#32131E] text-[#FFD166] font-extrabold text-sm px-5 py-3 rounded-full border-2 border-[#1A0A10] pop-shadow-sm transition-transform duration-150 hover:-translate-y-0.5 self-start md:self-auto whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Café Tray ({trayCount})</span>
          </button>
        </div>

        {/* Kinetic Category Filter Pills */}
        <div
          role="tablist"
          aria-label="Menu Categories"
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10"
        >
          {MENU_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={(e) => {
                  triggerSplatter(e.clientX, e.clientY, '#2EC4B6');
                  onCategoryChange(category);
                }}
                className={`relative px-4 sm:px-5 py-2.5 rounded-full text-sm font-extrabold border-2 border-[#1A0A10] whitespace-nowrap shrink-0 transition-all duration-150 min-h-[42px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2EC4B6] ${
                  isActive
                    ? 'bg-[#FFD166] text-[#1A0A10] pop-shadow-sm -translate-y-0.5'
                    : 'bg-[#FFF8EE] text-[#1A0A10] hover:bg-[#FFD166]/45'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Menu Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const isSelected = item.isCake && selectedFlavorId === item.id;

              return (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className={`bg-[#FFF8EE] border-[2.5px] border-[#1A0A10] rounded-2xl overflow-hidden flex flex-col pop-shadow pop-card-hover ${
                    isSelected ? 'ring-4 ring-[#2EC4B6]' : ''
                  }`}
                >
                  {/* Colorful Top Header Strip */}
                  <div
                    className="px-5 py-2.5 border-b-[2.5px] border-[#1A0A10] flex items-center justify-between gap-2"
                    style={{
                      backgroundColor: item.stripColor,
                      color: item.stripTextColor,
                    }}
                  >
                    <span className="text-xs font-extrabold tracking-wide uppercase">
                      {item.stripLabel}
                    </span>
                    {item.isBestseller && (
                      <span className="inline-flex items-center gap-1 text-xs font-extrabold">
                        <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Top Pick</span>
                      </span>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-1 justify-between gap-5">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => onOpenPopup(item)}
                          className="text-left group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2EC4B6] rounded"
                        >
                          <h3 className="font-display font-extrabold text-xl text-[#1A0A10] leading-snug group-hover:text-[#C9185B] transition-colors">
                            {item.name}
                          </h3>
                        </button>
                        <span className="inline-block bg-white border-2 border-[#1A0A10] text-[#1A0A10] font-extrabold text-sm px-3 py-1 rounded-full tabular-nums whitespace-nowrap shrink-0 -rotate-1">
                          {item.priceDisplay}
                        </span>
                      </div>

                      <p className="mt-3 text-[#1A0A10]/85 text-[15px] leading-relaxed font-medium">
                        {item.description}
                      </p>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="flex items-center gap-2.5">
                      {item.isCake ? (
                        <button
                          type="button"
                          onClick={(e) => handleSelectCake(item, e.clientX, e.clientY)}
                          className={`flex-1 inline-flex items-center justify-center gap-2 font-extrabold text-sm px-4 py-3 rounded-full border-2 border-[#1A0A10] transition-colors min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2EC4B6] ${
                            isSelected
                              ? 'bg-[#2EC4B6] text-[#1A0A10]'
                              : 'bg-[#FFD166] hover:bg-[#ffe08f] text-[#1A0A10]'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                              <span>Selected in Cake Lab</span>
                            </>
                          ) : (
                            <span>
                              {item.isCustomQuote ? 'Customize Theme' : 'Select Flavor'}
                            </span>
                          )}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            triggerSplatter(e.clientX, e.clientY, '#2EC4B6');
                            onQuickAddTray(item);
                          }}
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#007982] hover:bg-[#006269] text-white font-extrabold text-sm px-4 py-3 rounded-full border-2 border-[#1A0A10] transition-colors min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A0A10]"
                        >
                          <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span>Add to Café Tray</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => onOpenPopup(item)}
                        aria-label={`Quick view ${item.name}`}
                        className="w-11 h-11 rounded-full border-2 border-[#1A0A10] bg-white hover:bg-[#FFD166] text-[#1A0A10] flex items-center justify-center shrink-0 transition-colors"
                      >
                        <Eye className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
