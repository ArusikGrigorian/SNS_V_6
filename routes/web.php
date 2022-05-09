<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', [App\Http\Controllers\Auth\AuthController::class, 'index']);
Route::get('/sign-in', [App\Http\Controllers\Auth\AuthController::class, 'index'])->name('signin');
Route::get('/register', [App\Http\Controllers\Auth\AuthController::class, 'register'])->name('register');
Route::get('/verify', [App\Http\Controllers\Auth\AuthController::class, 'verify'])->name('verify');
Route::get('/verify-user/{token}', [App\Http\Controllers\Auth\AuthController::class, 'verifyUser'])->name('token.for.verify');
Route::get('/forgot-password', [App\Http\Controllers\Auth\AuthController::class, 'forgotPassword'])->name('forgot.password');
Route::get('/reset-password/{token}', [App\Http\Controllers\Auth\AuthController::class, 'reset'])->name('reset.password');

//Routes for profile
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', [App\Http\Controllers\ProfileController::class, 'index'])->name('profile');
    Route::get('/profile-edit', [App\Http\Controllers\ProfileController::class, 'showEditPage'])->name('show.edit.profile');
    Route::get('/verify-email/{token}', [App\Http\Controllers\ProfileController::class, 'verifyEmail'])->name('token.for.verify.email');
    Route::get('/show-menu', [App\Http\Controllers\MenuItemController::class, 'index'])->name('show.menu');
});
