import React from 'react';
import { Sparkles, Heart, Phone, MapPin, Instagram, ArrowUp } from 'lucide-react';

export default function Footer({ onOpenBackendModal, onOpenBooking }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#1C1417] text-[#EDE4E7] pt-16 pb-12 border-t border-[#2F2126]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#2C1F24]">
          {/* Brand Col */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#9B2242] to-[#D96B84] flex items-center justify-center text-white shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-200" />
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                Chloe Beauty Hub
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#B09DA3] leading-relaxed mb-6 max-w-sm">
              Nigeria's premier luxury salon boutique for virgin human hair wigs,
              rejuvenating hair therapies, and pampering manicure &amp; pedicure treatments.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/chloebeautyhub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#2B1D22] hover:bg-[#9B2242] text-pink-200 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="tel:+2348031234567"
                className="w-9 h-9 rounded-full bg-[#2B1D22] hover:bg-[#9B2242] text-pink-200 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Call salon"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase font-bold tracking-widest text-pink-300 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#B09DA3]">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Salon Services
                </a>
              </li>
              <li>
                <a href="#wigs" className="hover:text-white transition-colors">
                  Luxury Wigs
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Hair Products
                </a>
              </li>
              <li>
                <a href="#why-choose-us" className="hover:text-white transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Salon Gallery
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Client Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Salon Services */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-pink-300 mb-4">
              Treatments &amp; Wigs
            </h4>
            <ul className="space-y-2.5 text-xs text-[#B09DA3]">
              <li>Raw Bone Straight Wigs</li>
              <li>HD Swiss Frontal Wigs</li>
              <li>Deep Hydration Scalp Steaming</li>
              <li>Protein Hair Restoration</li>
              <li>Luxury Gel Manicure</li>
              <li>Exfoliating Spa Pedicure</li>
            </ul>
          </div>

          {/* Contact Details & CTA */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-pink-300 mb-4">
              Salon Boutique
            </h4>
            <p className="text-xs text-[#B09DA3] leading-relaxed mb-3">
              14 Victoria Crown Plaza, Admiralty Way, Lekki Phase 1, Lagos, Nigeria
            </p>
            <p className="text-xs text-[#B09DA3] mb-4">
              +234 803 123 4567 • +234 812 987 6543
            </p>

            <button
              id="footer-book-now-btn"
              onClick={() => onOpenBooking()}
              className="w-full py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#9B2242] hover:bg-[#821834] transition-colors text-center shadow-sm"
            >
              Book Your Appointment
            </button>

            <button
              onClick={onOpenBackendModal}
              className="w-full mt-2 py-2 rounded-full text-[11px] font-semibold text-pink-300 bg-[#2C1D23] hover:bg-[#38262E] transition-colors border border-[#482E37]"
            >
              View PHP &amp; MySQL Code
            </button>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A757C]">
          <p id="footer-copyright">
            &copy; {new Date().getFullYear()} Chloe Beauty Hub. All rights reserved. Beauty, Style &amp; Confidence.
          </p>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-[11px]">
              Crafted with <Heart className="w-3 h-3 text-[#9B2242] fill-[#9B2242]" /> for Nigerian Queens
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-[#2A1D21] hover:bg-[#9B2242] text-neutral-300 hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
