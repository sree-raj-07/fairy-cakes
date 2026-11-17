import { Clock, ExternalLink, Instagram, MapPin } from 'lucide-react';

const MARQUEE_TOP =
  '★ 4.9 GOOGLE RATING (370+ REVIEWS) • BEST CUSTOM CAKES & CAFÉ IN PARIPPALLY • FRESHLY BAKED SINCE 2016 • 99.9% THEME DESIGN ACCURACY •';

const MARQUEE_BOTTOM =
  'LOADED CHEESE FRIES • SPANISH DELIGHT PRALINE • BELGIAN OREO SHAKES • TRES LECHES • ARTISAN PIZZAS & MOMOS • FUDGE BROWNIE JARS •';

export default function SocialTickerAndFooter() {
  const googleMapsUrl =
    'https://www.google.com/maps/search/?api=1&query=Fairy+Cakes+Jawahar+Junction+Mukkada+Road+Parippally+Kollam+Kerala+691574';

  return (
    <div className="overflow-hidden">
      {/* Crossed Dual-Track Kinetic Marquee (Thunderbuns-inspired) */}
      <div aria-label="Studio and café highlights" className="bg-[#1A0A10] pt-4 pb-2">
        <div className="bg-[#FFD166] text-[#1A0A10] border-y-[3px] border-[#1A0A10] py-3 overflow-hidden select-none">
          <div className="animate-marquee font-display font-extrabold text-sm sm:text-base tracking-wide">
            <span className="px-4 whitespace-nowrap">{MARQUEE_TOP}</span>
            <span className="px-4 whitespace-nowrap">{MARQUEE_TOP}</span>
            <span className="px-4 whitespace-nowrap" aria-hidden="true">
              {MARQUEE_TOP}
            </span>
          </div>
        </div>

        <div className="bg-[#C9185B] text-white border-b-[3px] border-[#1A0A10] py-2.5 overflow-hidden select-none">
          <div className="animate-marquee-reverse font-display font-bold text-xs sm:text-sm tracking-widest">
            <span className="px-4 whitespace-nowrap">{MARQUEE_BOTTOM}</span>
            <span className="px-4 whitespace-nowrap">{MARQUEE_BOTTOM}</span>
            <span className="px-4 whitespace-nowrap" aria-hidden="true">
              {MARQUEE_BOTTOM}
            </span>
          </div>
        </div>
      </div>

      {/* Bold Obsidian Cocoa Footer */}
      <footer id="visit-us" className="bg-[#1A0A10] text-white pt-14 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            {/* Left Column */}
            <div className="space-y-4">
              <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-[#FFD166] tracking-tight">
                FAIRY CAKES
              </h3>
              <p className="text-white/90 text-[15px] leading-relaxed max-w-sm">
                Parippally&apos;s favorite custom cake studio and all-day hangout café since 2016.
                Handcrafted birthday cakes, loaded fries, artisan pizzas, shakes, and brownies.
              </p>
              <a
                href="https://instagram.com/fairy_cakes_kollam"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-[#FFD166] text-[#FFD166] hover:text-[#1A0A10] border border-[#FFD166] font-bold text-sm px-4 py-2 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD166]"
              >
                <Instagram className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>@fairy_cakes_kollam</span>
              </a>
            </div>

            {/* Middle Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#FFD166]">
                <MapPin className="w-5 h-5 shrink-0" aria-hidden="true" />
                <h4 className="font-display font-bold text-xl">Visit Our Café</h4>
              </div>
              <address className="not-italic text-white/95 text-[15px] leading-relaxed">
                Jawahar Junction, Mukkada Road,
                <br />
                Opp. Moto Planet, Parippally,
                <br />
                Kollam, Kerala 691574
              </address>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#FFD166]">
                <Clock className="w-5 h-5 shrink-0" aria-hidden="true" />
                <h4 className="font-display font-bold text-xl">Opening Hours</h4>
              </div>
              <div className="space-y-2 text-[15px] text-white/95">
                <p>
                  <span className="font-bold text-[#FFD166]">Café Dine-In:</span>{' '}
                  <span className="tabular-nums">11:00 AM – 11:00 PM</span>
                </p>
                <p>
                  <span className="font-bold text-[#FFD166]">Cake Delivery:</span>{' '}
                  <span className="tabular-nums">10:00 AM – 10:00 PM</span>
                </p>
              </div>
              <div className="pt-1">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#FFD166] hover:bg-[#ffe08f] text-[#1A0A10] font-extrabold text-sm px-5 py-2.5 rounded-full border-2 border-white transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD166]"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-white/75">
            <p>© {new Date().getFullYear()} Fairy Cakes, Parippally, Kollam. All rights reserved.</p>
            <p>Custom Cake Studio &amp; Café · Kerala 691574</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
