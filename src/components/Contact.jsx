import React, { useState } from 'react';
import { createAppointment } from '../api';
import {
  MapPin,
  Phone,
  Instagram,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
} from 'lucide-react';

export default function Contact({ preselectedService }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: preselectedService || 'Luxury Wigs',
    preferred_date: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const servicesList = [
    'Luxury Wigs',
    'Hair Treatment',
    'Manicure',
    'Pedicure',
    'Bone Straight Wig Fitting',
    'Curly Wig Fitting',
    'Frontal Wig Installation',
    'Custom Bridal Glam',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');
    setValidationErrors({});

    // Client-side quick checks before POST
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Please provide your full name.';
    if (!formData.phone.trim()) {
      errors.phone = 'Please provide your phone number.';
    } else if (!/^[0-9+\s\-()]{7,25}$/.test(formData.phone.trim())) {
      errors.phone = 'Please enter a valid phone number (e.g. +234 803 123 4567).';
    }
    if (!formData.service) errors.service = 'Please select a desired service.';
    if (!formData.preferred_date) errors.preferred_date = 'Please pick a preferred appointment date.';

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const response = await createAppointment(formData);
      setSuccessMsg(
        response.message || 'Appointment booked successfully! Our concierge will call to confirm.'
      );
      setFormData({
        name: '',
        phone: '',
        service: 'Luxury Wigs',
        preferred_date: '',
      });
    } catch (err) {
      if (err.data?.errors) {
        setValidationErrors(err.data.errors);
      }
      setErrorMsg(
        err.message || 'Failed to submit appointment. Please check your details or call our desk.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Restrict past dates in the HTML datepicker
  const todayDateString = new Date().toISOString().split('T')[0];

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 bg-[#FFFDFB] relative border-b border-[#F2E5E8]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0F2] text-[#9B2242] text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Get In Touch</span>
            </div>

            <h2
              id="contact-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D1B22] tracking-tight mb-6"
            >
              Visit Our Salon or Book Your Crown
            </h2>

            <p className="text-base text-[#66545A] leading-relaxed mb-8">
              We look forward to pampering you in our serene beauty lounge.
              Whether you need a bespoke wig fitting, invigorating hair therapy, or flawless nails,
              our team is ready for you.
            </p>

            {/* Contact Details List */}
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FCFAF9] border border-[#EDE3E5]">
                <div className="w-12 h-12 rounded-xl bg-[#FAF0F2] flex items-center justify-center text-[#9B2242] shrink-0 shadow-xs">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-[#8A7178] mb-1">
                    Salon Boutique Address
                  </h4>
                  <p className="text-sm font-semibold text-[#2D1B22] leading-snug">
                    14 Victoria Crown Plaza, Admiralty Way, Lekki Phase 1, Lagos, Nigeria
                  </p>
                </div>
              </div>

              {/* 2 Phone Numbers */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FCFAF9] border border-[#EDE3E5]">
                <div className="w-12 h-12 rounded-xl bg-[#FAF0F2] flex items-center justify-center text-[#9B2242] shrink-0 shadow-xs">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-[#8A7178] mb-1">
                    Direct Phone Lines &amp; WhatsApp
                  </h4>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-0.5">
                    <a
                      href="tel:+2348031234567"
                      className="text-sm font-semibold text-[#9B2242] hover:underline"
                    >
                      +234 803 123 4567
                    </a>
                    <span className="hidden sm:inline text-neutral-300">•</span>
                    <a
                      href="tel:+2348129876543"
                      className="text-sm font-semibold text-[#9B2242] hover:underline"
                    >
                      +234 812 987 6543
                    </a>
                  </div>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FCFAF9] border border-[#EDE3E5]">
                <div className="w-12 h-12 rounded-xl bg-[#FAF0F2] flex items-center justify-center text-[#9B2242] shrink-0 shadow-xs">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-[#8A7178] mb-1">
                    Instagram Community
                  </h4>
                  <a
                    href="https://instagram.com/chloebeautyhub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[#9B2242] hover:underline"
                  >
                    @chloebeautyhub
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FCFAF9] border border-[#EDE3E5]">
                <div className="w-12 h-12 rounded-xl bg-[#FAF0F2] flex items-center justify-center text-[#9B2242] shrink-0 shadow-xs">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-[#8A7178] mb-1">
                    Salon Hours
                  </h4>
                  <p className="text-xs text-[#524046]">
                    <strong>Monday – Saturday:</strong> 9:00 AM – 7:30 PM <br />
                    <strong>Sunday:</strong> 1:00 PM – 6:00 PM (By Appointment)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Appointment Booking Form (POSTs to backend /api/appointments.php) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EDE3E5] shadow-xl relative overflow-hidden">
              <div className="mb-6">
                <h3 className="font-serif text-2xl font-bold text-[#2D1B22]">
                  Book an Appointment
                </h3>
                <p className="text-xs text-[#705A62] mt-1">
                  Submits live to the PHP REST API endpoint{' '}
                  <code className="text-[#9B2242] font-mono bg-[#FAF0F2] px-1.5 py-0.5 rounded">
                    POST /api/appointments.php
                  </code>
                </p>
              </div>

              {/* Success Banner */}
              {successMsg && (
                <div
                  id="booking-success-banner"
                  className="mb-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-start gap-3.5 text-emerald-900"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm">Booking Confirmed!</h5>
                    <p className="text-xs text-emerald-800 mt-1">{successMsg}</p>
                    <button
                      onClick={() => setSuccessMsg('')}
                      className="mt-3 text-xs font-bold text-emerald-700 underline"
                    >
                      Book Another Appointment
                    </button>
                  </div>
                </div>
              )}

              {/* Error Banner */}
              {errorMsg && (
                <div
                  id="booking-error-banner"
                  className="mb-6 bg-rose-50 border border-rose-200 rounded-2xl p-5 flex items-start gap-3.5 text-rose-900"
                >
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm">Booking Notice</h5>
                    <p className="text-xs text-rose-800 mt-1">{errorMsg}</p>
                  </div>
                </div>
              )}

              {/* Booking Form */}
              <form id="appointment-form" onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-bold uppercase tracking-wider text-[#4A3940] mb-1.5"
                  >
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Chioma Adeleke"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#2D1B22] focus:outline-none focus:ring-2 focus:ring-[#9B2242] transition-colors ${
                      validationErrors.name
                        ? 'border-rose-300 bg-rose-50/40'
                        : 'border-[#E2D5D8] bg-[#FDFBFB] focus:bg-white'
                    }`}
                  />
                  {validationErrors.name && (
                    <p className="text-xs text-rose-600 mt-1">{validationErrors.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-xs font-bold uppercase tracking-wider text-[#4A3940] mb-1.5"
                  >
                    Phone Number (WhatsApp preferred) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +234 803 123 4567"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#2D1B22] focus:outline-none focus:ring-2 focus:ring-[#9B2242] transition-colors ${
                      validationErrors.phone
                        ? 'border-rose-300 bg-rose-50/40'
                        : 'border-[#E2D5D8] bg-[#FDFBFB] focus:bg-white'
                    }`}
                  />
                  {validationErrors.phone && (
                    <p className="text-xs text-rose-600 mt-1">{validationErrors.phone}</p>
                  )}
                </div>

                {/* Service Selection */}
                <div>
                  <label
                    htmlFor="contact-service"
                    className="block text-xs font-bold uppercase tracking-wider text-[#4A3940] mb-1.5"
                  >
                    Desired Service <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#2D1B22] focus:outline-none focus:ring-2 focus:ring-[#9B2242] transition-colors ${
                      validationErrors.service
                        ? 'border-rose-300 bg-rose-50/40'
                        : 'border-[#E2D5D8] bg-[#FDFBFB] focus:bg-white'
                    }`}
                  >
                    {servicesList.map((svc) => (
                      <option key={svc} value={svc}>
                        {svc}
                      </option>
                    ))}
                  </select>
                  {validationErrors.service && (
                    <p className="text-xs text-rose-600 mt-1">{validationErrors.service}</p>
                  )}
                </div>

                {/* Preferred Date */}
                <div>
                  <label
                    htmlFor="contact-date"
                    className="block text-xs font-bold uppercase tracking-wider text-[#4A3940] mb-1.5"
                  >
                    Preferred Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="contact-date"
                    name="preferred_date"
                    min={todayDateString}
                    value={formData.preferred_date}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#2D1B22] focus:outline-none focus:ring-2 focus:ring-[#9B2242] transition-colors ${
                      validationErrors.preferred_date
                        ? 'border-rose-300 bg-rose-50/40'
                        : 'border-[#E2D5D8] bg-[#FDFBFB] focus:bg-white'
                    }`}
                  />
                  {validationErrors.preferred_date && (
                    <p className="text-xs text-rose-600 mt-1">
                      {validationErrors.preferred_date}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  id="submit-appointment-btn"
                  disabled={loading}
                  className="w-full mt-2 py-4 rounded-full text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#9B2242] to-[#B33959] hover:from-[#821834] hover:to-[#9B2242] transition-all shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-200" />
                      <span>Submitting to PHP Backend...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4 text-amber-200" />
                      <span>Confirm &amp; Book Appointment</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
