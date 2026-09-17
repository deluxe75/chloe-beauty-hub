# Chloe Beauty Hub - Backend Setup Guide (PHP & MySQL)

This directory contains the complete PHP REST API backend and MySQL database schema for **Chloe Beauty Hub**.

---

## 1. Directory Structure

```text
backend/
├── config.php            # PDO Database connection and CORS headers
├── database.sql          # MySQL database schema and seed data
├── api/
│   ├── services.php      # GET /api/services.php
│   ├── products.php      # GET /api/products.php?category=wig|product
│   ├── testimonials.php  # GET /api/testimonials.php
│   └── appointments.php  # POST /api/appointments.php (Book) & GET (List)
└── README.md             # This setup and hosting guide
```

---

## 2. Database Setup (MySQL)

1. Open your MySQL client (e.g. **phpMyAdmin**, **MySQL Workbench**, or the command line):
   ```bash
   mysql -u root -p
   ```
2. Import the schema and seed data by running:
   ```sql
   SOURCE /path/to/backend/database.sql;
   ```
   *Or in phpMyAdmin:*
   - Click **Import** in top menu.
   - Choose `backend/database.sql`.
   - Click **Go** / **Import**.

This will create the database `chloe_beauty_hub` with:
- `services` (Luxury Wigs, Hair Treatment, Manicure, Pedicure)
- `products` (Bone Straight, Curly, Frontal wigs + Ghana Cream, Hair Oil, Serum, Edge Control, Leave-in Conditioner, Moisturizer)
- `testimonials` (Amaka, Zainab, Blessing)
- `appointments` (Booking records)

---

## 3. Database Credentials Configuration

Open `backend/config.php` and update the database credentials to match your local or production database:

```php
$db_host = 'localhost';
$db_name = 'chloe_beauty_hub';
$db_user = 'root';        // Your MySQL username
$db_pass = '';            // Your MySQL password
$db_port = '3306';
```

*(You can also configure them via environment variables: `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS`, `DB_PORT`)*.

---

## 4. Running the PHP Backend

### Option A: Using Built-in PHP CLI Server (Fastest for Local Testing)
Open a terminal in the project root and start PHP's built-in web server:

```bash
# Start PHP server pointing to the backend folder
php -S localhost:8000 -t backend
```

Your API endpoints will now be accessible at:
- `http://localhost:8000/api/services.php`
- `http://localhost:8000/api/products.php?category=wig`
- `http://localhost:8000/api/products.php?category=product`
- `http://localhost:8000/api/testimonials.php`
- `http://localhost:8000/api/appointments.php`

### Option B: Using XAMPP / WampServer / Laragon
1. Copy the `backend/` folder into your web root (e.g. `C:/xampp/htdocs/chloe-backend/`).
2. Start **Apache** and **MySQL** from the XAMPP Control Panel.
3. Access endpoints via: `http://localhost/chloe-backend/api/services.php`.

### Option C: Shared Hosting (cPanel / Hostinger / Namecheap / Bluehost)
1. In cPanel, go to **MySQL Databases** and create a new database & user.
2. In **phpMyAdmin**, import `database.sql`.
3. Update `config.php` with the created database name, username, and password.
4. Upload the files into `public_html/api/` or a subfolder.

---

## 5. Connecting the React Frontend

In the React frontend, configure the API base URL in your `.env` or `src/api.js`:
```env
VITE_API_BASE_URL=http://localhost:8000/api
```
If using relative proxying or running on the same domain, leave `VITE_API_BASE_URL=/api`.

---

## 6. API Endpoint Reference

| Method | Endpoint | Description | Sample Query/Payload |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/services.php` | List 4 beauty services | None |
| **GET** | `/api/products.php?category=wig` | List wig collection | `?category=wig` |
| **GET** | `/api/products.php?category=product` | List beauty hair products | `?category=product` |
| **GET** | `/api/testimonials.php` | List 3 verified reviews | None |
| **POST** | `/api/appointments.php` | Book an appointment | `{"name":"Amina","phone":"+234...","service":"Luxury Wigs","preferred_date":"2026-09-25"}` |
| **GET** | `/api/appointments.php` | Admin view of all bookings | None |
