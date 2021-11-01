<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotificacoesTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::create('notificacoes', function (Blueprint $table) {
			$table->id();
			$table->unsignedBigInteger('ntf_id_usuario');
			$table->string('ntf_titulo');
			$table->text('ntf_descricao');
			$table->timestamps();

			$table->foreign('ntf_id_usuario')->references('id')->on('usuarios');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::dropIfExists('notificacoes');
	}
}
