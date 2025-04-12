<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Keuangan extends Model
{
    use HasFactory;

    protected $fillable = [
        'kategori_id',
        'jumlah',
        'tanggal',
    ];

    public function kategori()
    {
        return $this->belongsTo(Kategori::class);
    }
}
