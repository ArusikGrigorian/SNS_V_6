<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ProfileRequest extends FormRequest
{

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|between:3,100',
            'last_name' => 'required|string|between:3,100',
            'email' => 'required|max:200|email|unique:users,email,' . auth()->id(),
            'phone_number' => '',
            'image_url' => 'mimes:jpeg,png,jpg|max:2048'
        ];
    }

    /**
     * @param Validator $validator
     * @return void
     * @throws HttpResponseException
     */
    protected function failedValidation(Validator $validator)
    {
        $errors = $validator->errors()->toArray();
        $firstError = array_shift($errors);

        throw new HttpResponseException(response()->json([
            'status' => false,
            'message' => array_shift($firstError)
        ]));
    }
}
