<?php

namespace App\Console\Commands;

use App\Helpers\ExpoUtil;
use App\Models\Metrica;
use App\Models\Noticia;
use App\Models\Usuario;
use App\Models\UsuarioNotificacao;
use Carbon\Carbon;
use App\Helpers\Utils;
use Illuminate\Console\Command;

class SendNotifications extends Command {
	/**
	 * The name and signature of the console command.
	 *
	 * @var string
	 */
	protected $signature = 'command:notifications';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Envio de notificações agendadas';

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct() {
		parent::__construct();
	}

	/**
	 * Execute the console command.
	 *
	 * @return int
	 */
	public function handle() {
		$ini_minuto = Carbon::now();
		$ini_minuto->second(0);

		$fim_minuto = Carbon::now();
		$fim_minuto->second(59);

		$noticias = Noticia::with('tags')->where('not_tipo', 'ENTRE_MODAIS')->whereHas('tags')->whereBetween('not_data_disponivel', [$ini_minuto, $fim_minuto])->get();
		$metricas = Metrica::whereBetween('met_data_disponivel', [$ini_minuto, $fim_minuto])->get();

		if (!$noticias->isEmpty()) {
			foreach ($noticias as $noticia) {
				$tags = [];

				foreach ($noticia->tags as $tag) {
					$tags[] = $tag->ntt_id_tag;
				}

				$usuarios =  Usuario::where('usu_ativo', 1)->whereHas('tags', function ($query) use ($tags) {
					$query->whereIn('ust_id_tag', $tags);
				})->get();

				foreach ($usuarios as $usuario) {
					$usuario_notificacao = new UsuarioNotificacao();

					$usuario_notificacao->usn_id_usuario = $usuario->id;
					$usuario_notificacao->usn_titulo = "Nova postagem disponível!";
					$usuario_notificacao->usn_descricao = $noticia->not_titulo;

					$usuario_notificacao->save();

					ExpoUtil::enviarNotificacao($usuario->usu_push_token,  "Nova postagem disponível!", $noticia->not_titulo);
				}
			}
		}

		if (!$metricas->isEmpty()) {
			foreach ($metricas as $metrica) {
				$usuarios = Usuario::where(['usu_id_cliente' => $metrica->met_id_cliente, 'usu_ativo' => 1])->get();

				foreach ($usuarios as $usuario) {
					$usuario_notificacao = new UsuarioNotificacao;

					$usuario_notificacao->usn_id_usuario = $usuario->id;
					$usuario_notificacao->usn_titulo = "Nova métrica disponível!";
					$usuario_notificacao->usn_descricao = $metrica->met_titulo;

					$usuario_notificacao->save();

					ExpoUtil::enviarNotificacao($usuario->usu_push_token,  "Nova métrica disponível!", $metrica->met_titulo);
				}
			}
		}
	}
}
