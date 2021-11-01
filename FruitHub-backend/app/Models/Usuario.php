<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth\CanResetPassword;

class Usuario extends Authenticatable implements CanResetPassword {
	use HasApiTokens, HasFactory, Notifiable;

	protected $table = "usuarios";
	protected $fillable = [
		'usu_id_foto', 'usu_id_cliente', 'email', 'password', 'usu_nome', 'usu_push_token', 'usu_primeiro_acesso', 'usu_ativo'
	];

	protected $hidden = [
		'password',
		'remember_token',
	];

	public function foto() {
		return $this->belongsTo(File::class, 'usu_id_foto');
	}

	public function cliente() {
		return $this->belongsTo(Cliente::class, 'usu_id_cliente');
	}

	public function tags() {
		return $this->hasMany(UsuarioTag::class, 'ust_id_usuario');
	}

	public function comentarios() {
		return $this->hasMany(PesquisaComentario::class, 'pec_id_usuario');
	}

	public function votos() {
		return $this->hasMany(PesquisaVoto::class, 'pev_id_usuario');
	}

	public function notificacoes() {
		return $this->hasMany(UsuarioNotificacao::class, 'usn_id_usuario');
	}
}
