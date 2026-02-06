<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\EventController;

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



Route::get('/articles', [BlogController::class, 'index'])
    ->name('articles.index');
Route::get('/articles/{id}', [BlogController::class, 'show'])
    ->name('articles.show');
Route::get('/events', [EventController::class, 'index'])
    ->name('events.index');
Route::get('/events/{id}', [EventController::class, 'show'])
    ->name('events.show');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');



    // STATIC ROUTES (SEMENTARA )
    Route::get('/article/admin/write', function () {
    return Inertia::render('article/admin/write-article');
})->name('article.write');
    Route::get('/articles/create', [BlogController::class, 'create'])
        ->name('articles.create');
    Route::post('/articles', [BlogController::class, 'store'])
        ->name('articles.store');
    Route::put('/articles/{id}', [BlogController::class, 'update'])
        ->name('articles.update');
    Route::delete('/articles/{id}', [BlogController::class, 'destroy'])
        ->name('articles.destroy');
    Route::post('/events', [EventController::class, 'store'])
        ->name('events.store');
    Route::put('/events/{id}', [EventController::class, 'update'])
        ->name('events.update');
    Route::delete('/events/{id}', [EventController::class, 'destroy'])
        ->name('events.destroy');
});

require __DIR__ . '/settings.php';
