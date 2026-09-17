import React, { useState, useEffect } from 'react';
import { getTestimonials } from '../api';
import { Star, Quote, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTestimonials();
      setTestimonials(data);
    } catch (err) {
      setError(err.message || 'Failed to load reviews from backend API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <section
      id="reviews"
      className="py-20 lg:py-28 bg-[#FFFDFB] relative border-b border-[#F5ECE9]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0F2] text-[#9B2242] text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Verified Customer Stories</span>
          </div>
          <h2
            id="testimonials-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D1B22] tracking-tight"
          >
            Loved by Queens Nationwide
          </h2>
          <p className="mt-4 text-[#66545A] text-base leading-relaxed">
            Discover why beauty enthusiasts and celebrities across Lagos, Abuja, and Port Harcourt
            trust Chloe Beauty Hub for their crowning glory.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div
            id="testimonials-loading"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white rounded-3xl p-8 border border-[#F2E8E8] animate-pulse space-y-4 shadow-sm"
              >
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="w-4 h-4 rounded bg-[#F7ECEF]" />
                  ))}
                </div>
                <div className="h-4 bg-[#FAF2F5] rounded w-full" />
                <div className="h-4 bg-[#FAF2F5] rounded w-4/5" />
                <div className="flex items-center gap-3 pt-4">
                  <div className="w-12 h-12 rounded-full bg-[#F7ECEF]" />
                  <div className="space-y-1">
                    <div className="h-4 w-24 bg-[#F7ECEF] rounded" />
                    <div className="h-3 w-16 bg-[#FAF2F5] rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div
            id="testimonials-error"
            className="max-w-md mx-auto bg-[#FFF5F6] border border-[#F7CCD3] rounded-2xl p-6 text-center text-[#87203B]"
          >
            <AlertCircle className="w-10 h-10 mx-auto text-[#B82B4E] mb-3" />
            <h3 className="font-semibold text-lg">Unable to load reviews</h3>
            <p className="text-sm mt-1 text-[#87203B]/80">{error}</p>
            <button
              id="testimonials-retry-btn"
              onClick={fetchReviews}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#9B2242] text-white text-xs font-semibold hover:bg-[#821834] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry Connection
            </button>
          </div>
        )}

        {/* Testimonials Grid (3 client reviews from PHP backend) */}
        {!loading && !error && (
          <div
            id="testimonials-grid"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((review) => (
              <div
                key={review.id}
                id={`testimonial-card-${review.id}`}
                className="bg-white rounded-3xl p-8 border border-[#EDE3E3] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Decorative subtle quotation mark */}
                <Quote className="absolute top-6 right-6 w-12 h-12 text-[#FAF0F2] pointer-events-none" />

                <div>
                  {/* 5-star rating */}
                  <div className="flex items-center gap-1 mb-6 text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-sm sm:text-base text-[#4A3940] leading-relaxed italic relative z-10 mb-8 font-normal">
                    "{review.quote}"
                  </p>
                </div>

                {/* Client Profile */}
                <div className="pt-6 border-t border-[#F8EFEF] flex items-center gap-4">
                  <div className="w-13 h-13 rounded-full overflow-hidden border-2 border-[#F2D7DE] shadow-xs shrink-0">
                    <img
                      src={review.image_url}
                      alt={review.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#2D1B22]">
                      {review.name}
                    </h4>
                    <p className="text-xs text-[#8A7178] font-medium">
                      {review.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
