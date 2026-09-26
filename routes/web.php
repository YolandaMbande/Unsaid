<?php

use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware('guest')->group(function () {
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);

    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});

Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware('auth')
    ->name('logout');
    
Route::get('/chat', function () {
    return view('chat');
});

Route::middleware('auth')->group(function () {

    Route::get('/chat', function () {
        return view('chat');
    });

    Route::post('/chat/message', [ChatController::class, 'message']);

    Route::get('/conversations', [ChatController::class, 'conversations']);

    Route::get('/chat/{conversation}', [ChatController::class, 'show']);

    Route::delete('/conversations/{conversation}', [ChatController::class, 'destroy']);

});