<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewsUpdateRequest;
use App\Models\News;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Http\Requests\NewsRequest;
use PHPUnit\Util\Exception;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $news = News::paginate(5);
        $news->getCollection()->transform(function ($item) {
        $item->photo_path = asset('storage/' . $item->photo_path);
        return $item;
    });
        

        return Inertia::render('Admin/News/Index', [
            'news' => $news,
            'flash' => $this->flash()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return Inertia::render('Admin/News/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(NewsRequest $request)
    {

        $validated = $request->validated();

        $slug = Str::slug($validated['title']);

        $exists = News::where('slug', $slug)->exists();
        if ($exists) {
            return Redirect::back()->with('error', 'news value duplicate');
        }

        try {
            if (!$request->hasFile('photo') || !$request->file('photo')->isValid()) {
                return Redirect::back()->with('error', 'Invalid photo news');
            }

            $photo_path = $request->file('photo')->store('newsImage', 'public');
        } catch (\Exception $e) {
            Log::info('Failed to upload photo news: ' . $e);
            return Redirect::back()->with('error', 'cannot upload photo news');
        }

        try {
            $news = [
                'id' => Str::uuid()->toString(),
                'title' => $validated['title'],
                'user_id' => Auth::user()->id,
                'content' => $validated['content'],
                'photo_path' => $photo_path,
                'slug' => $slug,
                'created_at' => Carbon::now('Asia/Jakarta'),
                'updated_at' => Carbon::now('Asia/Jakarta')
            ];

            News::create($news);

            return Redirect::route('news.index')->with('success', 'success to add news');
        } catch (Exception $e) {
            Log::error('cannot store news value to database: ' . $e);
            return Redirect::back()->with('error', 'cannot store news value to database');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $news = News::with('User')->where('slug', $slug)->first();

        if (is_null($news)) {
            return Redirect::back()->with('error', 'news not found');
        }

        return Inertia::render('Admin/News/Show', [
            'news' => $news,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $slug)
    {
        $news = News::with('user')->where('slug', $slug)->first();

        if (is_null($news)) {
            return Redirect::back()->with('error', 'news not found');
        }

        return Inertia::render('Admin/News/Edit', [
            'news' => $news
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(NewsUpdateRequest $request, string $slug)
    {
        $validated = $request->validated();

        try {
            return DB::transaction(function () use ($request, $slug, $validated) {
                $news = News::with('user')->where('slug', $slug)->first();

                if (is_null($news)) {
                    return Redirect::back()->with('error', 'news not found');
                }

                if (!is_null($validated['title'])) {
                    $news->title = $validated['title'];
                    $news->slug = Str::slug($validated['title']);
                }

                if (!is_null($validated['content'])) {
                    $news->content = $validated['content'];
                }

                if ($request->hasFile('photo') && $request->file('photo')->isValid()) {
                    // Delete the old photo if exists
                    if ($news->photo_path) {
                        Storage::disk('public')->delete($news->photo_path);
                    }

                    // Store the new photo
                    $news->photo_path = $request->file('photo')->store('newsImage', 'public');
                }

                $news->setUpdatedAt(Carbon::now('Asia/Jakarta'));

                $news->save();

                return Redirect::route('admin.news.index', ['slug' => $slug])->with('success', 'success update news');
            });
        } catch (\Exception $e) {
            Log::error('Error updating news value: ' . $e->getMessage());

            return Redirect::back()->with('cannot update the news');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $slug)
    {
        try {
            return DB::transaction(function () use ($slug) {

                $news = News::with('user')->where('slug', $slug)->first();

                if (is_null($news)) {
                    return Redirect::back()->with('error', 'news not found');
                }

                if ($news->photo_path) {
                    Storage::disk('public')->delete($news->photo_path);
                }

                $success = $news->delete();

                if (!$success) {
                    return Redirect::back()->with('error', 'cannot delete news');
                }

                return Redirect::route('admin.news.index')->with('success', 'success delete news');
            });
        } catch (\Exception $e) {
            Log::error('Error deleting news ' . $e->getMessage());
            return Redirect::back()->with('error', 'cannot delete the news');
        }
    }

    public function flash(){
        return [
            'info' => session('info'),
            'success' => session('success'),
            'danger' => session('danger'),
            'warning' => session('warning'),
            'light' => session('light'),
            'dark' => session('dark'),
        ];
    }
}
