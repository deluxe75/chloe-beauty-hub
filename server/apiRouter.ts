import { initialServices, initialProducts, initialTestimonials, appointmentsStore } from './data';
import type { Request, Response } from 'express';

export function handleApiRoutes(app: any) {
  // CORS & Preflight
  app.use('/api', (req: Request, res: Response, next: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    next();
  });

  // GET /api/services.php
  app.get(['/api/services.php', '/api/services'], (req: Request, res: Response) => {
    res.status(200).json({
      status: 'success',
      count: initialServices.length,
      data: initialServices
    });
  });

  // GET /api/products.php
  app.get(['/api/products.php', '/api/products'], (req: Request, res: Response) => {
    const category = req.query.category ? String(req.query.category).trim() : null;
    let filtered = initialProducts;
    if (category) {
      filtered = initialProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    res.status(200).json({
      status: 'success',
      category: category || 'all',
      count: filtered.length,
      data: filtered
    });
  });

  // GET /api/testimonials.php
  app.get(['/api/testimonials.php', '/api/testimonials'], (req: Request, res: Response) => {
    res.status(200).json({
      status: 'success',
      count: initialTestimonials.length,
      data: initialTestimonials
    });
  });

  // GET & POST /api/appointments.php
  app.get(['/api/appointments.php', '/api/appointments'], (req: Request, res: Response) => {
    res.status(200).json({
      status: 'success',
      count: appointmentsStore.length,
      data: [...appointmentsStore].reverse()
    });
  });

  app.post(['/api/appointments.php', '/api/appointments'], (req: Request, res: Response) => {
    const { name, phone, service, preferred_date } = req.body || {};

    const errors: Record<string, string> = {};

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      errors.name = 'Full name is required.';
    } else if (name.trim().length < 2 || name.trim().length > 120) {
      errors.name = 'Name must be between 2 and 120 characters.';
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
      errors.phone = 'Phone number is required.';
    } else if (!/^[0-9+\s\-()]{7,25}$/.test(phone.trim())) {
      errors.phone = 'Please enter a valid phone number (e.g., +234 803 123 4567).';
    }

    if (!service || typeof service !== 'string' || service.trim().length === 0) {
      errors.service = 'Please select a service.';
    }

    if (!preferred_date || typeof preferred_date !== 'string' || preferred_date.trim().length === 0) {
      errors.preferred_date = 'Preferred appointment date is required.';
    }

    if (Object.keys(errors).length > 0) {
      res.status(400).json({
        status: 'fail',
        message: 'Validation errors occurred.',
        errors
      });
      return;
    }

    const newBooking = {
      id: appointmentsStore.length + 1,
      name: name.trim(),
      phone: phone.trim(),
      service: service.trim(),
      preferred_date: preferred_date.trim(),
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    appointmentsStore.push(newBooking);

    res.status(201).json({
      status: 'success',
      message: 'Appointment booked successfully! Our concierge will contact you shortly.',
      data: newBooking
    });
  });
}
