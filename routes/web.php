<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('_index');
});

Route::get('/kategori', function () {
    return Inertia::render('kategori');
});

Route::get('/{any}', function () {
    return Inertia::render('Errors/NotFound', [
        'message' => 'Page not found',
    ]);
})->where('any', '.*');
