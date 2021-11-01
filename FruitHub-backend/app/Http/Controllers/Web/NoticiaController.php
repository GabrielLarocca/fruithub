<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Noticia;
use App\Models\UsuarioTag;
use Carbon\Carbon;
use Illuminate\Http\Request;

class NoticiaController extends Controller {
	public function list(Request $request) {
		$this->validate($request, [
			'not_tipo' => 'required|string'
		]);

		if ($request->not_tipo == 'ENTRE_MODAIS') {
			$tags_user = [];

			foreach (UsuarioTag::where('ust_id_usuario', $request->user()->id)->get() as $tag) {
				$tags_user[] = $tag->ust_id_tag;
			}

			$noticias = Noticia::with('foto')->where(['not_ativo' => 1, 'not_tipo' => $request->not_tipo])
				->where('not_data_disponivel', '<=', Carbon::now())
				->whereHas('tags', function ($query) use ($tags_user) {
					$query->whereIn('ntt_id_tag', $tags_user);
				})->orderBy('created_at', 'desc')->paginate($request->limit ?? 10);
		} else {
			$noticias = Noticia::with('foto')->where(['not_ativo' => 1, 'not_tipo' => $request->not_tipo ?? 'KMM'])
				->where('not_data_disponivel', '<=', Carbon::now())->orderBy('created_at', 'desc')->paginate($request->limit ?? 10);
		}

		return response()->json($noticias);
	}

	public function get(Request $request, $id) {
		$noticia = Noticia::with('foto', 'links')->where(['id' => $id, 'not_ativo' => 1])->where('not_data_disponivel', '<=', Carbon::now())->firstOrFail();

		$noticia->not_visualizacoes++;

		$noticia->save();

		return response()->json($noticia);
	}
}
