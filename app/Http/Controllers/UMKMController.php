<?php

namespace App\Http\Controllers;

use App\Http\Requests\PlacesRequest;
use App\Models\Places;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use PHPUnit\Util\Exception;

class UMKMController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $umkm = Places::paginate(5);

        if (is_null($umkm)) {
            return Redirect::back()->with('error', 'UMKM value is null');
        }

        return Inertia::render('UMKM/Index', [
            'UMKM' => $umkm
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('UMKM/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PlacesRequest $request)
    {
        $validated = $request->validated();

        try {
            if (!$request->hasFile('photo') || !$request->file('photo')->isValid()) {
                return Redirect::back()->with('error', 'Invalid photo UMKM');
            }

            $photo_path = $request->file('photo')->store('placeImages', 'public');
        } catch (\Exception $e) {
            Log::info('Failed to upload photo UMKM: ' . $e);
            return Redirect::back()->with('error', 'cannot upload photo UMKM');
        }

        try {
            $umkm = [
                'id' => Str::uuid()->toString(),
                'name' => $validated['title'],
                'description' => $validated['description'],
                'photo_path' => $photo_path,
                'category_id' => 3,
                'created_at' => Carbon::now('Asia/Jakarta'),
                'updated_at' => Carbon::now('Asia/Jakarta')
            ];

            Places::create($umkm);

            return Redirect::route('UMKM.index')->with('success', 'success to add UMKM');
        } catch (Exception $e) {
            Log::error('cannot store UMKM value to database: ' . $e);
            return Redirect::back()->with('error', 'cannot store UMKM value to database');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $umkm = Places::where('id', $id)->first();

        if (is_null($umkm)) {
            return Redirect::back()->with('error', 'UMKM value is null');
        }

        return Inertia::render('UMKM/Show', [
            'UMKM' => $umkm
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('UMKM/Edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PlacesRequest $request, string $id)
    {
        $validated = $request->validated();

        try {
            return DB::transaction(function () use ($request, $id, $validated) {
                $umkm = Places::where('id', $id)->first();

                if (is_null($umkm)) {
                    return Redirect::back()->with('error', 'UMKM not found');
                }

                if (!is_null($validated['name'])) {
                    $umkm->name = $validated['name'];
                }

                if (!is_null($validated['description'])) {
                    $umkm->description = $validated['description'];
                }

                if ($request->hasFile('photo_path') && $request->file('photo_path')->isValid()) {
                    // Delete the old photo if exists
                    if ($umkm->photo_path) {
                        Storage::delete($umkm->photo_path);
                    }

                    // Store the new photo
                    $umkm->photo_path = $request->file('photo')->store('placeImages', 'public');
                }

                $umkm->updated_at = Carbon::now('Asia/Jakarta');

                $umkm->save();

                return Redirect::route('UMKM.show', ['id' => $umkm->id])->with('success', 'success update UMKM');
            });
        } catch (\Exception $e) {
            Log::info('cannot update UMKM values: '. $e);
            return Redirect::back()->with('error', 'cannot update UMKM values');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            return DB::transaction(function () use ($id) {
                $umkm = Places::where('id', $id)->first();

                if (is_null($umkm)) {
                    return Redirect::back()->with('error', 'UMKM not found');
                }

                if ($umkm->photo_path) {
                    Storage::delete($umkm->photo_path);
                }

                $success = $umkm->delete();

                if (!$success) {
                    return Redirect::back()->with('error', 'cannot delete UMKM');
                }

                return Redirect::route('UMKM.index')->with('success', 'success delete UMKM');
            });
        } catch (\Exception $e) {
            Log::error('cannot delete UMKM: '. $e);
            return Redirect::back()->with('error', 'cannot delete UMKM');
        }
    }
}
