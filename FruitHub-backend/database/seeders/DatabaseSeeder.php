<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Group;
use App\Models\GroupPermission;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
	/**
	 * Seed the application's database.
	 *
	 * @return void
	 */
	public function run() {
		$group =  Group::create([
			'gro_nome' => 'Admin',
			'gro_ativo' => true,
		]);

		$group->save();

		$group_permissions = [[
			'grp_id_group' => 1,
			'grp_controller' => 'App\Http\Controllers\Admin\DashboardController',
			'grp_method' => 'get'
		], [
			'grp_id_group' => 1,
			'grp_controller' => 'App\Http\Controllers\Admin\GroupController',
			'grp_method' => 'getPermissionsLocally'
		], [
			'grp_id_group' => 1,
			'grp_controller' => 'App\Http\Controllers\Admin\GroupController',
			'grp_method' => 'getPermissions'
		], [
			'grp_id_group' => 1,
			'grp_controller' => 'App\Http\Controllers\Admin\GroupController',
			'grp_method' => 'list'
		], [
			'grp_id_group' => 1,
			'grp_controller' => 'App\Http\Controllers\Admin\GroupController',
			'grp_method' => 'simpleList'
		], [
			'grp_id_group' => 1,
			'grp_controller' => 'App\Http\Controllers\Admin\GroupController',
			'grp_method' => 'store'
		], [
			'grp_id_group' => 1,
			'grp_controller' => 'App\Http\Controllers\Admin\GroupController',
			'grp_method' => 'get'
		], [
			'grp_id_group' => 1,
			'grp_controller' => 'App\Http\Controllers\Admin\GroupController',
			'grp_method' => 'update'
		], [
			'grp_id_group' => 1,
			'grp_controller' => 'App\Http\Controllers\Admin\GroupController',
			'grp_method' => 'destroy'
		], [
			'grp_id_group' => 1,
			'grp_controller' => 'App\Http\Controllers\Admin\AdminController',
			'grp_method' => 'list'
		], [
			'grp_id_group' => 1,
			'grp_controller' => 'App\Http\Controllers\Admin\AdminController',
			'grp_method' => 'store'
		], [
			'grp_id_group' => 1,
			'grp_controller' => 'App\Http\Controllers\Admin\AdminController',
			'grp_method' => 'get'
		], [
			'grp_id_group' => 1,
			'grp_controller' => 'App\Http\Controllers\Admin\AdminController',
			'grp_method' => 'update'
		], [
			'grp_id_group' => 1,
			'grp_controller' => 'App\Http\Controllers\Admin\AdminController',
			'grp_method' => 'destroy'
		]];

		foreach ($group_permissions as $permission) {
			$group_permission = GroupPermission::create($permission);
			$group_permission->save();
		}

		$admin = Admin::create([
			'adm_nome' => 'Rafael Althaus',
			'email' => 'admin@gmail.com',
			'password' => bcrypt('123456'),
			'adm_id_group' => 1,
			'adm_ativo' => true,
		]);

		$admin->save();
	}
}
