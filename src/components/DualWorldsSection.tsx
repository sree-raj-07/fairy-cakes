import { motion } from 'motion/react';
import { ArrowRight, CakeSlice, Coffee } from 'lucide-react';
import { GALLERY_IMAGES, type MenuCategory } from '../data/menuData';
import ResilientImage from './ResilientImage';
import { useSplatter } from './SplatterBurst';

interface DualWorldsSectionProps {
  onJumpToCategory: (category: MenuCategory) => void;
}

export default function DualWorldsSection({ onJumpToCategory }: DualWorldsSectionProps) {
  const { triggerSplatter } = useSplatter();

  const jumpToMenuCategory = (category: MenuCategory, x: number, y: number, color: string) => {
    triggerSplatter(x, y, color);
    onJumpToCategory(category);
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="worlds" className="bg-[#FFF8EE] py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#C9185B] mb-2">
            Two Delicious Worlds Under One Roof
          </p>
          <h2
            className="font-display font-extrabold text-[#1A0A10] text-3xl sm:text-4xl lg:text-5xl tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Celebration Cake Studio Meets Hangout Café
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
          {/* World 1: Custom Cake Studio */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="bg-[#C9185B] text-white border-[3px] border-[#1A0A10] rounded-3xl p-5 sm:p-8 pop-shadow flex flex-col justify-between gap-5 sm:gap-6"
          >
            <div className="space-y-3.5 sm:space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 bg-[#FFD166] text-[#1A0A10] border-2 border-[#1A0A10] rounded-full px-3.5 py-1 text-xs font-extrabold uppercase tracking-wide">
                  <CakeSlice className="w-4 h-4" aria-hidden="true" />
                  <span>01 · Cake Studio</span>
                </span>
                <span className="font-display font-bold text-sm text-[#FFD166]">
                  From ₹650 / kg
                </span>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                Custom Birthday, Wedding &amp; Theme Cakes
              </h3>
              <p className="text-white/95 text-sm sm:text-base leading-relaxed">
                From light Fresh Cream Black Forest to Spanish Delight praline crunch, Tres Leches,
                and 3D sculpted fondant masterpieces with 99.9% design accuracy.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#1A0A10] bg-white">
                <ResilientImage
                  src={GALLERY_IMAGES.freshCream}
                  alt="Fresh cream Black Forest and Strawberry slices"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#1A0A10] bg-white">
                <ResilientImage
                  src={GALLERY_IMAGES.signatureSpecials}
                  alt="KitKat Gems birthday cake and Tres Leches"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 pt-1">
              <a
                href="#custom-cake"
                onClick={(e) => triggerSplatter(e.clientX, e.clientY, '#FFD166')}
                className="inline-flex items-center justify-center gap-2 bg-[#FFD166] hover:bg-[#ffe08f] text-[#1A0A10] font-extrabold text-sm px-5 py-3 rounded-full border-2 border-[#1A0A10] pop-shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <span>Open Cake Lab</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={(e) =>
                  jumpToMenuCategory('Fresh Cream Cakes', e.clientX, e.clientY, '#FFD166')
                }
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FFF8EE] text-[#1A0A10] font-extrabold text-sm px-5 py-3 rounded-full border-2 border-[#1A0A10] transition-colors"
              >
                <span>Browse Cake Flavors</span>
              </button>
            </div>
          </motion.div>

          {/* World 2: Parippally Hangout Café */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="bg-[#2EC4B6] text-[#1A0A10] border-[3px] border-[#1A0A10] rounded-3xl p-5 sm:p-8 pop-shadow flex flex-col justify-between gap-5 sm:gap-6"
          >
            <div className="space-y-3.5 sm:space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 bg-[#1A0A10] text-[#FFD166] border-2 border-[#1A0A10] rounded-full px-3.5 py-1 text-xs font-extrabold uppercase tracking-wide">
                  <Coffee className="w-4 h-4" aria-hidden="true" />
                  <span>02 · Hangout Café</span>
                </span>
                <span className="font-display font-bold text-sm text-[#1A0A10]">
                  Open Till 11:00 PM
                </span>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#1A0A10]">
                Loaded Fries, Burgers, Shakes &amp; Brownies
              </h3>
              <p className="text-[#1A0A10]/90 text-sm sm:text-base font-medium leading-relaxed">
                More than a bakery! Drop by Jawahar Junction for stone-baked pizzas, crispy
                momos, Belgian Oreo shakes, cold coffee frappés, and warm fudge brownies.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#1A0A10] bg-white">
                <ResilientImage
                  src={GALLERY_IMAGES.cafeBites}
                  alt="Loaded fries, juicy burger, and momos at Fairy Cakes"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#1A0A10] bg-white">
                <ResilientImage
                  src={GALLERY_IMAGES.browniesPastries}
                  alt="Fudge brownies, cupcakes, and dessert jars"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={(e) =>
                  jumpToMenuCategory('Café Bites & Snacks', e.clientX, e.clientY, '#1A0A10')
                }
                className="inline-flex items-center justify-center gap-2 bg-[#1A0A10] hover:bg-[#32131E] text-[#FFD166] font-extrabold text-sm px-5 py-3 rounded-full border-2 border-[#1A0A10] pop-shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <span>See Savory Café Bites</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(e) =>
                  jumpToMenuCategory('Shakes, Coffee & Jars', e.clientX, e.clientY, '#FFD166')
                }
                className="inline-flex items-center justify-center gap-2 bg-[#FFF8EE] hover:bg-white text-[#1A0A10] font-extrabold text-sm px-5 py-3 rounded-full border-2 border-[#1A0A10] transition-colors"
              >
                <span>Shakes &amp; Brownies</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
