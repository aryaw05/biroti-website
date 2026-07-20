<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Blog extends Model
{
    use HasFactory;

    protected $table = 'blog';
    protected $primaryKey = 'id_blog';
    protected $fillable = ['judul', 'slug', 'konten', 'tanggal', 'thumbnail', 'id_user'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($blog) {
            if (empty($blog->slug)) {
                $slug = Str::slug($blog->judul);
                $originalSlug = $slug;
                $count = 1;

                while (static::where('slug', $slug)->exists()) {
                    $slug = $originalSlug . '-' . $count;
                    $count++;
                }

                $blog->slug = $slug;
            }
        });
        
        static::updating(function ($blog) {
            if ($blog->isDirty('judul') && empty($blog->slug)) {
                $slug = Str::slug($blog->judul);
                $originalSlug = $slug;
                $count = 1;

                while (static::where('slug', $slug)->where('id_blog', '!=', $blog->id_blog)->exists()) {
                    $slug = $originalSlug . '-' . $count;
                    $count++;
                }

                $blog->slug = $slug;
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }
}