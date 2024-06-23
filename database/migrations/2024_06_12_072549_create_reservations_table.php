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
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('full_name');
            $table->string('phone_number');
            $table->unsignedBigInteger('service_id');
            $table->unsignedBigInteger('branch_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('service_id')->references('id')->on('services');
            $table->foreign('branch_id')->references('id')->on('branches');
            $table->time('reservation_hour');
            $table->date('reservation_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
