import React, { useState, useEffect } from 'react';
import { createAppointment } from '../api';
import { X, Calendar, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';

export default function AppointmentModal({ isOpen, onClose, initialService }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: initialService || 'Luxury Wigs',
    preferred_date: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  if (!isOpen) return null;

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

    const errors = {};
    if (!formData.name.trim()) errors.name = 'Please provide your full name.';
    if (!formData.phone.trim()) {
      errors.phone = 'Please provide your phone number.';
    } else if (!/^[0-9+\s\-()]{7,25}$/.test(formData.phone.trim())) {
      errors.phone = 'Please enter a valid phone number (e.g. +234 803 123 4567).';
    }
    if (!formData.service) errors.service = 'Please select a service.';
    if (!formData.preferred_date) errors.preferred_date = 'Please pick a preferred appointment date.';

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const response = await createAppointment(formData);
      setSuccessMsg(
        response.message || 'Appointment booked successfully! Our concierge will contact you shortly.'
      );
      setFormData({
        name: '',
        phone: '',
        service: initialService || 'Luxury Wigs',
        preferred_date: '',
      });
    } catch (err) {
      if (err.data?.errors) {
        setValidationErrors(err.data.errors);
      }
      setErrorMsg(
        err.message || 'Failed to submit appointment. Please check your inputs.'
      );
    } finally {
      setLoading(false);
    }
  };

  const todayDateString = new Date().toISOString().split('T')[0];

  return (
    <div
      id="booking-modal-overlay"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="booking-modal-content"
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 border border-[#EDE3E5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-booking-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#705A62] hover:text-[#2D1B22] hover:bg-[#FAF0F2] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF0F2] text-[#9B2242] text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>VIP Salon Booking</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#2D1B22]">
            Book Your Appointment
          </h3>
          <p className="text-xs text-[#66545A] mt-1">
            Fill in your preferred details. Submits directly to the backend database.
          </p>
        </div>

        {/* Success Notice */}
        {successMsg ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center text-emerald-900 my-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
            <h4 className="font-serif text-lg font-bold text-emerald-950">
              Appointment Scheduled!
            </h4>
            <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
              {successMsg}
            </p>
            <button
              onClick={() => setSuccessMsg('')}
              className="mt-5 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-800 transition-colors"
            >
              Book Another Service
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 flex items-start gap-2.5 text-rose-900 text-xs">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Name */}
            <div>
              <label
                htmlFor="modal-name"
                className="block text-xs font-bold uppercase tracking-wider text-[#4A3940] mb-1"
              >
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="modal-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Amaka Eze"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2D5D8] bg-[#FDFBFB] text-sm text-[#2D1B22] focus:outline-none focus:ring-2 focus:ring-[#9B2242]"
              />
              {validationErrors.name && (
                <p className="text-xs text-rose-600 mt-1">{validationErrors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="modal-phone"
                className="block text-xs font-bold uppercase tracking-wider text-[#4A3940] mb-1"
              >
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                id="modal-phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+234 803 123 4567"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2D5D8] bg-[#FDFBFB] text-sm text-[#2D1B22] focus:outline-none focus:ring-2 focus:ring-[#9B2242]"
              />
              {validationErrors.phone && (
                <p className="text-xs text-rose-600 mt-1">{validationErrors.phone}</p>
              )}
            </div>

            {/* Service */}
            <div>
              <label
                htmlFor="modal-service"
                className="block text-xs font-bold uppercase tracking-wider text-[#4A3940] mb-1"
              >
                Select Service <span className="text-rose-500">*</span>
              </label>
              <select
                id="modal-service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2D5D8] bg-[#FDFBFB] text-sm text-[#2D1B22] focus:outline-none focus:ring-2 focus:ring-[#9B2242]"
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
                htmlFor="modal-date"
                className="block text-xs font-bold uppercase tracking-wider text-[#4A3940] mb-1"
              >
                Preferred Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                id="modal-date"
                name="preferred_date"
                min={todayDateString}
                value={formData.preferred_date}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2D5D8] bg-[#FDFBFB] text-sm text-[#2D1B22] focus:outline-none focus:ring-2 focus:ring-[#9B2242]"
              />
              {validationErrors.preferred_date && (
                <p className="text-xs text-rose-600 mt-1">
                  {validationErrors.preferred_date}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                id="modal-submit-appointment-btn"
                disabled={loading}
                className="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#9B2242] to-[#B33959] hover:from-[#821834] hover:to-[#9B2242] transition-all shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Booking...</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 text-amber-200" />
                    <span>Confirm Booking</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
