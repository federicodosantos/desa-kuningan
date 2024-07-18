<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PlacePhoto extends Model
{
    use HasFactory;

    protected $table = 'place_photos';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = true;
    protected $fillable = [
        'place_id', 'photo_path'
    ];

    public function Place(): BelongsTo
    {
        return $this->belongsTo(Places::class, 'place_id', 'id');
        
    }
}
