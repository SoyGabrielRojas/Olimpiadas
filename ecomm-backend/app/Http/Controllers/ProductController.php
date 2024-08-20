<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{

    function addProduct(Request $req)
    {
        $product= new Product;
        $product->name=$req->input('name');
        $product->price=$req->input('price');
        $product->description=$req->input('description');
        $product->file_path = $req->file('file')->store('products', 'public');
        $product->save();

        return $product;
    }

    function list()
    {
        return Product::all();
    }

    function delete($id)
    {
        $result= Product::where('id',$id)->delete();
        if($result)
        {
            return ["producto borrado con exito"];
        }
        else{
            return ["algo falló :("];
        }
    }

    function getProduct($id)
    {
        return Product::find($id);
    }

    function updateProduct(Request $req, $id)
    {
        $product = Product::find($id);

        if ($product) {
            $product->name = $req->input('name');
            $product->price = $req->input('price');
            $product->description = $req->input('description');

            if ($req->hasFile('file')) {
                $product->file_path = $req->file('file')->store('products', 'public');
            }

            $product->save();
            return response()->json(['success' => true, 'message' => 'Producto actualizado con éxito'], 200);
        } else {
            return response()->json(['success' => false, 'message' => 'Algo falló :('], 404);
        }
    }

    function search($key)
    {
        return Product::where('name', 'LIKE', "%{$key}%")->get();  
    }

        
}
