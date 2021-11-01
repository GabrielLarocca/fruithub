<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Http\Request;

class PushController extends Controller {
	public static function destroy(Request $request) {
		$user = Usuario::where('id', $request->user()->id)->firstOrFail();

		if (!empty($user)) {
			$user->usu_push_token = null;
			$user->save();

			return response(null, 200);
		}
	}

	public static function store(Request $request) {
		$user = Usuario::where('id', $request->user()->id)->firstOrFail();

		if (!empty($user)) {
			$user->usu_push_token = $request->push_token;
			$user->save();

			return response(null, 200);
		}
	}
}
