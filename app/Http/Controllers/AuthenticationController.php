<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterUserRequest;
use App\Http\Requests\SignInRequest;
use App\Mail\VerifyUserName;
use Exception;
use App\Models\User;
use App\Models\VerifyUser;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class AuthenticationController extends Controller
{

    /**
     * @param RegisterUserRequest $request
     * @return \Illuminate\Http\JsonResponse
     * @throws Exception
     */
    public function signUp(RegisterUserRequest $request): \Illuminate\Http\JsonResponse
    {

        $validateUser = $request->validated();
        User::create([
            'name' => $validateUser['name'],
            'last_name' => $validateUser['last_name'],
            'password' => bcrypt($validateUser['password']),
            'email' => $validateUser['email']
        ]);

        $token = bin2hex(random_bytes(20));
        VerifyUser::create([
            'email' => $validateUser['email'],
            'token' => $token
        ]);

        try {
            Mail::to($validateUser['email'])->send(new VerifyUserName('', $token));

            return response()->json([
                'success' => true,
                'message' => 'Email verification link was sent to your email address',
            ]);
        } catch (Exception $exception) {
            Log::emergency($exception->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'Something went wrong, please register again'
            ]);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * use this method to signIn users
     */
    public function signIn(SignInRequest $request): \Illuminate\Http\JsonResponse
    {
        $validateUser = $request->validated();

        if (!Auth::attempt($validateUser)) {
            return response()->json([
                'success' => false,
                'error' => 'Not valid credentials'
            ]);
        }

        return response()->json([
            'success' => true,
            'token' => auth()->user()->createToken('API Token')->plainTextToken
        ]);
    }

    /**
     * @return RedirectResponse
     *
     * this method signs out users by removing tokens
     */
    public function signOut(): \Illuminate\Http\JsonResponse
    {
        Auth::guard('web')->logout();

        return response()->json([
            'success' => true,
            'message' => 'Token is removed'
        ]);
    }
}
