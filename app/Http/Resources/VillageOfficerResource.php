<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VillageOfficerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id ?? null,
            'name' => $this->name ?? 'Unknown', // Default value if name is null
            'photo_path' => $this->photo_path ? asset('storage/' . $this->photo_path) : null,
            'position' => $this->whenLoaded('position', function () {
                return [
                    'id' => optional($this->position)->id ?? null,
                    'name' => optional($this->position)->name ?? null,
                ];
            }),
            'created_at' => $this->created_at ? $this->created_at->toDateTimeString() : null,
            'updated_at' => $this->updated_at ? $this->updated_at->toDateTimeString() : null,
        ];
    }
}
