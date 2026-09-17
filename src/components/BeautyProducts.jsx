import React, { useState, useEffect } from 'react';
import { getBeautyProducts } from '../api';
import { formatNaira } from '../utils/formatters';
import { Sparkles, RefreshCw, AlertCircle, ShoppingBag, Check } from 'lucide-react';

export default function BeautyProducts({ onInquireProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inquiredId, setInquiredId] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBeautyProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to load beauty products from backend API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInquire = (product) => {
    setInquiredId(product.id);
    setTimeout(() => setInquiredId(null), 2500);
    if (onInquireProduct) {
      onInquireProduct(product);
    }
  };

  return (
    <section
      id="products"
      className="py-20 lg:py-28 bg-[#FFFDFB] relative border-b border-[#F5ECE9]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0F2] text-[#9B2242] text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Essential Hair &amp; Scalp Care</span>
          </div>
          <h2
            id="products-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D1B22] tracking-tight"
          >
            Nourishing Beauty Products
          </h2>
          <p className="mt-4 text-[#66545A] text-base leading-relaxed">
            Formulated with botanical elixirs, cold-pressed oils, and moisture-binding proteins
            to sustain luscious texture, prevent breakage, and maintain salon radiance.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div
            id="products-loading"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl p-4 border border-[#F2E8E8] animate-pulse space-y-4 shadow-sm"
              >
                <div className="aspect-[4/3] bg-[#F7ECEF] rounded-xl" />
                <div className="h-5 w-2/3 bg-[#F7ECEF] rounded" />
                <div className="h-4 bg-[#FAF2F5] rounded w-full" />
                <div className="h-6 w-1/3 bg-[#F7ECEF] rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div
            id="products-error"
            className="max-w-md mx-auto bg-[#FFF5F6] border border-[#F7CCD3] rounded-2xl p-6 text-center text-[#87203B]"
          >
            <AlertCircle className="w-10 h-10 mx-auto text-[#B82B4E] mb-3" />
            <h3 className="font-semibold text-lg">Unable to load beauty products</h3>
            <p className="text-sm mt-1 text-[#87203B]/80">{error}</p>
            <button
              id="products-retry-btn"
              onClick={fetchProducts}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#9B2242] text-white text-xs font-semibold hover:bg-[#821834] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry Connection
            </button>
          </div>
        )}

        {/* Products Grid (6 cards from PHP backend) */}
        {!loading && !error && (
          <div
            id="products-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {products.map((prod) => (
              <div
                key={prod.id}
                id={`product-card-${prod.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-[#EDE3E3] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Product Image */}
                  <div className="relative aspect-[4/3] bg-[#F9F3F4] overflow-hidden">
                    <img
                      src={prod.image_url}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-[#9B2242] shadow-sm">
                      {formatNaira(prod.price)}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-lg font-bold text-[#2D1B22] mb-2 group-hover:text-[#9B2242] transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-[#66545B] leading-relaxed line-clamp-2">
                      {prod.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0 flex items-center justify-between gap-2 border-t border-transparent">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#8A747B] block">
                      Price
                    </span>
                    <span className="font-serif text-lg font-bold text-[#9B2242]">
                      {formatNaira(prod.price)}
                    </span>
                  </div>

                  <button
                    id={`order-product-btn-${prod.id}`}
                    onClick={() => handleInquire(prod)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      inquiredId === prod.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#FAF0F2] text-[#9B2242] hover:bg-[#9B2242] hover:text-white'
                    }`}
                  >
                    {inquiredId === prod.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Inquired!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Order / Inquire</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
