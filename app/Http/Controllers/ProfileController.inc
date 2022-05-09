<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileRequest;
use App\Models\User;
use App\Models\VerifyUser;
use App\Mail\VerifiUserEmail;
use Exception;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Models\MenuItem;

class ProfileController
{
    /**
     * @return Application|Factory|View
     */
    public function index()
    {
        $menuParentItems = menuItems();
        return view('profile.profile', compact('menuParentItems'));
    }

    /**
     * @return Application|Factory|View
     */
    public function showEditPage()
    {
        $menuParentItems = menuItems();
        return view('profile.profile-edit', compact('menuParentItems'));
    }
    /**
     * @param ProfileRequest $request
     * @return JsonResponse
     * @throws Exception
     */
    public function editProfile(ProfileRequest $request): JsonResponse
    {
        $inputData = $request->validated();
        $file = $request->file('image_url');

        if (isset($file)) {
            $directory = public_path('storage/uploads/profile/');
            File::isDirectory($directory) or File::makeDirectory($directory, 0777, true, true);
            $imageUrl = $inputData['image_url']->move($directory, $inputData['image_url']->getClientOriginalName());
            $savedImageUrl = 'storage/uploads/profile/' . $file->getClientOriginalName();

            User::where('id', auth()->user()->id)->update([
                'image_url' => $savedImageUrl
            ]);
        }

        User::where('id', auth()->user()->id)->update([
            'name' => $inputData['name'],
            'last_name' => $inputData['last_name'],
            'phone_number' => $inputData['phone_number'],
        ]);
        $email = User::where('email', $inputData['email'])->first();
        if (!$email) {
            $token =
                bin2hex(random_bytes(20));
            VerifyUser::create([
                'email' => $inputData['email'], 'token' => $token
            ]);
            try {
                Mail::to($inputData['email'])->send(new VerifiUserEmail('', $token));
                return
                    response()->json(['success' => true, 'message' => 'Email verification link was sent to your email
address',]);
            } catch (Exception $exception) {
                Log::emergency($exception->getMessage());
                return
                    response()->json(['success' => false, 'error' => 'Something went wrong, please register again']);
            }
        } else {
            return response()->json([
                'success' => true, 'message' => 'Profile edited successfully'
            ]);
        }
    }
    /** * @param $token * @return JsonResponse|RedirectResponse */ public function
    verifyEmail($token)
    {
        $verifyUser = VerifyUser::whereToken($token)->first();
        if (!$verifyUser) {
            return response()->json(['message' => 'Invalid token']);
        }
        User::where(
            'id',
            auth()->user()->id
        )->update(['email' => $verifyUser['email']]);
        VerifyUser::where(
            'email',
            $verifyUser->email
        )->delete('email');
        return redirect()->route('profile');
    }
}
