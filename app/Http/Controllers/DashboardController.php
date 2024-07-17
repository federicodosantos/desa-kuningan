<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalNews = News::count(); 
        
        return Inertia::render('Admin/Dashboard', [
            'totalNews' => $totalNews
        ]);
    }
}
