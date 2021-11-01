<?php

namespace App\Http\Controllers\Web;

use App\Helpers\Utils;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Validator;

class UsuarioController extends Controller {

	public function get(Request $request) {
		return response()->json(Usuario::with('foto')->where('id', $request->user()->id)->firstOrFail());
	}

	public function update(Request $request) {
		$errors = array();
		$user = Usuario::where(['id' => $request->user()->id, 'usu_ativo' => 1])->firstOrFail();

		$validator = Validator::make($request->all(), [
			'email' => 'required|email',
			'password' => 'nullable|min:6',
			'usu_id_foto' => 'nullable|exists:files,id',
			'usu_nome' => 'required'
		]);

		if ($validator->fails()) {
			foreach ($validator->errors()->getMessages() as $item) {
				array_push($errors, $item[0]);
			}

			return response()->json(['errors' => $errors]);
		}

		$user->usu_nome = $request->usu_nome;
		$user->usu_id_foto = $request->usu_id_foto;

		if ($request->file('foto') != null) {
			$validator = Validator::make($request->all(), [
				'foto' => 'required|mimes:jpeg,jpg,png|max:10240',
			]);

			if ($validator->fails()) {
				foreach ($validator->errors()->getMessages() as $item) {
					array_push($errors, $item[0]);
				}

				return response()->json(['errors' => $errors]);
			}

			$attachment = Utils::addAttachment($request->file('foto'));

			$user->usu_id_foto = $attachment->id;
		}

		if (!empty($request->password)) {
			$user->usu_primeiro_acesso = 0;
			$user->password = bcrypt($request->password);
		}

		$user->save();

		$user = Usuario::with('foto')->where(['id' => $request->user()->id, 'usu_ativo' => 1])->firstOrFail();

		return response()->json($user);
	}
}
