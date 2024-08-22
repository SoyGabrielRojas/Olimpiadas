<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Purchase;
use App\Models\DeliveredProduct;

class DeliveryController extends Controller
{
    public function markAsDelivered(Request $req)
    {
        try {
            $validated = $req->validate([
                'id' => 'required|integer|exists:compras,id',  
            ]);

            $purchase = Purchase::find($validated['id']);  

            if ($purchase) {
                $deliveredProduct = new DeliveredProduct;
                $deliveredProduct->user_id = $purchase->user_id;
                $deliveredProduct->product_id = $purchase->product_id;
                $deliveredProduct->nombre = $purchase->nombre;
                $deliveredProduct->imagen = $purchase->imagen;
                $deliveredProduct->precio_total = $purchase->precio_total;
                $deliveredProduct->cantidad = $purchase->cantidad;
                $deliveredProduct->save();

                $purchase->delete();

                return response()->json(['message' => 'Producto marcado como entregado exitosamente'], 200);
            } else {
                return response()->json(['error' => 'Compra no encontrada'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al marcar como entregado', 'details' => $e->getMessage()], 500);
        }
    }

    public function getDeliveredProducts($user_id)
    {
        try {
            $deliveredProducts = DeliveredProduct::where('user_id', $user_id)->get();
            return response()->json($deliveredProducts, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener productos entregados', 'details' => $e->getMessage()], 500);
        }
    }
}
