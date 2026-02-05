<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Menampilkan semua artikel
     * Frontend: resources/js/pages/article/all-article.tsx
     */
    public function index()
    {
        $blogs = Blog::with('user:id,name')
            ->latest()
            ->get()
            ->map(function ($b) {
                return [
                    'id_blog'   => $b->id_blog,
                    'judul'     => $b->judul,
                    'tanggal'   => $b->tanggal,
                    'thumbnail' => $b->thumbnail,
                    'author'    => $b->user?->name,
                ];
            });

        return Inertia::render('article/all-article', [
            'articles' => $blogs
        ]);
    }

    /**
     * Detail artikel
     * Frontend: resources/js/pages/article/detail-article.tsx
     */
    public function show(string $id)
    {
        $blog = Blog::with('user:id,name')->findOrFail($id);

        return Inertia::render('article/detail-article', [
            'article' => [
                'id_blog'   => $blog->id_blog,
                'judul'     => $blog->judul,
                'konten'    => $blog->konten,
                'tanggal'   => $blog->tanggal,
                'thumbnail' => $blog->thumbnail,
                'author'    => $blog->user?->name,
            ]
        ]);
    }

    /**
     * Halaman tulis / edit artikel (admin)
     * Frontend: resources/js/pages/article/admin/write-article.tsx
     */
    public function create()
    {
        return Inertia::render('article/admin/write-article');
    }

    /**
     * Simpan artikel baru
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul'     => 'required|string|max:255',
            'konten'    => 'required',
            'thumbnail' => 'nullable|string',
        ]);

        Blog::create([
            ...$validated,
            'tanggal' => now()->toDateString(),
            'id_user' => Auth::id(),
        ]);

        return redirect()
            ->route('blogs.index')
            ->with('success', 'Artikel berhasil dibuat');
    }

    /**
     * Update artikel
     */
    public function update(Request $request, string $id)
    {
        $blog = Blog::findOrFail($id);

        $validated = $request->validate([
            'judul'     => 'required|string|max:255',
            'konten'    => 'required',
            'thumbnail' => 'nullable|string',
        ]);

        $blog->update($validated);

        return redirect()
            ->back()
            ->with('success', 'Artikel berhasil diperbarui');
    }

    /**
     * Hapus artikel
     */
    public function destroy(string $id)
    {
        $blog = Blog::findOrFail($id);
        $blog->delete();

        return redirect()
            ->route('blogs.index')
            ->with('success', 'Artikel berhasil dihapus');
    }
}
