<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\Places;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeController extends Controller
{

    public function index()
    {

        $news = News::latest()->take(6)->get()->map(function ($item) {
            $item->photo_path = 'storage/' . $item->photo_path;
            $item->formatted_date = Carbon::parse($item->created_at)->format('d-m-Y H:i');
            return $item;
        });
        return Inertia::render('Home', [
            'news' => $news
        ]);
    }
    public function allBerita()
    {

        $news = News::paginate(6);

        $news->map(function ($item) {
            $item->photo_path = 'storage/' . $item->photo_path;
            $item->formatted_date = Carbon::parse($item->created_at)->format('d-m-Y H:i');
            return $item;
        });


        return Inertia::render('Berita', [
            'news' => $news
        ]);
    }
    public function Peta()
    {
        $places=Places::all();


        return Inertia::render('Peta',[
            'places'=>$places
        ]);

    }
    public function detailBerita($slug)
    {

        $news = News::with('User')->where('slug', $slug)->first();

        $news->photo_path = 'storage/' . $news->photo_path;
        $news->formatted_date = Carbon::parse($news->created_at)->format('d-m-Y H:i');

        return Inertia::render('DetailBerita', [
            'news' => $news
        ]);
    }
}
