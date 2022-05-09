@extends('layouts.app')
@section('content')

<section class="section frgtPass-section">
    <div class="container">
        <div class="frgtPass">
            <div class="frgtPass-content">
                <div class="frgtPass-content-title">
                    <h1 class="frgtPass-content-title-txt">
                        {{ __('FORGOT PASSWORD') }}
                    </h1>
                </div>
                <form class="frgtPass-content-form" novalidate>
                    <div class="frgtPass-content-form-inpt-wrpr">
                        <div class="frgtPass-content-form-wrpr e-wrpr">
                            <label for="email" class="frgtPass-content-form-wrpr-lbl">
                                {{ __('Email Address') }}
                            </label>
                            <input id="email" type="email" class="frgtPass-content-form-wrpr-inpt frgtPass-inpt-email" name="email" autocomplete="email">
                        </div>
                    </div>
                    <div class="frgtPass-content-form-wrpr-btns">
                        <button type="button" class="frgtPass-content-form-wrpr-btns-sbmt">
                            {{ __('Send') }}
                        </button>
                        <a class="frgtPass-content-form-wrpr-btns-link" href="{{ route('signin') }}">
                            {{ __('sign in') }}
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
<script type="module" src="{{asset('scripts/services/forgotPassword.js')}}"></script>
@endsection
