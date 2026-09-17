import React, { useState } from 'react';
import { Sparkles, Heart, Instagram } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    category: 'wigs',
    title: '30" Bone Straight Lace Melt',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=700&q=80',
    tag: 'Raw Donor Hair'
  },
  {
    id: 2,
    category: 'hair',
    title: 'Silk Press & Scalp Hydration',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=700&q=80',
    tag: 'Deep Conditioning'
  },
  {
    id: 3,
    category: 'nails',
    title: 'French Ombré Sculpted Acrylics',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=700&q=80',
    tag: 'Manicure Luxury'
  },
  {
    id: 4,
    category: 'wigs',
    title: 'Burmese Deep Wave Frontal',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80',
    tag: 'HD Swiss Lace'
  },
  {
    id: 5,
    category: 'hair',
    title: 'Protein Rejuvenation Steam Therapy',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=700&q=80',
    tag: 'Salon Ritual'
  },
  {
    id: 6,
    category: 'nails',
    title: 'Rose Quartz Spa Pedicure',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=700&q=80',
    tag: 'Foot Spa'
  }
];

export default function GallerySection({ onOpenBooking }) {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  return (
    <section
      id="gallery"
      className="py-20 lg:py-28 bg-[#FAF6F6] relative border-b border-[#F2E5E8]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#EACCD4] text-[#9B2242] text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Salon Portfolio</span>
            </div>
            <h2
              id="gallery-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D1B22] tracking-tight"
            >
              Artistry in Motion
            </h2>
            <p className="mt-4 text-[#66545A] text-base leading-relaxed">
              Browse our latest transformations, lace installs, custom wig cuts, and luxury
              nail grooming. Follow @chloebeautyhub on Instagram for daily glam updates.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Work' },
              { id: 'wigs', label: 'Wig Installs' },
              { id: 'hair', label: 'Hair Care' },
              { id: 'nails', label: 'Nails & Spa' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  filter === tab.id
                    ? 'bg-[#9B2242] text-white shadow-sm'
                    : 'bg-white text-[#635056] hover:bg-[#FCECEF] hover:text-[#9B2242] border border-[#EFE5E7]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] bg-[#EFEAE7] shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] uppercase font-bold tracking-wider text-[#9B2242]">
                  {item.tag}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <h4 className="font-serif text-lg font-bold text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-white/80">Chloe Beauty Hub Salon</p>
                </div>
                <button
                  onClick={() => onOpenBooking()}
                  title="Book this look"
                  className="w-10 h-10 rounded-full bg-[#9B2242] hover:bg-[#821834] text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
                >
                  <Heart className="w-4 h-4 fill-white" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Link Banner */}
        <div className="mt-12 text-center">
          <a
            href="https://instagram.com/chloebeautyhub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#9B2242] hover:text-[#781831] transition-colors"
          >
            <Instagram className="w-4 h-4" />
            <span>Tag us on Instagram @chloebeautyhub with your new crown #ChloeBeautyQueen</span>
          </a>
        </div>
      </div>
    </section>
  );
}
