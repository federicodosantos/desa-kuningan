<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'id' => Str::random(20),
            'name' => 'Admin Kuningan2',
            'email' => 'adminKuningan2@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('rahasia123'),
            'remember_token' => Str::random(10),
        ]);
        User::create([
            'id' => Str::random(20),
            'name' => 'Admin Kuningan3',
            'email' => 'adminKuningan3@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('rahasia123'),
            'remember_token' => Str::random(10),
        ]);
        User::create([
            'id' => Str::random(20),
            'name' => 'Admin Kuningan4',
            'email' => 'adminKuningan4@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('rahasia123'),
            'remember_token' => Str::random(10),
        ]);
        User::create([
            'id' => Str::random(20),
            'name' => 'Admin Kuningan5',
            'email' => 'adminKuningan5@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('rahasia123'),
            'remember_token' => Str::random(10),
        ]);
        User::create([
            'id' => Str::random(20),
            'name' => 'Admin Kuningan',
            'email' => 'kuningandesa321@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('Maltodextrin321'),
            'remember_token' => Str::random(10),
        ]);
    }
}
