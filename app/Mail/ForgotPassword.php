<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ForgotPassword extends Mailable
{
    use Queueable, SerializesModels;

    public $userName;
    public $token;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($userName, $token)
    {
        $this->token = $token;
        $this->userName = $userName;
    }

    /**
     * @return ForgotPassword
     */
    public function build(): ForgotPassword
    {
        $token = $this->token;
        return $this->view('auth.passwords.reset-password-message', compact('token'));
    }
}
