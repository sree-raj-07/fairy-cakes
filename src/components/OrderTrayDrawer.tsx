import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { buildWhatsAppUrl, type MenuItem } from '../data/menuData';

export interface TrayEntry {
  item: MenuItem;
  quantity: number;
}

interface OrderTrayDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  entries: TrayEntry[];
  onUpdateQty: (itemId: string, delta: number) => void;
  onClearTray: () => void;
}

export default function OrderTrayDrawer({
  isOpen,
  onClose,
  entries,
  onUpdateQty,
  onClearTray,
}: OrderTrayDrawerProps) {
  const [diningMode, setDiningMode] = useState<'Café Dine-In' | 'Takeaway' | 'Local Delivery'>(
    'Café Dine-In'
  );
  const [note, setNote] = useState('');

  const totalAmount = entries.reduce(
    (sum, entry) => sum + (entry.item.unitPrice ?? 0) * entry.quantity,
    0
  );

  const itemLines = entries
    .map(
      (entry) =>
        `• ${entry.quantity}x ${entry.item.name} (₹${(
          (entry.item.unitPrice ?? 0) * entry.quantity
        ).toLocaleString('en-IN')})`
    )
    .join('\n');

  const whatsappMessage = [
    'Hello Fairy Cakes Café Parippally! ☕🍔',
    `Order Mode: *${diningMode}*`,
    '',
    itemLines,
    '',
    `*Estimated Total:* ₹${totalAmount.toLocaleString('en-IN')}`,
    note.trim() ? `*Note:* ${note.trim()}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const whatsappUrl = buildWhatsAppUrl(whatsappMessage);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[85] flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Café Order Tray"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#241118]/65 backdrop-blur-xs"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="relative z-10 w-full max-w-md bg-[#FFFBF5] border-l-[3px] border-[#241118] h-full flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#241118] text-white px-6 py-5 flex items-center justify-between gap-4 border-b-[3px] border-[#241118]">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#FFD166]" aria-hidden="true" />
                <h2 className="font-display font-bold text-xl">Your Café &amp; Bakery Tray</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close tray drawer"
                className="w-9 h-9 rounded-full bg-white text-[#241118] flex items-center justify-center hover:bg-[#FFD166] transition-colors"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Tray Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {entries.length === 0 ? (
                <div className="text-center py-12 px-4 bg-white border-2 border-dashed border-[#241118]/30 rounded-2xl">
                  <ShoppingBag className="w-10 h-10 mx-auto text-[#C9185B] mb-3" aria-hidden="true" />
                  <p className="font-display font-bold text-lg text-[#241118]">
                    Your Café Tray is Empty
                  </p>
                  <p className="text-sm text-[#241118]/75 mt-1">
                    Add Loaded Fries, Pizzas, Momos, Cold Coffee, or Brownie Jars from the menu!
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wide text-[#241118]/70">
                      {entries.reduce((acc, e) => acc + e.quantity, 0)} items selected
                    </span>
                    <button
                      type="button"
                      onClick={onClearTray}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#C9185B] hover:underline"
                    >
                      <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Clear Tray</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {entries.map(({ item, quantity }) => (
                      <div
                        key={item.id}
                        className="bg-white border-2 border-[#241118] rounded-2xl p-4 pop-shadow-sm flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <h3 className="font-display font-bold text-base text-[#241118] truncate">
                            {item.name}
                          </h3>
                          <p className="text-xs font-semibold text-[#241118]/70 tabular-nums">
                            {item.priceDisplay} × {quantity} = ₹
                            {((item.unitPrice ?? 0) * quantity).toLocaleString('en-IN')}
                          </p>
                        </div>

                        <div className="inline-flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            aria-label={`Remove one ${item.name}`}
                            onClick={() => onUpdateQty(item.id, -1)}
                            className="w-8 h-8 rounded-full bg-[#FFF5EB] border-2 border-[#241118] flex items-center justify-center hover:bg-[#FFD166]"
                          >
                            <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                          <span className="font-bold text-sm tabular-nums min-w-[1.25rem] text-center">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            aria-label={`Add one ${item.name}`}
                            onClick={() => onUpdateQty(item.id, 1)}
                            className="w-8 h-8 rounded-full bg-[#FFF5EB] border-2 border-[#241118] flex items-center justify-center hover:bg-[#FFD166]"
                          >
                            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dining Mode Selector */}
                  <div className="pt-3 space-y-2">
                    <label className="block font-display font-bold text-sm text-[#241118]">
                      How would you like this?
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Café Dine-In', 'Takeaway', 'Local Delivery'] as const).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setDiningMode(mode)}
                          className={`px-2 py-2 rounded-xl border-2 border-[#241118] text-xs font-bold transition-colors ${
                            diningMode === mode
                              ? 'bg-[#FFD166] text-[#241118]'
                              : 'bg-white text-[#241118] hover:bg-[#FFF5EB]'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Special Instructions */}
                  <div className="space-y-1.5">
                    <label htmlFor="tray-note" className="block text-xs font-bold text-[#241118]">
                      Spice level / Extra notes (optional)
                    </label>
                    <input
                      id="tray-note"
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="e.g., Extra schezwan dip, less sugar..."
                      className="w-full bg-white border-2 border-[#241118] rounded-xl px-3.5 py-2.5 text-sm text-[#241118]"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Footer Checkout */}
            {entries.length > 0 && (
              <div className="p-6 bg-[#FFD166] border-t-[3px] border-[#241118] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#241118]">Tray Total</span>
                  <span className="font-display font-bold text-2xl text-[#241118] tabular-nums">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#007982] hover:bg-[#006269] text-white font-bold text-base px-6 py-3.5 rounded-full border-2 border-[#241118] pop-shadow transition-transform duration-150 hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>Send Café Order on WhatsApp</span>
                </a>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
