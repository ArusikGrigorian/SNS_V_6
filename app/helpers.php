<?php

use App\Models\MenuItem;
use Illuminate\Support\Facades\Auth;


function menuItems ()
{
    $menuItems = MenuItem::where('user_id',  Auth::id())->get()->toArray();
    $menuParentItems = [];
    foreach ($menuItems as &$item) {

        if(!$item['parent_id']) {
            foreach ($menuItems as $child) {
                if ($child['parent_id'] == $item['id']) {
                    $item['child'][] = $child;
                }
            }
            $menuParentItems[] = $item;
        }
    }
    return $menuParentItems;
}
