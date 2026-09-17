import React from 'react';
import { Award, HeartHandshake, Smile, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      id: 'feature-premium-quality',
      title: 'Premium Quality',
      subtitle: 'Pure Virgin Hair & Luxury Formulations',
      icon: Award,
      description:
        'We source only single-donor 100% cuticle-aligned virgin human hair with zero synthetic mixes. Our lace frontals blend invisibly across all complexions, and our styling formulas deliver lasting protection.',
      points: [
        'Ethically sourced single-donor raw hair',
        'Invisible HD Swiss lace melt technology',
        'Shed-free & tangle-resistant longevity'
      ]
    },
    {
      id: 'feature-expert-care',
      title: 'Expert Care',
      subtitle: 'Master Stylists & Cosmetologists',
      icon: HeartHandshake,
      description:
        'Our licensed hair artisans and nail technicians bring over a decade of mastery in wig customization, scalp treatment, and nail sculpting. You receive meticulous attention to every strand.',
      points: [
        'Custom hairline plucking and knot bleaching',
        'Therapeutic deep scalp steaming protocols',
        'Hygienic, medical-grade manicure & pedicure tools'
      ]
    },
    {
      id: 'feature-customer-satisfaction',
      title: 'Customer Satisfaction',
      subtitle: 'VIP Experience & Support',
      icon: Smile,
      description:
        'From personalized bridal consultations to express nationwide delivery and aftercare guidance, your joy and effortless confidence remain our highest metric of excellence.',
      points: [
        'Transparent upfront pricing in Naira (₦)',
        'Prompt WhatsApp & phone booking support',
        'Dedicated aftercare and wig maintenance guides'
      ]
    }
  ];

  return (
    <section
      id="why-choose-us"
      className="py-20 lg:py-28 bg-[#FAF6F6] relative border-b border-[#F2E5E8]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#EACCD4] text-[#9B2242] text-xs font-semibold tracking-wider uppercase mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>The Chloe Difference</span>
          </div>
          <h2
            id="why-choose-us-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D1B22] tracking-tight"
          >
            Why Choose Chloe Beauty Hub
          </h2>
          <p className="mt-4 text-[#66545B] text-base leading-relaxed">
            Crafted with passion, executed with precision. We combine luxury salon artistry
            with genuine hospitality to create your ultimate sanctuary of glam.
          </p>
        </div>

        {/* 3 Feature Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                id={feat.id}
                className="bg-white rounded-3xl p-8 border border-[#EDE3E5] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#FAF0F2] to-[#FCE6EC] border border-[#F5D7DF] flex items-center justify-center text-[#9B2242] mb-6 shadow-sm">
                    <Icon className="w-8 h-8" />
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#2D1B22] mb-1">
                    {feat.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#9B2242] tracking-wide uppercase mb-4">
                    {feat.subtitle}
                  </p>

                  <p className="text-sm text-[#66545B] leading-relaxed mb-6">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#F5ECEE] space-y-2.5">
                  {feat.points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#523F45]">
                      <CheckCircle2 className="w-4 h-4 text-[#9B2242] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Accent */}
        <div className="mt-14 bg-gradient-to-r from-[#9B2242] via-[#A82B4B] to-[#7B1731] rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h4 className="font-serif text-2xl font-bold">Ready to Experience True Luxury?</h4>
            <p className="text-sm text-pink-100 mt-2">
              Book your session today or visit our boutique salon in Lekki Phase 1, Lagos.
            </p>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#9B2242] bg-white hover:bg-pink-50 transition-colors shadow-sm shrink-0"
          >
            Visit Our Salon
          </a>
        </div>
      </div>
    </section>
  );
}
