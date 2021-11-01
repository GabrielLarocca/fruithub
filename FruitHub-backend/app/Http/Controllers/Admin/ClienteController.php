<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Utils;
use App\Http\Controllers\Controller;
use App\Models\Cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller {
	public function list(Request $request) {
		$columnsToFilter = ['cli_nome', 'cli_cnpj'];

		$wheres = [
			'cli_ativo' => 1
		];

		return response()->json(["data" => Utils::createDataTableResult($request, Cliente::class, $wheres, $columnsToFilter)]);
	}

	public function simpleList(Request $request) {
		return response()->json(Cliente::where("cli_ativo", 1)->get());
	}

	public function store(Request $request) {
		$this->validate($request, [
			'cli_nome' => 'required|string',
			'cli_cnpj' => 'required|string'
		]);

		$obj = new Cliente;

		$obj->cli_nome = $request->cli_nome;
		$obj->cli_cnpj = $request->cli_cnpj;
		$obj->cli_ativo = 1;

		$obj->save();

		return response()->json($obj);
	}

	public function update(Request $request, $id) {
		$this->validate($request, [
			'cli_nome' => 'required',
			'cli_cnpj' => 'required|string'
		]);

		$obj = Cliente::where(['cli_ativo' => 1, 'id' => $id])->firstOrFail();

		$obj->cli_nome = $request->cli_nome;
		$obj->cli_cnpj = $request->cli_cnpj;

		$obj->save();

		return response()->json($obj);
	}

	public function get(Request $request, $id) {
		return response()->json(Cliente::where(["cli_ativo" => 1, "id" => $id])->firstOrFail());
	}

	public function destroy(Request $request, $id) {
		$obj = Cliente::where(['cli_ativo' => 1, 'id' => $id])->firstOrFail();

		$obj->cli_ativo = 0;
		$obj->save();

		return response(null, 200);
	}
}
