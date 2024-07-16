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
        Schema::create('positions', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50)->nullable(false);
            $table->timestamps();
        });

        Schema::create('users', function (Blueprint $table) {
            $table->char('id', 36)->primary();
            $table->string('name', 100)->nullable(false);
            $table->string('email', )->unique()->nullable(false);
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable(false);
            $table->unsignedBigInteger('position_id')->nullable();
            $table->rememberToken();
            $table->timestamps();

            $table->foreign('position_id')->references('id')->on('positions');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('positions');
    }
};
