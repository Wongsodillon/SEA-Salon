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
        Schema::create('branches', function (Blueprint $table) {
            $table->id();
            $table->string('branch_name');
            $table->string('branch_street');
            $table->string('branch_city');
            $table->string('branch_province');
            $table->string('branch_image');
            $table->string('branch_phone');
            $table->time('opening_time', 0);
            $table->time('closing_time', 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('branches');
    }
};
