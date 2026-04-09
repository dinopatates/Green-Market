<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductsController;
use Illuminate\Support\Facades\Route;

// Auth routes
Route::group(['prefix' => 'auth'], function () {
    // Endpoint : POST http://localhost:8000/api/auth/register
    Route::post('/register', [AuthController::class, 'register']);

    // Endpoint : POST http://localhost:8000/api/auth/login
    Route::post('/login', [AuthController::class, 'login']);

    // Endpoint : GET http://localhost:8000/api/auth/me
    Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');
});

// Endpoint : POST http://localhost:8000/api/products
Route::get('/products', [ProductsController::class, 'index']);