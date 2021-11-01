<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth\CanResetPassword;

class Admin extends Authenticatable implements CanResetPassword {
	use HasApiTokens, HasFactory, Notifiable;

	protected $table = "admins";
	protected $fillable = [
		'adm_id_group', 'email', 'password', 'adm_nome', 'adm_ativo'
	];

	protected $hidden = [
		'password', 'remember_token'
	];

	public function group() {
		return $this->belongsTo(Group::class, 'adm_id_group');
	}
}
