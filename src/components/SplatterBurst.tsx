import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface BurstInstance {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
}

interface SplatterContextValue {
  triggerSplatter: (x: number, y: number, color?: string) => void;
}

const SplatterContext = createContext<SplatterContextValue>({
  triggerSplatter: () => {},
});

export function useSplatter() {
  return useContext(SplatterContext);
}

const SPLATTER_COLORS = ['#C9185B', '#FFD166', '#2EC4B6', '#D84315', '#241118'];

export function SplatterProvider({ children }: { children: ReactNode }) {
  const [bursts, setBursts] = useState<BurstInstance[]>([]);

  const triggerSplatter = useCallback((x: number, y: number, color?: string) => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const id = Date.now() + Math.random();
    const chosenColor = color ?? SPLATTER_COLORS[Math.floor(Math.random() * SPLATTER_COLORS.length)];
    const rotation = Math.floor(Math.random() * 360);

    setBursts((prev) => [...prev.slice(-5), { id, x, y, color: chosenColor, rotation }]);

    window.setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 700);
  }, []);

  return (
    <SplatterContext.Provider value={{ triggerSplatter }}>
      {children}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[90] overflow-hidden"
      >
        <AnimatePresence>
          {bursts.map((burst) => (
            <motion.div
              key={burst.id}
              initial={{ opacity: 0.95, scale: 0.2 }}
              animate={{ opacity: 0, scale: 1.45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed',
                left: burst.x - 70,
                top: burst.y - 70,
                width: 140,
                height: 140,
                rotate: `${burst.rotation}deg`,
              }}
            >
              <svg viewBox="0 0 140 140" className="w-full h-full overflow-visible">
                {/* Organic Confectionery Splash Center */}
                <path
                  d="M70 36 C82 34, 92 44, 102 41 C110 38, 114 48, 105 56 C98 63, 109 74, 103 86 C97 96, 84 91, 79 101 C74 111, 61 108, 57 98 C53 89, 41 96, 36 84 C31 73, 44 67, 38 56 C33 47, 44 37, 55 42 C62 45, 63 37, 70 36 Z"
                  fill={burst.color}
                  stroke="#241118"
                  strokeWidth="2.5"
                />
                {/* Flying Paint / Frosting Droplets */}
                <circle cx="22" cy="36" r="6" fill="#FFD166" stroke="#241118" strokeWidth="2" />
                <circle cx="118" cy="32" r="5" fill="#2EC4B6" stroke="#241118" strokeWidth="2" />
                <circle cx="122" cy="102" r="6.5" fill="#C9185B" stroke="#241118" strokeWidth="2" />
                <circle cx="26" cy="108" r="5.5" fill="#D84315" stroke="#241118" strokeWidth="2" />
                <rect x="65" y="10" width="10" height="5" rx="2.5" fill="#FFD166" stroke="#241118" strokeWidth="1.5" />
                <rect x="62" y="122" width="11" height="5" rx="2.5" fill="#2EC4B6" stroke="#241118" strokeWidth="1.5" />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </SplatterContext.Provider>
  );
}
