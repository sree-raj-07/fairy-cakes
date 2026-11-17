import { useState } from 'react';
import { CakeSlice, Menu, MessageCircle, X } from 'lucide-react';
import { buildWhatsAppUrl } from '../data/menuData';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const quickWhatsAppUrl = buildWhatsAppUrl(
    'Hi Fairy Cakes Parippally! I would like to place an order.'
  );

  return (
    <header className="sticky top-3 z-50 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-6xl mx-auto pointer-events-auto">
        <div className="bg-[#FFF8EE] border-[2.5px] border-[#1A0A10] rounded-full pop-shadow-sm px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#top"
            className="flex items-center gap-2.5 font-display text-lg sm:text-xl font-extrabold text-[#1A0A10] tracking-tight whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2EC4B6] rounded-full"
          >
            <span className="w-8 h-8 rounded-full bg-[#FFD166] border-2 border-[#1A0A10] flex items-center justify-center shrink-0">
              <CakeSlice className="w-4 h-4 text-[#1A0A10]" aria-hidden="true" />
            </span>
            <span>Fairy Cakes</span>
          </a>

          {/* Zone 2: Concise Single-Line Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-6 lg:gap-8 text-[15px] font-bold text-[#1A0A10]"
          >
            <a
              href="#worlds"
              className="whitespace-nowrap shrink-0 hover:text-[#C9185B] hover:underline decoration-2 underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2EC4B6] rounded"
            >
              Studio &amp; Café
            </a>
            <a
              href="#menu"
              className="whitespace-nowrap shrink-0 hover:text-[#C9185B] hover:underline decoration-2 underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2EC4B6] rounded"
            >
              Full Menu
            </a>
            <a
              href="#custom-cake"
              className="whitespace-nowrap shrink-0 hover:text-[#C9185B] hover:underline decoration-2 underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2EC4B6] rounded"
            >
              Cake Lab
            </a>
            <a
              href="#visit-us"
              className="whitespace-nowrap shrink-0 hover:text-[#C9185B] hover:underline decoration-2 underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2EC4B6] rounded"
            >
              Visit Us
            </a>
          </nav>

          {/* Zone 3: 1 Primary CTA + Mobile Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={quickWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1A0A10] hover:bg-[#32131E] text-[#FFD166] font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-full whitespace-nowrap shrink-0 transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2EC4B6] min-h-[40px]"
            >
              <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Order on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden w-10 h-10 rounded-full border-2 border-[#1A0A10] bg-white text-[#1A0A10] flex items-center justify-center shrink-0 hover:bg-[#FFD166] transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            aria-label="Mobile Navigation"
            className="md:hidden mt-2 bg-[#FFF8EE] border-2 border-[#1A0A10] rounded-2xl pop-shadow p-3 flex flex-col gap-1"
          >
            <a
              href="#worlds"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl font-bold text-[#1A0A10] hover:bg-[#FFD166] transition-colors"
            >
              Studio &amp; Café
            </a>
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl font-bold text-[#1A0A10] hover:bg-[#FFD166] transition-colors"
            >
              Full Menu
            </a>
            <a
              href="#custom-cake"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl font-bold text-[#1A0A10] hover:bg-[#FFD166] transition-colors"
            >
              Cake Lab
            </a>
            <a
              href="#visit-us"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl font-bold text-[#1A0A10] hover:bg-[#FFD166] transition-colors"
            >
              Visit Us
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
