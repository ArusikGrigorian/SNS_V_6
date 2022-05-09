<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticationController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


//register new user
Route::post('/sign-up', [AuthenticationController::class, 'signUp']);
//reset-password
Route::post('/forgot-password', [App\Http\Controllers\Auth\AuthController::class, 'sendForgotEmail'])->name('forgot.password');
Route::post('/reset-password/{token?}', [App\Http\Controllers\Auth\AuthController::class, 'resetPassword'])->name('reset.new.password');
//login user
Route::post('/sign-in', [AuthenticationController::class, 'signIn']);
//using middleware
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/profile-edit', [ProfileController::class, 'editProfile'])->name('edit.profile');
    Route::post('/sign-out', [AuthenticationController::class, 'signOut']);
    Route::post('/add-menu', [App\Http\Controllers\MenuItemController::class, 'addMenuItems'])->name('add.menu');
    Route::post('/delete-menu', [\App\Http\Controllers\MenuItemController::class, 'deleteMenu'])->name('delete.menu');
    Route::post('/edit-menu', [\App\Http\Controllers\MenuItemController::class, 'editMenuItem'])->name('edit.menu');
    Route::post('/change-menu', [\App\Http\Controllers\MenuItemController::class, 'changeMenuPosition'])->name('change.menu');
});
