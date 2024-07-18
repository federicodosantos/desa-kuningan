<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Position::create([
            'name' => 'Kepala Desa'
        ]);

        Position::create([
            'name' => 'Sekretaris Desa'
        ]);

        Position::create([
            'name' => 'Kaur Tata Usaha Umum dan Perencanaan'
        ]);

        Position::create([
            'name' => 'Kaur Keuangan'
        ]);

        Position::create([
            'name' => 'Kasi Pemerintahan'
        ]);

        Position::create([
            'name' => 'Kasi Kesra dan Pelayanan'
        ]);

        Position::create([
            'name' => 'Karyawan Desa'
        ]);
    }
}
