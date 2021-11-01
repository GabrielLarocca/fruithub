<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Usuario;
use App\Models\Metrica;
use App\Models\Noticia;

class DashboardController extends Controller {
	public function get(Request $request) {
		$total_usuarios = Usuario::where(['usu_ativo' => 1])->count();
		$total_metricas = Metrica::where(['met_ativo' => 1])->count();
		$total_noticias = Noticia::where(['not_ativo' => 1])->count();

		return response()->json([
			'total_usuarios' => $total_usuarios,
			'total_metricas' => $total_metricas,
			'total_noticias' => $total_noticias
		]);
	}
}
