<?php

namespace App\Http\Controllers;

use App\Http\Requests\PlacesRequest;
use App\Http\Requests\PlaceUpdateRequest;
use App\Models\Places;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use PHPUnit\Util\Exception;

class AttractionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $attraction = Places::paginate(5);

        if (is_null($attraction)) {
            return Redirect::back()->with('error', 'attraction value is null');
        }

        return Inertia::render('Attraction/Index', [
            'attraction' => $attraction
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Attraction/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PlacesRequest $request)
    {
        $validated = $request->validated();

        try {
            if (!$request->hasFile('photo') || !$request->file('photo')->isValid()) {
                return Redirect::back()->with('error', 'Invalid photo attraction');
            }

            $photo_path = $request->file('photo')->store('placeImages', 'public');
        } catch (\Exception $e) {
            Log::info('Failed to upload photo attraction: ' . $e);
            return Redirect::back()->with('error', 'cannot upload photo attraction');
        }

        try {
            $attraction = [
                'id' => Str::uuid()->toString(),
                'name' => $validated['title'],
                'description' => $validated['description'],
                'photo_path' => $photo_path,
                'category_id' => 1,
                'created_at' => Carbon::now('Asia/Jakarta'),
                'updated_at' => Carbon::now('Asia/Jakarta')
            ];

            Places::create($attraction);

            return Redirect::route('attraction.index')->with('success', 'success to add attraction');
        } catch (Exception $e) {
            Log::error('cannot store attraction value to database: ' . $e);
            return Redirect::back()->with('error', 'cannot store attraction value to database');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $attraction = Places::where('id', $id)->first();

        if (is_null($attraction)) {
            return Redirect::back()->with('error', 'attraction value is null');
        }

        return Inertia::render('Attraction/Show', [
            'attraction' => $attraction
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $attraction = Places::where('id', $id)->first();

        if (is_null($attraction)) {
            return Redirect::back()->with('error', 'attraction value is null');
        }

        return Inertia::render('Attraction/Edit', [
            'attraction' => $attraction
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PlaceUpdateRequest $request, string $id)
    {
        $validated = $request->validated();

        try {
            return DB::transaction(function () use ($request, $id, $validated) {
                $attraction = Places::where('id', $id)->first();

                if (is_null($attraction)) {
                    return Redirect::back()->with('error', 'attraction not found');
                }

                if (!is_null($validated['name'])) {
                    $attraction->name = $validated['name'];
                }

                if (!is_null($validated['description'])) {
                    $attraction->description = $validated['description'];
                }

                if ($request->hasFile('photo_path') && $request->file('photo_path')->isValid()) {
                    // Delete the old photo if exists
                    if ($attraction->photo_path) {
                        $delete_path = 'storage/app/' . $attraction->photo_path;
                        Storage::delete($delete_path);
                    }

                    // Store the new photo
                    $attraction->photo_path = $request->file('photo')->store('placeImages', 'public');
                }

                $attraction->updated_at = Carbon::now('Asia/Jakarta');

                $attraction->save();

                return Redirect::route('attraction.show', ['id' => $attraction->id])->with('success', 'success update attraction');
            });
        } catch (\Exception $e) {
            Log::info('cannot update attraction values: '. $e);
            return Redirect::back()->with('error', 'cannot update attraction values');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            return DB::transaction(function () use ($id) {
                $attraction = Places::where('id', $id)->first();

                if (is_null($attraction)) {
                    return Redirect::back()->with('error', 'attraction not found');
                }

                if ($attraction->photo_path) {
                    $delete_path = 'storage/app/' . $attraction->photo_path;
                    Storage::delete($delete_path);
                }

                $success = $attraction->delete();

                if (!$success) {
                    return Redirect::back()->with('error', 'cannot delete attraction');
                }

                return Redirect::route('attraction.index')->with('success', 'success delete attraction');
            });
        } catch (\Exception $e) {
            Log::error('cannot delete attraction: '. $e);
            return Redirect::back()->with('error', 'cannot delete attraction');
        }
    }
}
