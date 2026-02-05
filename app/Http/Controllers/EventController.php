<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::with('user:id,name')
            ->latest()
            ->get()
            ->map(function ($e) {
                return [
                    'id_event'       => $e->id_event,
                    'nama_event'     => $e->nama_event,
                    'deskripsi'      => $e->deskripsi,
                    'tanggal_event'  => $e->tanggal_event,
                    'thumbnail'      => $e->thumbnail,
                    'link'           => $e->link,
                    'author'         => $e->user?->name,
                ];
            });

        return Inertia::render('event/all-events', [
            'events' => $events
        ]);
    }

    /**
     * Menampilkan detail event
     * File frontend: resources/js/pages/event/detail-event.tsx
     */
    public function show(string $id)
    {
        $event = Event::with('user:id,name')->findOrFail($id);

        return Inertia::render('event/detail-event', [
            'event' => [
                'id_event'       => $event->id_event,
                'nama_event'     => $event->nama_event,
                'deskripsi'      => $event->deskripsi,
                'tanggal_event'  => $event->tanggal_event,
                'thumbnail'      => $event->thumbnail,
                'link'           => $event->link,
                'author'         => $event->user?->name,
            ]
        ]);
    }

    /**
     * Simpan event baru (biasanya dari admin)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_event'     => 'required|string|max:255',
            'deskripsi'      => 'required',
            'tanggal_event'  => 'required|date',
            'thumbnail'      => 'nullable|string',
            'link'           => 'nullable|url',
        ]);

        Event::create([
            ...$validated,
            'id_user' => Auth::id(),
        ]);

        return redirect()
            ->route('events.index')
            ->with('success', 'Event berhasil dibuat');
    }

    /**
     * Update event
     */
    public function update(Request $request, string $id)
    {
        $event = Event::findOrFail($id);

        $validated = $request->validate([
            'nama_event'     => 'required|string|max:255',
            'deskripsi'      => 'required',
            'tanggal_event'  => 'required|date',
            'thumbnail'      => 'nullable|string',
            'link'           => 'nullable|url',
        ]);

        $event->update($validated);

        return redirect()
            ->back()
            ->with('success', 'Event berhasil diperbarui');
    }

    /**
     * Hapus event
     */
    public function destroy(string $id)
    {
        $event = Event::findOrFail($id);
        $event->delete();

        return redirect()
            ->route('events.index')
            ->with('success', 'Event berhasil dihapus');
    }
}
