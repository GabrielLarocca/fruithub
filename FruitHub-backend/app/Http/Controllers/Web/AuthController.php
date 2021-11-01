<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller {

	private function authenticateUser($user) {
		// A token can have scopes passed to createToken method, but we don't need that in this app.
		// You can use the "tokenCan(scope)" method later to check if user has permission.
		// Reffer to: https://laravel.com/docs/8.x/sanctum#token-abilities
		$token = $user->createToken('user', ['api:web'])->plainTextToken;

		return response()->json(['user' => $user, 'token' => $token]);
	}

	public function auth(Request $request) {
		$errors = array();

		$validator = Validator::make($request->all(), [
			'email' => 'required|email',
			'password' => 'required'
		]);

		if ($validator->fails()) {
			foreach ($validator->errors()->getMessages() as $item) {
				array_push($errors, $item[0]);
			}

			return response()->json(['errors' => $errors]);
		}

		$user = Usuario::with('foto')->where('email', $request->email)->where('usu_ativo', 1)->first();

		if (!$user || !Hash::check($request->password, $user->password)) {
			return response()->json(['errors' => ['Usuário ou senha incorretos.']], 401);
		}

		return $this->authenticateUser($user);
	}
}
