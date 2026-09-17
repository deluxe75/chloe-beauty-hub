import React from 'react';
import { ArrowRight, Sparkles, Star, ShieldCheck, Heart } from 'lucide-react';

export default function Hero({ onOpenBooking }) {
  return (
    <header
      id="hero-section"
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#FAF4F5] via-[#FFFDFB] to-[#FFFDFB]"
    >
      {/* Decorative ambient blurred blobs */}
      <div
        aria-hidden="true"
        className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40 overflow-hidden"
      >
        <div className="absolute -top-10 -left-10 w-96 h-96 bg-[#FAD2DA] rounded-full blur-3xl" />
        <div className="absolute top-20 right-0 w-80 h-80 bg-[#F7E7CE] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0F2] border border-[#F2D7DE] text-[#9B2242] text-xs font-semibold tracking-wide mb-6">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Premium Luxury Hair & Salon Destination</span>
            </div>

            <h1
              id="hero-headline"
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#231418] tracking-tight leading-[1.12] mb-6"
            >
              Beauty, Style &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B2242] via-[#C94A6E] to-[#B33959]">
                Confidence
              </span>
            </h1>

            <p
              id="hero-subtext"
              className="text-base sm:text-lg text-[#5C4A50] leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8 font-normal"
            >
              Elevate your everyday crown with our handcrafted virgin human hair wigs,
              rejuvenating deep hair treatments, and exquisite luxury manicure &amp; pedicure
              services tailored to give you effortless poise and undeniable radiance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <a
                id="hero-explore-services-btn"
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-[#9B2242] to-[#B33959] hover:from-[#821834] hover:to-[#9B2242] shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 text-amber-200" />
              </a>

              <button
                id="hero-book-now-btn"
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide text-[#4A2631] bg-white hover:bg-[#FAF4F5] border border-[#EACCD4] shadow-sm hover:shadow transition-all"
              >
                <span>Book Appointment</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-[#F2E8E8] grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="font-serif text-2xl font-bold text-[#9B2242]">100%</p>
                <p className="text-xs text-[#705860] mt-0.5 font-medium">Virgin Human Hair</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#9B2242]">5,000+</p>
                <p className="text-xs text-[#705860] mt-0.5 font-medium">Happy Queens</p>
              </div>
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-0.5 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-serif text-2xl font-bold text-[#231418] ml-1">4.9</span>
                </div>
                <p className="text-xs text-[#705860] mt-0.5 font-medium">Client Rating</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative ring */}
              <div className="relative rounded-3xl p-3 bg-gradient-to-tr from-[#F4D3DA] via-[#FFF1F3] to-[#F7E7CE] shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#EFEAE7]">
                  <img
                    id="hero-main-img"
                    src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=900&q=85"
                    alt="Chloe Beauty Hub Luxury Wig Styling"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Inner caption badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3.5 border border-white/60 shadow-lg flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold tracking-wider text-[#9B2242] uppercase block">
                        Signature Collection
                      </span>
                      <p className="font-serif text-sm font-semibold text-[#2D1B22]">
                        Lace Frontals &amp; Silky Bone Straight
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-[#FAF0F2] flex items-center justify-center text-[#9B2242]">
                      <Heart className="w-4 h-4 fill-[#9B2242]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Floating Badge 1 */}
              <div className="hidden sm:flex absolute -top-5 -left-6 bg-white rounded-2xl p-3.5 shadow-xl border border-[#F2E8E8] items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF0F2] flex items-center justify-center text-[#9B2242]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#231418]">Full Salon Care</p>
                  <p className="text-[11px] text-[#705860]">Wigs • Hair • Nails</p>
                </div>
              </div>

              {/* Floating Floating Badge 2 */}
              <div className="hidden sm:flex absolute -bottom-5 -right-6 bg-white rounded-2xl p-3.5 shadow-xl border border-[#F2E8E8] items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#231418]">Certified Stylists</p>
                  <p className="text-[11px] text-[#705860]">Lekki Phase 1, Lagos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
