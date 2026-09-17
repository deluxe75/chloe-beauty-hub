/**
 * Shared database seed matching backend/database.sql exactly
 */

export interface ServiceItem {
  id: number;
  title: string;
  icon: string;
  description: string;
}

export interface ProductItem {
  id: number;
  category: 'wig' | 'product';
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  location: string;
  quote: string;
  image_url: string;
}

export interface AppointmentItem {
  id: number;
  name: string;
  phone: string;
  service: string;
  preferred_date: string;
  created_at: string;
}

export const initialServices: ServiceItem[] = [
  {
    id: 1,
    title: 'Luxury Wigs',
    icon: 'Crown',
    description: 'Premium 100% human hair wigs, custom-styled, pre-plucked, and tailored to frame your face with seamless elegance.'
  },
  {
    id: 2,
    title: 'Hair Treatment',
    icon: 'Sparkles',
    description: 'Deep conditioning, protein restoration, steaming treatments, and nourishing scalp therapy to revitalize your natural crown.'
  },
  {
    id: 3,
    title: 'Manicure',
    icon: 'HandMetal',
    description: 'Luxury nail grooming, cuticle care, custom acrylics, gel extensions, and long-lasting polish finishes.'
  },
  {
    id: 4,
    title: 'Pedicure',
    icon: 'Footprints',
    description: 'Rejuvenating foot bath, exfoliation, soothing hot stone massage, and immaculate toe nail grooming for total relaxation.'
  }
];

export const initialProducts: ProductItem[] = [
  // Wigs (category: 'wig')
  {
    id: 1,
    category: 'wig',
    name: 'Bone Straight Wig',
    description: '100% Raw donor human hair, mirror-gloss sleek texture that stays flawlessly straight all day.',
    price: 120000,
    image_url: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    category: 'wig',
    name: 'Curly Wig',
    description: 'Voluminous, ultra-soft, and bouncy curls engineered for high definition and minimal styling effort.',
    price: 95000,
    image_url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    category: 'wig',
    name: 'Frontal Wig',
    description: 'Pre-plucked HD Swiss lace frontal with bleached knots for an undetectable, skin-melting natural hairline.',
    price: 140000,
    image_url: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80'
  },

  // Beauty Products (category: 'product')
  {
    id: 4,
    category: 'product',
    name: 'Ghana Cream',
    description: 'Authentic whipped botanical hair cream that locks in supreme moisture and restores brittle strands.',
    price: 5000,
    image_url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    category: 'product',
    name: 'Hair Oil',
    description: 'Cold-pressed elixir infused with rosemary, argan, and castor oils to stimulate follicles and boost shine.',
    price: 7500,
    image_url: 'https://images.unsplash.com/photo-1608248597358-1f19f187a4bf?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    category: 'product',
    name: 'Hair Serum',
    description: 'Weightless anti-frizz silk treatment designed to seal split ends and provide thermal heat protection.',
    price: 8000,
    image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 7,
    category: 'product',
    name: 'Edge Control',
    description: 'Extreme 24-hour edge hold gel with high shine, non-flaking formula for razor-sharp sleek edges.',
    price: 5500,
    image_url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 8,
    category: 'product',
    name: 'Leave-in Conditioner',
    description: 'Hydrating detangler milk loaded with hydrolyzed silk and shea butter for effortless comb-throughs.',
    price: 15500,
    image_url: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 9,
    category: 'product',
    name: 'Moisturizer',
    description: 'Intense daily moisture cream that prevents dryness, breakage, and keeps curls luscious all day.',
    price: 10000,
    image_url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80'
  }
];

export const initialTestimonials: TestimonialItem[] = [
  {
    id: 1,
    name: 'Amaka Eze',
    location: 'Lekki, Lagos',
    quote: "Chloe Beauty Hub gave me the best frontal wig installation I have ever had! The lace melted completely into my skin and the hair has zero shedding after 3 months.",
    image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    name: 'Zainab Ibrahim',
    location: 'Maitama, Abuja',
    quote: "Their hair steaming treatment and pedicure are top-tier. My natural hair has never felt this hydrated, and the serene salon ambiance made me feel like royalty.",
    image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    name: 'Blessing Adeyemi',
    location: 'GRA, Port Harcourt',
    quote: "Ordered the bone straight wig and the edge control to Port Harcourt. The hair is silky beyond belief and delivery arrived within 24 hours. Customer for life!",
    image_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80'
  }
];

export const appointmentsStore: AppointmentItem[] = [
  {
    id: 1,
    name: 'Chioma Adeleke',
    phone: '+234 802 333 4455',
    service: 'Luxury Wigs',
    preferred_date: '2026-09-20',
    created_at: '2026-09-15 10:30:00'
  },
  {
    id: 2,
    name: 'Funke Balogun',
    phone: '+234 815 678 1234',
    service: 'Hair Treatment',
    preferred_date: '2026-09-22',
    created_at: '2026-09-16 14:15:00'
  }
];
