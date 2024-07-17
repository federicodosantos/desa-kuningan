<?php

use App\Http\Controllers\NewsController;
use App\Http\Controllers\FacilitiesController;
use App\Http\Controllers\AttractionController;
use App\Http\Controllers\UMKMController;
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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
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

        Route::resource('facilities', FacilitiesController::class)->names([
            'index' => 'facilities.index',
            'create' => 'facilities.create',
            'store' => 'facilities.store',
            'edit' => 'facilities.edit',
            'update' => 'facilities.update',
            'show' => 'facilities.show',
            'destroy' => 'facilities.destroy',
        ]);

        Route::resource('attractions', AttractionController::class)->names([
            'index' => 'attractions.index',
            'create' => 'attractions.create',
            'store' => 'attractions.store',
            'edit' => 'attractions.edit',
            'update' => 'attractions.update',
            'show' => 'attractions.show',
            'destroy' => 'attractions.destroy',
        ]);

        Route::resource('umkm', UMKMController::class)->names([
            'index' => 'umkm.index',
            'create' => 'umkm.create',
            'store' => 'umkm.store',
            'edit' => 'umkm.edit',
            'update' => 'umkm.update',
            'show' => 'umkm.show',
            'destroy' => 'umkm.destroy',
        ]);
    });
});

require __DIR__ . '/auth.php';
