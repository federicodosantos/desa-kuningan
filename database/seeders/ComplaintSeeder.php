<?php

namespace Database\Seeders;

use App\Models\Complaint;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ComplaintSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Complaint::create([
            'name' => 'Andika',
            'phone_number' => '081357528767',
            'complaint' => 'teman kamar saya jorok',
            'created_at' => now('Asia/Jakarta'),
            'updated_at' => now('Asia/Jakarta')
        ]);
    }
}
