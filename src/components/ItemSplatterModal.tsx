import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CakeSlice, Minus, Plus, ShoppingBag, Sparkles, X } from 'lucide-react';
import type { MenuItem } from '../data/menuData';
import { useSplatter } from './SplatterBurst';

interface ItemSplatterModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onCustomizeCake: (flavorId: string, isCustomTheme?: boolean) => void;
  onAddToTray: (item: MenuItem, quantity: number) => void;
}

export default function ItemSplatterModal({
  item,
  onClose,
  onCustomizeCake,
  onAddToTray,
}: ItemSplatterModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { triggerSplatter } = useSplatter();

  useEffect(() => {
    setQuantity(1);
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 overflow-y-auto overflow-x-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="splatter-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#241118]/75 backdrop-blur-xs"
          />

          {/* Pop-Up Container with Animated SVG Splatter Halo Behind */}
          <motion.div
            initial={{ opacity: 0, scale: 0.72, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.85, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 360, damping: 22 }}
            className="relative w-full max-w-lg z-10"
          >
            {/* Animated Pop-Art SVG Splatter Splash Halo */}
            <motion.svg
              aria-hidden="true"
              viewBox="0 0 600 540"
              initial={{ scale: 0.45, opacity: 0, rotate: -12 }}
              animate={{ scale: 1.07, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="pointer-events-none absolute -inset-10 sm:-inset-14 w-[calc(100%+5rem)] sm:w-[calc(100%+7rem)] h-[calc(100%+5rem)] sm:h-[calc(100%+7rem)] -z-10"
            >
              <path
                d="M95 110 C55 70, 125 20, 185 55 C235 82, 275 18, 335 45 C395 72, 465 25, 510 78 C550 125, 520 190, 565 235 C598 268, 565 345, 525 365 C485 385, 545 460, 480 492 C425 520, 360 468, 305 505 C245 545, 175 490, 120 495 C60 500, 30 435, 65 385 C95 342, 18 295, 38 235 C55 185, 130 145, 95 110 Z"
                fill={item.stripColor}
                stroke="#241118"
                strokeWidth="5"
              />
              <circle cx="44" cy="72" r="14" fill="#FFD166" stroke="#241118" strokeWidth="4" />
              <circle cx="556" cy="112" r="12" fill="#2EC4B6" stroke="#241118" strokeWidth="4" />
              <circle cx="548" cy="445" r="15" fill="#C9185B" stroke="#241118" strokeWidth="4" />
              <circle cx="48" cy="458" r="11" fill="#FFD166" stroke="#241118" strokeWidth="4" />
            </motion.svg>

            {/* Modal Card */}
            <div className="bg-[#FFFBF5] border-[3px] border-[#241118] rounded-3xl pop-shadow-lg overflow-hidden">
              {/* Top Strip */}
              <div
                className="px-6 py-4 border-b-[3px] border-[#241118] flex items-center justify-between gap-4"
                style={{ backgroundColor: item.stripColor, color: item.stripTextColor }}
              >
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{item.category}</span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close item popup"
                  className="w-9 h-9 rounded-full bg-white text-[#241118] border-2 border-[#241118] flex items-center justify-center hover:bg-[#FFD166] transition-colors shrink-0"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <h3
                    id="splatter-modal-title"
                    className="font-display font-bold text-2xl sm:text-3xl text-[#241118]"
                  >
                    {item.name}
                  </h3>
                  <span className="bg-[#FFD166] text-[#241118] border-2 border-[#241118] rounded-full px-4 py-1.5 font-bold text-base tabular-nums whitespace-nowrap shrink-0 pop-shadow-sm">
                    {item.priceDisplay}
                  </span>
                </div>

                <p className="text-[#241118] text-base leading-relaxed font-medium">
                  {item.tastingNotes}
                </p>

                <div className="bg-white border-2 border-[#241118] rounded-2xl p-4 text-sm font-semibold text-[#241118]/85 flex items-center gap-3">
                  <CakeSlice className="w-5 h-5 text-[#C9185B] shrink-0" aria-hidden="true" />
                  <span>{item.prepInfo}</span>
                </div>

                {/* Actions */}
                {item.isCake ? (
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        triggerSplatter(e.clientX, e.clientY, item.stripColor);
                        onCustomizeCake(item.id, Boolean(item.isCustomQuote));
                        onClose();
                        document.getElementById('custom-cake')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-[#FFD166] hover:bg-[#ffe08f] text-[#241118] font-bold text-base px-6 py-3.5 rounded-full border-2 border-[#241118] pop-shadow transition-transform duration-150 hover:-translate-y-0.5 min-h-[48px]"
                    >
                      <span>Customize Weight, Shape &amp; Toppings</span>
                    </button>
                  </div>
                ) : (
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    {/* Quantity Stepper */}
                    <div className="inline-flex items-center justify-between bg-white border-2 border-[#241118] rounded-full px-3 py-1.5 gap-4 shrink-0">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-8 h-8 rounded-full bg-[#FFF5EB] border border-[#241118] flex items-center justify-center hover:bg-[#FFD166] text-[#241118]"
                      >
                        <Minus className="w-4 h-4" aria-hidden="true" />
                      </button>
                      <span className="font-display font-bold text-lg text-[#241118] tabular-nums min-w-[1.5rem] text-center">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setQuantity((q) => Math.min(12, q + 1))}
                        className="w-8 h-8 rounded-full bg-[#FFF5EB] border border-[#241118] flex items-center justify-center hover:bg-[#FFD166] text-[#241118]"
                      >
                        <Plus className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        triggerSplatter(e.clientX, e.clientY, '#2EC4B6');
                        onAddToTray(item, quantity);
                        onClose();
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-[#007982] hover:bg-[#006269] text-white font-bold text-base px-6 py-3.5 rounded-full border-2 border-[#241118] pop-shadow transition-transform duration-150 hover:-translate-y-0.5 min-h-[48px]"
                    >
                      <ShoppingBag className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>
                        Add to Café Tray · ₹
                        {((item.unitPrice ?? 0) * quantity).toLocaleString('en-IN')}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
