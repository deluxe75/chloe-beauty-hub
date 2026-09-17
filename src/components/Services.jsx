import React, { useState, useEffect } from 'react';
import { getServices } from '../api';
import { Crown, Sparkles, HandMetal, Footprints, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';

const iconMap = {
  Crown: Crown,
  Sparkles: Sparkles,
  HandMetal: HandMetal,
  Footprints: Footprints,
};

export default function Services({ onSelectService }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServicesData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getServices();
      setServices(data);
    } catch (err) {
      setError(err.message || 'Failed to load services from backend API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServicesData();
  }, []);

  return (
    <section
      id="services"
      className="py-20 lg:py-28 bg-[#FFFDFB] relative border-b border-[#F7EFEF]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0F2] text-[#9B2242] text-xs font-semibold tracking-wider uppercase mb-3">
            <span>Signature Salon Services</span>
          </div>
          <h2
            id="services-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D1B22] tracking-tight"
          >
            Indulge in Pure Elegance
          </h2>
          <p className="mt-4 text-[#635157] text-base leading-relaxed">
            From bespoke virgin lace wigs to therapeutic hair rituals and pampering nail care,
            we deliver personalized beauty experiences that inspire confidence.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div
            id="services-loading"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl p-6 border border-[#F2E8E8] animate-pulse space-y-4 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F7EAEF]" />
                <div className="h-6 w-3/4 bg-[#F7EAEF] rounded" />
                <div className="space-y-2">
                  <div className="h-4 bg-[#FAF2F5] rounded w-full" />
                  <div className="h-4 bg-[#FAF2F5] rounded w-5/6" />
                </div>
                <div className="h-8 bg-[#F7EAEF] rounded-full w-1/2 pt-2" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div
            id="services-error"
            className="max-w-md mx-auto bg-[#FFF5F6] border border-[#F7CCD3] rounded-2xl p-6 text-center text-[#87203B]"
          >
            <AlertCircle className="w-10 h-10 mx-auto text-[#B82B4E] mb-3" />
            <h3 className="font-semibold text-lg">Unable to load services</h3>
            <p className="text-sm mt-1 text-[#87203B]/80">{error}</p>
            <button
              id="services-retry-btn"
              onClick={fetchServicesData}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#9B2242] text-white text-xs font-semibold hover:bg-[#821834] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry Connection
            </button>
          </div>
        )}

        {/* Services Grid (4 cards from PHP backend) */}
        {!loading && !error && (
          <div
            id="services-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {services.map((service) => {
              const IconComponent = iconMap[service.icon] || Sparkles;
              return (
                <div
                  key={service.id}
                  id={`service-card-${service.id}`}
                  className="group bg-white rounded-2xl p-7 border border-[#F2E8E8] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                >
                  <div>
                    {/* Icon container */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FAF0F2] to-[#FCE8ED] border border-[#F5D8E0] flex items-center justify-center text-[#9B2242] mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <IconComponent className="w-7 h-7" />
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#2D1B22] mb-3 group-hover:text-[#9B2242] transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-sm text-[#66545B] leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#F8EFEF]">
                    <button
                      id={`book-service-btn-${service.id}`}
                      onClick={() => onSelectService(service.title)}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9B2242] hover:text-[#781831] transition-colors group-hover:translate-x-1 duration-200"
                    >
                      <span>Book This Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
