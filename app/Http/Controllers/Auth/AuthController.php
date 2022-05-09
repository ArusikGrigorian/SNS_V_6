<?php

namespace App\Http\Controllers\Auth;

use app\http\controllers\AuthenticationController;
use App\Http\Controllers\Controller;
use App\Http\Requests\SendForgotEmailRequest;
use App\Mail\ForgotPassword;
use App\mail\VerifyUserName;
use App\Models\MenuItem;
use App\Models\User;
use App\Models\VerifyUser;
use Carbon\Carbon;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    /**
     * @return Application|Factory|View
     */
    public function index()
    {
        return view('auth.signin');
    }

    /**
     * @return Application|Factory|View
     */
    public function forgotPassword()
    {
        return view('auth.passwords.email');
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function sendForgotEmail(SendForgotEmailRequest $request)
    {
        $inputData = $request->validated();
        $token = bin2hex(random_bytes(20));

        $email = User::where('email', $inputData['email'])->first();

        if (!$email) {
            return response()->json([
                'success' => false,
                'error' => 'This email address is not registered.'
            ]);
        }

        try {
            Mail::to($inputData['email'])->send(new ForgotPassword('', $token));

            DB::table('password_resets')->insert([
                'email' => $inputData['email'],
                'token' => $token
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Password reset link was sent to your email address.',
            ]);
        } catch (\Exception $exception) {
            Log::emergency($exception->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'Something went wrong, please try again.'
            ]);
        }
    }

    /**
     * @param $token
     * @return Application|Factory|View|JsonResponse
     */
    public function reset($token)
    {
        $resetToken = DB::table('password_resets')->where('token', $token)->first();

        if (!$resetToken) {
            $message = 'Something went wrong, please try again.';
            return view('auth.passwords.email', compact('message'));
        }

        return view('auth.passwords.reset', compact('token'));
    }

    /**
     * @param Request $request
     * @return JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function resetPassword(Request $request)
    {
        $PasswordReset = DB::table('password_resets')->where('token', $request->input('token'))->first();

        if (!$PasswordReset) {
            return response()->json([
                'success' => false,
                'error' => 'Something went wrong, please try again.'
            ]);
        }

        User::where('email', $PasswordReset->email)->update([
            'password' => bcrypt($request->input('password'))
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Your password was successfully reset.'
        ]);
    }

    /**
     * @return Application|Factory|View
     */
    public function register()
    {
        return view('auth.register');
    }

    /**
     * @return Application|Factory|View
     */
    public function verify()
    {
        return view('auth.passwords.email');
    }

    /**
     * @param $token
     * @return Application|Factory|View|JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function verifyUser($token)
    {
        $verifyUser = VerifyUser::whereToken($token)->first();

        if (!$verifyUser) {
            return response()->json(['message' => 'Invalid token']);
        }

        $data = Carbon::now()->diffInMinutes(Carbon::parse(User::where('email', $verifyUser->email)->first()->created_at));

        if ($data >= 30) {
            User::where('email', $verifyUser->email)->delete();
            $verifyUser->delete();
            $message = 'Your time has expired, please register again.';
            return view('auth.signin', compact('message'));
        }

        $user = User::where('email', $verifyUser->email);
        $userId = $user->first()->id;

        $data = [
            ['user_id'=> $userId, 'name' => 'Home', 'url' => 'Home', 'order' => '1', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['user_id'=> $userId, 'name' => 'About Us', 'url' => 'About', 'order' => '2', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['user_id'=> $userId, 'name' => 'Blog', 'url' => 'Blog', 'order' => '3', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['user_id'=> $userId, 'name' => 'Partners', 'url' => 'Partners', 'order' => '4', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['user_id'=> $userId, 'name' => 'Contact Us', 'url' => 'Contact', 'order' => '5', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ];
        MenuItem::insert($data);

        $blogItemId = MenuItem::where(['user_id' => $userId, 'name' => 'Blog'])->first()->id;
        $partnersItemId = MenuItem::where(['user_id' => $userId, 'name' => 'Partners'])->first()->id;

        $data = [
            ['user_id' => $userId, 'name' => 'Client Success', 'url' => 'Client', 'order' => '1', 'parent_id' => $blogItemId, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['user_id' => $userId, 'name' => '5 greatest books', 'url' => 'books', 'order' => '2', 'parent_id' => $blogItemId, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['user_id' => $userId, 'name' => 'Proof', 'url' => 'Proof', 'order' => '1', 'parent_id' => $partnersItemId, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ];
        MenuItem::insert($data);

        $user->update(['status' => '1']);

        $verifyUser->delete();
        return redirect()->route('signin');
    }
}
