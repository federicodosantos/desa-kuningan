<?php

namespace App\Http\Controllers;

use App\Http\Resources\PlaceResource;
use App\Http\Resources\VillageOfficerResource;
use App\Models\News;
use App\Models\Places;
use App\Models\VillageOfficer;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
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
        $perangkatDesa = VillageOfficer::with('position')->
        orderBy('position_id')->get();

        $kepalaDesa = VillageOfficer::with('position')->
        where('position_id', 1)->first();

        return Inertia::render('Home', [
            'news' => $news,
            'perangkatDesa' => VillageOfficerResource::collection($perangkatDesa),
            'kepalaDesa' => new VillageOfficerResource($kepalaDesa),
            'flash'=> $this->flash()
        ]);
    }
    public function sarana()
    {

        $sarana = Places::with(['photo','category'])->where('category_id',1)->paginate(9);

        return Inertia::render('SaranaPrasarana', [
            'sarana' => PlaceResource::collection($sarana),

        ]);
    }
    public function umkm()
    {

        $umkm = Places::with(['photo','category'])->where('category_id',3)->paginate(9);

        return Inertia::render('Umkm', [
            'umkm' => PlaceResource::collection($umkm),

        ]);
    }
    public function umkmDetail(String $id)
    {
        $umkm = Places::with(['photo','category'])->findOrFail($id);

        return Inertia::render('UmkmDetail', [
            'umkm' => New PlaceResource($umkm),
        ]);
    }
    public function pariwisata()
    {

        $pariwisata = Places::with(['photo','category'])->where('category_id',2)->paginate(9);

        return Inertia::render('Pariwisata', [
            'pariwisata' => PlaceResource::collection($pariwisata),

        ]);
    }
    public function pariwisataDetail(String $id)
    {
        $pariwisata = Places::with(['photo','category'])->findOrFail($id);
        return Inertia::render('PariwisataDetail', [
            'pariwisata' => New PlaceResource($pariwisata),
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
        $places=Places::with('category')->get();



        return Inertia::render('Peta',[
            'places'=>$places
        ]);

    }
    public function detailBerita($slug)
    {

        $news = News::with('User')->where('slug', $slug)->first();


        $news->photo_path = asset('storage/' . $news->photo_path);
        $news->formatted_date = Carbon::parse($news->created_at)->format('d-m-Y H:i');

        return Inertia::render('DetailBerita', [
            'news' => $news
        ]);
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
