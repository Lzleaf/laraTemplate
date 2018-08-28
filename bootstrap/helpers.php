<?php
/**
 * Created by PhpStorm.
 * User: leaf
 * Date: 2018/8/28
 * Time: 下午2:44
 */

/**
 * @param $code
 * @param null $msg
 * @param array $data
 */

function _returnJson($code, $msg = null, array $data = [])
{
    $res['code'] = $code;
    $res['msg'] = $msg ?? 'success';
    $res['data'] = $data;
    $str = json_encode($res, JSON_BIGINT_AS_STRING);

    header('Content-Type: application/json; charset=UTF-8');
    echo $str;
    exit;
}