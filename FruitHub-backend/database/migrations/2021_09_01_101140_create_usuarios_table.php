<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuariosTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::create('usuarios', function (Blueprint $table) {
			$table->id();
			$table->unsignedBigInteger('usu_id_foto')->nullable();
			$table->string('email')->unique();
			$table->string('password');
			$table->string('usu_nome');
			$table->string('usu_push_token')->nullable();
			$table->boolean('usu_ativo')->default('1');
			$table->rememberToken();
			$table->timestamps();

			$table->foreign('usu_id_foto')->references('id')->on('files');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::dropIfExists('usuarios');
	}
}
