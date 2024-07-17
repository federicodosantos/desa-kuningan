<?php

namespace App\Http\Controllers;

use App\Models\News;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeController extends Controller
{

    public function index()
    {

        $news = News::latest()->take(6)->get()->map(function ($item) {
            $item->photo_path = str_replace('public/', 'storage/', $item->photo_path);
            $item->formatted_date = Carbon::parse($item->created_at)->format('d-m-Y H:i');
            return $item;
        });
        return Inertia::render('Home', [
            'news' => $news
        ]);
    }
    public function allBerita()
    {
        
        $news = News::all();
        
        $news->map(function ($item) {
            $item->photo_path = str_replace('public/', 'storage/', $item->photo_path);
            $item->formatted_date = Carbon::parse($item->created_at)->format('d-m-Y H:i');
            return $item;
        });
   

        return Inertia::render('Berita', [
            'news' => $news
        ]);
    }
    public function detailBerita($slug)
    {
        $news = News::with('User')->where('slug', $slug)->first();
        $news->photo_path = str_replace('public/', 'storage/', $news->photo_path);
        $news->formatted_date = Carbon::parse($news->created_at)->format('d-m-Y H:i');

        return Inertia::render('DetailBerita', [
            'news' => $news
        ]);
    }
}
