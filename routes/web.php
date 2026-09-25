<?php

use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/chat', function () {
    return view('chat');
});

Route::get('/conversations', [ChatController::class, 'conversations']);

Route::post('/chat/message', [ChatController::class, 'message']);

Route::get('/chat/{conversation}', [ChatController::class, 'show']);

Route::delete('/conversations/{conversation}', [ChatController::class, 'destroy']);