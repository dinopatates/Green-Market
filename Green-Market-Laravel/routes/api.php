<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductsController;
use Illuminate\Support\Facades\Route;

// Endpoint : POST http://localhost:8000/api/register
Route::post('/register', [AuthController::class, 'register']);

// Endpoint : POST http://localhost:8000/api/login
Route::post('/login', [AuthController::class, 'login']);

// Endpoint : POST http://localhost:8000/api/products
Route::get('/products', [ProductsController::class, 'index']);