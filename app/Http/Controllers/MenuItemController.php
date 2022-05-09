<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangeMenuPositionRequest;
use App\Http\Requests\MenuEditRequest;
use App\Http\Requests\MenuItemEditRequest;
use App\Models\MenuItem;
use http\Env\Response;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use phpDocumentor\Reflection\Types\This;

class MenuItemController extends Controller
{

    /**
     * @return Application|Factory|View
     */
    public function index()
    {
        $menuParentItems = menuItems();
        return view('menu.header-menus', compact('menuParentItems'));
    }

    /**
     * @param MenuItemEditRequest $request
     * @return JsonResponse
     */
    public function addMenuItems(MenuItemEditRequest $request): JsonResponse
    {
        $menu = $request->validated();
        $newMenuItems = MenuItem::create([
            'user_id' => Auth::id(),
            'name' => $menu['menu_name'],
            'url' => $menu['url'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Menu item was added successfully.',
            'new_menu' => $newMenuItems,
        ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function deleteMenu(Request $request): JsonResponse
    {
        $menuId = $request->get('id');
        MenuItem::where('user_id', Auth::id())->where('id', $menuId)->orWhere('parent_id', $menuId)->delete();
        return response()->json([
            'success' => true,
            'message' => 'Menu item was deleted successfully.'
        ]);
    }

    /**
     * @param MenuEditRequest $request
     * @return JsonResponse
     */
    public function editMenuItem(MenuEditRequest $request)
    {
        $inputData = $request->validated();
        $menuName = $inputData['menu_name'];
        $menuUrl = $inputData['url'];
        $menuId = $inputData['id'];

        MenuItem::where('user_id', Auth::id())->where('id', $menuId)->update([
            'name' => $menuName,
            'url' => $menuUrl
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Menu item was edited successfully.'
        ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse|void
     */
    public function changeMenuPosition(Request $request)
    {
        $id = $request->input('id');
        $parentId = $request->input('parent_id');

        if (!$id || !is_numeric($id)) {
            return response()->json([
                'message' => 'Id not integer'
            ]);
        }

        if (!$parentId || !is_numeric($parentId)) {
            return response()->json([
                'message' => 'Parent id not integer'
            ]);
        }

        MenuItem::where('id',  $id)->update([
            'parent_id' => $parentId
        ]);
        $data = $request->input('order');

        if (!$data) {
            return response()->json(['message' => 'Order is empty']);
        }

        foreach ($data as $key => $value) {
            MenuItem::where('id', $key)->update([
                'order' => $value
            ]);
        }

        return response()->json([
            'success' => true,
            'message'  => 'Menu position is updated'
        ]);
    }
}
