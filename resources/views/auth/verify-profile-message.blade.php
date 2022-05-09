@extends('layouts.app')
@section('content')
    <div>{{ __('Verify Your Email Address') }}</div>
    <a href="{{ url('verify-user') . '/' . $token }}" target="_blank">verify email</a>
@endsection


