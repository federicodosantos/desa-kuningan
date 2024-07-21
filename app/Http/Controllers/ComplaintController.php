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

        return Inertia::render('Admin/Complaint/Index', [
            'complaints' => $complaints,
            'flash'=>$this->flash()
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

            return Redirect::route('home')->with('success', 'success to add complaint value to database');
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
    public function destroy(int $id)
    {
        try {
            $complaint = Complaint::where('id', $id)->first();
       

            if (is_null($complaint)) {
                return Redirect::back()->with('error', 'complaint value is null');
            }

            $complaint->delete();

            return Redirect::route('admin.complaint.index')->with('success', 'success to delete complaint value');
        } catch (\Exception $e) {
            Log::error('cannot delete complaint value: '. $e);
            return Redirect::back()->with('error','cannot delete complaint value');
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
