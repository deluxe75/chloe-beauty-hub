import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import { initialServices, initialProducts, initialTestimonials, appointmentsStore } from './server/data';

function apiDevPlugin(): Plugin {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/')) {
          return next();
        }

        const urlObj = new URL(req.url, 'http://localhost:3000');
        const pathname = urlObj.pathname;

        res.setHeader('Content-Type', 'application/json; charset=UTF-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

        if (req.method === 'OPTIONS') {
          res.statusCode = 200;
          res.end();
          return;
        }

        // GET /api/services.php
        if (pathname === '/api/services.php' || pathname === '/api/services') {
          if (req.method === 'GET') {
            res.statusCode = 200;
            res.end(JSON.stringify({
              status: 'success',
              count: initialServices.length,
              data: initialServices
            }));
            return;
          }
        }

        // GET /api/products.php
        if (pathname === '/api/products.php' || pathname === '/api/products') {
          if (req.method === 'GET') {
            const category = urlObj.searchParams.get('category');
            let filtered = initialProducts;
            if (category) {
              filtered = initialProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
            }
            res.statusCode = 200;
            res.end(JSON.stringify({
              status: 'success',
              category: category || 'all',
              count: filtered.length,
              data: filtered
            }));
            return;
          }
        }

        // GET /api/testimonials.php
        if (pathname === '/api/testimonials.php' || pathname === '/api/testimonials') {
          if (req.method === 'GET') {
            res.statusCode = 200;
            res.end(JSON.stringify({
              status: 'success',
              count: initialTestimonials.length,
              data: initialTestimonials
            }));
            return;
          }
        }

        // /api/appointments.php
        if (pathname === '/api/appointments.php' || pathname === '/api/appointments') {
          if (req.method === 'GET') {
            res.statusCode = 200;
            res.end(JSON.stringify({
              status: 'success',
              count: appointmentsStore.length,
              data: [...appointmentsStore].reverse()
            }));
            return;
          }

          if (req.method === 'POST') {
            let bodyStr = '';
            req.on('data', (chunk: any) => { bodyStr += chunk; });
            req.on('end', () => {
              let body: any = {};
              try {
                body = JSON.parse(bodyStr);
              } catch (e) {
                const params = new URLSearchParams(bodyStr);
                body = Object.fromEntries(params);
              }

              const { name, phone, service, preferred_date } = body;
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
                res.statusCode = 400;
                res.end(JSON.stringify({
                  status: 'fail',
                  message: 'Validation errors occurred.',
                  errors
                }));
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

              res.statusCode = 201;
              res.end(JSON.stringify({
                status: 'success',
                message: 'Appointment booked successfully! Our concierge will contact you shortly.',
                data: newBooking
              }));
            });
            return;
          }
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiDevPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
