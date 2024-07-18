<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlaceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'address' => $this->address,
            'social_media' => $this->social_media,
            'phone_number' => $this->phone_number,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'category' => $this->whenLoaded('category', function (){
                return [
                    'id' => $this->category->id,
                    'name' => $this->category->name
                ];
            }),
            'photos' => PlacePhotoResource::collection($this->whenLoaded('photo')),
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}
