<?php

use App\Http\Controllers\Api\KategoriController;
use App\Http\Controllers\Api\KeuanganController;
use App\Http\Middleware\AccessTokenMiddleware;
use Illuminate\Support\Facades\Route;


Route::middleware(AccessTokenMiddleware::class)->group(function () {
    Route::apiResource('kategori', KategoriController::class)->only(['index', 'store', 'destroy', "show"]);
    Route::apiResource('keuangan', KeuanganController::class)->only(['index', 'store', 'destroy']);
});
