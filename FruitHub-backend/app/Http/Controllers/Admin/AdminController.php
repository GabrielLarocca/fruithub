<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use App\Helpers\Utils;


class AdminController extends Controller {
	public function list(Request $request) {
		$columnsToFilter = ['adm_nome'];

		$wheres = [
			'adm_ativo' => 1
		];

		return response()->json(["data" => Utils::createDataTableResult($request, Admin::class, $wheres, $columnsToFilter)]);
	}

	public function get(Request $request, $id) {
		return response()->json(Admin::where(["adm_ativo" => 1, "id" => $id])->firstOrFail());
	}

	public function store(Request $request) {
		$this->validate($request, [
			'adm_id_group' => 'required',
			'adm_nome' => 'required',
			'email' => 'required|email|unique:admins',
			'password' => 'required|min:6'
		]);

		$obj = new Admin;

		$obj->adm_id_group = $request->adm_id_group;
		$obj->adm_nome = $request->adm_nome;
		$obj->email = $request->email;
		$obj->password = bcrypt($request->password);
		$obj->adm_ativo = 1;

		$obj->save();

		return response()->json($obj);
	}

	public function update(Request $request, $id) {
		$this->validate($request, [
			'adm_id_group' => 'required',
			'adm_nome' => 'required'
		]);

		$obj = Admin::where(['adm_ativo' => 1, 'id' => $id])->firstOrFail();

		if (!empty($request->password)) {
			if (strlen($request->password) < 6) {
				return response()->json(['errors' => ["O comprimento mínimo do campo de senha é de 6 caracteres."]]);
			}

			$obj->password = bcrypt($request->password);
		}

		$obj->adm_id_group = $request->adm_id_group;
		$obj->adm_nome = $request->adm_nome;

		$obj->save();

		return response()->json($obj);
	}

	public function destroy(Request $request, $id) {
		$obj = Admin::where(['adm_ativo' => 1, 'id' => $id])->firstOrFail();

		$obj->adm_ativo = 0;
		$obj->save();

		return response(null, 200);
	}
}
