<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Places extends Model
{
    use HasFactory;

    protected $table = 'places';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;
    public $timestamps = true;

    protected $fillable = [
        'id', 'name', 'description',
        'address', 'social_media', 'phone_number',
        'latitude', 'longitude', 'category_id'
    ];

    public function Category():BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function Photo(): HasMany
    {
        return $this->hasMany(PlacePhoto::class, 'place_id', 'id');
    }
}
