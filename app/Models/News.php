<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class News extends Model
{
    use HasFactory;

    protected $table = 'news';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;
    public $timestamps = true;

    protected $fillable = [
        'id','title',
        'content', 'photo_path',
        'user_id', 'slug'
    ];

    public function User():BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
