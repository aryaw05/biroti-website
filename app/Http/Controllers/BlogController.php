<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        $blog = Blog::with('user:id,name')->get();
        return response()->json([
            'success' => true,
            'message' => 'Blogs retrieved successfully',
            'data' => $blog->map(function($b) {
                return [
                    'id_blog' => $b->id_blog,
                    'judul' => $b->judul,
                    'konten' => $b->konten,
                    'tanggal' => $b->tanggal,
                    'thumbnail' => $b->thumbnail,
                    'id_user' => $b->id_user,
                    'author' => $b->user->name
                ];
            })
        ], 200);
    }

    public function show($id)
    {
        $blog = Blog::with('user:id,name')->find($id);

        if (!$blog) {
            return response()->json([
                'success' => false,
                'message' => 'Blog not found',
                'data' => (object)[]
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Blog retrieved successfully',
            'data' => [
                'id_blog' => $blog->id_blog,
                'judul' => $blog->judul,
                'konten' => $blog->konten,
                'tanggal' => $blog->tanggal,
                'thumbnail' => $blog->thumbnail,
                'id_user' => $blog->id_user,
                'author' => $blog->user->name
            ]
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'konten' => 'required',
            'thumbnail' => 'nullable|string'
        ]);

        $blog = Blog::create([
            'judul' => $request->judul,
            'konten' => $request->konten,
            'tanggal' => now()->toDateString(),
            'thumbnail' => $request->thumbnail,
            'id_user' => auth()->id()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Blog created successfully',
            'data' => $blog
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $blog = Blog::find($id);

        if (!$blog) {
            return response()->json([
                'success' => false,
                'message' => 'Blog not found',
                'data' => (object)[]
            ], 404);
        }

        $blog->update($request->only(['judul','konten','thumbnail']));

        return response()->json([
            'success' => true,
            'message' => 'Blog updated successfully',
            'data' => $blog
        ], 200);
    }

    public function destroy($id)
    {
        $blog = Blog::find($id);

        if (!$blog) {
            return response()->json([
                'success' => false,
                'message' => 'Blog not found',
                'data' => (object)[]
            ], 404);
        }

        $blog->delete();

        return response()->json([
            'success' => true,
            'message' => 'Blog deleted successfully',
            'data' => (object)[]
        ], 200);
    }
}