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

class FacilitiesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $facilities = Places::paginate(5);

        if (is_null($facilities)) {
            return Redirect::back()->with('error', 'facilities value is null');
        }

        return Inertia::render('Facilities/Index', [
            'facilities' => $facilities
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Facilities/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PlacesRequest $request)
    {
        $validated = $request->validated();

        try {
            if (!$request->hasFile('photo') || !$request->file('photo')->isValid()) {
                return Redirect::back()->with('error', 'Invalid photo facilities');
            }

            $photo_path = $request->file('photo')->store('placeImages', 'public');
        } catch (\Exception $e) {
            Log::info('Failed to upload photo facilities: ' . $e);
            return Redirect::back()->with('error', 'cannot upload photo facilities');
        }

        try {
            $facilities = [
                'id' => Str::uuid()->toString(),
                'name' => $validated['title'],
                'description' => $validated['description'],
                'photo_path' => $photo_path,
                'category_id' => 1,
                'created_at' => Carbon::now('Asia/Jakarta'),
                'updated_at' => Carbon::now('Asia/Jakarta')
            ];

            Places::create($facilities);

            return Redirect::route('facilities.index')->with('success', 'success to add facilities');
        } catch (Exception $e) {
            Log::error('cannot store facilities value to database: ' . $e);
            return Redirect::back()->with('error', 'cannot store facilities value to database');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $facilities = Places::where('id', $id)->first();

        if (is_null($facilities)) {
            return Redirect::back()->with('error', 'facilities value is null');
        }

        return Inertia::render('Facilities/Show', [
            'facilities' => $facilities
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('Facilities/Edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PlaceUpdateRequest $request, string $id)
    {
        $validated = $request->validated();

        try {
            return DB::transaction(function () use ($request, $id, $validated) {
                $facilities = Places::where('id', $id)->first();

                if (is_null($facilities)) {
                    return Redirect::back()->with('error', 'facilities not found');
                }

                if (!is_null($validated['name'])) {
                    $facilities->name = $validated['name'];
                }

                if (!is_null($validated['description'])) {
                    $facilities->description = $validated['description'];
                }

                if ($request->hasFile('photo_path') && $request->file('photo_path')->isValid()) {
                    // Delete the old photo if exists
                    if ($facilities->photo_path) {
                        $delete_path = 'storage/app/' . $facilities->photo_path;
                        Storage::delete($delete_path);
                    }

                    // Store the new photo
                    $facilities->photo_path = $request->file('photo')->store('placeImages', 'public');
                }

                $facilities->updated_at = Carbon::now('Asia/Jakarta');

                $facilities->save();

                return Redirect::route('facilities.show', ['id' => $facilities->id])->with('success', 'success update facilities');
            });
        } catch (\Exception $e) {
            Log::info('cannot update facilities values: '. $e);
            return Redirect::back()->with('error', 'cannot update facilities values');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            return DB::transaction(function () use ($id) {
                $facilities = Places::where('id', $id)->first();

                if (is_null($facilities)) {
                    return Redirect::back()->with('error', 'facilities not found');
                }

                if ($facilities->photo_path) {
                    $delete_path = 'storage/app/' . $facilities->photo_path;
                    Storage::delete($delete_path);
                }

                $success = $facilities->delete();

                if (!$success) {
                    return Redirect::back()->with('error', 'cannot delete facilities');
                }

                return Redirect::route('facilities.index')->with('success', 'success delete facilities');
            });
        } catch (\Exception $e) {
            Log::error('cannot delete facilities: '. $e);
            return Redirect::back()->with('error', 'cannot delete facilities');
        }
    }
}
