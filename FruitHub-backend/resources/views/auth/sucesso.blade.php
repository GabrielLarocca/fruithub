@extends('layouts.app-login')

@section('content')
<div class="container">
	<div class="row">
		<div class="col-md-12">
			<center>
				<img src="{{ asset('images/check.png') }}" width="120px" style="margin-bottom: 32px; margin-top: 150px">
				<h2>Senha alterada!</h2>
				<p style="font-size: 16px; color: #5A615E;">Volte no app e faça o seu login com a nova senha.</p>
			</center>
		</div>
	</div>
</div>
@endsection