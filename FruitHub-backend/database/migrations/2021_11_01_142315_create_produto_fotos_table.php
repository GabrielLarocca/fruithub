<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProdutoFotosTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::create('produto_fotos', function (Blueprint $table) {
			$table->id();
			$table->unsignedBigInteger('prf_id_produto');
			$table->unsignedBigInteger('prf_id_foto');
			$table->timestamps();

			$table->foreign('prf_id_produto')->references('id')->on('produto');
			$table->foreign('prf_id_foto')->references('id')->on('files');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::dropIfExists('produto_fotos');
	}
}
