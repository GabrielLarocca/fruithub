<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProdutoTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::create('produto', function (Blueprint $table) {
			$table->id();
			$table->string('pro_nome');
			$table->text('pro_descricao');
			$table->double('pro_price', 10, 2);
			$table->boolean('pro_ativo')->default('1');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::dropIfExists('produto');
	}
}
