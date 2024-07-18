<?php

namespace Database\Seeders;

use App\Models\Places;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UMKMSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
//        $imagePath1 = 'public/stroberi.jpg';
//        $imagePath2 = 'public/susu.jpg';
//
//        $photoPath1 = Storage::disk('public')->putFile('placeImages', $imagePath1);
//        $photoPath2 = Storage::disk('public')->putFile('placeImages', $imagePath2);
//
//        Places::create([
//            'id' => Str::uuid()->toString(),
//            'name' => 'KWT Stroberi',
//            'description' => 'KWT Stroberi nih bos senggol dong!!',
//            'photo_path' => $photoPath1,
//            'category_id' => 3,
//            'created_at' => Carbon::now('Asia/Jakarta'),
//            'updated_at' => Carbon::now('Asia/Jakarta')
//        ]);
//
//        Places::create([
//            'id' => Str::uuid()->toString(),
//            'name' => 'KWT Susu',
//            'description' => 'KWT Susu nih bos senggol dong!!',
//            'photo_path' => $photoPath2,
//            'category_id' => 3,
//            'created_at' => Carbon::now('Asia/Jakarta'),
//            'updated_at' => Carbon::now('Asia/Jakarta')
//        ]);
    }
}
