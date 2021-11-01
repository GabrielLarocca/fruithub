<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuarioNotificacoesTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::create('usuario_notificacoes', function (Blueprint $table) {
			$table->id();
			$table->unsignedBigInteger('usn_id_usuario');
			$table->string('usn_titulo');
			$table->text('usn_descricao');
			$table->timestamps();

			$table->foreign('usn_id_usuario')->references('id')->on('usuarios');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::dropIfExists('usuario_notificacoes');
	}
}
