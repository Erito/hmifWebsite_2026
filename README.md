# WebHMIF XVI

Official website for **HMIF XVI** (Himpunan Mahasiswa Informatika) — a student organization website built to showcase activities, announcements, and information about the organization.

Built with **Laravel**, **Inertia.js**, **React**, **TypeScript**, and **Tailwind CSS**.

---

## Requirements

- PHP >= 8.2
- Composer
- Node.js >= 18
- npm

---

## How to Run

**1. Clone the repository and install dependencies**

```bash
git clone <repo-url>
cd WebHMIFXVI

composer install
npm install --legacy-peer-deps
```

**2. Set up environment**

```bash
cp .env.example .env
php artisan key:generate
```

Edit `.env` and configure your database connection.

**3. Run migrations and seed the database**

```bash
php artisan migrate
php artisan db:seed
```

The seeder creates:
- Default admin user(s) (`UserSeeder`)
- KPI member records (`KpiMemberSeeder`)
- Sample gallery images (`GalleryImageSeeder`)

> **Note:** You must run both `migrate` and `db:seed` before the admin panel works — the admin user is created by the seeder.

**4. Start the development servers**

Run both the Laravel server and Vite dev server concurrently:

```bash
# Terminal 1
php artisan serve

# Terminal 2
npm run dev
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

**5. Build for production**

```bash
npm run build
php artisan optimize
```
