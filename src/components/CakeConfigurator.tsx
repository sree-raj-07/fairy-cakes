import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Cake, Camera, Check, MessageCircle, Sparkles } from 'lucide-react';
import {
  buildWhatsAppUrl,
  CAKE_ADDONS,
  CAKE_FLAVORS,
  CAKE_SHAPES,
  FROSTING_OPTIONS,
  TIME_SLOTS,
  WEIGHT_OPTIONS,
} from '../data/menuData';
import { useSplatter } from './SplatterBurst';

interface CakeConfiguratorProps {
  selectedFlavorId: string;
  onFlavorChange: (flavorId: string) => void;
  hasCustomPhoto: boolean;
  onToggleCustomPhoto: (value: boolean) => void;
}

function getTomorrowIsoDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

function getTodayIsoDate(): string {
  return new Date().toISOString().split('T')[0];
}

export default function CakeConfigurator({
  selectedFlavorId,
  onFlavorChange,
  hasCustomPhoto,
  onToggleCustomPhoto,
}: CakeConfiguratorProps) {
  const [selectedWeightId, setSelectedWeightId] = useState<string>('1kg');
  const [isEggless, setIsEggless] = useState<boolean>(false);
  const [selectedShapeId, setSelectedShapeId] = useState<string>('round');
  const [selectedFrostingId, setSelectedFrostingId] = useState<string>('fresh-cream');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['praline-crunch']);
  const [fulfillment, setFulfillment] = useState<'Local Delivery' | 'Café Pickup'>('Local Delivery');
  const [timeSlotId, setTimeSlotId] = useState<string>('evening');
  const [includeCandlesKnife, setIncludeCandlesKnife] = useState<boolean>(true);
  const [cakeMessage, setCakeMessage] = useState<string>('');
  const [deliveryDate, setDeliveryDate] = useState<string>(getTomorrowIsoDate);

  const { triggerSplatter } = useSplatter();

  const selectedWeight = useMemo(
    () => WEIGHT_OPTIONS.find((w) => w.id === selectedWeightId) ?? WEIGHT_OPTIONS[1],
    [selectedWeightId]
  );

  const selectedFlavor = useMemo(
    () => CAKE_FLAVORS.find((f) => f.id === selectedFlavorId) ?? CAKE_FLAVORS[5],
    [selectedFlavorId]
  );

  const selectedShape = useMemo(
    () => CAKE_SHAPES.find((s) => s.id === selectedShapeId) ?? CAKE_SHAPES[0],
    [selectedShapeId]
  );

  const selectedFrosting = useMemo(
    () => FROSTING_OPTIONS.find((f) => f.id === selectedFrostingId) ?? FROSTING_OPTIONS[0],
    [selectedFrostingId]
  );

  const selectedTimeSlot = useMemo(
    () => TIME_SLOTS.find((t) => t.id === timeSlotId) ?? TIME_SLOTS[2],
    [timeSlotId]
  );

  const activeAddonsList = useMemo(
    () => CAKE_ADDONS.filter((a) => selectedAddons.includes(a.id)),
    [selectedAddons]
  );

  const toggleAddon = (addonId: string, clientX: number, clientY: number) => {
    triggerSplatter(clientX, clientY, '#FFD166');
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const priceBreakdown = useMemo(() => {
    if (selectedFlavor.basePricePerKg === null || selectedFrosting.id === 'full-fondant') {
      return { base: null, egglessCost: 0, shapeCost: 0, frostingCost: 0, addonsCost: 0, slotCost: 0, total: null };
    }
    const base = Math.round(selectedFlavor.basePricePerKg * selectedWeight.multiplier);
    const egglessCost = isEggless ? Math.round(100 * selectedWeight.multiplier) : 0;
    const shapeCost = selectedShape.extraPrice;
    const frostingCost = selectedFrosting.extraPrice;
    const addonsCost = activeAddonsList.reduce((acc, item) => acc + item.price, 0);
    const slotCost = fulfillment === 'Local Delivery' ? selectedTimeSlot.extraPrice : 0;
    const total = base + egglessCost + shapeCost + frostingCost + addonsCost + slotCost;
    return { base, egglessCost, shapeCost, frostingCost, addonsCost, slotCost, total };
  }, [
    selectedFlavor,
    selectedWeight,
    isEggless,
    selectedShape,
    selectedFrosting,
    activeAddonsList,
    fulfillment,
    selectedTimeSlot,
  ]);

  const formattedPrice =
    priceBreakdown.total !== null
      ? `₹${priceBreakdown.total.toLocaleString('en-IN')}`
      : 'Custom Quote';

  const whatsappMessage = useMemo(() => {
    const cleanMessage = cakeMessage.trim() || 'No message / Plain top';
    const cleanDate = deliveryDate || 'To be confirmed';
    const addonsText =
      activeAddonsList.length > 0 ? activeAddonsList.map((a) => a.label).join(', ') : 'None';

    const lines = [
      'Hello Fairy Cakes Parippally! 🎂',
      'I built a custom cake on your website:',
      '',
      `• *Flavor:* ${selectedFlavor.name} (${selectedFlavor.priceDisplay})`,
      `• *Weight:* ${selectedWeight.label} (${selectedWeight.servingsHint})`,
      `• *Dietary:* ${isEggless ? '100% Eggless' : 'Classic Sponge'}`,
      `• *Shape & Finish:* ${selectedShape.label} · ${selectedFrosting.label}`,
      `• *Add-Ons:* ${addonsText}`,
      `• *Cake Inscription:* ${cleanMessage}`,
      `• *Fulfillment:* ${fulfillment} on ${cleanDate} (${selectedTimeSlot.label})`,
      `• *Candles & Knife Kit:* ${includeCandlesKnife ? 'Yes (Free)' : 'Not needed'}`,
      `• *Custom Reference Photo:* ${
        hasCustomPhoto ? 'Yes, sending photo right after this!' : 'Standard studio finish'
      }`,
      '',
      `*Estimated Total:* ${formattedPrice}`,
    ];
    return lines.join('\n');
  }, [
    selectedFlavor,
    selectedWeight,
    isEggless,
    selectedShape,
    selectedFrosting,
    activeAddonsList,
    cakeMessage,
    fulfillment,
    deliveryDate,
    selectedTimeSlot,
    includeCandlesKnife,
    hasCustomPhoto,
    formattedPrice,
  ]);

  const whatsappUrl = buildWhatsAppUrl(whatsappMessage);

  // Dynamic colors for SVG Cake Visualizer
  const dripColor =
    selectedFrosting.id === 'choco-ganache' ||
    selectedFlavor.id === 'hazelnut' ||
    selectedFlavor.id === 'choco-chip' ||
    selectedFlavor.id === 'black-forest'
      ? '#3D1E14'
      : selectedFlavor.accentHex;

  return (
    <section
      id="custom-cake"
      className="relative bg-[#FFF5EB] py-16 sm:py-24 border-t-2 border-[#241118]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-[3px] border-[#241118] rounded-3xl pop-shadow-lg overflow-hidden">
          {/* High-Contrast Cocoa Header Banner */}
          <div className="bg-[#241118] text-white px-6 sm:px-10 py-7 border-b-[3px] border-[#241118] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FFD166] mb-1">
                Interactive Studio Builder
              </p>
              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white">
                Build Your Dream Cake
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#FFD166] text-[#241118] border-2 border-[#241118] rounded-full px-4 py-2 text-xs sm:text-sm font-bold shrink-0 self-start sm:self-auto">
              <Cake className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Baked Fresh to Order</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left 7 Columns: 5 Useful Customization Steps */}
            <div className="lg:col-span-7 p-6 sm:p-9 space-y-8 border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-[#241118]">
              {/* Step 1: Weight */}
              <div>
                <div className="flex items-baseline justify-between gap-2 mb-3">
                  <label className="font-display font-bold text-lg sm:text-xl text-[#241118]">
                    1. Choose Weight
                  </label>
                  <span className="text-xs sm:text-sm font-semibold text-[#241118]/75">
                    {selectedWeight.servingsHint}
                  </span>
                </div>

                <div
                  role="radiogroup"
                  aria-label="Choose cake weight"
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                >
                  {WEIGHT_OPTIONS.map((weight) => {
                    const isSelected = selectedWeightId === weight.id;
                    return (
                      <button
                        key={weight.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={(e) => {
                          triggerSplatter(e.clientX, e.clientY, '#FFD166');
                          setSelectedWeightId(weight.id);
                        }}
                        className={`px-3.5 py-3 rounded-2xl border-2 border-[#241118] font-bold text-left transition-all duration-150 ${
                          isSelected
                            ? 'bg-[#FFD166] text-[#241118] pop-shadow-sm -translate-y-0.5'
                            : 'bg-[#FFFBF5] text-[#241118] hover:bg-[#FFD166]/30'
                        }`}
                      >
                        <div className="font-display text-lg tabular-nums">{weight.label}</div>
                        <div className="text-xs font-semibold text-[#241118]/75">
                          {weight.servingsHint}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Flavor & Eggless Option */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <label
                    htmlFor="cake-flavor-select"
                    className="font-display font-bold text-lg sm:text-xl text-[#241118]"
                  >
                    2. Choose Flavor &amp; Dietary
                  </label>

                  {/* Eggless Toggle */}
                  <div className="inline-flex rounded-full border-2 border-[#241118] p-1 bg-[#FFFBF5] self-start">
                    <button
                      type="button"
                      onClick={() => setIsEggless(false)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                        !isEggless ? 'bg-[#241118] text-[#FFD166]' : 'text-[#241118]'
                      }`}
                    >
                      Classic Sponge
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        triggerSplatter(e.clientX, e.clientY, '#2EC4B6');
                        setIsEggless(true);
                      }}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                        isEggless ? 'bg-[#2EC4B6] text-[#241118]' : 'text-[#241118]'
                      }`}
                    >
                      100% Eggless (+₹100/kg)
                    </button>
                  </div>
                </div>

                <select
                  id="cake-flavor-select"
                  value={selectedFlavor.id}
                  onChange={(e) => {
                    const nextId = e.target.value;
                    onFlavorChange(nextId);
                    if (nextId === 'custom-theme') {
                      onToggleCustomPhoto(true);
                      setSelectedFrostingId('full-fondant');
                    }
                  }}
                  className="w-full bg-[#FFFBF5] border-2 border-[#241118] rounded-2xl px-4 py-3 text-base font-bold text-[#241118] focus:outline-none focus:ring-4 focus:ring-[#2EC4B6]/40 cursor-pointer"
                >
                  {CAKE_FLAVORS.map((flavor) => (
                    <option key={flavor.id} value={flavor.id}>
                      {flavor.name} — {flavor.priceDisplay}
                    </option>
                  ))}
                </select>

                <div className="flex flex-wrap gap-2">
                  {CAKE_FLAVORS.map((flavor) => {
                    const isActive = selectedFlavor.id === flavor.id;
                    return (
                      <button
                        key={flavor.id}
                        type="button"
                        onClick={(e) => {
                          triggerSplatter(e.clientX, e.clientY, flavor.stripColor);
                          onFlavorChange(flavor.id);
                          if (flavor.isCustomQuote) {
                            onToggleCustomPhoto(true);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 border-[#241118] transition-colors whitespace-nowrap shrink-0 ${
                          isActive
                            ? 'bg-[#2EC4B6] text-[#241118]'
                            : 'bg-white text-[#241118] hover:bg-[#FFF5EB]'
                        }`}
                      >
                        {flavor.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Shape & Frosting Finish */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t-2 border-dashed border-[#241118]/20">
                <div>
                  <label className="block font-display font-bold text-base text-[#241118] mb-2.5">
                    3. Cake Shape
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {CAKE_SHAPES.map((shape) => {
                      const active = selectedShapeId === shape.id;
                      return (
                        <button
                          key={shape.id}
                          type="button"
                          onClick={(e) => {
                            triggerSplatter(e.clientX, e.clientY, '#C9185B');
                            setSelectedShapeId(shape.id);
                            if (shape.id === 'two-tier' && (selectedWeightId === '0.5kg' || selectedWeightId === '1kg')) {
                              setSelectedWeightId('2kg');
                            }
                          }}
                          className={`px-3 py-2.5 rounded-xl border-2 border-[#241118] text-left transition-colors ${
                            active
                              ? 'bg-[#FFD166] text-[#241118] font-bold'
                              : 'bg-[#FFFBF5] text-[#241118] hover:bg-[#FFF5EB] font-semibold'
                          }`}
                        >
                          <div className="text-xs sm:text-sm">{shape.label}</div>
                          <div className="text-[11px] opacity-80 tabular-nums">
                            {shape.extraPrice > 0 ? `+₹${shape.extraPrice}` : 'Included'}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block font-display font-bold text-base text-[#241118] mb-2.5">
                    4. Frosting &amp; Finish
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {FROSTING_OPTIONS.map((frost) => {
                      const active = selectedFrostingId === frost.id;
                      return (
                        <button
                          key={frost.id}
                          type="button"
                          onClick={(e) => {
                            triggerSplatter(e.clientX, e.clientY, '#2EC4B6');
                            setSelectedFrostingId(frost.id);
                          }}
                          className={`px-3 py-2.5 rounded-xl border-2 border-[#241118] text-left transition-colors ${
                            active
                              ? 'bg-[#2EC4B6] text-[#241118] font-bold'
                              : 'bg-[#FFFBF5] text-[#241118] hover:bg-[#FFF5EB] font-semibold'
                          }`}
                        >
                          <div className="text-xs sm:text-sm">{frost.label}</div>
                          <div className="text-[11px] opacity-80 tabular-nums">
                            {frost.id === 'full-fondant'
                              ? 'Custom Quote'
                              : frost.extraPrice > 0
                                ? `+₹${frost.extraPrice}`
                                : 'Included'}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step 4: Gourmet Fillings & Toppings */}
              <div className="pt-2 border-t-2 border-dashed border-[#241118]/20">
                <label className="block font-display font-bold text-base sm:text-lg text-[#241118] mb-2.5">
                  5. Gourmet Fillings &amp; Toppers (Optional)
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {CAKE_ADDONS.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={(e) => toggleAddon(addon.id, e.clientX, e.clientY)}
                        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full border-2 border-[#241118] text-xs sm:text-sm font-bold transition-all ${
                          isChecked
                            ? 'bg-[#241118] text-[#FFD166]'
                            : 'bg-white text-[#241118] hover:bg-[#FFF5EB]'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
                        <span>
                          {addon.label} (+₹{addon.price})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 5: Personalize & Schedule */}
              <div className="space-y-4 pt-2 border-t-2 border-dashed border-[#241118]/20">
                <h3 className="font-display font-bold text-base sm:text-lg text-[#241118]">
                  6. Personalize &amp; Schedule
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="cake-message-input"
                      className="block text-xs sm:text-sm font-bold text-[#241118] mb-1.5"
                    >
                      Cake Inscription Message
                    </label>
                    <input
                      id="cake-message-input"
                      type="text"
                      maxLength={60}
                      value={cakeMessage}
                      onChange={(e) => setCakeMessage(e.target.value)}
                      placeholder="e.g., Happy Birthday Aarav!"
                      className="w-full bg-[#FFFBF5] border-2 border-[#241118] rounded-2xl px-4 py-3 text-sm sm:text-base font-medium text-[#241118] placeholder:text-[#241118]/45 focus:outline-none focus:ring-4 focus:ring-[#2EC4B6]/40"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="delivery-date-input"
                      className="block text-xs sm:text-sm font-bold text-[#241118] mb-1.5"
                    >
                      Celebration Date
                    </label>
                    <input
                      id="delivery-date-input"
                      type="date"
                      min={getTodayIsoDate()}
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full bg-[#FFFBF5] border-2 border-[#241118] rounded-2xl px-4 py-3 text-sm sm:text-base font-semibold text-[#241118] focus:outline-none focus:ring-4 focus:ring-[#2EC4B6]/40"
                    />
                  </div>
                </div>

                {/* Fulfillment & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="block text-xs sm:text-sm font-bold text-[#241118] mb-1.5">
                      Delivery or Café Pickup
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {(['Local Delivery', 'Café Pickup'] as const).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setFulfillment(mode)}
                          className={`py-2.5 px-3 rounded-xl border-2 border-[#241118] text-xs font-bold transition-colors ${
                            fulfillment === mode
                              ? 'bg-[#FFD166] text-[#241118]'
                              : 'bg-[#FFFBF5] text-[#241118]'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="time-slot-select"
                      className="block text-xs sm:text-sm font-bold text-[#241118] mb-1.5"
                    >
                      Preferred Time Slot
                    </label>
                    <select
                      id="time-slot-select"
                      value={timeSlotId}
                      onChange={(e) => setTimeSlotId(e.target.value)}
                      className="w-full bg-[#FFFBF5] border-2 border-[#241118] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-[#241118]"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot.id} value={slot.id}>
                          {slot.label}
                          {slot.extraPrice > 0 && fulfillment === 'Local Delivery'
                            ? ` (+₹${slot.extraPrice})`
                            : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Helpful Checkboxes & Photo Switch */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer text-sm font-bold text-[#241118]">
                    <input
                      type="checkbox"
                      checked={includeCandlesKnife}
                      onChange={(e) => setIncludeCandlesKnife(e.target.checked)}
                      className="w-5 h-5 accent-[#C9185B] rounded border-2 border-[#241118]"
                    />
                    <span>Include complimentary Sparkler Candle &amp; Cake Knife Set</span>
                  </label>

                  <div className="flex items-center justify-between gap-4 bg-[#FFFBF5] border-2 border-[#241118] rounded-2xl p-3.5">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl bg-[#FFD166] border-2 border-[#241118] flex items-center justify-center shrink-0">
                        <Camera className="w-4 h-4 text-[#241118]" aria-hidden="true" />
                      </span>
                      <span id="custom-photo-label" className="text-xs sm:text-sm font-bold text-[#241118]">
                        I have a custom theme reference photo to send on WhatsApp
                      </span>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={hasCustomPhoto}
                      aria-labelledby="custom-photo-label"
                      onClick={() => onToggleCustomPhoto(!hasCustomPhoto)}
                      className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-[#241118] transition-colors duration-200 ${
                        hasCustomPhoto ? 'bg-[#2EC4B6]' : 'bg-white'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#241118] transition duration-200 ease-in-out mt-0.5 ${
                          hasCustomPhoto ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Live Animated SVG Cake Preview & Checkout */}
            <div className="lg:col-span-5 bg-[#FFFBF5] p-6 sm:p-9 flex flex-col justify-between gap-6">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C9185B]">
                    <Sparkles className="w-4 h-4" aria-hidden="true" />
                    <span>Live Cake Preview</span>
                  </span>
                  <span className="text-xs font-bold bg-[#241118] text-[#FFD166] px-3 py-1 rounded-full">
                    {isEggless ? '100% Eggless' : 'Classic Sponge'}
                  </span>
                </div>

                {/* Animated Interactive SVG Cake Blueprint */}
                <motion.div
                  key={`${selectedFlavor.id}-${selectedShapeId}-${selectedFrostingId}-${selectedAddons.length}`}
                  initial={{ scale: 0.94 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                  className="bg-white border-2 border-[#241118] rounded-3xl p-5 pop-shadow-sm flex flex-col items-center"
                >
                  <svg
                    viewBox="0 0 280 210"
                    className="w-full max-w-[260px] h-auto"
                    aria-label="Live custom cake illustration preview"
                  >
                    {/* Cake Stand */}
                    <ellipse cx="140" cy="184" rx="108" ry="12" fill="#FFD166" stroke="#241118" strokeWidth="3" />
                    <rect x="128" y="184" width="24" height="14" fill="#FFD166" stroke="#241118" strokeWidth="3" />
                    <ellipse cx="140" cy="198" rx="46" ry="6" fill="#241118" />

                    {/* Top Tier if Two-Tier */}
                    {selectedShapeId === 'two-tier' && (
                      <g>
                        <rect
                          x="82"
                          y="62"
                          width="116"
                          height="50"
                          rx="12"
                          fill="#FFF5EB"
                          stroke="#241118"
                          strokeWidth="3"
                        />
                        <path
                          d="M82 72 Q100 92 118 74 Q138 96 158 74 Q178 92 198 72 L198 66 Q198 62 190 62 L90 62 Q82 62 82 66 Z"
                          fill={dripColor}
                          stroke="#241118"
                          strokeWidth="2.5"
                        />
                      </g>
                    )}

                    {/* Main Tier */}
                    <rect
                      x={selectedShapeId === 'square' ? '56' : '50'}
                      y={selectedShapeId === 'two-tier' ? '112' : '82'}
                      width={selectedShapeId === 'square' ? '168' : '180'}
                      height={selectedShapeId === 'two-tier' ? '68' : '98'}
                      rx={selectedShapeId === 'square' ? '6' : selectedShapeId === 'heart' ? '32' : '16'}
                      fill="#FFF5EB"
                      stroke="#241118"
                      strokeWidth="3"
                    />

                    {/* Frosting Drip */}
                    <path
                      d={
                        selectedShapeId === 'two-tier'
                          ? 'M50 124 Q74 148 98 126 Q124 152 148 128 Q174 150 198 126 Q216 142 230 124 L230 116 Q230 112 222 112 L58 112 Q50 112 50 116 Z'
                          : 'M50 98 Q74 126 98 100 Q124 130 148 102 Q174 128 198 100 Q216 118 230 98 L230 88 Q230 82 220 82 L60 82 Q50 82 50 88 Z'
                      }
                      fill={dripColor}
                      stroke="#241118"
                      strokeWidth="3"
                    />

                    {/* Heart accent badge if heart shape */}
                    {selectedShapeId === 'heart' && (
                      <path
                        d="M140 148 C140 148 118 134 118 122 C118 115 124 110 130 110 C135 110 138 113 140 116 C142 113 145 110 150 110 C156 110 162 115 162 122 C162 134 140 148 140 148 Z"
                        fill="#C9185B"
                        stroke="#241118"
                        strokeWidth="2.5"
                      />
                    )}

                    {/* Candle & Flame */}
                    <rect
                      x="135"
                      y={selectedShapeId === 'two-tier' ? '34' : '52'}
                      width="10"
                      height="28"
                      rx="3"
                      fill="#2EC4B6"
                      stroke="#241118"
                      strokeWidth="2.5"
                    />
                    <path
                      d={
                        selectedShapeId === 'two-tier'
                          ? 'M140 16 C145 23 145 30 140 32 C135 30 135 23 140 16 Z'
                          : 'M140 34 C145 41 145 48 140 50 C135 48 135 41 140 34 Z'
                      }
                      fill="#FFD166"
                      stroke="#241118"
                      strokeWidth="2"
                    />

                    {/* Add-on visual sprinkles / macarons */}
                    {selectedAddons.includes('macarons-gold') && (
                      <>
                        <circle
                          cx="98"
                          cy={selectedShapeId === 'two-tier' ? '56' : '76'}
                          r="9"
                          fill="#C9185B"
                          stroke="#241118"
                          strokeWidth="2.5"
                        />
                        <circle
                          cx="182"
                          cy={selectedShapeId === 'two-tier' ? '56' : '76'}
                          r="9"
                          fill="#FFD166"
                          stroke="#241118"
                          strokeWidth="2.5"
                        />
                      </>
                    )}
                    {selectedAddons.includes('choco-chips') && (
                      <>
                        <circle cx="88" cy="146" r="4" fill="#241118" />
                        <circle cx="118" cy="160" r="4" fill="#241118" />
                        <circle cx="164" cy="156" r="4" fill="#241118" />
                        <circle cx="195" cy="142" r="4" fill="#241118" />
                      </>
                    )}
                    {selectedAddons.includes('praline-crunch') && (
                      <>
                        <rect x="74" y="164" width="12" height="7" rx="2" fill="#D97706" stroke="#241118" strokeWidth="1.5" />
                        <rect x="192" y="162" width="12" height="7" rx="2" fill="#D97706" stroke="#241118" strokeWidth="1.5" />
                      </>
                    )}
                  </svg>

                  {/* Live Inscription Ribbon */}
                  <div className="mt-3 w-full bg-[#FFF5EB] border-2 border-[#241118] rounded-xl px-4 py-2 text-center">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#241118]/65">
                      Cake Topper Message
                    </div>
                    <div className="font-display font-bold text-base text-[#C9185B] truncate">
                      {cakeMessage.trim() || 'Happy Celebration!'}
                    </div>
                  </div>
                </motion.div>

                {/* Live Price Breakdown Box */}
                <div className="bg-white border-2 border-[#241118] rounded-2xl p-4 space-y-2 text-sm">
                  <div className="flex justify-between font-semibold text-[#241118]">
                    <span>
                      {selectedFlavor.name} ({selectedWeight.label})
                    </span>
                    <span className="tabular-nums">
                      {priceBreakdown.base !== null
                        ? `₹${priceBreakdown.base.toLocaleString('en-IN')}`
                        : 'Custom Quote'}
                    </span>
                  </div>
                  {priceBreakdown.egglessCost > 0 && (
                    <div className="flex justify-between text-[#241118]/80">
                      <span>100% Eggless Sponge</span>
                      <span className="tabular-nums">+₹{priceBreakdown.egglessCost}</span>
                    </div>
                  )}
                  {priceBreakdown.shapeCost > 0 && (
                    <div className="flex justify-between text-[#241118]/80">
                      <span>{selectedShape.label}</span>
                      <span className="tabular-nums">+₹{priceBreakdown.shapeCost}</span>
                    </div>
                  )}
                  {priceBreakdown.frostingCost > 0 && (
                    <div className="flex justify-between text-[#241118]/80">
                      <span>{selectedFrosting.label}</span>
                      <span className="tabular-nums">+₹{priceBreakdown.frostingCost}</span>
                    </div>
                  )}
                  {priceBreakdown.addonsCost > 0 && (
                    <div className="flex justify-between text-[#241118]/80">
                      <span>Gourmet Add-Ons ({activeAddonsList.length})</span>
                      <span className="tabular-nums">+₹{priceBreakdown.addonsCost}</span>
                    </div>
                  )}
                  {priceBreakdown.slotCost > 0 && (
                    <div className="flex justify-between text-[#241118]/80">
                      <span>Midnight Surprise Slot</span>
                      <span className="tabular-nums">+₹{priceBreakdown.slotCost}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Final Estimator & WhatsApp Action */}
              <div className="bg-[#FFD166] border-2 border-[#241118] rounded-2xl p-5 space-y-4 pop-shadow-sm">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[#241118]/80">
                    Estimated Total
                  </p>
                  <div className="font-display font-bold text-3xl sm:text-4xl text-[#241118] tabular-nums">
                    {formattedPrice}
                  </div>
                  {priceBreakdown.total === null && (
                    <p className="text-xs font-semibold text-[#241118] mt-1">
                      Theme &amp; fondant pricing confirmed on WhatsApp with your reference photo.
                    </p>
                  )}
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => triggerSplatter(e.clientX, e.clientY, '#2EC4B6')}
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-[#007982] hover:bg-[#006269] text-white font-bold text-base px-6 py-4 rounded-full border-2 border-[#241118] pop-shadow transition-transform duration-150 hover:-translate-y-1 min-h-[52px]"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>Send Order on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
