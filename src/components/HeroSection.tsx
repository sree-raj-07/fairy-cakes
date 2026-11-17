import { useRef, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
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

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, active: false });
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const { triggerSplatter } = useSplatter();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const stickerY = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const stickerRotate = useTransform(scrollYProgress, [0, 1], [-4, 18]);

  const activeSlide = HERO_SLIDES[activeSlideIndex];

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 16;
    const rotateX = (0.5 - y) * 16;
    setTilt({ rotateX, rotateY, active: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, active: false });
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative overflow-hidden -mt-[76px] pt-[124px] pb-24 sm:pb-32 bg-[#1A0A10]"
    >
      {/* Thunderbuns High-Voltage Spotlight + MyFRIDA Berry-Cocoa Gradient Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 75% 32%, rgba(201, 24, 91, 0.55) 0%, rgba(217, 72, 15, 0.25) 38%, rgba(26, 10, 16, 0.96) 76%)',
        }}
      />

      {/* Kinetic Graphic Starburst & Lightning-Drip Vectors */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-20"
        preserveAspectRatio="none"
        viewBox="0 0 1440 820"
      >
        <circle cx="110" cy="210" r="145" fill="#FFD166" />
        <circle cx="1320" cy="190" r="165" fill="#2EC4B6" />
        <path
          d="M-60 560 C 200 440, 440 690, 720 550 C 960 420, 1200 660, 1500 500 L 1500 840 L -60 840 Z"
          fill="#C9185B"
          opacity="0.35"
        />
        <rect x="280" y="125" width="22" height="8" rx="4" fill="#FFD166" transform="rotate(28 280 125)" />
        <rect x="650" y="130" width="24" height="8" rx="4" fill="#FFF8EE" transform="rotate(-18 650 130)" />
        <circle cx="520" cy="690" r="10" fill="#2EC4B6" />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Copy Column — Thunderbuns Maximalist Typography */}
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
              className="font-display font-extrabold text-white leading-[0.98] tracking-tight"
              style={{
                fontSize: 'clamp(2.75rem, 5.4vw, 4.6rem)',
                textWrap: 'balance',
              }}
            >
              Handmade Happiness in{' '}
              <span className="inline-block bg-[#FFD166] text-[#1A0A10] px-3 py-0.5 rounded-2xl border-[3px] border-[#1A0A10] -rotate-1">
                Every Bite.
              </span>
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
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
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
