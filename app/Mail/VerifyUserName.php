<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VerifyUserName extends Mailable
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
        $this->userName = $userName;
        $this->token = $token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build(): VerifyUserName
    {
        $token = $this->token;
        return $this->view('auth.verify-profile-message', compact('token'));
    }
}
