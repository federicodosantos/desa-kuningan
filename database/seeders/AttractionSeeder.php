<?php

namespace Database\Seeders;

use App\Models\Places;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AttractionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $imagePath1 = 'public/makam.jpg';
        $imagePath2 = 'public/bolaApi.jpg';

        $photoPath1 = Storage::disk('public')->putFile('placeImages', $imagePath1);
        $photoPath2 = Storage::disk('public')->putFile('placeImages', $imagePath2);

        Places::create([
            'id' => Str::uuid()->toString(),
            'name' => 'Makam Syech Abu Hasan',
            'description' => 'Deskripsi Makam Syech Abu Hasan',
            'photo_path' => $photoPath1,
            'category_id' => 2,
            'created_at' => Carbon::now('Asia/Jakarta'),
            'updated_at' => Carbon::now('Asia/Jakarta')
        ]);

        Places::create([
            'id' => Str::uuid()->toString(),
            'name' => 'Bola Api',
            'description' => 'Deskripsi Bola Api',
            'photo_path' => $photoPath2,
            'category_id' => 2,
            'created_at' => Carbon::now('Asia/Jakarta'),
            'updated_at' => Carbon::now('Asia/Jakarta')
        ]);
    }
}
