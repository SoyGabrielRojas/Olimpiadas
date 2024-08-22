<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDeliveredProductsTable extends Migration
{
    public function up()
    {
        Schema::create('productos_entregados', function (Blueprint $table) {
            $table->id();
            $table->Integer('user_id');
            $table->Integer('product_id');
            $table->string('nombre');
            $table->string('imagen');
            $table->decimal('precio_total', 10, 2);
            $table->integer('cantidad');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('productos_entregados');
    }
}

