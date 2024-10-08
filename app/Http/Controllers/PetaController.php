<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Places;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PetaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $places = Places::with(['photo','category'])->paginate(4);
        $categories = Category::all();
    
        return Inertia::render('Admin/Peta/Index',[
            'places'=>$places,
            'categories'=>$categories,
            'flash' => $this->flash(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
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
