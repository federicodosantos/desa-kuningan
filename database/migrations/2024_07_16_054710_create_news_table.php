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
        Schema::create('news', function (Blueprint $table) {
            $table->char('id', 36)->primary();
            $table->string('title', 255)->nullable(false);
            $table->text('content')->nullable(false);
            $table->char('user_id', 36)->nullable();
            $table->string('photo_path', 255)->nullable();
            $table->text('slug')->unique()->nullable(false);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
