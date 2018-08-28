<?php
/**
 * Created by PhpStorm.
 * User: leaf
 * Date: 2018/8/27
 * Time: 下午5:59
 */

namespace App\Http\Proxy;

use GuzzleHttp\Client;

class TokenProxy
{
    protected $http;

    public function __construct(Client $http)
    {
        $this->http = $http;
    }

    public function login($email, $password)
    {
        return $this->proxy('password', [
            'username' => $email,
            'password' => $password,
            'scope' => ''
        ]);
    }

    private function proxy($grantType, array $data = [])
    {
        $data = array_merge($data, [
            "client_id" => env('Client_ID_2'),
            "client_secret" => env('Client_Secret_2'),
            "grant_type" => $grantType,
        ]);

        $response = $this->http->post(url('oauth/token'), [
            'form_params' => $data
        ]);

        $token = json_decode((string) $response->getBody(), true);

        return response()->json([
            "code" => 200,
            "msg" => "success",
            "data" => [
                'access_token' => $token['access_token'],
                'expires_in' => $token['expires_in']
            ]
        ])->cookie('refresh_token', $token['refresh_token'], 15 * 24 * 60, null, null, false, true);
    }


}