@extends('layouts.app')

@section('content')

    <a href="{{ url('reset-password'). '/' . $token }}" target="_blank">reset password</a>

@endsection

