<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('service_details', function (Blueprint $table) {
            $table->unsignedBigInteger('service_id');
            $table->unsignedBigInteger('branch_id');
            $table->primary(['service_id', 'branch_id']);
            $table->foreign('service_id')->references('id')->on('services');
            $table->foreign('branch_id')->references('id')->on('branches');
            $table->integer('price');
            $table->float('duration', 8, 1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_details');
    }
};
