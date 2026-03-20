<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::create([
            'name' => 'Admin Green',
            'email' => 'admin@test.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Producteur
        User::create([
            'name' => 'Jean le Fermier',
            'email' => 'jean@test.com',
            'password' => Hash::make('password'),
            'role' => 'producer',
        ]);

        // Clients
        User::create([
            'name' => 'Alice Client',
            'email' => 'alice@test.com',
            'password' => Hash::make('password'),
            'role' => 'client',
        ]);

        User::create([
            'name' => 'Bob Client',
            'email' => 'bob@test.com',
            'password' => Hash::make('password'),
            'role' => 'client',
        ]);
    }
}