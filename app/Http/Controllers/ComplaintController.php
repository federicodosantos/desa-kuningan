<?php

namespace App\Http\Controllers;

use App\Http\Requests\ComplaintRequest;
use App\Models\Complaint;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ComplaintController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $complaints = Complaint::paginate(5);

        if ($complaints->isEmpty()) {
            return Redirect::back()->with('error', 'complaints value is null');
        }

        return Inertia::render('Complaint/Index', [
            'complaints' => $complaints
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Complaint/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ComplaintRequest $request)
    {
        $validated = $request->validated();

        try {
            Complaint::create([
                'name' => $validated['name'],
                'phone_number' => $validated['phone_number'],
                'complaint' => $validated['complaint'],
                'created_at' => now('Asia/Jakarta'),
                'updated_at' => now('Asia/Jakarta')
            ]);

            return Redirect::route('complaint.index')->with('success', 'success to add complaint value to database');
        } catch (\Exception $e) {
            Log::error('cannot store complaint value: '. $e);
            return Redirect::back()->with('error', 'cannot store complaint value');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $complaint = Complaint::where('id', $id)->first();

        if (is_null($complaint)) {
            return Redirect::back()->with('error', 'complaint value is null');
        }

        return Inertia::render('Complaint/Show', [
            'complaint' => $complaint
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $complaint = Complaint::where('id', $id)->first();

            if (is_null($complaint)) {
                return Redirect::back()->with('error', 'complaint value is null');
            }

            $complaint->delete();

            return Redirect::route('complaint.index')->with('success', 'success to delete complaint value');
        } catch (\Exception $e) {
            Log::error('cannot delete complaint value: '. $e);
            return Redirect::back()->with('error','cannot delete complaint value');
        }
    }
}
