<?php

namespace Database\Seeders;

use App\Models\PlacePhoto;
use App\Models\Places;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PariwisataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $imagePath1 = 'public/makam.jpg';
        $imagePath2 = 'public/bolaApi.jpg';

        $photoPath1 = Storage::disk('public')->putFile('placeImages', $imagePath1);

        $place = Places::create([
            'id' => Str::uuid()->toString(),
            'name' => 'Makam Syech Abu Hasan',
            'description' => 'Deskripsi Makam Syech Abu Hasan',
            'address' => 'RT.4/RW.4, Jl syech Abu Hasan Kuningan, Selatan, Ds. Kuningan, Kec. Kanigoro, Kabupaten Blitar, Jawa Timur',
            'social_media' => 'instagram: @pokdarwiskuningan',
            'phone_number' => '085732464004',
            'latitude' => -8.118288,
            'longitude' => 112.182243,
            'category_id' => 2,
            'created_at' => Carbon::now('Asia/Jakarta'),
            'updated_at' => Carbon::now('Asia/Jakarta')
        ]);

        PlacePhoto::create([
            'place_id' => $place->id,
            'photo_path' => $photoPath1
        ]);
    }
}
