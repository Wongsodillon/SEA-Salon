<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ServiceController;
use App\Http\Middleware\AdminMiddleware;
use App\Models\Review;
use App\Models\Service;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $services = Service::inRandomOrder()->take(3)->get();
    $reviews = Review::orderBy('created_at', 'desc')->get();
    return Inertia::render('Dashboard', [
        'services' => $services,
        'reviews' => $reviews,
    ]);
})->name('home');

Route::middleware('auth')->group(function() {
    Route::post('/add-review', [ReviewController::class, 'AddReview'])->name('reviews.add');
});

Route::middleware('auth')->group(function() {
    Route::get('/my-reservations', [ReservationController::class, 'GetMyReservations'])->name('my-reservations');
    Route::delete('/my-reservations/{id}', [ReservationController::class, 'CancelReservation'])->name('destroy-reservation');
    Route::get('/make-reservation', [ReservationController::class, 'MakeReservation'])->name('make-reservation');
    Route::post('/make-reservation', [ReservationController::class, 'CreateReservation'])->name('make-reservation');
});

Route::middleware('auth')->group(function() {
    Route::get('/branches/{province}', [BranchController::class, 'GetBranchByProvince'])->name('branches.province');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(AdminMiddleware::class)->group(function() {
    Route::get('/admin', [AdminController::class, 'AdminDashboard'])->name('admin.home');
    Route::get('/admin/branches', [BranchController::class, 'GetBranches'])->name('admin.branches');
    Route::get('/admin/add-branch', [BranchController::class, 'AddBranch'])->name('admin.add-branch');
    Route::post('/admin/add-branch', [BranchController::class, 'CreateBranch'])->name('admin.create-branch');
    Route::get('/admin/services', [ServiceController::class, 'GetServices'])->name('admin.services');
    Route::get('/admin/add-service', [ServiceController::class, 'AddService'])->name('admin.add-service');
    Route::post('/admin/add-service', [ServiceController::class, 'CreateService'])->name('admin.create-service');
    Route::get('/admin/edit-branch/{id}', [BranchController::class, 'EditBranch'])->name('admin.edit-branch');
    Route::post('/admin/edit-branch/{id}', [BranchController::class, 'UpdateBranch'])->name('admin.update-branch');
});

require __DIR__.'/auth.php';
