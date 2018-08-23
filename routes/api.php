<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::any('/login', function (Request $request){
    return response()->json(["code" => 200, "msg" => "success", "data" => ["token" => "askjhkwrhjahsmnvmnvashiui"]]);
});

Route::get("/get_info", function (Request $request){
   if($request->token == "askjhkwrhjahsmnvmnvashiui") {
       return response()->json([
           "code" => 200,
           "msg" => "success",
           "data" => [
               "user" => [
                   "avatar" => "https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png",
                   "userName" => "Leaf",
                   "userId" => 1,
                   "access" => ["super_admin"]
               ]
           ]
       ]);
   }
});
