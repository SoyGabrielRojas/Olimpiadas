<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'description',
        'file_path', 
    ];

    // Relación con el modelo Cart
    public function cart()
    {
        return $this->hasMany(Cart::class);
    }
}
