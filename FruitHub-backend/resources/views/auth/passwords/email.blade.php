@extends('layouts.app-login')

@section('content')
<div class="container" style="margin: 113px 20px; width: 100%; max-width: 600px; padding: 0px">


	@if (session('status'))
	<center>
		<img src="{{ asset('images/check.png') }}" width="120px" style="margin-bottom: 32px; margin-top: 33px">
		<h2>Email enviado</h2>
		<p style="font-size: 16px; color: #5A615E;">Confira seu email! Te enviamos um link com as instruções para alterar sua senha.</p>
	</center>
	@else
	<h2>Recuperar senha</h2>

	<p class="m-0" style="margin-bottom: 78px;">Digite o email usado para entrar na sua conta FruitHub.</p>

	<form method="POST" action="{{ route('password.email') }}">
		{{ csrf_field() }}
		<div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
			<label for="email" class="control-label">E-mail</label>

			<input id="email" placeholder="Digite seu e-mail de acesso" type="email" class="form-control" name="email" value="{{ old('email') }}" required>

			@if ($errors->has('email'))
			<span class="help-block">{{ $errors->first('email') }}</span>
			@endif
		</div>

		<div class="form-group">
			<button type="submit" class="btn" style="margin-top: 25px">Enviar email</button>
		</div>
	</form>
	@endif


</div>
@endsection