@extends('layouts.app')
@section('content')

<section class="section signUp-section">
    <div class="container">
        <div class="signUp">
            <div class="signUp-content">
                <div class="signUp-content-title">
                    <h1 class="signUp-content-title-txt">
                        {{ __('Register') }}
                    </h1>
                </div>
                <form class="signUp-content-form" novalidate>
                    <div class="signUp-content-form-inpt-wrpr">
                        <div class="signUp-content-form-wrpr n-wrpr">
                            <label for="name" class="signUp-content-form-wrpr-lbl">
                                {{ __('First Name') }}
                            </label>
                            <input id="name" type="text" class="signUp-content-form-wrpr-inpt signUp-inpt-name" name="name" autocomplete="name">
                        </div>
                        <div class="signUp-content-form-wrpr ln-wrpr">
                            <label for="last-name" class="signUp-content-form-wrpr-lbl">
                                {{ __('Last Name') }}
                            </label>
                            <input id="last-name" type="text" class="signUp-content-form-wrpr-inpt signUp-inpt-lname" name="last_name" autocomplete="last-name">
                        </div>
                        <div class="signUp-content-form-wrpr e-wrpr">
                            <label for="email" class="signUp-content-form-wrpr-lbl">
                                {{ __('Email Address') }}
                            </label>
                            <input id="email" type="email" class="signUp-content-form-wrpr-inpt signUp-inpt-email" name="email" value="{{ old('email') }}" autocomplete="email">
                        </div>
                        <div class="signUp-content-form-wrpr p-wrpr">
                            <label for="password" class="signUp-content-form-wrpr-lbl">
                                {{ __('Password') }}
                            </label>
                            <input id="password" type="password" class="signUp-content-form-wrpr-inpt signUp-inpt-pass" name="password" autocomplete="new-password">
                            <i class="signUp-content-form-wrpr-eye"></i>
                        </div>
                        <div class="signUp-content-form-wrpr cp-wrpr">
                            <label for="pass-confirm" class="signUp-content-form-wrpr-lbl">
                                {{ __('Confirm Password') }}
                            </label>
                            <input id="pass-confirm" type="password" class="signUp-content-form-wrpr-inpt signUp-inpt-cpass" name="password_confirmation" autocomplete="new-password">
                            <i class="signUp-content-form-wrpr-eye"></i>
                        </div>
                    </div>
                    <div class="signUp-content-form-wrpr-btns">
                        <button type="button" class="signUp-content-form-wrpr-btns-sbmt">
                            {{ __('Sign Up') }}
                        </button>
                        <a class="signUp-content-form-wrpr-btns-link" href="{{ route('signin') }}">
                            {{ __('sign in') }}
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
<script type="module" src="{{asset('scripts/services/signUp.js')}}"></script>
@endsection
