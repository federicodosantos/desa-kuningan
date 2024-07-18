<?php

namespace App\Http\Controllers;

use App\Http\Requests\PlacesRequest;
use App\Http\Requests\PlaceUpdateRequest;
use App\Http\Resources\PlaceResource;
use App\Models\Category;
use App\Models\PlacePhoto;
use App\Models\Places;
use App\Models\Position;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use PHPUnit\Util\Exception;

class PlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $places = Places::with('category')->with('photo')->paginate(5);

        if (is_null($places)) {
            return Redirect::back()->with('error', 'places value is null');
        }

        return Inertia::render('Place/Index', [
            'places' => PlaceResource::collection($places)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $category = Category::all();
        return Inertia::render('Place/Create', [
            'category' => $category
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PlacesRequest $request)
    {
        $validated = $request->validated();


        try {
            $photo_paths = [];

            if ($request->hasFile('photos')) {
                foreach ($request->file('photos') as $photo) {
                    if ($photo->isValid()) {
                        $photo_path = $photo->store('placeImages', 'public');
                        $photo_paths[] = $photo_path;
                    } else {
                        return Redirect::back()->with('error', 'invalid photo place');
                    }
                }
            } else {
                return Redirect::back()->with('error', 'no photos uploaded');
            }

            $place = [
                'id' => Str::uuid()->toString(),
                'name' => $validated['name'],
                'description' => $validated['description'],
                'address' => $validated['address'],
                'social_media' => $validated['social_media'],
                'phone_number' => $validated['phone_number'],
                'latitude' => $validated['latitude'],
                'longitude' => $validated['longitude'],
                'category_id' => $validated['category_id'],
                'created_at' => now('Asia/Jakarta'),
                'updated_at' => now('Asia/Jakarta')
            ];

            $newPlace = Places::create($place);

            foreach ($photo_paths as $photo_path) {
                PlacePhoto::create([
                    'place_id' => $newPlace->id,
                    'photo_path' => $photo_path,
                    'created_at' => now('Asia/Jakarta'),
                    'updated_at' => now('Asia/Jakarta')
                ]);
            }

            return Redirect::route('admin.place.index')->with('success', 'success add new place');
        } catch (\Exception $e) {
            Log::error('cannot store place value to database: ' . $e);
            return Redirect::back()->with('error', 'cannot store place value to database');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $place = Places::with('category')->with('photo')->where('id', $id)->first();

        if (is_null($place)) {
            return Redirect::back()->with('error', 'place value is null');
        }

        return Inertia::render('Place/Show', [
            'place' => $place
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $place = Places::with('category')->with('photo')->where('id', $id)->first();

        if (is_null($place)) {
            return Redirect::back()->with('error', 'place value is null');
        }

        return Inertia::render('Place/Edit', [
            'place' => new PlaceResource($place)
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
                $place = Places::where('id', $id)->first();

                if (is_null($place)) {
                    return Redirect::back()->with('error', 'place not found');
                }

                if (!is_null($validated['name'])) {
                    $place->name = $validated['name'];
                }

                if (!is_null($validated['description'])) {
                    $place->description = $validated['description'];
                }

                if (!is_null($validated['address'])) {
                    $place->address = $validated['address'];
                }

                if (!is_null($validated['social_media'])) {
                    $place->social_media = $validated['social_media'];
                }

                if (!is_null($validated['phone_number'])) {
                    $place->phone_number = $validated['phone_number'];
                }

                if (!is_null($validated['category_id'])) {
                    $place->category_id = $validated['category_id'];
                }

                if ($request->hasFile('photos') && $request->file('photos')->isValid()) {
                    foreach ($request->file('photos') as $photo) {
                        $photo_path = $photo->store('placeImages', 'public');
                        PlacePhoto::create([
                            'place_id' => $place->id,
                            'photo_path' => $photo_path
                        ]);
                    }
                }

                $place->updated_at = Carbon::now('Asia/Jakarta');

                $place->save();

                return Redirect::route('place.show', ['id' => $place->id])->with('success', 'success update place');
            });
        } catch (\Exception $e) {
            Log::info('cannot update place values: ' . $e);
            return Redirect::back()->with('error', 'cannot update place values');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            return DB::transaction(function () use ($id) {
                $place = Places::with('photo')->where('id', $id)->first();

            

                if (is_null($place)) {
                    return Redirect::back()->with('error', 'place not found');
                }
                DB::table('place_photos')->where('place_id', $id)->delete();

                foreach ($place->Photo as $photo) {
                    Storage::disk('public')->delete($photo->photo_path);
                    $photo->delete();
                }

                $place->delete();
                return Redirect::route('place.index')->with('success', 'success delete place');
            });
        } catch (\Exception $e) {
            Log::error('cannot delete place: ' . $e);
            return Redirect::back()->with('error', 'cannot delete place');
        }
    }

    /**
     * Remove the specified photo from storage
     */
    public function deletePhoto(string $place_id, int $photo_id)
    {
        try {
            return DB::transaction(function () use ($place_id, $photo_id) {
                $place = Places::where('id', $place_id)->first();
                $photo = PlacePhoto::where('id', $photo_id)->where('place_id', $place_id)->first();

                if (is_null($place) || is_null($photo)) {
                    return Redirect::back()->with('error', 'Place or photo not found');
                }

                $delete_path = 'storage/app/public/'. $photo->photo_path;
                Storage::disk('public')->delete($delete_path);

                $photo->delete();

                return Redirect::route('place.index')->with('success', 'Success delete photo');
            });
        } catch (\Exception $e) {
            Log::error('cannot delete photo: '. $e->getMessage());
            return Redirect::back()->with('error', 'cannot delete photo');
        }
    }
}
