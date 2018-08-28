<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    //

    public function index(){
        $posts = Post::query()->paginate(10);
        return response()->json([
            'code' => 200,
            'data' => $posts,
            'msg' => 'success'
            ]);
    }

    public function show(Post $post){
        return $post;
    }
}
