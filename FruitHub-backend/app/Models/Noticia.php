<?php

namespace App\Models;

use App\Helpers\Utils;
use Illuminate\Database\Eloquent\Model;

class Noticia extends Model {

	protected $table = "noticias";
	protected $fillable = [
		'not_id_foto', 'not_titulo', 'not_descricao', 'not_tipo', 'not_visualizacoes', 'not_data_disponivel', 'not_ativo'
	];

	protected $appends = ['tipo'];

	public function foto() {
		return $this->belongsTo(File::class, 'not_id_foto');
	}

	public function tags() {
		return $this->hasMany(NoticiaTag::class, 'ntt_id_noticia');
	}

	public function links() {
		return $this->hasMany(NoticiaLink::class, 'nol_id_noticia');
	}

	public function getTipoAttribute() {
		return Utils::getTipoNoticia()[$this->not_tipo];
	}
}
