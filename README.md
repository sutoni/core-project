# core-project

# Core Application

Project ini adalah **Core Aplikasi** berbasis **Laravel (Backend API)** dan **React + Vite (Frontend)**.  
Fokus utama aplikasi ini adalah manajemen user, role, serta modul yang fleksibel untuk dikembangkan di masa depan.

---

## 🚀 Tech Stack
- **Backend**: Laravel 11 (API dengan Sanctum Authentication)  
- **Frontend**: React 18 + Vite  
- **Styling**: TailwindCSS + ShadCN UI  
- **Version Control**: Git (GitHub)  

---

## 📂 Struktur Direktori
core-project/
│── backend/ # Laravel API
│── frontend/ # React + Vite
│── docs/ # Dokumentasi teknis & API
│── docker/ # (opsional) konfigurasi docker-compose
│── README.md # Dokumentasi proyek



---

## ⚙️ Setup Development
1. Clone Repository
```bash
git clone https://github.com/sutoni/core-project.git
cd core-project


2. Setup Backend (Laravel)
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve


## Roadmap
 Setup dasar (Laravel + React + Tailwind + ShadCN)
 Integrasi GitHub & dokumentasi awal
 Authentication (Laravel Sanctum)
 User Management & Role




