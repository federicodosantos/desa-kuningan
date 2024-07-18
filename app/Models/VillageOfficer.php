<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VillageOfficer extends Model
{
    use HasFactory;

    protected $table = 'village_officers';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'name', 'photo_path',
        'position_id'
    ];

    public function Position(): BelongsTo
    {
        return $this->belongsTo(Position::class, 'position_id', 'id');
    }
}
