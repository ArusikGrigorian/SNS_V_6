<header class="header">
    <div class="container header-container">
        <nav class="header-nav-wrpr">
            <ul class="header-nav-wrpr-list">
                @foreach($menuParentItems as $data)
                <li id="{{ $data['id'] }}" class="header-nav-wrpr-list-item">
                    <a href="{{ $data['url'] }}" class="header-nav-wrpr-list-item-link">
                        {{ $data['name'] }}
                    </a>
                    @if(array_key_exists('child', $data))
                    <i class="fa fa-angle-down"></i>
                    @endif
                    @if(array_key_exists('child', $data))
                    <div class="header-nav-wrpr-list-item-option closed">
                        <div class="header-nav-wrpr-list-item-option-wrpr">
                            @foreach($data['child'] as $children)
                            <a href="{{ $children['url'] }}" class="header-nav-wrpr-list-item-option-wrpr-link">
                                {{$children['name']}}
                            </a>
                            @endforeach
                        </div>
                    </div>
                    @endif
                </li>
                @endforeach
            </ul>
            <div class="header-nav-wrpr-icons">
                <ul class="header-nav-wrpr-icons-brgr">
                    <li class="header-nav-wrpr-icons-brgr-item"></li>
                    <li class="header-nav-wrpr-icons-brgr-item"></li>
                    <li class="header-nav-wrpr-icons-brgr-item"></li>
                </ul>
                <ul class="header-nav-wrpr-icons-brgr-extended">
                    <li class="header-nav-wrpr-icons-brgr-extended-item"></li>
                    <li class="header-nav-wrpr-icons-brgr-extended-item"></li>
                    <li class="header-nav-wrpr-icons-brgr-extended-item"></li>
                </ul>
                <div class="header-nav-wrpr-icons-btn">
                    <button type="button" class="header-nav-wrpr-icons-btn-edit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M16 2C16.2626 1.73735 16.5744 1.52901 16.9176 1.38687C17.2608 1.24473 17.6286 1.17157 18 1.17157C18.3714 1.17157 18.7392 1.24473 19.0824 1.38687C19.4256 1.52901 19.7374 1.73735 20 2C20.2626 2.26264 20.471 2.57444 20.6131 2.9176C20.7553 3.26077 20.8284 3.62856 20.8284 4C20.8284 4.37143 20.7553 4.73923 20.6131 5.08239C20.471 5.42555 20.2626 5.73735 20 6L6.5 19.5L1 21L2.5 15.5L16 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    </div>
</header>
