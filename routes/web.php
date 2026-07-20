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

Route::get('/article', [BlogController::class, 'index'])->name('blogs.index');
Route::get('/article/{slug}', [BlogController::class, 'show'])->name('blogs.show');

Route::get('/event', function () {
    return Inertia::render('event/all-events');
})->name('event.index');

Route::get('/event/{slug}', function ($slug) {
    return Inertia::render('event/detail-event');
})->name('event.detail');

Route::get('/events', [EventController::class, 'index'])->name('events.index');
Route::get('/events/{id}', [EventController::class, 'show'])->name('events.show');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/dashboard/article/create', [BlogController::class, 'create'])->name('blogs.create');
    Route::post('/dashboard/article', [BlogController::class, 'store'])->name('blogs.store');
    Route::get('/dashboard/article/{id}/edit', [BlogController::class, 'edit'])->name('blogs.edit');
    Route::put('/dashboard/article/{id}', [BlogController::class, 'update'])->name('blogs.update');
    Route::delete('/dashboard/article/{id}', [BlogController::class, 'destroy'])->name('blogs.destroy');});

require __DIR__ . '/settings.php';
