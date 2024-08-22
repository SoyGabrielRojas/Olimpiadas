<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveredProduct extends Model
{
    use HasFactory;

    // Si usas una tabla con nombre personalizado, puedes definirla aquí
    protected $table = 'productos_entregados';
}
