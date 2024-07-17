<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
        'category_id', 'photo_path'
    ];

    public function Category():BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
}
