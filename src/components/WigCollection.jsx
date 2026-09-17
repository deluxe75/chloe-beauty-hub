import React, { useState, useEffect } from 'react';
import { getWigCollection } from '../api';
import { formatNaira } from '../utils/formatters';
import { Sparkles, Calendar, RefreshCw, AlertCircle, Eye } from 'lucide-react';

export default function WigCollection({ onSelectProductForBooking }) {
  const [wigs, setWigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPreview, setSelectedPreview] = useState(null);

  const fetchWigs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWigCollection();
      setWigs(data);
    } catch (err) {
      setError(err.message || 'Failed to load wigs from backend API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWigs();
  }, []);

  return (
    <section
      id="wigs"
      className="py-20 lg:py-28 bg-[#FCFAF9] relative border-b border-[#F5ECE9]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0F2] text-[#9B2242] text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>100% Virgin Human Hair</span>
            </div>
            <h2
              id="wigs-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D1B22] tracking-tight"
            >
              Popular Wig Collection
            </h2>
            <p className="mt-4 text-[#66545A] text-base leading-relaxed">
              Carefully curated, pre-plucked, and customized with skin-melting HD lace.
              Built for natural flow, zero tangling, and effortless beauty.
            </p>
          </div>
          <div>
            <span className="text-xs font-semibold text-[#8C6D75] bg-[#F2E5E8] px-3 py-1.5 rounded-full">
              Category: <strong className="text-[#9B2242]">Wigs</strong>
            </span>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div
            id="wigs-loading"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white rounded-3xl overflow-hidden border border-[#EFE5E5] animate-pulse shadow-sm"
              >
                <div className="aspect-[4/4] bg-[#F7ECEF]" />
                <div className="p-6 space-y-4">
                  <div className="h-6 w-3/4 bg-[#F7ECEF] rounded" />
                  <div className="h-4 bg-[#FAF2F5] rounded w-full" />
                  <div className="h-6 w-1/3 bg-[#F7ECEF] rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div
            id="wigs-error"
            className="max-w-md mx-auto bg-[#FFF5F6] border border-[#F7CCD3] rounded-2xl p-6 text-center text-[#87203B]"
          >
            <AlertCircle className="w-10 h-10 mx-auto text-[#B82B4E] mb-3" />
            <h3 className="font-semibold text-lg">Unable to load wig collection</h3>
            <p className="text-sm mt-1 text-[#87203B]/80">{error}</p>
            <button
              id="wigs-retry-btn"
              onClick={fetchWigs}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#9B2242] text-white text-xs font-semibold hover:bg-[#821834] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry Connection
            </button>
          </div>
        )}

        {/* Wigs Product Grid */}
        {!loading && !error && (
          <div
            id="wigs-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {wigs.map((wig) => (
              <div
                key={wig.id}
                id={`wig-product-${wig.id}`}
                className="group bg-white rounded-3xl overflow-hidden border border-[#EDE3E3] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Image Showcase */}
                <div className="relative aspect-[4/4] bg-[#F8F1F2] overflow-hidden">
                  <img
                    src={wig.image_url}
                    alt={wig.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#9B2242] shadow-sm">
                    {formatNaira(wig.price)}
                  </div>
                  <button
                    onClick={() => setSelectedPreview(wig)}
                    title="Quick preview"
                    className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Details */}
                <div className="p-7 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="font-serif text-xl font-bold text-[#2D1B22] group-hover:text-[#9B2242] transition-colors">
                        {wig.name}
                      </h3>
                    </div>

                    <p className="text-sm text-[#66545B] leading-relaxed mb-6">
                      {wig.description}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-[#F7ECEF] flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#8A747B] font-semibold block">
                        Investment
                      </span>
                      <span className="font-serif text-xl font-bold text-[#9B2242]">
                        {formatNaira(wig.price)}
                      </span>
                    </div>

                    <button
                      id={`book-wig-btn-${wig.id}`}
                      onClick={() => onSelectProductForBooking(`Custom Fitting: ${wig.name}`)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-white bg-[#9B2242] hover:bg-[#821834] transition-colors shadow-sm"
                    >
                      <Calendar className="w-3.5 h-3.5 text-amber-200" />
                      <span>Book Fitting</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Preview Modal */}
        {selectedPreview && (
          <div
            id="wig-preview-modal"
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedPreview(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] bg-black">
                <img
                  src={selectedPreview.image_url}
                  alt={selectedPreview.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedPreview(null)}
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white text-black p-2 rounded-full font-bold shadow"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-2xl font-bold text-[#2D1B22]">
                    {selectedPreview.name}
                  </h3>
                  <span className="font-serif text-2xl font-bold text-[#9B2242]">
                    {formatNaira(selectedPreview.price)}
                  </span>
                </div>
                <p className="text-sm text-[#66545B] leading-relaxed mb-6">
                  {selectedPreview.description}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      const name = selectedPreview.name;
                      setSelectedPreview(null);
                      onSelectProductForBooking(`Custom Fitting: ${name}`);
                    }}
                    className="flex-1 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#9B2242] hover:bg-[#821834] transition-colors text-center"
                  >
                    Book Fitting for this Wig
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
