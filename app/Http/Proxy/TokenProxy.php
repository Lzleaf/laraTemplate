<?php
/**
 * Created by PhpStorm.
 * User: leaf
 * Date: 2018/8/27
 * Time: 下午5:59
 */

namespace App\Http\Proxy;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ServerException;

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

    public function user() {
        $data = [
            'headers' => [
                'Authorization' =>  request()->header('Authorization')
            ]
        ];

        try{
            $response = $this->http->get(url('api/user'), $data);
            $user = json_decode((string) $response->getBody(), true);

            $user['userName'] = $user['name'];
            $user['userId'] = $user['id'];
            $user['avatar'] = 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png';
            $user['access'] = ['super_admin'];
            _returnJson(200, null, $user);
        }catch (ServerException $exception){
            _returnJson(401, "登录信息过期, 请重新登录");
        }

    }

    public function refresh()
    {
        $refresh_token = request()->cookie('refresh_token');
        return $this->proxy('refresh_token', [
            'refresh_token' => $refresh_token
        ]);
    }

    public function logout() {
        $user = auth()->guard('api')->user();
        $access_token = $user->token();

        app('db')->table('oauth_refresh_tokens')
            ->where('access_token_id', $access_token->id)
            ->update([
                'revoked' => true
            ]);

        cookie()->forget('refresh_token');

        $access_token->revoke();
        _returnJson(200);
    }

    private function proxy($grantType, array $data = [])
    {
        $data = array_merge($data, [
            "client_id" => env('Client_ID_2'),
            "client_secret" => env('Client_Secret_2'),
            "grant_type" => $grantType,
        ]);


        try{
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
        } catch (ClientException $exception) {
            return response()->json([
                "code" => 201,
                "msg" => "账号或密码不正确",
                "data" => []
            ]);
        }

    }

}