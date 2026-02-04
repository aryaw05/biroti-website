<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $table = 'blog';
    protected $primaryKey = 'id_blog';
    protected $fillable = ['judul', 'konten', 'tanggal', 'thumbnail', 'id_user'];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }
}