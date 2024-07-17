<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FeController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/',[FeController::class,'index'])->name('home');
Route::get('/berita',[FeController::class,'allBerita'])->name('berita');
Route::get('/berita/{slug}',[FeController::class,'detailBerita'])->name('detailBerita');
Route::get('/tentang-kami', function () {
    return Inertia::render('Tentang');
})->name('tentang');
Route::get('/data-penduduk', function () {
    return Inertia::render('DataPenduduk');
})->name('demografis');
Route::get('/peta-digital', function () {
    return Inertia::render('Peta');
})->name('peta');

Route::prefix('admin')->middleware(['auth'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

    Route::resource('news', NewsController::class)->names([
        'index' => 'admin.news.index',
        'create' => 'admin.news.create',
        'store' => 'admin.news.store',
        'edit' => 'admin.news.edit',
        'update' => 'admin.news.update',
        'destroy' => 'admin.news.destroy',
    ]);

  
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    Route::prefix('/news')->group(function () {
        Route::get('', [NewsController::class, 'index'])->name('news.index');
        Route::get('/create', [NewsController::class, 'create'])->name('news.create');
        Route::get('/{slug}', [NewsController::class, 'show'])->name('news.show');
        Route::get('/edit/{slug}', [NewsController::class, 'edit'])->name('news.edit');
        Route::post('/store', [NewsController::class, 'store'])->name('news.store');
        Route::patch('/{slug}', [NewsController::class, 'update'])->name('news.update');
        Route::delete('/{slug}', [NewsController::class, 'destroy'])->name('news.destroy');
    });
});

require __DIR__.'/auth.php';
