@extends('layouts.app')
@section('content')

@if(isset($message))
<p class="text-danger">{{ $message }}</p>
@endif

<section class="section crtPass-section">
    <div class="container">
        <div class="crtPass">
            <div class="crtPass-content">
                <div class="crtPass-content-title">
                    <h1 class="crtPass-content-title-txt">
                        {{ __('CREATE NEW PASSWORD') }}
                    </h1>
                </div>
                <form class="crtPass-content-form" novalidate>
                    <input type="hidden" name="token" class="reset-token" value="{{ $token }}">
                    <div class="crtPass-content-form-inpt-wrpr">
                        <div class="crtPass-content-form-wrpr np-wrpr">
                            <label for="password" class="crtPass-content-form-wrpr-lbl">
                                {{ __('New Password') }}
                            </label>
                            <input id="password" type="password" class="crtPass-content-form-wrpr-inpt crtPass-inpt-npass" name="password" autocomplete="new-password">
                        </div>
                        <div class="crtPass-content-form-wrpr cp-wrpr">
                            <label for="password-confirm" class="crtPass-content-form-wrpr-lbl">
                                {{ __('Confirm Password') }}
                            </label>
                            <input id="password-confirm" type="password" class="crtPass-content-form-wrpr-inpt crtPass-inpt-cnpass" name="password_confirmation" autocomplete="new-password">
                        </div>
                    </div>
                    <div class="crtPass-content-form-wrpr-btns">
                        <button type="button" class="crtPass-content-form-wrpr-btns-sbmt">
                            {{ __('Save') }}
                        </button>
                        <a class="crtPass-content-form-wrpr-btns-link" href="{{ route('signin') }}">
                            {{ __('sign in') }}
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
<script type="module" src="{{asset('scripts/services/resetPassword.js')}}"></script>
@endsection
