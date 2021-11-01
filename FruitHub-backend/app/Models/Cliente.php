<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model {

	protected $table = "clientes";
	protected $fillable = [
		'cli_nome', 'cli_cnpj', 'cli_ativo'
	];

	public function usuarios() {
		return $this->hasMany(Usuario::class, 'usu_id_cliente');
	}

	public function metricas() {
		return $this->hasMany(Metrica::class, 'met_id_cliente');
	}
}
