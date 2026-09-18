import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Calendar } from 'lucide-react';

export default function Navbar({ onOpenBooking, onOpenAdminModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Wigs', href: '#wigs' },
    { name: 'Products', href: '#products' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-[#F2E8E8]'
          : 'bg-white/80 backdrop-blur-sm py-4 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            id="brand-logo-link"
            href="#"
            className="flex items-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#9B2242] to-[#D96B84] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <Sparkles className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2D1B22] block leading-none">
                Chloe Beauty Hub
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#9B2242] font-semibold mt-0.5 block">
                Luxury Salon & Wigs
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                id={`nav-link-${link.name.toLowerCase()}`}
                href={link.href}
                className="text-sm font-medium text-[#4A3B40] hover:text-[#9B2242] transition-colors relative py-1 hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#9B2242] after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="nav-admin-bookings-btn"
              onClick={onOpenAdminModal}
              title="View Recorded Appointments (Admin GET /api/appointments.php)"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg text-[#4A3B40] bg-[#F7F6F5] hover:bg-[#EDEAE7] transition-colors border border-[#E4DFD8]"
            >
              <Calendar className="w-3.5 h-3.5 text-[#684C55]" />
              <span>Bookings</span>
            </button>

            <button
              id="nav-book-appointment-btn"
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide text-white bg-gradient-to-r from-[#9B2242] to-[#B33959] hover:from-[#851C36] hover:to-[#9B2242] shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-200" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              id="mobile-book-quick-btn"
              onClick={() => onOpenBooking()}
              className="p-2 rounded-full bg-[#FAF2F4] text-[#9B2242] border border-[#EACCD4]"
              aria-label="Book appointment"
            >
              <Calendar className="w-4 h-4" />
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-[#4A3B40] hover:bg-[#FAF2F4] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div
          id="mobile-nav-menu"
          className="sm:hidden bg-white border-b border-[#F2E8E8] px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                id={`mobile-nav-link-${link.name.toLowerCase()}`}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 text-base font-medium text-[#4A3B40] hover:text-[#9B2242] hover:bg-[#FAF2F4] rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-3 border-t border-[#F2E8E8] flex flex-col gap-2.5">
              <button
                id="mobile-book-appointment-btn"
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-full text-center text-sm font-semibold text-white bg-gradient-to-r from-[#9B2242] to-[#B33959] shadow-sm flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-amber-200" />
                Book Appointment
              </button>

              <div className="pt-1">
                <button
                  id="mobile-view-bookings-btn"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenAdminModal();
                  }}
                  className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold text-[#4A3B40] bg-[#F7F6F5] border border-[#E4DFD8] flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#684C55]" />
                  Bookings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
