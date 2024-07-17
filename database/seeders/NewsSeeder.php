<?php

namespace Database\Seeders;

use App\Models\News;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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

        $photoPath = Storage::putFile('public', $imagePath);

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
        News::create([
            'id' => Str::uuid()->toString(),
            'title' => 'Test Title with Rich Text',
            'content' => '<p>This is a <strong>test</strong> news item with <em>rich text</em> content. Here is a <a href="#">link</a> and an image:</p><img src="https://via.placeholder.com/150" alt="Placeholder Image"><p>Another paragraph of rich text content.</p>',
            'user_id' => $user->id,
            'photo_path' => $photoPath,
            'slug' => Str::slug('Test Title with Rich Text'),
            'created_at' => Carbon::now('Asia/Jakarta'),
            'updated_at' => Carbon::now('Asia/Jakarta')
        ]);
    }
}
