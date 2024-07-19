<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\PlacePhoto;
use App\Models\Places;
use App\Models\VillageOfficer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalNews = News::count();

        $sapras = Places::with('category')->where('category_id',1)->count();
        $pariwisata = Places::with('category')->where('category_id',2)->count();
        $umkm = Places::with('category')->where('category_id',3)->count();
        $homestay= Places::with('category')->where('category_id',4)->count();
        $perangkatDesa= VillageOfficer::count();
        $lokasi= Places::count();
     
        
        return Inertia::render('Admin/Dashboard', [
            'totalNews' => $totalNews,
            'totalSarana' => $sapras,
            'totalUmkm' => $umkm,
            'totalHomestay' => $homestay,
            'totalPariwisata' => $pariwisata,
            'total' => $lokasi,
            'perangkatDesa' =>$perangkatDesa
        ]);
    }
}
