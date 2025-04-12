<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kategori extends Model
{
    use HasFactory;

    protected $fillable = [
        'jenis_kategori',
        'nama_kategori',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function keuangan()
    {
        return $this->hasMany(Keuangan::class);
    }
}
