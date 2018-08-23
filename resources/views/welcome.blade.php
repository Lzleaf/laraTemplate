<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <style lang="less">
            html,body{
                width: 100%;
                height: 100%;
                overflow: hidden;
                margin: 0;
                padding: 0;
            }
        </style>
        <title>Laravel</title>

    </head>
    <body>
        <div id="app">
        </div>
        <script src="{{mix('js/app.js')}}"></script>
    </body>
</html>
