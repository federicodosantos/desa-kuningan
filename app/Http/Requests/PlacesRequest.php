<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PlacesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:100',
            'latitude' => 'required',
            'longitude' => 'required',
            'description' => 'required|string',
            'address' => 'required|string|max:255',
            'social_media' => 'nullable|string|max:100',
            'phone_number' => 'required|string|max:13',
            'category_id' => 'required',
            'photos' => 'required|array|max:3',
            'photos.*' => 'image|mimes:jpeg,jpg,png|max:2048'
        ];
    }
}
