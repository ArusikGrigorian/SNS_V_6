@extends('layouts.app')
@section('content')
@include('layouts.header')
<section class="section editProfile-section">
    <div class="container editProfile-container">
        <div class="editProfile">
            <div class="editProfile-content">
                <!-- Photo Modal -->
                <div class="editProfile-modal">
                    <div class="editProfile-modal-header">
                        <h4 class="editProfile-modal-header-title">Crop image</h4>
                        <div class="editProfile-modal-header-photoWrpr">
                            <button type="button" class="editProfile-modal-header-closeBtn">
                                X
                            </button>
                        </div>
                    </div>
                    <div class="editProfile-modal-body">
                        <div class="editProfile-modal-body-imgWrpr">
                            <div class="editProfile-modal-body-imgWrpr-imgFile">
                                <img src="" id="uploadedImg" class="editProfile-modal-body-imgWrpr-image" />
                            </div>
                            <div class="editProfile-modal-body-imgWrpr-preview"></div>
                        </div>
                    </div>
                    <div class="editProfile-modal-footer">
                        <button type="button" class="editProfile-modal-footer-btnCancel">Cancel</button>
                        <button type="button" class="editProfile-modal-footer-btnCrop">Crop</button>
                    </div>
                </div>
                <form class="editProfile-content-form" novalidate>
                    <!-- User photo -->
                    <div class="editProfile-img-wrpr">
                        <div class="editProfile-img-wrpr-pic-wrpr">
                            <img src="{{ auth()->user()->image_url ?? asset('media/images/common/DefaultAvatar.svg')}}" id="editProfAvatar">
                            <input type="file" id="inputImg" style="display:none" accept="image/*">
                        </div>
                        <div class="editProfile-img-wrpr-camera-wrpr">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="23" viewBox="0 0 25 23" fill="none">
                                <path d="M21.501 9.81043C21.2026 9.81043 20.9165 9.92896 20.7055 10.1399C20.4945 10.3509 20.376 10.6371 20.376 10.9354V18.8104C20.376 19.1088 20.2575 19.3949 20.0465 19.6059C19.8355 19.8169 19.5493 19.9354 19.251 19.9354H3.50098C3.20261 19.9354 2.91646 19.8169 2.70548 19.6059C2.4945 19.3949 2.37598 19.1088 2.37598 18.8104V9.81043C2.37598 9.51206 2.4945 9.22592 2.70548 9.01494C2.91646 8.80396 3.20261 8.68543 3.50098 8.68543H5.75098C5.9963 8.69824 6.23907 8.63039 6.44222 8.49225C6.64536 8.35412 6.7977 8.15328 6.87598 7.92043L7.48348 6.07543C7.55895 5.85198 7.70274 5.65791 7.89452 5.52063C8.0863 5.38335 8.31638 5.30982 8.55223 5.31043H14.751C15.0493 5.31043 15.3355 5.19191 15.5465 4.98093C15.7574 4.76995 15.876 4.4838 15.876 4.18543C15.876 3.88706 15.7574 3.60092 15.5465 3.38994C15.3355 3.17896 15.0493 3.06043 14.751 3.06043H8.49598C7.78897 3.06175 7.10023 3.28508 6.52696 3.69888C5.9537 4.11268 5.52486 4.69606 5.30098 5.36668L4.94098 6.49168H3.50098C2.60587 6.49168 1.74743 6.84726 1.11449 7.4802C0.481556 8.11313 0.125977 8.97158 0.125977 9.86668V18.8667C0.125977 19.7618 0.481556 20.6202 1.11449 21.2532C1.74743 21.8861 2.60587 22.2417 3.50098 22.2417H19.251C20.1461 22.2417 21.0045 21.8861 21.6375 21.2532C22.2704 20.6202 22.626 19.7618 22.626 18.8667V10.9917C22.6336 10.8393 22.6102 10.6869 22.557 10.5439C22.5039 10.4008 22.4223 10.2701 22.317 10.1596C22.2118 10.0491 22.0852 9.96114 21.9449 9.90112C21.8046 9.84109 21.6536 9.81024 21.501 9.81043V9.81043ZM11.376 8.68543C10.486 8.68543 9.61593 8.94935 8.87591 9.44382C8.13589 9.93828 7.55911 10.6411 7.21852 11.4634C6.87792 12.2856 6.78881 13.1904 6.96244 14.0633C7.13608 14.9363 7.56466 15.7381 8.194 16.3674C8.82333 16.9967 9.62516 17.4253 10.4981 17.599C11.371 17.7726 12.2758 17.6835 13.0981 17.3429C13.9203 17.0023 14.6231 16.4255 15.1176 15.6855C15.6121 14.9455 15.876 14.0754 15.876 13.1854C15.876 11.992 15.4019 10.8474 14.558 10.0035C13.714 9.15954 12.5695 8.68543 11.376 8.68543V8.68543ZM11.376 15.4354C10.931 15.4354 10.496 15.3035 10.1259 15.0562C9.75593 14.809 9.46754 14.4576 9.29725 14.0465C9.12695 13.6353 9.08239 13.1829 9.16921 12.7465C9.25603 12.31 9.47032 11.9091 9.78499 11.5944C10.0997 11.2798 10.5006 11.0655 10.937 10.9787C11.3735 10.8918 11.8259 10.9364 12.237 11.1067C12.6481 11.277 12.9995 11.5654 13.2468 11.9354C13.494 12.3054 13.626 12.7404 13.626 13.1854C13.626 13.7822 13.3889 14.3545 12.967 14.7764C12.545 15.1984 11.9727 15.4354 11.376 15.4354ZM23.751 3.06043H22.626V1.93543C22.626 1.63706 22.5075 1.35092 22.2965 1.13994C22.0855 0.928959 21.7993 0.810432 21.501 0.810432C21.2026 0.810432 20.9165 0.928959 20.7055 1.13994C20.4945 1.35092 20.376 1.63706 20.376 1.93543V3.06043H19.251C18.9526 3.06043 18.6665 3.17896 18.4555 3.38994C18.2445 3.60092 18.126 3.88706 18.126 4.18543C18.126 4.4838 18.2445 4.76995 18.4555 4.98093C18.6665 5.19191 18.9526 5.31043 19.251 5.31043H20.376V6.43543C20.376 6.7338 20.4945 7.01995 20.7055 7.23093C20.9165 7.44191 21.2026 7.56043 21.501 7.56043C21.7993 7.56043 22.0855 7.44191 22.2965 7.23093C22.5075 7.01995 22.626 6.7338 22.626 6.43543V5.31043H23.751C24.0493 5.31043 24.3355 5.19191 24.5465 4.98093C24.7575 4.76995 24.876 4.4838 24.876 4.18543C24.876 3.88706 24.7575 3.60092 24.5465 3.38994C24.3355 3.17896 24.0493 3.06043 23.751 3.06043Z" fill="#B14EE0" />
                            </svg>
                        </div>
                    </div>

                    <!-- User bio -->
                    <div class="editProfile-bio-wrpr">
                        <div class="editProfile-bio-wrpr-item">
                            <label for="name" class="editProfile-bio-wrpr-item-lbl">
                                {{ __('First Name') }}
                            </label>
                            <input type="text" id="name" class="editProfile-bio-wrpr-item-txt editProfile-bio-name" data-valid="isValid" value="{{ Auth::user()->name }}" name="name"></input>
                        </div>
                        <div class="editProfile-bio-wrpr-item">
                            <label for="last_name" class="editProfile-bio-wrpr-item-lbl">
                                {{ __('Last Name') }}
                            </label>
                            <input type="text" id="last_name" class="editProfile-bio-wrpr-item-txt editProfile-bio-last_name" data-valid="isValid" value="{{ Auth::user()->last_name }}" name="last_name"></input>
                        </div>
                        <div class="editProfile-bio-wrpr-item">
                            <label for="email" class="editProfile-bio-wrpr-item-lbl">
                                {{ __('Email') }}
                            </label>
                            <input type="email" id="email" class="editProfile-bio-wrpr-item-txt editProfile-bio-email" data-valid="isValid" value="{{ Auth::user()->email }}" name="email"></input>
                        </div>
                        <div class="editProfile-bio-wrpr-item">
                            <label for="phone" class="editProfile-bio-wrpr-item-lbl">
                                {{ __('Phone') }}
                            </label>
                            <input type="text" id="phone" class="editProfile-bio-wrpr-item-txt editProfile-bio-phone" data-valid="isValid" value="{{ Auth::user()->phone_number }}" name="phone_number"></input>
                        </div>
                    </div>
                    <!-- Submit/cancel buttons -->
                    <div class="editProfile-sbmts">
                        <div class="editProfile-sbmts-btns-wrpr">
                            <button type="button" class="editProfile-sbmts-btns-wrpr-sbmt-cancel">
                                {{ __('Cancel') }}
                            </button>
                            <button type="button" class="editProfile-sbmts-btns-wrpr-sbmt-save">
                                {{__('Save')}}
                            </button>
                        </div>
                    </div>
                </form>
                <button type="button" class="editProfile-sbmts-link sign-out-btn">
                    log out
                </button>
            </div>
        </div>
    </div>
</section>
<script type="module" src="{{asset('scripts/services/profileEdit.js')}}"></script>
<script type="module" src="{{asset('scripts/common/header.js')}}"></script>
<script type="module" src="{{asset('scripts/utils/cropperjs/cropper.min.js')}}"></script>

@endsection
