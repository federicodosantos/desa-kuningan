<?php

namespace Database\Seeders;

use App\Models\VillageOfficer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class VillageOfficerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $photo_loc = 'public/testImage.jpg';

        $photo_path = Storage::disk('public')->putFile('officerImages', $photo_loc);

        VillageOfficer::create ([
            'name' => 'Sholkan',
            'position_id' => 1,
            'photo_path' => $photo_path
        ]);
    }
}
