@extends('layouts.app')
@section('content')
<section class="section menu-section">
    <div class="container fluid-container">
        <div class="menu">
            <aside class="menu-sidebar">
                <div class="menu-sidebar-back-wrpr">
                    <a class="menu-sidebar-back-wrpr-link">
                        <i class="fa fa-arrow-left menu-sidebar-back-wrpr-link-icon"></i>
                        {{ __('Back') }}
                    </a>
                </div>
                <form class="menu-sidebar-add-wrpr">
                    <div class="menu-sidebar-add-wrpr-inpts inpts-nm">
                        <label for="name" class="menu-sidebar-add-wrpr-inpts-lbl">
                            {{ __('*Name') }}
                        </label>
                        <input id="name" type="text" class="menu-sidebar-add-wrpr-inpts-inpt menu-inpt-nm" name="menu_name" autocomplete="name" data-valid="isValid">
                    </div>
                    <div class="menu-sidebar-add-wrpr-inpts inpts-url">
                        <label for="url" class="menu-sidebar-add-wrpr-inpts-lbl">
                            {{ __('URL') }}
                        </label>
                        <input id="url" type="text" class="menu-sidebar-add-wrpr-inpts-inpt menu-inpt-url" name="url" autocomplete="url" data-valid="isValid">
                    </div>
                </form>
                <div class="menu-sidebar-btn-wrpr">
                    <button type="button" class="menu-sidebar-btn-wrpr-sbmt">
                        {{ __('Add') }}
                        <i class="fa fa-chevron-right menu-sidebar-btn-wrpr-sbmt-icon"></i>
                    </button>
                    <button type="button" class="menu-sidebar-btn-wrpr-sbmt-save">
                        {{ __('Save') }}
                    </button>
                </div>
            </aside>
            <div class="menu-content">
                @foreach($menuParentItems as $data)
                <div class="menu-content-item">
                    <div id="{{ $data['id'] }}" class="menu-content-item-parent draggable" draggable="true">
                        <div class="menu-content-item-bars">
                            <i class="fa fa-bars"></i>
                        </div>
                        <div class="menu-content-item-edit-txt">
                            {{ $data['name'] }}
                        </div>
                        <div class="menu-content-item-edit" data-menu_name="{{ $data['name'] }}" data-url="{{ $data['url'] }}" data-id="{{ $data['id'] }}">
                            <i class="fa fa-edit"></i>
                        </div>
                        @if(!array_key_exists('child', $data))
                        <div class="menu-content-item-remove" data-id="{{ $data['id'] }}">
                            <i class="fa fa-close"></i>
                        </div>
                        @endif
                    </div>
                    @if(array_key_exists('child', $data))
                    @foreach($data['child'] as $children)
                    <div id="{{ $children['id'] }}" class="menu-content-item-child draggable" draggable="true">
                        <div class="menu-content-item-bars">
                            <i class="fa fa-bars"></i>
                        </div>
                        <div class="menu-content-item-edit-txt">
                            {{$children['name']}}
                        </div>
                        <div class="menu-content-item-edit" data-menu_name="{{ $children['name'] }}" data-url="{{ $children['url'] }}" data-id="{{ $children['id'] }}">
                            <i class="fa fa-edit"></i>
                        </div>
                        <div class="menu-content-item-remove" data-id="{{ $children['id'] }}">
                            <i class="fa fa-close"></i>
                        </div>
                    </div>
                    @endforeach
                    @endif
                </div>
                @endforeach
            </div>
        </div>
    </div>
</section>
<script type="module" src="{{asset('scripts/services/menuEdit.js')}}"></script>
<script tytype="module" src="{{asset('scripts/utils/helpers/dragDrop.js')}}"></script>
@endsection
