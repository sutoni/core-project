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


## Master Company, Departemen, Cost Center, Position dan Job Family

+---------------------+
|     Company_Size    |
+---------------------+
| companysize_id (PK) |
| size_scale (1-10)   |
| description         |
+---------------------+
          ^
          | *..1
          |
+-------------------+
|     Company       |
+-------------------+
| company_id (PK)   |
| company_code      |
| company_name      |
| company_type      |  <-- Holding / Subsidiary / Affiliate
| parent_company_id |  <-- self FK (multiple holding support)
| companysize_id FK |  <-- ref ke Company_Size
| valid_from        |
| valid_to          |
+-------------------+
          |
          | 1..* 
          v
+-------------------+
|    Department     |
+-------------------+
| department_id (PK)|
| company_id (FK)   |
| dept_code         |
| dept_name         |
| parent_dept_id FK |  <-- sub-department
| valid_from        |
| valid_to          |
+-------------------+
          |
          | 1..*
          v
+-------------------+
|    CostCenter     |
+-------------------+
| costcenter_id (PK)|
| department_id (FK)|
| costcenter_code   |
| costcenter_name   |
| valid_from        |
| valid_to          |
+-------------------+
          |
          | 1..*
          v
+-------------------+
|     Position      |
+-------------------+
| position_id (PK)  |
| costcenter_id (FK)|
| position_code     |
| position_name     |
| position_grade    |
| jobfamily_id (FK) |
| parent_position FK| <-- atasan langsung
| is_key_position   | <-- flag key position (Y/N)
| valid_from        |
| valid_to          |
+-------------------+
          ^
          |
          | *..1
+-------------------+
|    JobFamily      |
+-------------------+
| jobfamily_id (PK) |
| jobfamily_code    |
| jobfamily_name    |
| jobfamily_group   |
| description       |
+-------------------+




## Approval Lintas PT

+-------------------+           +---------------------+
|   employee_master |           |   company_master    |
+-------------------+           +---------------------+
| employee_id (PK)  |<--------->| company_id (PK)     |
| name              |           | company_name        |
| legal_company_id   |----------| ...                 |
| position_id       |           
| ...               |           
+-------------------+           

+-------------------+           +---------------------+
|   reporting_matrix |          |   request_master    |
+-------------------+           +---------------------+
| matrix_id (PK)    |           | request_id (PK)     |
| employee_id (FK)  |---------->| employee_id (FK)    |
| manager_id  (FK)  |           | request_type        |
| functional_company_id (FK)    | request_date        |
| approval_scope    |           | status              |
| effective_date    |           | ...                 |
+-------------------+           +---------------------+

            +----------------------------------+
            |        approval_workflow         |
            +----------------------------------+
            | workflow_id (PK)                 |
            | request_id (FK) ---------------->| request_master |
            | employee_id (FK)                 |
            | legal_company_id (FK)            |
            | functional_company_id (FK)       |
            | manager_id (FK)                  |
            | manager_company_id (FK)          |
            | approval_level                   |
            | approval_scope                   |
            | status                           |
            | action_date                      |
            | remarks                          |
            +----------------------------------+

🔹 Alur Relasi

   - employee_master → menyimpan data dasar karyawan, termasuk legal_company_id (PT payroll).
   - reporting_matrix → mendefinisikan hubungan fungsional (siapa atasan siapa, di company assignment mana).
   - request_master → semua pengajuan (cuti, perjalanan dinas, klaim, dll).
   - approval_workflow → menampung detail proses approval, menghubungkan request, employee, dan manager lintas PT.


    [Employee PT A] ----> (Submit Cuti/Travel di System HR)
       |
       v
    [System cek Legal Entity] ---> Legal Company = PT A
       |
       v
    [System cek Reporting Matrix]
        - Bawahan = Emp. PT A (ID:101)
        - Manager  = Dir. Corp PT Z (ID:999)
        - Scope    = Leave, Travel
       |
       v
    [Approval dikirim ke Manager PT Z]
       |
       v
    [Manager Approve]
       |
       v
    [System update status approval]
        - HR PT A tercatat sebagai origin (Legal Company)
        - Manager PT Z tercatat sebagai approver (Functional)

    - Employee ID tunggal → semua entitas PT pakai satu master employee database.
    - Functional Reporting Matrix → menentukan siapa atasan fungsional, bisa lintas PT.
    - Workflow Engine → approval rutenya bukan hanya dari legal entity, tapi dari matrix relasi bawahan–atasan.
    - Audit Trail → log tetap jelas:
    - Pengajuan dari karyawan PT A.
    - Disetujui atasan di PT Z.
    - Ditandai sebagai approval lintas entitas.


# Draft Tabel Employee Assignment

| Field                   | Keterangan                            |
| ----------------------- | ------------------------------------- |
| employee\_id            | ID karyawan                           |
| legal\_company\_id      | PT tempat payroll (legal entity)      |
| assignment\_company\_id | PT tempat bekerja (functional entity) |
| department\_id          | Departemen tempat assignment          |
| cost\_center\_id        | Cost center terkait                   |
| position\_id            | Jabatan yang diisi                    |
| start\_date             | Tanggal mulai assignment              |
| end\_date               | Tanggal selesai (nullable)            |
| is\_active              | Status aktif/tidak                    |




    
