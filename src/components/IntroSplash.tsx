import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CakeSlice, Sparkles } from 'lucide-react';

export default function IntroSplash() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => setVisible(false), 850);
    return () => window.clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-[#1A0A10] flex flex-col items-center justify-center p-6 pointer-events-none select-none"
        >
          <motion.div
            initial={{ scale: 0.7, rotate: -6, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-[#FFD166] border-[3px] border-white flex items-center justify-center pop-shadow-yellow">
              <CakeSlice className="w-10 h-10 text-[#1A0A10]" />
            </div>
            <div className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
              FAIRY CAKES
            </div>
            <div className="inline-flex items-center gap-2 bg-[#C9185B] text-[#FFD166] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-white/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Parippally • Since 2016</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
