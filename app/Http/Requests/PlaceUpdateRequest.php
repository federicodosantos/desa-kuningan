<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PlaceUpdateRequest extends FormRequest
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
            'name' => 'sometimes|required|string|max:100',
            'description' => 'sometimes|required|string',
            'address' => 'sometimes|required|string|max:255',
            'social_media' => 'nullable|string|max:100',
            'phone_number' => 'sometimes|required|string|max:13',
            'category_id' => 'sometimes|required',
            'photos' => 'nullable|array|max:3',
            'photos.*' => 'image|mimes:jpeg,jpg,png|max:2048'
        ];
    }
}
