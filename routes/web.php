<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// STATIC ROUTES (SEMENTARA )
Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');


Route::get('/article', function () {
    return Inertia::render('article/all-article');
})->name('article.index');


Route::get('/event', function () {
    return Inertia::render('event/all-events');
})->name('article.index');

Route::get('/event/{slug}', function ($slug) {
    return Inertia::render('event/detail-event');
})->name('event.detail');


Route::get('/article/{slug}', function ($slug) {
    return Inertia::render('article/detail-article');
})->name('article.detail');



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');



    // STATIC ROUTES (SEMENTARA )
    Route::get('/article/admin/write', function () {
    return Inertia::render('article/admin/write-article');
})->name('article.write');
});

require __DIR__.'/settings.php';
