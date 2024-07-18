<?php

namespace Tests\Feature;

use App\Models\News;
use App\Models\User;
use Database\Seeders\NewsSeeder;
use Database\Seeders\PositionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class NewsControllerTest extends TestCase
{
    use RefreshDatabase;
    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(PositionSeeder::class);
        $this->user = User::factory()->create();
    }


    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_store()
    {
        Storage::fake('newsImage');

        $response = $this->actingAs($this->user)->post('/news/store',[
            'title' => 'Title test',
            'content' => 'content test',
            'header_photo' => UploadedFile::fake()->image('headerImage.jpg'),
            'content_photo' => UploadedFile::fake()->image('contentImage.jpg')
        ]);

        $response->assertRedirect('/news');
        $this->assertDatabaseHas('news', [
            'title' => 'Title test',
            'content' => 'content test',
        ]);
    }

    public function testUpdate()
    {
        // Jalankan seeder News
        $this->seed(NewsSeeder::class);

        // Ambil news dari database
        $news = News::where('slug', 'test-title')->first();

        $this->assertNotNull($news);

        Storage::fake('public');

        $response = $this->actingAs($this->user)->patch('/news/'. $news->slug, [
            'title' => 'Updated news title',
            'content' => 'Updated content',
            'header_photo_path' => UploadedFile::fake()->image('updated_header.jpg'),
            'content_photo_path' => UploadedFile::fake()->image('updated_content.jpg')
        ]);

        $response->assertRedirect('/news/' . $news->slug);
        $this->assertDatabaseHas('news', [
            'title' => 'Updated news title',
            'content' => 'Updated content',
        ]);

        $updatedNews = News::where('slug', 'test-title')->first();
        $this->assertNotNull($updatedNews->header_photo_path);
        $this->assertNotNull($updatedNews->content_photo_path);

        Log::info('Expected path: ' . $updatedNews->header_photo_path);
        Log::info('Expected path: ' . $updatedNews->content_photo_path);
        Log::info('Stored files: ' . json_encode(Storage::disk('public')->allFiles()));

        $this->assertTrue(Storage::disk('public')->exists($updatedNews->header_photo_path));
        $this->assertTrue(Storage::disk('public')->exists($updatedNews->content_photo_path));
    }

    public function test_destroy()
    {
        $this->seed(NewsSeeder::class);

        // Ambil news dari database
        $news = News::where('slug', 'test-title')->first();

        $this->assertNotNull($news);

        $response = $this->actingAs($this->user)->delete('/news/'. $news->slug);

        $response->assertRedirect('/news');
        $this->assertDatabaseEmpty($news);
    }
}
