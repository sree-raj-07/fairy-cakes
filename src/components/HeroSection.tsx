import { useRef, useState, type MouseEvent } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { ArrowDown, CheckCircle2, Sparkles, Zap } from 'lucide-react';
import { GALLERY_IMAGES } from '../data/menuData';
import ResilientImage from './ResilientImage';
import { useSplatter } from './SplatterBurst';

const HERO_SLIDES = [
  {
    id: 'cakes',
    tabLabel: 'Custom Cakes',
    title: 'Spanish Delight Celebration Tier',
    subtitle: 'Caramelized praline crunch · Handcrafted in Parippally',
    badge: '99.9% Design Accuracy',
    image: GALLERY_IMAGES.heroCake,
    alt: 'Two-tier Spanish Delight praline and chocolate drip custom cake from Fairy Cakes',
    chip: 'Custom Studio',
    accent: '#FFD166',
  },
  {
    id: 'cafe',
    tabLabel: 'Café Bites',
    title: 'Loaded Cheese Fries, Burgers & Momos',
    subtitle: 'Crisp evening hangout plates served hot till 11 PM',
    badge: 'Served Hot Daily',
    image: GALLERY_IMAGES.cafeBites,
    alt: 'Loaded fries, stacked artisan burger, and momos at Fairy Cakes café',
    chip: 'Dine-In & Takeaway',
    accent: '#2EC4B6',
  },
  {
    id: 'shakes',
    tabLabel: 'Shakes & Jars',
    title: 'Belgian Oreo Shakes & Fudge Brownies',
    subtitle: 'Cold coffee frappés, mousse jars & fresh cupcakes',
    badge: '100% Real Cocoa',
    image: GALLERY_IMAGES.shakesCoffee,
    alt: 'Cold coffee frappe, Oreo milkshake, and fresh berry mojito at Fairy Cakes',
    chip: 'Café Bar',
    accent: '#C9185B',
  },
];

// SVG Paths for the "Every Bite." plaque: intact -> hovered bite -> tapped big chomp
const PLAQUE_WHOLE_PATH =
  'M 18 4 L 282 4 Q 296 4 296 18 L 296 70 Q 296 84 282 84 L 18 84 Q 4 84 4 70 L 4 18 Q 4 4 18 4 Z';

const PLAQUE_BITE_HOVER_PATH =
  'M 18 4 L 246 4 C 242 15 251 23 261 20 C 260 31 271 38 281 34 C 280 44 288 49 296 47 L 296 70 Q 296 84 282 84 L 18 84 Q 4 84 4 70 L 4 18 Q 4 4 18 4 Z';

const PLAQUE_CHOMP_TAP_PATH =
  'M 18 4 L 222 4 C 216 17 228 28 240 24 C 238 38 252 46 264 41 C 262 54 276 62 296 58 L 296 70 Q 296 84 282 84 L 18 84 Q 4 84 4 70 L 4 18 Q 4 4 18 4 Z';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, active: false });
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Interactive "Every Bite." states
  const [biteHovered, setBiteHovered] = useState(false);
  const [biteLevel, setBiteLevel] = useState<0 | 1 | 2>(0);
  const [crumbBurstKey, setCrumbBurstKey] = useState(0);

  const { triggerSplatter } = useSplatter();

  // Smooth cursor tracking for interactive hero background spotlight & parallax
  const pointerX = useMotionValue(0.65);
  const pointerY = useMotionValue(0.35);
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 22 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 22 });

  const spotlightLeft = useTransform(smoothX, [0, 1], ['15%', '85%']);
  const spotlightTop = useTransform(smoothY, [0, 1], ['15%', '80%']);
  const spotlightBg = useMotionTemplate`radial-gradient(620px circle at ${spotlightLeft} ${spotlightTop}, rgba(255, 209, 102, 0.24) 0%, rgba(201, 24, 91, 0.48) 38%, rgba(26, 10, 16, 0.96) 78%)`;

  // Parallax offsets for interactive floating background confections
  const floatSlowX = useTransform(smoothX, [0, 1], [-26, 26]);
  const floatSlowY = useTransform(smoothY, [0, 1], [-22, 22]);
  const floatReverseX = useTransform(smoothX, [0, 1], [32, -32]);
  const floatReverseY = useTransform(smoothY, [0, 1], [24, -24]);
  const floatFastX = useTransform(smoothX, [0, 1], [-42, 42]);
  const floatFastY = useTransform(smoothY, [0, 1], [34, -34]);

  // Cursor-reactive micro tilt for the "Every Bite." plaque
  const biteTiltX = useMotionValue(0);
  const biteTiltY = useMotionValue(0);
  const smoothBiteX = useSpring(biteTiltX, { stiffness: 260, damping: 18 });
  const smoothBiteY = useSpring(biteTiltY, { stiffness: 260, damping: 18 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const stickerY = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const stickerRotate = useTransform(scrollYProgress, [0, 1], [-4, 18]);

  const activeSlide = HERO_SLIDES[activeSlideIndex];

  const handleHeroPointerMove = (e: MouseEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width);
    pointerY.set((e.clientY - rect.top) / rect.height);
  };

  const handleHeroBackgroundClick = (e: MouseEvent<HTMLElement>) => {
    // Only trigger background splatter when clicking non-interactive backdrop areas
    const target = e.target as HTMLElement;
    if (target.closest('a, button, input, select')) return;
    const colors = ['#FFD166', '#2EC4B6', '#C9185B', '#FFF8EE'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    triggerSplatter(e.clientX, e.clientY, randomColor);
  };

  const handleBiteMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    biteTiltX.set(nx * 10);
    biteTiltY.set(ny * 8);
  };

  const handleBiteLeave = () => {
    setBiteHovered(false);
    biteTiltX.set(0);
    biteTiltY.set(0);
  };

  const handleBiteTap = (e: MouseEvent<HTMLButtonElement>) => {
    const nextLevel: 0 | 1 | 2 = biteLevel === 2 ? 0 : ((biteLevel + 1) as 0 | 1 | 2);
    setBiteLevel(nextLevel);
    setCrumbBurstKey((k) => k + 1);
    triggerSplatter(e.clientX, e.clientY, '#FFD166');
  };

  const handleCardMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 16;
    const rotateX = (0.5 - y) * 16;
    setTilt({ rotateX, rotateY, active: true });
  };

  const handleCardMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, active: false });
  };

  const activePlaquePath =
    biteLevel === 2
      ? PLAQUE_CHOMP_TAP_PATH
      : biteHovered || biteLevel === 1
        ? PLAQUE_BITE_HOVER_PATH
        : PLAQUE_WHOLE_PATH;

  const isBitten = biteHovered || biteLevel > 0;

  return (
    <section
      ref={sectionRef}
      id="top"
      onMouseMove={handleHeroPointerMove}
      onClick={handleHeroBackgroundClick}
      className="relative overflow-hidden -mt-[76px] pt-[124px] pb-24 sm:pb-32 bg-[#1A0A10]"
    >
      {/* Interactive Cursor-Following Spotlight Backdrop */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlightBg }}
      />

      {/* Interactive Cursor-Parallax Floating Confections & Sprinkles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top-Left Mango Frosting Blob */}
        <motion.div
          style={{ x: floatSlowX, y: floatSlowY }}
          className="absolute top-20 -left-10 w-56 h-56 rounded-full bg-[#FFD166]/20 blur-sm"
        />

        {/* Top-Right Pistachio Mint Orb */}
        <motion.div
          style={{ x: floatReverseX, y: floatReverseY }}
          className="absolute top-24 right-8 w-44 h-44 rounded-full bg-[#2EC4B6]/20"
        />

        {/* Floating Cocoa & Berry Pop-Art Sprinkles reacting to pointer */}
        <motion.svg
          style={{ x: floatFastX, y: floatFastY }}
          viewBox="0 0 80 80"
          className="hidden md:block absolute top-32 left-[42%] w-12 h-12 opacity-80"
        >
          <path
            d="M40 6 L48 28 L72 28 L52 42 L60 66 L40 52 L20 66 L28 42 L8 28 L32 28 Z"
            fill="#FFD166"
            stroke="#1A0A10"
            strokeWidth="3"
          />
        </motion.svg>

        <motion.div
          style={{ x: floatReverseX, y: floatFastY }}
          className="hidden sm:block absolute bottom-28 left-[10%] w-9 h-4 rounded-full bg-[#2EC4B6] border-2 border-[#1A0A10] rotate-45 opacity-85"
        />

        <motion.div
          style={{ x: floatFastX, y: floatSlowY }}
          className="hidden sm:block absolute top-44 left-[6%] w-7 h-7 rounded-full bg-[#C9185B] border-2 border-[#FFD166] opacity-80"
        />

        <motion.div
          style={{ x: floatSlowX, y: floatReverseY }}
          className="hidden lg:block absolute bottom-32 left-[48%] w-10 h-4 rounded-full bg-[#FFD166] border-2 border-[#1A0A10] -rotate-12 opacity-85"
        />

        <motion.svg
          style={{ x: floatReverseX, y: floatSlowY }}
          viewBox="0 0 120 40"
          className="hidden md:block absolute bottom-24 right-[44%] w-24 h-8 opacity-70"
        >
          <path
            d="M4 20 Q 22 4 40 20 T 76 20 T 112 20"
            fill="none"
            stroke="#2EC4B6"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </motion.svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Copy Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 text-white space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-[#FFD166] text-[#1A0A10] border-2 border-[#1A0A10] pop-shadow-sm rounded-full px-4 py-1.5 text-xs sm:text-sm font-extrabold tracking-tight -rotate-1">
              <Zap className="w-4 h-4 fill-[#1A0A10] shrink-0" aria-hidden="true" />
              <span>★ 4.9 Rated Cake Studio &amp; Café • Parippally</span>
            </div>

            <h1
              className="font-display font-extrabold text-white leading-[1.02] tracking-tight"
              style={{
                fontSize: 'clamp(2.75rem, 5.4vw, 4.5rem)',
                textWrap: 'balance',
              }}
            >
              Handmade Happiness in{' '}
              {/* Interactive "Every Bite." Yellow Plaque with Animated Edge Bite */}
              <motion.button
                type="button"
                onMouseEnter={() => setBiteHovered(true)}
                onMouseMove={handleBiteMove}
                onMouseLeave={handleBiteLeave}
                onClick={handleBiteTap}
                whileTap={{ scale: 0.93, rotate: -4 }}
                style={{ x: smoothBiteX, y: smoothBiteY }}
                aria-label="Every Bite — hover or tap to take a bite"
                className="relative inline-flex items-center justify-center align-middle px-5 py-1.5 -my-1 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD166] -rotate-1 group"
              >
                {/* SVG Plaque with Morphing Bite-Mark Cutout on Top-Right Edge */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 88"
                  preserveAspectRatio="none"
                  className="absolute inset-0 w-full h-full overflow-visible drop-shadow-[5px_5px_0px_#1A0A10]"
                >
                  {/* Crisp White Inner Edge Highlight along the Bite Zone */}
                  <motion.path
                    d={activePlaquePath}
                    animate={{ d: activePlaquePath }}
                    transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                    fill="#FFD166"
                    stroke="#1A0A10"
                    strokeWidth="4.5"
                    strokeLinejoin="round"
                  />
                  {/* White Icing / Crumb Rim on the Bitten Edge while Hovering/Tapped */}
                  <motion.path
                    d="M 244 8 C 243 17 252 24 261 21 C 261 31 271 38 281 34 C 281 43 288 47 294 46"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{
                      opacity: isBitten ? 0.95 : 0,
                      pathLength: isBitten ? 1 : 0,
                    }}
                    transition={{ duration: 0.22 }}
                  />
                </svg>

                {/* Flying Crumbs right off the bitten edge */}
                <AnimatePresence>
                  {(isBitten || crumbBurstKey > 0) && (
                    <motion.span
                      key={`crumbs-${crumbBurstKey}-${isBitten ? 'on' : 'off'}`}
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-3 -right-3 z-20"
                    >
                      <motion.span
                        initial={{ scale: 0, x: -8, y: 8, opacity: 1 }}
                        animate={{ scale: 1, x: 10, y: -12, opacity: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="block w-2.5 h-2.5 rounded-full bg-[#FFD166] border border-[#1A0A10]"
                      />
                      <motion.span
                        initial={{ scale: 0, x: -6, y: 12, opacity: 1 }}
                        animate={{ scale: 1.1, x: 18, y: 4, opacity: 0 }}
                        transition={{ duration: 0.55, delay: 0.04, ease: 'easeOut' }}
                        className="block w-2 h-2 rounded-sm bg-white border border-[#1A0A10] rotate-45"
                      />
                      <motion.span
                        initial={{ scale: 0, x: -10, y: 6, opacity: 1 }}
                        animate={{ scale: 0.9, x: 4, y: -18, opacity: 0 }}
                        transition={{ duration: 0.48, delay: 0.06, ease: 'easeOut' }}
                        className="block w-2 h-2 rounded-full bg-[#C9185B] border border-[#1A0A10]"
                      />
                    </motion.span>
                  )}
                </AnimatePresence>

                <span className="relative z-10 text-[#1A0A10] pr-2">Every Bite.</span>
              </motion.button>
            </h1>

            <p className="text-[#FFF8EE]/95 text-base sm:text-lg lg:text-xl font-medium leading-relaxed max-w-xl">
              Dreamy custom birthday cakes, crispy loaded fries, stone-baked pizzas, and thick
              chocolate shakes—crafted fresh daily in Parippally, Kollam.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#custom-cake"
                onClick={(e) => triggerSplatter(e.clientX, e.clientY, '#FFD166')}
                className="inline-flex items-center gap-2.5 bg-[#FFD166] hover:bg-[#ffe08f] text-[#1A0A10] font-extrabold text-base px-7 py-4 rounded-full border-[2.5px] border-[#1A0A10] pop-shadow-yellow transition-transform duration-150 hover:-translate-y-1 whitespace-nowrap shrink-0 min-h-[50px]"
              >
                <span>Open Cake Lab</span>
                <ArrowDown className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#menu"
                onClick={(e) => triggerSplatter(e.clientX, e.clientY, '#2EC4B6')}
                className="inline-flex items-center gap-2 bg-[#FFF8EE] hover:bg-white text-[#1A0A10] font-extrabold text-base px-7 py-4 rounded-full border-[2.5px] border-[#1A0A10] pop-shadow transition-transform duration-150 hover:-translate-y-1 whitespace-nowrap shrink-0 min-h-[50px]"
              >
                <span>Explore Full Menu</span>
              </a>
            </div>
          </motion.div>

          {/* Right Interactive 3D Stage Showcase Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center lg:justify-end"
          >
            <div
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="relative w-full max-w-lg"
              style={{ perspective: '1000px' }}
            >
              {/* Scroll-driven Floating Starburst Decal */}
              <motion.div
                aria-hidden="true"
                style={{ y: stickerY, rotate: stickerRotate }}
                className="hidden sm:flex absolute -top-7 -left-7 w-16 h-16 rounded-full bg-[#2EC4B6] border-[3px] border-[#1A0A10] pop-shadow items-center justify-center font-display font-extrabold text-xs text-[#1A0A10] text-center leading-tight z-30"
              >
                SINCE
                <br />
                2016
              </motion.div>

              <div
                aria-hidden="true"
                className="hidden sm:block absolute -bottom-5 -right-4 w-10 h-10 rotate-12 rounded-xl bg-[#C9185B] border-[3px] border-[#1A0A10] pop-shadow-sm animate-float-gentle z-20"
              />

              <div
                className="bg-[#FFF8EE] border-[3px] border-[#1A0A10] rounded-3xl p-4 sm:p-5 pop-shadow-yellow transition-transform duration-200 ease-out"
                style={{
                  transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) ${
                    tilt.active ? 'scale(1.015)' : 'scale(1)'
                  }`,
                }}
              >
                {/* Live Sticker Badge */}
                <motion.div
                  key={activeSlide.badge}
                  initial={{ scale: 0.85, rotate: -2 }}
                  animate={{ scale: 1, rotate: 3 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                  className="absolute -top-4 right-4 sm:right-6 z-30 inline-flex items-center gap-1.5 bg-[#FFD166] text-[#1A0A10] border-2 border-[#1A0A10] pop-shadow-sm rounded-full px-4 py-1.5 text-xs sm:text-sm font-extrabold"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#1A0A10] shrink-0" aria-hidden="true" />
                  <span>{activeSlide.badge}</span>
                </motion.div>

                {/* Switcher Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 mb-3">
                  {HERO_SLIDES.map((slide, idx) => {
                    const isCurrent = idx === activeSlideIndex;
                    return (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={(e) => {
                          setActiveSlideIndex(idx);
                          triggerSplatter(e.clientX, e.clientY, slide.accent);
                        }}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold border-2 border-[#1A0A10] transition-colors ${
                          isCurrent
                            ? 'bg-[#1A0A10] text-[#FFD166]'
                            : 'bg-white text-[#1A0A10] hover:bg-[#FFD166]/45'
                        }`}
                      >
                        {slide.tabLabel}
                      </button>
                    );
                  })}
                </div>

                {/* Stage Image */}
                <div className="relative overflow-hidden rounded-2xl border-[2.5px] border-[#1A0A10] bg-[#FFF5EB] aspect-[4/3]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlide.id}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.25 }}
                      className="w-full h-full"
                    >
                      <ResilientImage
                        src={activeSlide.image}
                        alt={activeSlide.alt}
                        fallbackTitle={activeSlide.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4 px-1">
                  <div>
                    <p className="font-display font-extrabold text-lg text-[#1A0A10]">
                      {activeSlide.title}
                    </p>
                    <p className="text-sm font-semibold text-[#1A0A10]/75">{activeSlide.subtitle}</p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-[#2EC4B6] text-[#1A0A10] border-2 border-[#1A0A10] rounded-full px-3 py-1 text-xs font-extrabold shrink-0">
                    <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{activeSlide.chip}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Playful Scallop / Wave Transition into Warm Cream */}
      <div className="absolute bottom-0 left-0 right-0 leading-none pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full h-8 sm:h-12 block" preserveAspectRatio="none">
          <path
            d="M0 28 C 240 60, 480 0, 720 30 C 960 60, 1200 6, 1440 32 L 1440 60 L 0 60 Z"
            fill="#FFF8EE"
          />
        </svg>
      </div>
    </section>
  );
}
