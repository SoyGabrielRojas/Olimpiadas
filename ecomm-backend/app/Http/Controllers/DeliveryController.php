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
            // Validar que el campo 'id' esté presente y que exista en la tabla 'compras'
            $validated = $req->validate([
                'id' => 'required|integer|exists:compras,id',  // Cambié 'purchase_id' por 'id'
            ]);

            // Buscar la compra por su 'id'
            $purchase = Purchase::find($validated['id']);  // Cambié a 'id'

            if ($purchase) {
                // Crear el registro en la tabla 'productos_entregados'
                $deliveredProduct = new DeliveredProduct;
                $deliveredProduct->user_id = $purchase->user_id;
                $deliveredProduct->product_id = $purchase->product_id;
                $deliveredProduct->nombre = $purchase->nombre;
                $deliveredProduct->imagen = $purchase->imagen;
                $deliveredProduct->precio_total = $purchase->precio_total;
                $deliveredProduct->cantidad = $purchase->cantidad;
                $deliveredProduct->save();

                // Eliminar la compra de la tabla 'compras'
                $purchase->delete();

                return response()->json(['message' => 'Producto marcado como entregado exitosamente'], 200);
            } else {
                return response()->json(['error' => 'Compra no encontrada'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al marcar como entregado', 'details' => $e->getMessage()], 500);
        }
    }

    // Obtener productos entregados
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
