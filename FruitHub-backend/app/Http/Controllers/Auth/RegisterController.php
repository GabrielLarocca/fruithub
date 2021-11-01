<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;

class RegisterController extends Controller {
    /*
      |--------------------------------------------------------------------------
      | Register Controller
      |--------------------------------------------------------------------------
      |
      | This controller handles the registration of new usuarios as well as their
      | validation and creation. By default this controller uses a trait to
      | provide this functionality without requiring any additional code.
      |
     */

use RegistersUsers;

    /**
     * Where to redirect usuarios after registration.
     *
     * @var string
     */
    protected $redirectTo = '/register/concluido';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('guest');
    }

//    public function register(Request $request) {
//        $this->validator($request->all())->validate();
//
//        event(new Registered($user = $this->create($request->all())));
//        return redirect(route('register.concluido'));
//    }
//
//    /**
//     * Get a validator for an incoming registration request.
//     *
//     * @param  array  $data
//     * @return \Illuminate\Contracts\Validation\Validator
//     */
//    protected function validator(array $data) {
//        return Validator::make($data, [
//                    'name' => 'required|string|max:255',
//                    'email' => 'required|string|email|max:255|unique:usuarios',
//                    'password' => 'required|string|min:6|confirmed',
//                    'cnpj' => 'required|string|unique:usuarios',
//                    'endereco' => 'required|string',
//                    'telefone' => 'required|string'
//        ]);
//    }
//
//    /**
//     * Create a new user instance after a valid registration.
//     *
//     * @param  array  $data
//     * @return \App\User
//     */
//    protected function create(array $data) {
//        return User::create([
//                    'name' => $data['name'],
//                    'email' => $data['email'],
//                    'password' => bcrypt($data['password']),
//                    'cnpj' => $data['cnpj'],
//                    'endereco' => $data['endereco'],
//                    'telefone' => $data['telefone'],
//                    'ativo' => 0
//        ]);
//    }
//
//    public function concluido() {
//        return view('auth.register-concluido');
//    }

}
