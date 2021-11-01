<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Usuario;
use App\Helpers\Utils;
use App\Models\UsuarioTag;

class UsuarioController extends Controller {
	public function list(Request $request) {
		$columnsToFilter = ['usu_nome', 'email'];

		$wheres = [
			'usu_ativo' => 1
		];

		$with = [
			'foto',
			'cliente'
		];

		$sortField = 'usu_nome';
		$sortOrder = 'asc';

		return response()->json(["data" => Utils::createDataTableResult($request, Usuario::class, $wheres, $columnsToFilter, null, $sortField, $sortOrder, $with)]);
	}

	public function store(Request $request) {
		$this->validate($request, [
			'usu_id_cliente' => 'required|:clientes,id',
			'email' => 'required|email|unique:usuarios',
			'password' => 'required|min:6',
			'usu_nome' => 'required|max:255',
			'foto' => 'image|mimes:jpeg,png,jpg|max:2048',
			'tags' => 'array|exists:tags,id'
		]);

		$obj = new Usuario;

		$obj->email = $request->email;
		$obj->password = bcrypt($request->password);
		$obj->usu_id_cliente = $request->usu_id_cliente;
		$obj->usu_nome = $request->usu_nome;

		if (!empty($request->foto)) {
			$foto = Utils::addAttachment($request->foto);

			$obj->usu_id_foto = $foto->id;
		}

		$obj->save();

		if (!empty($request->tags)) {
			foreach ($request->tags as $tag) {
				$usuario_tag = new UsuarioTag;

				$usuario_tag->ust_id_usuario = $obj->id;
				$usuario_tag->ust_id_tag = $tag;

				$usuario_tag->save();
			}
		}

		return response()->json($obj);
	}

	public function update(Request $request, $id) {
		$this->validate($request, [
			'usu_id_cliente' => 'required|:clientes,id',
			'email' => 'required|email',
			'password' => 'min:6',
			'usu_nome' => 'required|max:255',
			'foto' => 'image|mimes:jpeg,png,jpg|max:2048',
			'tags' => 'array|exists:tags,id'
		]);

		$obj = Usuario::where(['usu_ativo' => 1, 'id' => $id])->firstOrFail();

		$obj->email = $request->email;
		$obj->usu_id_cliente = $request->usu_id_cliente;
		$obj->usu_id_foto = $request->usu_id_foto;
		$obj->usu_nome = $request->usu_nome;

		if (!empty($request->password)) {
			if (strlen($request->password) < 6) {
				return response()->json(['errors' => ["O comprimento mínimo do campo de senha é de 6 caracteres."]]);
			}

			$obj->password = bcrypt($request->password);
		}

		if (!empty($request->foto)) {
			$foto = Utils::addAttachment($request->foto);

			$obj->usu_id_foto = $foto->id;
		}

		if (!empty($request->tags)) {
			UsuarioTag::where('ust_id_usuario', $obj->id)->delete();

			foreach ($request->tags as $tag) {
				$usuario_tag = new UsuarioTag;

				$usuario_tag->ust_id_usuario = $obj->id;
				$usuario_tag->ust_id_tag = $tag;

				$usuario_tag->save();
			}
		}

		$obj->save();

		return response()->json($obj);
	}

	public function get(Request $request, $id) {
		return response()->json(Usuario::with('foto', 'cliente', 'tags')->where(["usu_ativo" => 1, "id" => $id])->firstOrFail());
	}

	public function destroy(Request $request, $id) {
		$obj = Usuario::where(['usu_ativo' => 1, 'id' => $id])->firstOrFail();

		$obj->usu_ativo = 0;
		$obj->save();

		return response(null, 200);
	}
}
