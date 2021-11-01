<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemCarrinhoTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::create('item_carrinho', function (Blueprint $table) {
			$table->id();
			$table->integer('quantidade');
			$table->unsignedBigInteger('ic_id_carrinho');
			$table->unsignedBigInteger('ic_id_produto');
			$table->timestamps();

			$table->foreign('ic_id_carrinho')->references('id')->on('carrinho');
			$table->foreign('ic_id_produto')->references('id')->on('produto');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::dropIfExists('item_carrinho');
	}
}
