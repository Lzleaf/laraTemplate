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

Route::post('/login', 'Auth\LoginController@login');
Route::get("/user_info", 'Auth\LoginController@user');
Route::post("/logout", 'Auth\LoginController@logout');
Route::post("/refresh", 'Auth\LoginController@refresh');

Route::get('/posts', 'PostController@index');
Route::get('/posts/{post}', 'PostController@show');

