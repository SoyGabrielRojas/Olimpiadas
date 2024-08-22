<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\DeliveryController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Rutas de autenticación
Route::middleware(['auth', 'admin'])->group(function () {
    Route::post('/user/validate/{id}', [UserController::class, 'validateUser']);
    Route::post('/user/unvalidate/{id}', [UserController::class, 'unvalidateUser']);
});
Route::post('register', [UserController::class, 'Register']);
Route::post('login', [UserController::class, 'login']);

// Rutas de productos
Route::post('addproduct', [ProductController::class, 'addProduct']);
Route::get('list', [ProductController::class, 'list']);
Route::delete('delete/{id}', [ProductController::class, 'delete']);
Route::get('product/{id}', [ProductController::class, 'getProduct']);
Route::post('product/update/{id}', [ProductController::class, 'updateProduct']);
Route::get('search/{key}', [ProductController::class, 'search']);

// Rutas del carrito
Route::post('add-to-cart', [CartController::class, 'addToCart']);
Route::get('cart/{user_id}', [CartController::class, 'getCart']);
Route::post('cart/update', [CartController::class, 'updateCartItem']);
Route::post('cart/remove', [CartController::class, 'removeCartItem']);

// Rutas de compras
Route::post('purchase', [PurchaseController::class, 'purchaseItem']);
Route::get('purchases/{user_id}', [PurchaseController::class, 'getPurchases']);
Route::post('purchase/cancel', [PurchaseController::class, 'cancelPurchase']);

Route::post('/deliver', [DeliveryController::class, 'markAsDelivered']);
Route::get('/delivered-products/{user_id}', [DeliveryController::class, 'getDeliveredProducts']);