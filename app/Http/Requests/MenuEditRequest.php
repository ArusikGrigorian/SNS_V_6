<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MenuEditRequest extends FormRequest
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
     * @return string[]
     */
    public function rules()
    {



        return [
            'menu_name' => 'required|string|between:3,100',
            'url' => '',
            'id' => 'required|exists:menu_items,id'
        ];
    }
}
