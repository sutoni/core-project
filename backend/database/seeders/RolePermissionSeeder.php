<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run()
    {
        // Hapus cache permission lama
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // === PERMISSIONS ===
        $permissions = [
            // Succession Management
            'view succession_plan',
            'create succession_plan',
            'update succession_plan',
            'delete succession_plan',
            'assign successor',
            'approve succession_plan',

            // Bisa ditambah modul lain (Property, Zakat, dsb)
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm]);
        }

        // === ROLES ===
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $hrManager = Role::firstOrCreate(['name' => 'hr_manager']);
        $lineManager = Role::firstOrCreate(['name' => 'line_manager']);
        $employee = Role::firstOrCreate(['name' => 'employee']);

        // === ROLE → PERMISSION ===
        $admin->givePermissionTo(Permission::all());

        $hrManager->givePermissionTo([
            'view succession_plan',
            'create succession_plan',
            'update succession_plan',
            'assign successor',
            'approve succession_plan',
        ]);

        $lineManager->givePermissionTo([
            'view succession_plan',
            'create succession_plan',
            'update succession_plan',
        ]);

        $employee->givePermissionTo([
            'view succession_plan',
        ]);
    }
}

