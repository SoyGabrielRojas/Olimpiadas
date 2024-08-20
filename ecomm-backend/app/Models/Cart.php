<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $table = 'carts'; // Especificar la tabla correcta (plural)

    // Relación con el modelo Product
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
