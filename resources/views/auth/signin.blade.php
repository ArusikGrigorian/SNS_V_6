@extends('layouts.app')
@section('content')

@if(isset($message))
<p class="text-danger">{{ $message }}</p>
@endif

<section class="section signIn-section">
    <div class="container">
        <div class="signIn">
            <div class="signIn-content">
                <div class="signIn-content-title">
                    <h1 class="signIn-content-title-txt">
                        {{ __('Sign In') }}
                    </h1>
                </div>
                <form class="signIn-content-form" novalidate>
                    <div class="signIn-content-form-inpt-wrpr">
                        <div class="signIn-content-form-wrpr e-wrpr">
                            <label for="email" class="signIn-content-form-wrpr-lbl">
                                {{ __('Email Address') }}
                            </label>
                            <input id="email" type="email" class="signIn-content-form-wrpr-inpt signIn-inpt-email" name="email" autocomplete="email">
                        </div>
                        <div class="signIn-content-form-wrpr p-wrpr">
                            <label for="password" class="signIn-content-form-wrpr-lbl">
                                {{ __('Password') }}
                            </label>
                            <input id="password" type="password" class="signIn-content-form-wrpr-inpt signIn-inpt-pass" name="password" autocomplete="current-password">
                        </div>
                    </div>
                    <div class="signIn-content-form-frgt">
                        <a class="signIn-content-form-frgt-link" href="{{ route('forgot.password') }}">
                            Forgot Password?
                        </a>
                        <button type="button" class="signIn-content-form-frgt-sbmt">
                            {{ __('Sign In') }}
                        </button>
                        <a class="signIn-content-form-frgt-signUp" href="{{ route('register') }}">
                            {{ __('sign up') }}
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
<script type="module" src="{{asset('scripts/services/signIn.js')}}"></script>
@endsection
