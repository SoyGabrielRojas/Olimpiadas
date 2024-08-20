<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;

class CartController extends Controller
{
    public function addToCart(Request $req)
    {
        try {
            $validated = $req->validate([
                'user_id' => 'required|integer|exists:users,id',  
                'product_id' => 'required|integer|exists:products,id',
            ]);

            $cart = Cart::where('user_id', $validated['user_id'])
                        ->where('product_id', $validated['product_id'])
                        ->first();

            if ($cart) {
                $cart->quantity += 1;
            } else {
                $cart = new Cart;
                $cart->user_id = $validated['user_id'];
                $cart->product_id = $validated['product_id'];
                $cart->quantity = 1;
            }
            
            $cart->save();

            return response()->json(['message' => 'Producto agregado al carrito exitosamente'], 200);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al agregar al carrito', 'details' => $e->getMessage()], 500);
        }
    }

    public function getCart($user_id)
    {
        try {
            $cartItems = Cart::where('user_id', $user_id)->with('product')->get();
            return response()->json($cartItems, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener el carrito', 'details' => $e->getMessage()], 500);
        }
    }

    public function updateCartItem(Request $req)
    {
        try {
            $validated = $req->validate([
                'user_id' => 'required|integer|exists:users,id',
                'product_id' => 'required|integer|exists:products,id',
                'quantity' => 'required|integer|min:1',
            ]);

            $cart = Cart::where('user_id', $validated['user_id'])
                        ->where('product_id', $validated['product_id'])
                        ->first();

            if ($cart) {
                $cart->quantity = $validated['quantity'];
                $cart->save();
                return response()->json(['message' => 'Cantidad actualizada exitosamente'], 200);
            } else {
                return response()->json(['error' => 'Producto no encontrado en el carrito'], 404);
            }

        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al actualizar la cantidad', 'details' => $e->getMessage()], 500);
        }
    }

    public function removeCartItem(Request $req)
    {
        try {
            $validated = $req->validate([
                'user_id' => 'required|integer|exists:users,id',
                'product_id' => 'required|integer|exists:products,id',
            ]);

            $cart = Cart::where('user_id', $validated['user_id'])
                        ->where('product_id', $validated['product_id'])
                        ->first();

            if ($cart) {
                $cart->delete();
                return response()->json(['message' => 'Producto eliminado del carrito exitosamente'], 200);
            } else {
                return response()->json(['error' => 'Producto no encontrado en el carrito'], 404);
            }

        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al eliminar el producto del carrito', 'details' => $e->getMessage()], 500);
        }
    }
}
