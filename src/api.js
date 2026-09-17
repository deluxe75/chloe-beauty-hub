/**
 * Chloe Beauty Hub - API Client Utility
 * 
 * Handles all REST API fetch calls to the PHP backend endpoints:
 * - GET  /api/services.php          → List beauty services
 * - GET  /api/products.php?category=wig     → List luxury wigs
 * - GET  /api/products.php?category=product → List hair & beauty care products
 * - GET  /api/testimonials.php      → List client reviews
 * - POST /api/appointments.php      → Create new appointment booking
 * - GET  /api/appointments.php      → List all bookings (admin view)
 */

// If deployed on shared hosting with a different backend path or domain,
// configure VITE_API_BASE_URL (e.g. 'http://localhost:8000/api' or '/api')
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Standard response handler for fetch calls
 */
async function handleResponse(response) {
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const errorMessage = data?.message || (data?.errors ? Object.values(data.errors).join(' ') : `API Error: ${response.status} ${response.statusText}`);
    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

/**
 * GET /api/services.php
 * Fetches all available salon services
 */
export async function getServices() {
  try {
    const res = await fetch(`${API_BASE_URL}/services.php`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    const result = await handleResponse(res);
    return result.data || [];
  } catch (err) {
    console.error('Failed to fetch services:', err);
    throw err;
  }
}

/**
 * GET /api/products.php?category=wig
 * Fetches popular wig products
 */
export async function getWigCollection() {
  try {
    const res = await fetch(`${API_BASE_URL}/products.php?category=wig`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    const result = await handleResponse(res);
    return result.data || [];
  } catch (err) {
    console.error('Failed to fetch wigs:', err);
    throw err;
  }
}

/**
 * GET /api/products.php?category=product
 * Fetches beauty and hair treatment products
 */
export async function getBeautyProducts() {
  try {
    const res = await fetch(`${API_BASE_URL}/products.php?category=product`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    const result = await handleResponse(res);
    return result.data || [];
  } catch (err) {
    console.error('Failed to fetch beauty products:', err);
    throw err;
  }
}

/**
 * GET /api/testimonials.php
 * Fetches verified client reviews
 */
export async function getTestimonials() {
  try {
    const res = await fetch(`${API_BASE_URL}/testimonials.php`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    const result = await handleResponse(res);
    return result.data || [];
  } catch (err) {
    console.error('Failed to fetch testimonials:', err);
    throw err;
  }
}

/**
 * POST /api/appointments.php
 * Books a new appointment with customer details
 * @param {Object} bookingData - { name, phone, service, preferred_date }
 */
export async function createAppointment(bookingData) {
  try {
    const res = await fetch(`${API_BASE_URL}/appointments.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    const result = await handleResponse(res);
    return result;
  } catch (err) {
    console.error('Failed to create appointment:', err);
    throw err;
  }
}

/**
 * GET /api/appointments.php
 * Admin: List all booked appointments
 */
export async function getAppointments() {
  try {
    const res = await fetch(`${API_BASE_URL}/appointments.php`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    const result = await handleResponse(res);
    return result.data || [];
  } catch (err) {
    console.error('Failed to fetch appointments:', err);
    throw err;
  }
}
