<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Organization;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $org = Organization::create([
            'name' => 'Acme Inc',
            'slug' => 'acme-inc',
        ]);

        User::create([
            'organization_id' => $org->id,
            'name' => 'Admin User',
            'email' => 'admin@acme.test',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        User::create([
            'organization_id' => $org->id,
            'name' => 'Agent User',
            'email' => 'agent@acme.test',
            'password' => Hash::make('password'),
            'role' => 'agent',
        ]);

        User::create([
            'organization_id' => $org->id,
            'name' => 'Customer User',
            'email' => 'customer@acme.test',
            'password' => Hash::make('password'),
            'role' => 'customer',
        ]);
    }
}
