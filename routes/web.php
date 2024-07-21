<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FeController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PlaceController;
use App\Http\Controllers\VillageOfficerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ComplaintController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Artisan;
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

Route::get('/', [FeController::class, 'index'])->name('home');
Route::get('/berita', [FeController::class, 'allBerita'])->name('berita');
Route::get('/berita/{slug}', [FeController::class, 'detailBerita'])->name('detailBerita');
Route::get('/tentang-kami', function () {
    return Inertia::render('Tentang');
})->name('tentang');
Route::get('/sejarah', function () {
    return Inertia::render('Sejarah');
})->name('sejarah');
Route::get('/visi-misi', function () {
    return Inertia::render('VisiMisi');
})->name('visiMisi');
Route::get('/demografis-penduduk', function () {
    return Inertia::render('DataPenduduk');
})->name('demografi');
Route::get('/struktur', function () {
    return Inertia::render('Struktur');
})->name('struktur');
Route::get('/peta-digital', [FeController::class, 'Peta'])->name('peta');
Route::get('/sarana-dan-prasarana', [FeController::class, 'sarana'])->name('sarana');
Route::get('/pariwisata', [FeController::class, 'pariwisata'])->name('pariwisata');
Route::get('/pariwisata/{id}', [FeController::class, 'pariwisataDetail'])->name('pariwisataDetail');
Route::get('/umkm', [FeController::class, 'umkm'])->name('umkm');
Route::get('/umkm/{id}', [FeController::class, 'umkmDetail'])->name('umkmDetail');

Route::prefix('admin')->middleware(['auth'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

    Route::resource('news', NewsController::class)->names([
        'index' => 'admin.news.index',
        'create' => 'admin.news.create',
        'store' => 'admin.news.store',
        'edit' => 'admin.news.edit',
        'update' => 'admin.news.update',
        'destroy' => 'admin.news.destroy',
        'show' => 'admin.news.show',
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('/places')->group(function () {
        Route::resource('place', PlaceController::class)->names([
            'index' => 'admin.place.index',
            'create' => 'admin.place.create',
            'store' => 'admin.place.store',
            'edit' => 'admin.place.edit',
            'update' => 'admin.place.update',
            'destroy' => 'admin.place.destroy',
            'show' => 'admin.place.show',
        ]);
        Route::delete('/place/{placeID}/photo/{photoID}', [PlaceController::class, 'deletePhoto'])->name(
            'place.deletePhoto'
        );
    });

    Route::prefix('/officers')->group(function () {
        Route::resource('officer', VillageOfficerController::class)->names([
            'index' => 'admin.officer.index',
            'create' => 'admin.officer.create',
            'store' => 'admin.officer.store',
            'edit' => 'admin.officer.edit',
            'update' => 'admin.officer.update',
            'destroy' => 'admin.officer.destroy',
            'show' => 'admin.officer.show',
        ]);
    });

    Route::prefix('/news')->group(function () {
        Route::get('', [NewsController::class, 'index'])->name('news.index');
        Route::get('/create', [NewsController::class, 'create'])->name('news.create');
        Route::get('/{slug}', [NewsController::class, 'show'])->name('news.show');
        Route::get('/edit/{slug}', [NewsController::class, 'edit'])->name('news.edit');
        Route::post('/store', [NewsController::class, 'store'])->name('news.store');
        Route::patch('/{slug}', [NewsController::class, 'update'])->name('news.update');
        Route::delete('/{slug}', [NewsController::class, 'destroy'])->name('news.destroy');

    });

    Route::prefix('/complaint')->group(function () {
        Route::resource('complaint', ComplaintController::class)->names([
            'index' => 'admin.complaint.index',
            'create' => 'admin.complaint.create',
            'store' => 'admin.complaint.store',
            'edit' => 'admin.complaint.edit',
            'update' => 'admin.complaint.update',
            'destroy' => 'admin.complaint.destroy',
            'show' => 'admin.complaint.show',
        ])->except('store');
    });
    
});
Route::post('/store', [ComplaintController::class, 'store'])
    ->middleware('throttle:10,1')->name('complaint.store');


require __DIR__ . '/auth.php';
