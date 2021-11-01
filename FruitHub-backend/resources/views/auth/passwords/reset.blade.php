@extends('layouts.app-login')

@section('content')
<div class="container" style="margin: 113px 20px; width: 100%; max-width: 600px; padding: 0px">
	<h2>Recuperar senha</h2>

	<p class="m-0" style="margin-bottom: 30px;">Crie sua nova senha.</p>

	<form method="POST" action="{{ route('password.update') }}">
		{{ csrf_field() }}

		<input type="hidden" name="token" value="{{ $token }}">

		<div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
			<label for="email" class="control-label">E-mail</label>

			<input id="email" type="email" class="form-control" style="border-radius: 4px; background: #F5F9F8" name="email" required autofocus>

			@if ($errors->has('email'))
			<span class="help-block">{{ $errors->first('email') }}</span>
			@endif
		</div>

		<div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
			<label for="password" class="control-label">Nova senha</label>

			<input id="password" type="password" class="form-control" style="border-radius: 4px; background: #F5F9F8" name="password" required>

			@if ($errors->has('password'))
			<span class="help-block">{{ $errors->first('password') }}</span>
			@endif
		</div>

		<div class="form-group{{ $errors->has('password_confirmation') ? ' has-error' : '' }}">
			<label for="password-confirm" class="control-label">Confirme senha</label>

			<input id="password-confirm" type="password" class="form-control" name="password_confirmation" style="border-radius: 4px; background: #F5F9F8" required>

			@if ($errors->has('password_confirmation'))
			<span class="help-block">{{ $errors->first('password_confirmation') }}</span>
			@endif
		</div>

		<div class="form-group">
			<button type="submit" class="btn" style="margin-top: 25px">Alterar senha</button>
		</div>
	</form>
</div>
@endsection