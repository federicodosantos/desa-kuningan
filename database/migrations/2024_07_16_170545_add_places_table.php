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
        Schema::create('places', function (Blueprint $table) {
            $table->char('id', 36)->primary();
            $table->string('name', 100)->nullable(false);
            $table->text('description')->nullable(false);
            $table->string('address', 255)->nullable(false);
            $table->string('social_media', 100)->nullable();
            $table->string('phone_number', 13)->nullable(false);
            $table->decimal('latitude', 9, 6)->nullable(false)->unique();
            $table->decimal('longitude', 9, 6)->nullable(false)->unique();
            $table->unsignedInteger('category_id');
            $table->timestamps();
            $table->foreign('category_id')->references('id')->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('places');
    }
};
