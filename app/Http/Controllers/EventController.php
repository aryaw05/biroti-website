<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::with('user:id,name')->get();

        return response()->json([
            'success' => true,
            'message' => 'Events retrieved successfully',
            'data' => $events->map(function ($e) {
                return [
                    'id_event'   => $e->id_event,
                    'nama_event' => $e->nama_event,
                    'deskripsi'  => $e->deskripsi,
                    'tanggal_event' => $e->tanggal_event,
                    'thumbnail'  => $e->thumbnail,
                    'link'  => $e->link,
                    'id_user'    => $e->id_user,
                    'author'     => $e->user->name,
                ];
            })
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama_event' => 'required|string|max:255',
            'deskripsi'  => 'required',
            'tanggal_event' => 'required|date',
            'thumbnail'  => 'nullable|string',
            'link'  => 'nullable|url',
        ]);

        $event = Event::create([
            'nama_event' => $request->nama_event,
            'deskripsi'  => $request->deskripsi,
            'tanggal_event' => $request->tanggal_event,
            'thumbnail'  => $request->thumbnail,
            'link'  => $request->link,
            'id_user'    => Auth::id()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Event created successfully',
            'data'    => $event
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $event = Event::with('user:id,name')->find($id);

        if (!$event) {
            return response()->json([
                'success' => false,
                'message' => 'Event not found',
                'data'    => (object)[]
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Event retrieved successfully',
            'data' => [
                'id_event'   => $event->id_event,
                'nama_event' => $event->nama_event,
                'deskripsi'  => $event->deskripsi,
                'tanggal_event' => $event->tanggal_event,
                'thumbnail'  => $event->thumbnail,
                'link'  => $event->link,
                'id_user'    => $event->id_user,
                'author'     => $event->user->name,
            ]
        ], 200);
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
        $event = Event::find($id);

        if (!$event) {
            return response()->json([
                'success' => false,
                'message' => 'Event not found',
                'data'    => (object)[]
            ], 404);
        }

        $event->update($request->only(['nama_event','deskripsi','tanggal_event','thumbnail','link']));

        return response()->json([
            'success' => true,
            'message' => 'Event updated successfully',
            'data'    => $event
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json([
                'success' => false,
                'message' => 'Event not found',
                'data'    => (object)[]
            ], 404);
        }

        $event->delete();

        return response()->json([
            'success' => true,
            'message' => 'Event deleted successfully',
            'data'    => (object)[]
        ], 200);
    }
}