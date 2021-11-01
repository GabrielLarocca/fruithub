<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
	<link rel="shortcut icon" href="{{{ asset('images/favicon.png') }}}">

	<title>FruitHub</title>

	<link rel="stylesheet" type="text/css" href="{{ asset('vendors/sweetalert2/sweetalert2.min.css') }}" />
	<link rel="stylesheet" href="{{ asset('vendors/bootstrap/dist/css/bootstrap.min.css') }}">
	<link rel="stylesheet" href="{{ asset('vendors/font-awesome/css/font-awesome.min.css') }}">

	<script type="text/javascript" src="{{ asset('vendors/jquery/dist/jquery.min.js') }}"></script>
	<script type="text/javascript" src="{{ asset('vendors/sweetalert2/sweetalert2.min.js') }}"></script>
	<script src="{{ asset('vendors/bootstrap/dist/js/bootstrap.min.js') }}"></script>

	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">

	<style>
		h2 {
			margin-bottom: 8px;
			font-size: 24px;
			font-weight: 600;
			line-height: 30px;
			color: #0E2218;
			font-family: 'Inter', sans-serif;
		}

		p {
			font-size: 16px;
			line-height: 24px;
			color: #596262;
		}

		label {
			margin-bottom: 4px;
			font-size: 12px;
			font-weight: 400;
			line-height: 18px;
			color: #98A4A4
		}

		input {
			border-radius: 0;
			box-shadow: none !important;
			padding: 0px 0px 12px 0px !important;
			height: 40px;
			border: none !important;
			border-bottom: 1px solid #DADFDD !important;
			background: #FFFFFF !important
		}

		button {
			width: 100%;
			height: 56px !important;
			background: #26D37F !important;
			font-size: 16px !important;
			font-weight: 500 !important;
			line-height: 20px !important;
			color: #FFFFFF;
			border-radius: 8px !important
		}

		button:hover {
			color: #FFFFFF !important;
		}
	</style>
</head>

<body style="background-color: #FFFFFF; font-family: 'Inter', sans-serif;">
	<div style="text-align: center; width: 100%; margin-top: 72px">
		<img src="{{ asset('images/logo.png') }}" style="width: 100px; height: auto;" />
	</div>

	<div style="display: flex; justify-content: center">

		@yield('content')
	</div>
</body>

</html>