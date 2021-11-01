<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNoticiasTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::create('noticias', function (Blueprint $table) {
			$table->id();
			$table->unsignedBigInteger('not_id_foto');
			$table->string('not_titulo');
			$table->text('not_descricao');
			$table->boolean('not_ativo')->default('1');
			$table->timestamps();

			$table->foreign('not_id_foto')->references('id')->on('files');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::dropIfExists('noticias');
	}
}
