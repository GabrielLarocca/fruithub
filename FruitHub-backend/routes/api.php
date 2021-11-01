<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\AuthController;
use App\Http\Controllers\Web\NotificacaoController;
use App\Http\Controllers\Web\PushController;
use App\Http\Controllers\Web\MetricaController;
use App\Http\Controllers\Web\NoticiaController;
use App\Http\Controllers\Web\PesquisaController;
use App\Http\Controllers\Web\UsuarioController;
use App\Http\Controllers\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Admin\GroupController as AdminGroupController;
use App\Http\Controllers\Admin\AdminController as AdminAdminController;
use App\Http\Controllers\Admin\UsuarioController as AdminUsuarioController;
use App\Http\Controllers\Admin\ClienteController as AdminClienteController;
use App\Http\Controllers\Admin\MetricaController as AdminMetricaController;
use App\Http\Controllers\Admin\NoticiaController as AdminNoticiaController;
use App\Http\Controllers\Admin\PesquisaController as AdminPesquisaController;
use App\Http\Controllers\Admin\TagController as AdminTagController;
use App\Http\Controllers\Admin\NotificacaoController as AdminNotificacaoController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'web'], function () {
	Route::post('/auth', [AuthController::class, 'auth']);

	Route::group(['middleware' => ['auth:sanctum', 'user']], function () {
		Route::group(['prefix' => 'usuario'], function () {
			Route::get('/', [UsuarioController::class, 'get']);
			Route::post('/', [UsuarioController::class, 'update']);
		});

		Route::group(['prefix' => 'metrica'], function () {
			Route::post('/list', [MetricaController::class, 'list']);
			Route::get('/{id}', [MetricaController::class, 'get']);
		});

		Route::group(['prefix' => 'noticia'], function () {
			Route::post('/list', [NoticiaController::class, 'list']);
			Route::get('/{id}', [NoticiaController::class, 'get']);
		});

		Route::group(['prefix' => 'pesquisa'], function () {
			Route::post('/list', [PesquisaController::class, 'list']);
			Route::get('/{id}', [PesquisaController::class, 'get']);
			Route::post('/{id}', [PesquisaController::class, 'storeVoto']);
		});

		Route::group(['prefix' => 'notificacao'], function () {
			Route::post('/list', [NotificacaoController::class, 'list']);
		});

		Route::group(['prefix' => 'push'], function () {
			Route::post('/', [PushController::class, 'store']);
			Route::delete('/', [PushController::class, 'destroy']);
		});
	});
});

Route::group(['prefix' => 'admin'], function () {
	Route::post('/auth', [AdminAuthController::class, 'auth']);
	Route::post('/forgot-password', [AdminAuthController::class, 'forgotPassword']);
	Route::post('/reset-password', [AdminAuthController::class, 'resetPassword']);

	Route::group(['middleware' => ['auth:sanctum']], function () {
		Route::post('/givePermissionsLocally', [AdminGroupController::class, 'givePermissionsLocally']);
	});

	Route::group(['middleware' => ['auth:sanctum', 'admin']], function () {
		Route::group(['prefix' => 'dashboard'], function () {
			Route::get('/', [AdminDashboardController::class, 'get']);
		});

		Route::group(['prefix' => 'group'], function () {
			Route::get('/permissions', [AdminGroupController::class, 'getPermissions']);
			Route::post('/list', [AdminGroupController::class, 'list']);
			Route::get('/simpleList', [AdminGroupController::class, 'simpleList']);
			Route::post('/', [AdminGroupController::class, 'store']);
			Route::get('/{id}', [AdminGroupController::class, 'get']);
			Route::put('/{id}', [AdminGroupController::class, 'update']);
			Route::delete('/{id}', [AdminGroupController::class, 'destroy']);
		});

		Route::group(['prefix' => 'admin'], function () {
			Route::post('/list', [AdminAdminController::class, 'list']);
			Route::post('/', [AdminAdminController::class, 'store']);
			Route::get('/{id}', [AdminAdminController::class, 'get']);
			Route::put('/{id}', [AdminAdminController::class, 'update']);
			Route::delete('/{id}', [AdminAdminController::class, 'destroy']);
		});

		Route::group(['prefix' => 'usuario'], function () {
			Route::post('/list', [AdminUsuarioController::class, 'list']);
			Route::post('/', [AdminUsuarioController::class, 'store']);
			Route::get('/{id}', [AdminUsuarioController::class, 'get']);
			Route::put('/{id}', [AdminUsuarioController::class, 'update']);
			Route::delete('/{id}', [AdminUsuarioController::class, 'destroy']);
		});

		Route::group(['prefix' => 'tag'], function () {
			Route::post('/list', [AdminTagController::class, 'list']);
			Route::get('/simpleList', [AdminTagController::class, 'simpleList']);
			Route::post('/', [AdminTagController::class, 'store']);
			Route::get('/{id}', [AdminTagController::class, 'get']);
			Route::put('/{id}', [AdminTagController::class, 'update']);
			Route::delete('/{id}', [AdminTagController::class, 'destroy']);
		});

		Route::group(['prefix' => 'cliente'], function () {
			Route::post('/list', [AdminClienteController::class, 'list']);
			Route::get('/simpleList', [AdminClienteController::class, 'simpleList']);
			Route::post('/', [AdminClienteController::class, 'store']);
			Route::get('/{id}', [AdminClienteController::class, 'get']);
			Route::put('/{id}', [AdminClienteController::class, 'update']);
			Route::delete('/{id}', [AdminClienteController::class, 'destroy']);
		});

		Route::group(['prefix' => 'metrica'], function () {
			Route::post('/list/{id}', [AdminMetricaController::class, 'list']);
			Route::post('/', [AdminMetricaController::class, 'store']);
			Route::get('/{id}', [AdminMetricaController::class, 'get']);
			Route::put('/{id}', [AdminMetricaController::class, 'update']);
			Route::delete('/{id}', [AdminMetricaController::class, 'destroy']);
		});

		Route::group(['prefix' => 'noticia'], function () {
			Route::post('/list', [AdminNoticiaController::class, 'list']);
			Route::post('/', [AdminNoticiaController::class, 'store']);
			Route::get('/{id}', [AdminNoticiaController::class, 'get']);
			Route::put('/{id}', [AdminNoticiaController::class, 'update']);
			Route::delete('/{id}', [AdminNoticiaController::class, 'destroy']);
		});

		Route::group(['prefix' => 'pesquisa'], function () {
			Route::post('/list', [AdminPesquisaController::class, 'list']);
			Route::post('/', [AdminPesquisaController::class, 'store']);
			Route::get('/{id}', [AdminPesquisaController::class, 'get']);
			Route::put('/{id}', [AdminPesquisaController::class, 'update']);
			Route::delete('/{id}', [AdminPesquisaController::class, 'destroy']);
		});

		Route::group(['prefix' => 'notificacao'], function () {
			Route::post('/list', [AdminNotificacaoController::class, 'list']);
			Route::post('/', [AdminNotificacaoController::class, 'store']);
		});
	});
});
