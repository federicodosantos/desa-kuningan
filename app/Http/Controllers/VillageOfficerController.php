<?php

namespace App\Http\Controllers;

use App\Http\Requests\VillageOfficerRequest;
use App\Http\Requests\VillageOfficerUpdateRequest;
use App\Http\Resources\VillageOfficerResource;
use App\Models\Position;
use App\Models\VillageOfficer;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class VillageOfficerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $officers = VillageOfficer::with('position')->
        orderBy('position_id')->get();

        if ($officers->isEmpty()) {
            return Redirect::back()->with('error', 'officers value is null');
        }

        return Inertia::render('Admin/Officer/Index', [
            'officers' => VillageOfficerResource::collection($officers),
            'flash'=> $this->flash()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $position = Position::all();



        return Inertia::render('Admin/Officer/Create',[
            'positions' => $position
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(VillageOfficerRequest $request)
    {
        $validated = $request->validated();


        try {
            if (!$request->hasFile('photo') || !$request->file('photo')->isValid()) {
                return Redirect::back()->with('error', 'Invalid photo officer');
            }

            $photo_path = $request->file('photo')->store('officerImages', 'public');
        } catch (\Exception $e) {
            Log::error('Failed to upload photo officer: ' . $e);
            return Redirect::back()->with('error', 'cannot upload photo officer');
        }
        try {
            $officer = [
                'name' => $validated['name'],
                'photo_path' => $photo_path,
                'position_id' => $validated['position'],
                'created_at' => Carbon::now('Asia/Jakarta'),
                'updated_at' => Carbon::now('Asia/Jakarta')
            ];

            VillageOfficer::create($officer);

            return Redirect::route('admin.officer.index')->with('success', 'success to add officer');
        } catch (Exception $e) {
            Log::error('cannot store officer value to database: ' . $e);
            return Redirect::back()->with('error', 'cannot store officer value to database');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        $officer = VillageOfficer::with('position')->
        where('id', $id)->first();

        $position = Position::all();

        if (is_null($officer) || is_null($position)) {
            return Redirect::back()->with('error', 'officer or position value is null');
        }

        return Inertia::render('Admin/Officer/Edit', [
            'officer' => new VillageOfficerResource($officer),
            'positions' => $position
        ]);
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(VillageOfficerUpdateRequest $request, int $id)
    {
        $validated = $request->validated();

        try {
            return DB::transaction(function () use ($request, $id, $validated) {
                $officer = VillageOfficer::where('id', $id)->first();

                if (is_null($officer)) {
                    return Redirect::back()->with('error', 'officer not found');
                }

                if (!is_null($validated['name'])) {
                    $officer->name = $validated['name'];
                }

                if (!is_null($validated['position'])) {
                    $officer->position_id = $validated['position'];
                }

                if ($request->hasFile('photo') && $request->file('photo')->isValid()) {
                    if ($officer->photo_path) {
                        $delete_path = 'storage/app/' . $officer->photo_path;
                        Storage::disk('public')->delete($delete_path);
                    }

                    $officer->photo_path = $request->file('photo')->store('officerImages', 'public');
                }

                $officer->updated_at = Carbon::now('Asia/Jakarta');

                $officer->save();

                return Redirect::route('admin.officer.index')->with('success', 'success update officer');
            });
        } catch (\Exception $e) {
            Log::error('cannot update officer values: '. $e);
            return Redirect::back()->with('error', 'cannot update officer values');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        try {
            return DB::transaction(function () use ($id) {

                $officer = VillageOfficer::with('user')->where('id', $id)->first();

                if (is_null($officer)) {
                    return Redirect::back()->with('error', 'officer not found');
                }

                if ($officer->photo_path) {
                    Storage::disk('public')->delete($officer->photo_path);
                }

                $success = $officer->delete();

                if (!$success) {
                    return Redirect::back()->with('error', 'cannot delete officer value');
                }

                return Redirect::route('officer.index')->with('success', 'success delete officer value');
            });
        } catch (\Exception $e) {
            Log::error('Error deleting officer value ' . $e->getMessage());
            return Redirect::back()->with('error', 'cannot delete officer value');
        }
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
