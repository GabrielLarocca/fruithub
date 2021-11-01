<?php

namespace App\Helpers;

class ExpoUtil {
	static public function enviarNotificacao($token, $titulo, $descricao) {
		if (isset($token)) {
			$arr = array();

			array_push($arr, ExpoUtil::criarNotificacao($token, $titulo, $descricao));

			ExpoUtil::postNotification($arr);
		}
	}

	static public function criarNotificacao($token, $titulo, $descricao) {
		return array(
			'to' => $token,
			'sound' => 'default',
			'title' => $titulo,
			'body' => $descricao,
			'channelId' => 'pushChannel'
		);
	}

	static public function postNotification($payload) {
		// TODO: para verificar se o endpoint enviado foi recebido
		// com sucesso, utilizar POST em https://exp.host/--/api/v2/push/getReceipts
		// com body x-www-form-urlencoded, campo chave ids com valor ["inserir-id-aqui"]

		$curl = curl_init();

		curl_setopt_array($curl, array(
			CURLOPT_URL => "https://exp.host/--/api/v2/push/send",
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => "",
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 30,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => "POST",
			CURLOPT_POSTFIELDS => json_encode($payload),
			CURLOPT_HTTPHEADER => array(
				"Accept: application/json",
				"Accept-Encoding: gzip, deflate",
				"Content-Type: application/json",
				"cache-control: no-cache",
				"host: exp.host"
			),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		if ($err) {
			return false;
		} else {
			return $response;
		}
	}
}
