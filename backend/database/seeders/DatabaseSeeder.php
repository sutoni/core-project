<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Panggil seeder Role & Permission dulu
        $this->call(RolePermissionSeeder::class);

        // Buat user admin default
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Super Admin',
                'password' => bcrypt('password123'), // ganti ke lebih aman
            ]
        );

        // Assign role admin ke user ini
        $adminRole = Role::where('name', 'admin')->first();
        if ($adminRole && !$adminUser->hasRole('admin')) {
            $adminUser->assignRole($adminRole);
        }
    }
}

