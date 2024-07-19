<?php

namespace Database\Seeders;

use App\Models\News;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email','adminKuningan@gmail.com')->first();

        $imagePath = 'public/bubub-ananta.jpg';

        $photoPath = Storage::disk('public')->putFile('newsImages', $imagePath);

        News::create([
            'id' => Str::uuid()->toString(),
            'title' => 'test title',
            'content' => 'content test',
            'user_id' => $user->id,
            'photo_path' => $photoPath,
            'slug' => Str::slug('test title'),
            'created_at' => Carbon::now('Asia/Jakarta'),
            'updated_at' => Carbon::now('Asia/Jakarta')
        ]);
    }
}
