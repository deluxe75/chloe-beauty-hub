import React, { useState, useEffect } from 'react';
import { getAppointments } from '../api';
import { X, Calendar, RefreshCw, User, Phone, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminBookingsModal({ isOpen, onClose }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchBookings();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      id="admin-bookings-modal-overlay"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="admin-bookings-modal-content"
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-[#EDE3E5] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#F2E8E8] shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#FAF0F2] text-[#9B2242] text-[11px] font-bold uppercase tracking-wider mb-1.5">
              <span>Admin Endpoint</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#2D1B22]">
              All Booked Appointments
            </h3>
            <p className="text-xs text-[#705A62] mt-0.5">
              Live records from <code className="font-mono text-[#9B2242]">GET /api/appointments.php</code>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#705A62] hover:text-[#2D1B22] hover:bg-[#FAF0F2] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="py-3 flex items-center justify-between gap-2 shrink-0">
          <span className="text-xs font-semibold text-[#66545A]">
            Total Bookings: <strong className="text-[#9B2242]">{appointments.length}</strong>
          </span>
          <button
            onClick={fetchBookings}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#9B2242] bg-[#FAF0F2] hover:bg-[#F4DFE4] transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* List of bookings */}
        <div className="overflow-y-auto flex-grow space-y-3 pr-1">
          {loading && (
            <div className="py-12 text-center text-xs text-[#705A62]">
              Loading appointments from database...
            </div>
          )}

          {error && !loading && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {!loading && !error && appointments.length === 0 && (
            <div className="py-12 text-center text-xs text-[#705A62]">
              No appointments have been booked yet.
            </div>
          )}

          {!loading &&
            !error &&
            appointments.map((appt) => (
              <div
                key={appt.id}
                className="p-4 rounded-2xl bg-[#FCFAF9] border border-[#EDE3E5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#D9BCC4] transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#FAF0F2] text-[#9B2242] text-xs font-bold flex items-center justify-center">
                      #{appt.id}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-[#2D1B22] flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#9B2242]" />
                      {appt.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#66545B] pl-8">
                    <Phone className="w-3 h-3 text-neutral-400" />
                    <span>{appt.phone}</span>
                  </div>
                </div>

                <div className="sm:text-right pl-8 sm:pl-0">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FAF0F2] text-[#9B2242] border border-[#F2D7DE]">
                    {appt.service}
                  </span>
                  <div className="text-xs text-[#705A62] mt-1 flex sm:justify-end items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#9B2242]" />
                    <span>Date: {appt.preferred_date}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Footer */}
        <div className="pt-4 mt-4 border-t border-[#F2E8E8] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full text-xs font-semibold text-[#4A3940] bg-[#F7F5F4] hover:bg-[#EFECE9] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
