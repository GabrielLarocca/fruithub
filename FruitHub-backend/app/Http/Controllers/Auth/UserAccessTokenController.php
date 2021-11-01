<?php

namespace App\Http\Controllers\Auth;

use App\Usuario;
use Exception;
use Psr\Http\Message\ServerRequestInterface;
use League\OAuth2\Server\Exception\OAuthServerException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Laravel\Passport\Http\Controllers\AccessTokenController;
use Illuminate\Support\Facades\Log;
use App\Helpers\Utils;

class UserAccessTokenController extends AccessTokenController {

    public function issueToken(ServerRequestInterface $request) {
        try {
            $email = $request->getParsedBody()['username'];
            $usu_tipo = $request->getParsedBody()['usu_tipo'];

            $user = Usuario::where(['email' => $email, 'usu_ativo' => 1, 'usu_tipo' => $usu_tipo])->with('grupo', 'grupo.grupoAcesso')->firstOrFail();

            $tokenResponse = parent::issueToken($request);
            $content = $tokenResponse->getContent();
            $token = json_decode($content, true);

            if (!empty($user->grupo)) {
                $permissoes = $user->grupo->grupoAcesso;
                $grupo_acesso = array();

                foreach ($permissoes as $c) {
                    array_push($grupo_acesso, array_search($c->gra_permissao, Utils::getPermissoes()));
                }

                $user->permissoes = $grupo_acesso;
            }

            // Append user to the token
            $token['usuario'] = $user;

            if (isset($token['error'])) {
                throw new OAuthServerException('The user credentials were incorrect.', 6, 'invalid_credentials', 401);
            }

            return response()->json($token);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                        'message' => 'Usuário ou senha incorretos.',
                        'error' => 'invalid_credentials'
                            ], 500);
        } catch (OAuthServerException $e) {
            return response()->json([
                        'message' => 'Usuário ou senha incorretos.',
                        'error' => 'invalid_credentials'
                            ], 500);
        } catch (Exception $e) {
            Log::info($e);
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }

}
