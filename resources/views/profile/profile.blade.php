@extends('layouts.app')
@section('content')
@include('layouts.header')
<section class="section profile-section">
    <div class="container">
        <div class="profile">
            <div class="profile-content">
                <div class="profile-img-wrpr">
                    <div class="profile-img-wrpr-pic-wrpr">
                        <img src="{{auth()->user()->image_url ?? asset('media/images/common/DefaultAvatar.svg') }}" id="editProfAvatar">
                    </div>
                </div>

                <!-- User bio -->
                <div class="profile-bio-wrpr">
                    <div class="profile-bio-wrpr-item">
                        <div class="profile-bio-wrpr-item-lbl">
                            {{ __('First Name') }}
                        </div>
                        <div class="profile-bio-wrpr-item-txt">
                            {{ Auth::user()->name }}
                        </div>
                    </div>
                    <div class="profile-bio-wrpr-item">
                        <div class="profile-bio-wrpr-item-lbl">
                            {{ __('Last Name') }}
                        </div>
                        <div class="profile-bio-wrpr-item-txt">
                            {{ Auth::user()->last_name }}
                        </div>
                    </div>
                    <div class="profile-bio-wrpr-item">
                        <div class="profile-bio-wrpr-item-lbl">
                            {{ __('Email') }}
                        </div>
                        <div class="profile-bio-wrpr-item-txt">
                            {{ Auth::user()->email }}
                        </div>
                    </div>
                    <div class="profile-bio-wrpr-item">
                        <label for="phone" class="profile-bio-wrpr-item-lbl">
                            {{ __('Phone') }}
                        </label>
                        <div type="number" id="phone" class="profile-bio-wrpr-item-txt">{{ Auth::user()->phone_number }}</div>
                    </div>
                </div>

                <div class="profile-btns-wrpr">
                    <button type="button" class="profile-btns-wrpr-sbmt">
                        {{ __('Edit') }}
                    </button>
                    <button type="button" class="profile-btns-wrpr-link sign-out-btn">
                        log out
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>
<script type="module" src="{{asset('scripts/services/profile.js')}}"></script>
<script type="module" src="{{asset('scripts/common/header.js')}}"></script>
@endsection
