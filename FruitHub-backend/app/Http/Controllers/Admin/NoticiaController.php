<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Utils;
use App\Http\Controllers\Controller;
use App\Models\Noticia;
use App\Models\NoticiaLink;
use App\Models\NoticiaTag;
use Illuminate\Http\Request;

class NoticiaController extends Controller {
	public function list(Request $request) {
		$columnsToFilter = ['not_titulo', 'not_descricao'];

		$wheres = [
			'not_ativo' => 1
		];

		$with = [
			'links'
		];

		return response()->json(["data" => Utils::createDataTableResult($request, Noticia::class, $wheres, $columnsToFilter, null, null, '', $with)]);
	}

	public function store(Request $request) {
		$this->validate($request, [
			'not_titulo' => 'required|string',
			'not_descricao' => 'required|string',
			'not_tipo' => 'required',
			'not_data_disponivel' => 'required|date',
			'foto' => 'required|image|mimes:jpg,jpeg,png,bmp,tiff|max:2048',
			'tags' => 'nullable|array|exists:tags,id',
			'links' => 'nullable|array'
		]);

		$obj = new Noticia;

		$obj->not_titulo = $request->not_titulo;
		$obj->not_descricao = $request->not_descricao;
		$obj->not_tipo = $request->not_tipo;
		$obj->not_data_disponivel = $request->not_data_disponivel;

		if (!empty($request->foto)) {
			$foto = Utils::addAttachment($request->foto);

			$obj->not_id_foto = $foto->id;
		}

		$obj->save();

		if (!empty($request->tags)) {
			foreach ($request->tags as $tag) {
				$noticia_tag = new NoticiaTag;

				$noticia_tag->ntt_id_noticia = $obj->id;
				$noticia_tag->ntt_id_tag = $tag;

				$noticia_tag->save();
			}
		}

		if (!empty($request->links)) {
			foreach ($request->links as $link) {
				$noticia_link = new NoticiaLink;

				$noticia_link->nol_id_noticia = $obj->id;
				$noticia_link->nol_titulo = $link['nol_titulo'];
				$noticia_link->nol_link = $link['nol_link'];
				$noticia_link->nol_posicao = isset($link['nol_posicao']) ? $link['nol_posicao'] : null;

				$noticia_link->save();
			}
		}

		return response()->json($obj);
	}

	public function update(Request $request, $id) {
		$this->validate($request, [
			'not_titulo' => 'required|string',
			'not_descricao' => 'required|string',
			'not_tipo' => 'required',
			'not_data_disponivel' => 'required|date',
			'foto' => 'nullable|image|mimes:jpg,jpeg,png,bmp,tiff|max:2048',
			'tags' => 'nullable|array|exists:tags,id',
			'links' => 'nullable|array',
			'not_id_foto' => 'nullable|exists:files,id'
		]);

		$obj = Noticia::with('links', 'tags')->where(['id' => $id, 'not_ativo' => 1])->firstOrFail();

		$obj->not_titulo = $request->not_titulo;
		$obj->not_descricao = $request->not_descricao;
		$obj->not_tipo = $request->not_tipo;
		$obj->not_data_disponivel = $request->not_data_disponivel;
		$obj->not_id_foto = $obj->not_id_foto;

		if (!empty($request->foto)) {
			$foto = Utils::addAttachment($request->foto);

			$obj->not_id_foto = $foto->id;
		}

		if (!empty($request->tags)) {
			NoticiaTag::where('ntt_id_noticia', $obj->id)->delete();

			foreach ($request->tags as $tag) {
				$noticia_tag = new NoticiaTag;

				$noticia_tag->ntt_id_noticia = $obj->id;
				$noticia_tag->ntt_id_tag = $tag;

				$noticia_tag->save();
			}
		}

		$toRemoveLinks = $obj->links->filter(function ($value, $key) use ($request) {
			foreach ($request->links as $link) {
				if (array_key_exists("id", $link)) {
					if ($link["id"] == $value->id) {
						return false;
					}
				}
			}

			return true;
		});

		if (!empty($toRemoveLinks)) {
			foreach ($toRemoveLinks as $rem) {
				$rem->delete();
			}
		}

		if (!empty($request->links)) {
			foreach ($request->links as $link) {
				$not_link = new NoticiaLink;

				if (array_key_exists("id", $link)) {
					$not_link = NoticiaLink::where(['nol_id_noticia' => $obj->id, 'id' => $link["id"]])->firstOrFail();
				}

				$not_link->nol_id_noticia = $obj->id;
				$not_link->nol_titulo = $link["nol_titulo"];
				$not_link->nol_link = $link["nol_link"];
				$not_link->nol_posicao = isset($link["nol_posicao"]) ? $link['nol_posicao'] : null;

				$not_link->save();
			}
		}

		$obj->save();

		return response()->json($obj);
	}

	public function get(Request $request, $id) {
		return response()->json(Noticia::with('foto', 'links', 'tags')->where(["not_ativo" => 1, "id" => $id])->firstOrFail());
	}

	public function destroy(Request $request, $id) {
		$obj = Noticia::where(['not_ativo' => 1, 'id' => $id])->firstOrFail();

		$obj->not_ativo = 0;
		$obj->save();

		return response(null, 200);
	}
}
