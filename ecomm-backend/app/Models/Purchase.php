<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    protected $table = 'compras'; 

    protected $fillable = [
        'user_id',
        'product_id',
        'nombre',
        'imagen',
        'precio_total',
        'cantidad',
        'estado',
    ];
}