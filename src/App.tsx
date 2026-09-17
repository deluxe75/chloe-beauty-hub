/**
 * Chloe Beauty Hub - Luxury Salon & Wigs Application
 * Full React Frontend + PHP/MySQL Backend
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WigCollection from './components/WigCollection';
import BeautyProducts from './components/BeautyProducts';
import WhyChooseUs from './components/WhyChooseUs';
import GallerySection from './components/GallerySection';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';
import AdminBookingsModal from './components/AdminBookingsModal';
import PhpBackendModal from './components/PhpBackendModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Luxury Wigs');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isBackendModalOpen, setIsBackendModalOpen] = useState(false);

  const handleOpenBooking = (serviceTitle?: string) => {
    if (serviceTitle) {
      setSelectedService(serviceTitle);
    }
    setIsBookingOpen(true);
  };

  const handleSelectService = (title: string) => {
    setSelectedService(title);
    setIsBookingOpen(true);
  };

  const handleSelectProduct = (productName: string) => {
    setSelectedService(productName);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDFB] text-[#2C2424] font-sans antialiased">
      {/* Top Fixed Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenBackendModal={() => setIsBackendModalOpen(true)}
        onOpenAdminModal={() => setIsAdminOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero onOpenBooking={() => handleOpenBooking()} />
        <Services onSelectService={handleSelectService} />
        <WigCollection onSelectProductForBooking={handleSelectProduct} />
        <BeautyProducts onInquireProduct={(prod: any) => handleSelectProduct(`Product Order: ${prod.name}`)} />
        <WhyChooseUs />
        <GallerySection onOpenBooking={() => handleOpenBooking()} />
        <Testimonials />
        <Contact preselectedService={selectedService} />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenBackendModal={() => setIsBackendModalOpen(true)}
      />

      {/* Interactive Modals */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={selectedService}
      />

      <AdminBookingsModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      <PhpBackendModal
        isOpen={isBackendModalOpen}
        onClose={() => setIsBackendModalOpen(false)}
      />
    </div>
  );
}
