<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Purchase;
use App\Models\Cart;

class PurchaseController extends Controller
{
    public function purchaseItem(Request $req)
    {
        try {
            $validated = $req->validate([
                'user_id' => 'required|integer|exists:users,id',
                'product_id' => 'required|integer|exists:products,id',
            ]);

            $cartItem = Cart::where('user_id', $validated['user_id'])
                            ->where('product_id', $validated['product_id'])
                            ->first();

            if ($cartItem) {
                $purchase = new Purchase;
                $purchase->user_id = $validated['user_id'];
                $purchase->product_id = $validated['product_id'];
                $purchase->nombre = $cartItem->product->name;
                $purchase->imagen = $cartItem->product->file_path;
                $purchase->precio_total = $cartItem->product->price * $cartItem->quantity;
                $purchase->cantidad = $cartItem->quantity;
                $purchase->estado = 'En proceso de envío';

                $purchase->save();

                $cartItem->delete();

                return response()->json(['message' => 'Producto comprado exitosamente'], 200);
            } else {
                return response()->json(['error' => 'Producto no encontrado en el carrito'], 404);
            }

        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al realizar la compra', 'details' => $e->getMessage()], 500);
        }
    }

    public function getPurchases($user_id)
    {
        try {
            $purchases = Purchase::where('user_id', $user_id)->get();
            return response()->json($purchases, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener las compras', 'details' => $e->getMessage()], 500);
        }
    }

    public function cancelPurchase(Request $req)
    {
        try {
            $validated = $req->validate([
                'purchase_id' => 'required|integer|exists:compras,id',
            ]);

            $purchase = Purchase::find($validated['purchase_id']);

            if ($purchase) {
                $purchase->delete();
                return response()->json(['message' => 'Compra cancelada exitosamente'], 200);
            } else {
                return response()->json(['error' => 'Compra no encontrada'], 404);
            }

        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al cancelar la compra', 'details' => $e->getMessage()], 500);
        }
    }
}